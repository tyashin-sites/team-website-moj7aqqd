/**
 * Calendly links — the ONE place the booking URL and its tags are built.
 *
 * Calendly copies `utm_*` from the booking URL into the booking's `tracking`
 * object, which is how the Monday scorecard attributes a demo (attribution
 * policy §2).
 *
 *   calendlyHref('features')  → server-safe href with the site defaults:
 *     ?utm_source=website&utm_medium=cta&utm_campaign=features
 *   withStoredUtm(href)       → client-side, at click time: swaps in the
 *     visitor's stored first-touch UTMs when they have any.
 *
 * Every Calendly anchor on the page (including ones in content/site.json and
 * the chatbot) goes through `withStoredUtm` via the delegated listener in
 * AttributionCapture, so no link can ship untagged.
 */

import { carriedUtm, UTM_KEYS } from './attribution';

export const CALENDLY_BASE = 'https://calendly.com/hello-thridify/30min';

export function isCalendlyHref(href: string): boolean {
  return href.startsWith('https://calendly.com/hello-thridify');
}

/** Page slug for `utm_campaign` from a path: "/" → "home", "/integrations/shopify" → "integrations-shopify". */
export function campaignForPath(path: string): string {
  const slug = path
    .replace(/[?#].*$/, '')
    .split('/')
    .filter(Boolean)
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '');
  return slug || 'home';
}

/** Server-safe Calendly href tagged with the site defaults for `campaign` (a page slug). */
export function calendlyHref(campaign: string): string {
  const u = new URL(CALENDLY_BASE);
  u.searchParams.set('utm_source', 'website');
  u.searchParams.set('utm_medium', 'cta');
  u.searchParams.set('utm_campaign', campaign);
  return u.toString();
}

/**
 * Client-side: the href to actually open. Stored UTMs replace the defaults;
 * with none stored, untagged links get the defaults for the current page.
 * Links that already carry non-default tags (hand-placed campaigns) are left alone.
 */
export function withStoredUtm(href: string, path: string = window.location.pathname): string {
  let u: URL;
  try {
    u = new URL(href);
  } catch {
    return href;
  }
  const stored = carriedUtm();
  const hasOwnTags = u.searchParams.has('utm_source') && u.searchParams.get('utm_source') !== 'website';
  if (hasOwnTags) return href;
  if (Object.keys(stored).length > 0) {
    for (const k of UTM_KEYS) u.searchParams.delete(k);
    for (const k of UTM_KEYS) {
      const v = stored[k];
      if (v) u.searchParams.set(k, v);
    }
    return u.toString();
  }
  if (!u.searchParams.has('utm_source')) return calendlyHref(campaignForPath(path));
  return href;
}
