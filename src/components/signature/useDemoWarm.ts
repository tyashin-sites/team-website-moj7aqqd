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
 *      the library + GLB are warm and it's in view — the hero presents the live
 *      viewer with NO click.
 *
 * Respects `prefers-reduced-motion` and `navigator.connection.saveData` (§10):
 * in "lite" mode it still warms the library on idle (instant click) but does
 * NOT prefetch the heavy GLB and does NOT auto-present — it falls back to
 * click-to-activate.
 */

import { useEffect, useRef } from 'react';

type Conn = { saveData?: boolean; effectiveType?: string };

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
    const prefetchGlb = (): Promise<unknown> => {
      if (prefetched) return Promise.resolve();
      prefetched = true;
      if (!libWarmed) void warmLibrary();
      // (2) Pull the GLB into the HTTP cache before any interaction.
      return fetch(modelSrc, { mode: 'cors' }).then((r) => r.blob()).catch(() => {});
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const done = prefetchGlb();
          // (4) Hero auto-presents once the model is warm (cached) + in view.
          if (autoPresent) void done.then(() => onAutoRef.current?.());
          io.disconnect();
        }
      },
      { rootMargin: '300px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [modelSrc, qrSrc, autoPresent]);

  return ref;
}
