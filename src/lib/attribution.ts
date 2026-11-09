/**
 * First-touch / last-touch attribution — the single source every form and
 * outbound link reads (attribution policy §2 and §4).
 *
 * Contract:
 *   - `captureTouch()` runs on every page view. The FIRST touch is written
 *     once and never overwritten. The LAST touch is replaced only when a view
 *     carries new campaign evidence (a UTM, gclid/fbclid, or an external
 *     referrer), so internal navigation never erases where they came from.
 *   - Persisted to localStorage only while `mayStore('analytics')` is true.
 *     Without consent the touch lives in memory for this page only, and is
 *     persisted the moment consent arrives (see AttributionCapture).
 *   - Stores campaign parameters, the referring ORIGIN + path (no query), and
 *     the landing path. Never an email, a name or any form value.
 *   - Everything is clipped and validated on read, so a tampered entry can't
 *     inject arbitrary data into a submission.
 */

import { mayStore } from './consent';

export const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
const CLICK_KEYS = ['gclid', 'fbclid'] as const;
const STORAGE_KEY = 'thridify_attribution';
const VERSION = 1;
const MAX = 200;

export type UtmKey = (typeof UTM_KEYS)[number];

export type Touch = {
  utm: Partial<Record<UtmKey, string>>;
  gclid?: string;
  fbclid?: string;
  /** Referring origin + path, query stripped. Empty for direct visits. */
  referrer?: string;
  /** Path (no query) of the first page of this touch. */
  landingPath: string;
  at: string;
};

export type Attribution = { first: Touch; last: Touch };

type Stored = Attribution & { v: number };

let memory: Attribution | null = null;

function clip(v: unknown): string | undefined {
  if (typeof v !== 'string') return undefined;
  const s = v.trim().slice(0, MAX);
  return s || undefined;
}

function cleanReferrer(ref: string, ownHost: string): string | undefined {
  if (!ref) return undefined;
  try {
    const u = new URL(ref);
    if (u.hostname === ownHost || u.hostname === `www.${ownHost}` || `www.${u.hostname}` === ownHost) return undefined;
    return clip(`${u.origin}${u.pathname}`);
  } catch {
    return undefined;
  }
}

function sanitizeTouch(t: unknown): Touch | null {
  if (!t || typeof t !== 'object') return null;
  const o = t as Record<string, unknown>;
  const utmIn = (o.utm && typeof o.utm === 'object' ? o.utm : {}) as Record<string, unknown>;
  const utm: Touch['utm'] = {};
  for (const k of UTM_KEYS) {
    const v = clip(utmIn[k]);
    if (v) utm[k] = v;
  }
  const landingPath = clip(o.landingPath);
  if (!landingPath || !landingPath.startsWith('/')) return null;
  return {
    utm,
    gclid: clip(o.gclid),
    fbclid: clip(o.fbclid),
    referrer: clip(o.referrer),
    landingPath,
    at: clip(o.at) ?? new Date().toISOString(),
  };
}

function readStored(): Attribution | null {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') as Stored | null;
    if (!raw || raw.v !== VERSION) return null;
    const first = sanitizeTouch(raw.first);
    const last = sanitizeTouch(raw.last);
    return first ? { first, last: last ?? first } : null;
  } catch {
    return null;
  }
}

/** Persist the in-memory attribution if consent allows. Safe to call repeatedly. */
export function persistAttribution(): void {
  if (!memory || !mayStore('analytics')) return;
  try {
    const stored = readStored();
    // A first touch already on disk (from an earlier visit) wins over this page's.
    const value: Stored = { v: VERSION, first: stored?.first ?? memory.first, last: memory.last };
    memory = { first: value.first, last: value.last };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Storage full or blocked — memory copy still serves this page.
  }
}

/** Record this page view. Call once per navigation, client-side only. */
export function captureTouch(href: string = window.location.href, referrer: string = document.referrer): void {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return;
  }
  const utm: Touch['utm'] = {};
  for (const k of UTM_KEYS) {
    const v = clip(url.searchParams.get(k));
    if (v) utm[k] = v.toLowerCase();
  }
  const touch: Touch = {
    utm,
    gclid: clip(url.searchParams.get('gclid')),
    fbclid: clip(url.searchParams.get('fbclid')),
    referrer: cleanReferrer(referrer, url.hostname),
    landingPath: url.pathname.slice(0, MAX),
    at: new Date().toISOString(),
  };
  const hasEvidence = Object.keys(utm).length > 0 || CLICK_KEYS.some((k) => touch[k]) || !!touch.referrer;

  const existing = memory ?? (mayStore('analytics') ? readStored() : null);
  if (!existing) {
    memory = { first: touch, last: touch };
  } else {
    memory = { first: existing.first, last: hasEvidence ? touch : existing.last };
  }
  persistAttribution();
}

/** The current attribution, or null before any capture (or on the server). */
export function getAttribution(): Attribution | null {
  if (typeof window === 'undefined') return null;
  return memory ?? (mayStore('analytics') ? readStored() : null);
}

/**
 * UTMs to carry onward (Calendly, signup): the first touch's tags if it had
 * any, else the last touch's. Empty when the visitor arrived untagged.
 */
export function carriedUtm(a: Attribution | null = getAttribution()): Touch['utm'] {
  if (!a) return {};
  if (Object.keys(a.first.utm).length > 0) return a.first.utm;
  return a.last.utm;
}
