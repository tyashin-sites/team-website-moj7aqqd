'use client';

/**
 * HeroObject — DESIGN-SPEC §7.1. The pitch, delivered pre-copy:
 * a real glTF in <model-viewer> (poster-first, lazy), slow auto-rotate,
 * drag-to-spin, 3 finish swatches that live-swap the material color,
 * an IBM Plex Mono price that ticks on swatch change, and an AR chip
 * (QR placeholder on desktop, "View in your room" on mobile).
 *
 * Placeholder model: Khronos CC0 SheenChair (docs/ASSET-DEBT.md #1) hosted
 * first-party at /models/sheen-chair.glb. Prices are illustrative demo
 * values for the configurator interaction, not product claims.
 */

import { useEffect, useRef, useState } from 'react';
import type React from 'react';

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & Record<string, unknown>,
        HTMLElement
      >;
    }
  }
}

type Finish = {
  name: string;
  /** Swatch chip color (CSS) */
  swatch: string;
  /** RGBA base color factor applied to the model fabric material */
  rgba: [number, number, number, number];
  /** Demo price in USD (illustrative) */
  price: number;
};

// Index 0 (Coral) is the model's OWN native material — "fabric Mystere Mango
// Velvet", baseColorFactor [0.883, 0.035, 0, 1] — so it matches the seamless
// poster exactly (DESIGN-SPEC §6/§7.1). Selecting it re-applies that exact
// factor, restoring the native finish with no color pop.
const FINISHES: Finish[] = [
  { name: 'Coral', swatch: '#F13400', rgba: [0.883, 0.035, 0, 1], price: 1269 },
  { name: 'Forest', swatch: '#007050', rgba: [0.04, 0.3, 0.2, 1], price: 1249 },
  { name: 'Blush', swatch: '#FEBFCC', rgba: [0.96, 0.62, 0.7, 1], price: 1329 },
  { name: 'Natural', swatch: '#C9BBA4', rgba: [0.72, 0.66, 0.55, 1], price: 1189 },
];

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export function HeroObject() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mvRef = useRef<HTMLElement | null>(null);
  const [loadViewer, setLoadViewer] = useState(false);
  const [active, setActive] = useState(0);
  const [displayPrice, setDisplayPrice] = useState(FINISHES[0].price);
  const [isCoarse, setIsCoarse] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const tickRef = useRef<number | null>(null);

  // Poster-first lazy load: pull in the model-viewer element + model only
  // once the hero is on screen AND the main thread is idle (LCP-friendly).
  useEffect(() => {
    setIsCoarse(window.matchMedia('(pointer: coarse)').matches);
    const el = wrapRef.current;
    if (!el) return;
    let done = false;
    const start = () => {
      if (done) return;
      done = true;
      const kick = () => {
        import('@google/model-viewer').then(() => setLoadViewer(true)).catch(() => {});
      };
      if ('requestIdleCallback' in window) {
        (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(kick);
      } else {
        setTimeout(kick, 200);
      }
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          start();
          io.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Apply a finish's base color to the model fabric material. Safe to call
  // before the model is ready (no-op until materials exist).
  function applyMaterial(i: number) {
    const mv = mvRef.current as unknown as {
      model?: { materials?: Array<{ name?: string; pbrMetallicRoughness?: { setBaseColorFactor: (c: number[]) => void } }> };
    } | null;
    try {
      const materials = mv?.model?.materials ?? [];
      const fabric =
        materials.find((m) => (m.name || '').toLowerCase().includes('fabric')) ?? materials[0];
      fabric?.pbrMetallicRoughness?.setBaseColorFactor(FINISHES[i].rgba as unknown as number[]);
    } catch {
      // Viewer not ready yet — the swatch still updates the price/UI.
    }
  }

  // DESIGN-SPEC §7.1 (SEAMLESS POSTER RULE): the loaded model must match the
  // poster with NO color pop. The default active finish (FINISHES[0], Coral) IS
  // the model's own native material, so we do NOT override the material on load
  // — the live viewer simply renders the native finish that the poster already
  // shows. The active-swatch indicator (Coral) therefore agrees with what is
  // rendered. Clicking any OTHER swatch changes the material on user action.

  // Price ticker: animate the number toward the target when a swatch changes.
  function selectFinish(i: number) {
    setActive(i);
    const target = FINISHES[i].price;

    // Swap the model material color client-side.
    applyMaterial(i);

    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
      setDisplayPrice(target);
      return;
    }
    if (tickRef.current) cancelAnimationFrame(tickRef.current);
    const from = displayPrice;
    const t0 = performance.now();
    const dur = 400;
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplayPrice(Math.round(from + (target - from) * eased));
      if (p < 1) tickRef.current = requestAnimationFrame(step);
    };
    tickRef.current = requestAnimationFrame(step);
  }

  function activateAR() {
    const mv = mvRef.current as unknown as { activateAR?: () => void } | null;
    mv?.activateAR?.();
  }

  return (
    <div ref={wrapRef} className="relative">
      <div className="relative aspect-square max-h-[560px] w-full rounded-lg overflow-hidden">
        {loadViewer ? (
          <model-viewer
            ref={(el: HTMLElement | null) => {
              mvRef.current = el;
            }}
            src="/models/sheen-chair.glb"
            poster="/models/sheen-chair-poster.webp"
            alt="Interactive 3D chair — drag to spin"
            camera-controls
            auto-rotate
            auto-rotate-delay="1500"
            rotation-per-second="8deg"
            interaction-prompt="none"
            ar
            ar-modes="webxr scene-viewer quick-look"
            shadow-intensity="0.6"
            exposure="1.05"
            style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
          />
        ) : (
          // Poster frame while the viewer is deferred. This is a realistic
          // raster still of the EXACT model at its initial camera pose
          // (SEAMLESS POSTER RULE, DESIGN-SPEC §6) — rendered from
          // sheen-chair.glb via model-viewer itself — so when the live viewer
          // takes over there is no outline→realistic pop.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/models/sheen-chair-poster.webp"
            alt="3D product preview loading"
            width={640}
            height={640}
            className="w-full h-full object-contain"
          />
        )}
      </div>

      {/* Controls: swatches + price + AR chip */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3" role="radiogroup" aria-label="Finish">
          {FINISHES.map((f, i) => (
            <button
              key={f.name}
              type="button"
              role="radio"
              aria-checked={active === i}
              aria-label={`${f.name} finish`}
              onClick={() => selectFinish(i)}
              className={`relative w-9 h-9 rounded-full border-2 transition-micro ${
                active === i ? 'border-primary scale-110' : 'border-paper/30 hover:border-paper/60'
              }`}
              style={{ backgroundColor: f.swatch }}
            >
              {/* Pink dot indicator on the active swatch — the ONE pink
                  element in this viewport (DESIGN-SPEC §1). */}
              {active === i && (
                <span
                  aria-hidden
                  className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-accent"
                />
              )}
            </button>
          ))}
          <span className="text-sm text-muted-dark ml-1">{FINISHES[active].name}</span>
        </div>

        <div className="flex items-center gap-4">
          {/* IBM Plex Mono price ticker */}
          <p className="tt-mono text-paper text-lg" aria-live="polite">
            ${displayPrice.toLocaleString('en-US')}
          </p>

          {/* AR chip */}
          {isCoarse ? (
            <button type="button" onClick={activateAR} className="btn btn-primary text-sm py-2.5 px-4">
              View in your room
            </button>
          ) : (
            <div className="relative">
              <button
                type="button"
                onMouseEnter={() => setQrOpen(true)}
                onMouseLeave={() => setQrOpen(false)}
                onFocus={() => setQrOpen(true)}
                onBlur={() => setQrOpen(false)}
                className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-full border border-primary/40 text-paper hover:bg-primary/10 transition-micro"
                aria-expanded={qrOpen}
              >
                <span aria-hidden className="w-2 h-2 rounded-full bg-primary" />
                AR
              </button>
              {qrOpen && (
                <div className="absolute bottom-full right-0 mb-3 p-4 glass-card w-44 text-center">
                  {/* Real, scannable QR — deep-links to the model's AR view
                      (Google scene-viewer intent for the chair GLB). Scanning
                      it launches "view in your room" AR on a phone. Regenerate
                      per model when real client models land (docs/ASSET-DEBT.md
                      #10, scripts/generate-ar-qr.mjs). */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/models/ar-qr-chair.svg"
                    alt="QR code — scan to view this chair in AR on your phone"
                    width={128}
                    height={128}
                    className="w-32 h-32 mx-auto rounded-md bg-white p-1.5"
                  />
                  <p className="mt-2 text-xs text-muted-dark">Scan to view in your room</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
