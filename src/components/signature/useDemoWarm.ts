'use client';

/**
 * useDemoWarm — shared warming logic for the site's 3D demo components
 * (HeroObject + CapabilityDemo). Implements the DESIGN-SPEC §6a/§10
 * demo-loading contract: "poster for LCP → warm library + model on
 * idle/viewport → INSTANT on interact; the above-the-fold hero AUTO-PRESENTS
 * once warm." It replaces the old cold activate-on-interaction (which paid the
 * `import('@google/model-viewer')` + GLB download only on click, with no
 * mobile hover to warm it → a visible "Loading…" wait after the tap).
 *
 * What it does, all AFTER first paint so the poster stays the LCP element (§10):
 *   1. Warms the model-viewer library on `requestIdleCallback` (setTimeout
 *      fallback) — always, even in lite mode, so any later click is instant.
 *   2. Prefetches the GLB bytes when the demo scrolls within ~300px of the
 *      viewport (IntersectionObserver), so `<model-viewer>` loads it FROM the
 *      HTTP cache on activation — no network wait.
 *   3. Preloads the small AR QR SVG once (cheap) so the AR affordance never
 *      fetches on click.
 *   4. For the above-the-fold hero (`autoPresent`), fires `onAutoPresent` once
 *      the library + GLB are warm and it's in view — BUT ONLY when the model is
 *      within the §10 3D-asset budget (≤ ~2MB). A live WebGL context is only
 *      cheap enough to auto-run for a budget-sized model; the current 4.4MB
 *      placeholder chair (ASSET-DEBT #16/#26) is OVER budget, so on the pages
 *      that use it the hero stays warm-but-click-to-activate (instant from
 *      cache) instead of auto-presenting — §10 wins ("if an idea breaks the
 *      budget, the idea loses"). Auto-present self-activates once the real
 *      ≤2MB optimized Thridify SDK embed replaces the placeholder. The
 *      per-industry heroes already use ≤1.3MB models and auto-present today.
 *
 * Respects `prefers-reduced-motion` and `navigator.connection.saveData` (§10):
 * in "lite" mode it still warms the library on idle (instant click) but does
 * NOT prefetch the heavy GLB and does NOT auto-present — it falls back to
 * click-to-activate.
 */

import { useEffect, useRef } from 'react';

type Conn = { saveData?: boolean; effectiveType?: string };

// §10: glTF ≤ 2MB. Only auto-run a live WebGL context for a within-budget
// model (small margin over 2MB). Heavier models stay instant-click.
const AUTO_PRESENT_MAX_BYTES = 2.6 * 1024 * 1024;

function isLiteMode(): boolean {
  if (typeof window === 'undefined') return false;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const conn = (navigator as unknown as { connection?: Conn }).connection;
  const saveData = !!(conn && (conn.saveData || /(^|\s|-)2g$/.test(conn.effectiveType || '')));
  return reduced || saveData;
}

function onIdle(cb: () => void) {
  const ric = (window as unknown as {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  }).requestIdleCallback;
  if (typeof ric === 'function') ric(cb, { timeout: 2000 });
  else setTimeout(cb, 1200);
}

const warmLibrary = () => import('@google/model-viewer').catch(() => {});

export function useDemoWarm({
  modelSrc,
  qrSrc,
  autoPresent = false,
  onAutoPresent,
}: {
  /** GLB to prefetch into the HTTP cache. */
  modelSrc: string;
  /** Optional AR QR SVG to `<link rel="preload">` once. */
  qrSrc?: string;
  /** Above-the-fold hero: auto-present the live viewer once warm + in view. */
  autoPresent?: boolean;
  /** Called to bring the live viewer up (should be idempotent). */
  onAutoPresent?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onAutoRef = useRef(onAutoPresent);
  onAutoRef.current = onAutoPresent;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const lite = isLiteMode();

    let cancelled = false;
    let io: IntersectionObserver | null = null;

    // Gate ALL warming behind the window 'load' event so nothing competes with
    // the critical render path — the poster paints and the page becomes
    // interactive first; only then do we warm the library / prefetch the GLB /
    // auto-present (§10: warming starts after first paint, never blocks it).
    const start = () => {
      if (cancelled) return;
      begin();
    };
    if (document.readyState === 'complete') onIdle(start);
    else window.addEventListener('load', () => onIdle(start), { once: true });

    function begin() {
      if (cancelled) return;
      // (1) Warm the model-viewer library on idle — always, even in lite mode.
      let libWarmed = false;
      onIdle(() => {
        libWarmed = true;
        void warmLibrary();
      });

      // (3) Preload the AR QR SVG once (cheap, always safe).
      if (qrSrc && !document.querySelector(`link[rel="preload"][href="${qrSrc}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = qrSrc;
        document.head.appendChild(link);
      }

      // Lite mode: no heavy GLB prefetch, no auto-present. Click still warm.
      if (lite) return;

      const el = ref.current;
      if (!el) return;

      let prefetched = false;
      // Resolves to the model's byte size (0 if unknown) once cached.
      const prefetchGlb = (): Promise<number> => {
        if (prefetched) return Promise.resolve(0);
        prefetched = true;
        if (!libWarmed) void warmLibrary();
        // (2) Pull the GLB into the HTTP cache before any interaction, at LOW
        // priority so the heavy placeholder never competes with the LCP poster
        // or other critical resources (§10).
        return fetch(modelSrc, { mode: 'cors', priority: 'low' } as RequestInit)
          .then(async (r) => {
            const len = Number(r.headers.get('content-length') || 0);
            const blob = await r.blob();
            return len || blob.size || 0;
          })
          .catch(() => 0);
      };

      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const done = prefetchGlb();
            // (4) Hero auto-presents once the model is warm (cached) + in view —
            // only if it is within the §10 budget; heavier models stay
            // instant-click (fall back). Unknown size (0) → conservative skip.
            if (autoPresent) {
              void done.then((bytes) => {
                if (bytes > 0 && bytes <= AUTO_PRESENT_MAX_BYTES) onAutoRef.current?.();
              });
            }
            io?.disconnect();
          }
        },
        { rootMargin: '300px' },
      );
      io.observe(el);
    }

    return () => {
      cancelled = true;
      io?.disconnect();
    };
  }, [modelSrc, qrSrc, autoPresent]);

  return ref;
}
