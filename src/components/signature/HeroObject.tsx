'use client';

/**
 * HeroObject — DESIGN-SPEC §7.1 + §6a. The pitch, delivered pre-copy:
 * a real glTF in <model-viewer> (poster-first for LCP), slow auto-rotate,
 * drag-to-spin, 3 finish swatches that live-swap the material color,
 * an IBM Plex Mono price that ticks on swatch change, and an AR chip
 * (real scannable QR on desktop, "View in your room" on mobile).
 *
 * WARM-THEN-INSTANT (§6a/§10): the seamless poster paints first as the LCP
 * element; then, after first paint, `useDemoWarm` warms the model-viewer
 * library on idle and prefetches the GLB into the HTTP cache on viewport, and
 * the hero AUTO-PRESENTS the live viewer once warm — no click. Reduced-motion /
 * Save-Data opt out of prefetch + auto-present (library still warms on idle so
 * a click stays instant).
 *
 * Placeholder model: Khronos CC0 SheenChair (docs/ASSET-DEBT.md #1) hosted
 * first-party at /models/sheen-chair.glb. Prices are illustrative demo
 * values for the configurator interaction, not product claims.
 */

import { useEffect, useRef, useState } from 'react';
import type React from 'react';
import { useDemoWarm } from '@/components/signature/useDemoWarm';

const MODEL_SRC = '/models/sheen-chair.glb';
const AR_QR_SRC = '/models/ar-qr-chair.svg';

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
  const mvRef = useRef<HTMLElement | null>(null);
  const [loadViewer, setLoadViewer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [autoStarted, setAutoStarted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [active, setActive] = useState(0);
  const [displayPrice, setDisplayPrice] = useState(FINISHES[0].price);
  const [isCoarse, setIsCoarse] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const tickRef = useRef<number | null>(null);

  // Ref callback: keep the model-viewer handle AND reveal it (fade OUR poster
  // <img> out) on its 'load' event. The <img> stays the LCP element (§10); the
  // canvas is not an LCP candidate and we pass model-viewer NO poster, so no
  // late #default-poster candidate is created. Load→reveal is seamless (§6/§7.1).
  function attachMv(el: HTMLElement | null) {
    mvRef.current = el;
    const w = el as unknown as { _lbLoad?: boolean } | null;
    if (el && w && !w._lbLoad) {
      w._lbLoad = true;
      el.addEventListener('load', () => setRevealed(true));
    }
  }

  // Coarse-pointer detection only. The GLB + model-viewer runtime warm AFTER
  // first paint (idle + viewport), so the seamless poster stays the LCP element
  // (§10) but activation is instant. See useDemoWarm below.
  useEffect(() => {
    setIsCoarse(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  // Pull in model-viewer + the model on engagement / auto-present. Idempotent.
  function activate() {
    if (loadViewer || loading) return;
    setLoading(true);
    import('@google/model-viewer')
      .then(() => {
        setLoadViewer(true);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  // §6a/§10: warm library on idle, prefetch GLB on viewport, preload AR QR, and
  // AUTO-PRESENT the hero once warm + in view (reduced-motion / Save-Data opt
  // out inside the hook → falls back to click-to-activate).
  const warmRef = useDemoWarm({
    modelSrc: MODEL_SRC,
    qrSrc: AR_QR_SRC,
    autoPresent: true,
    onAutoPresent: () => {
      if (loadViewer || loading) return;
      setAutoStarted(true);
      activate();
    },
  });

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

    // Choosing a finish is engagement — bring the live model up if it's not
    // already loaded (§6a), then swap the material color client-side.
    activate();
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
    // Ensure the viewer is live first (AR needs the loaded model).
    activate();
    const mv = mvRef.current as unknown as { activateAR?: () => void } | null;
    mv?.activateAR?.();
  }

  return (
    <div ref={warmRef} className="relative">
      <div className="relative aspect-square max-h-[560px] w-full rounded-lg overflow-hidden">
        {/* Seamless poster = the LCP element (§10). Rendered FIRST and painted
            eagerly at high priority, so it is the recorded LCP. It stays fully
            opaque UNTIL the live model fires its `load` event, then cross-fades
            OUT as the model fades IN (both driven by `revealed`). We fade it out
            rather than leaving it underneath because the live viewer reveals at
            model-viewer's own camera pose AND auto-rotates — a static front-on
            poster can never stay aligned with a rotating model, so keeping it
            visible showed the model sitting on top of a second, offset chair.
            Fading it out AFTER load (LCP already recorded; the model canvas is
            not an LCP candidate) is LCP-safe and matches model-viewer's built-in
            poster behavior. `revealed` only flips on a SUCCESSFUL load, so a
            load failure keeps the poster as the fallback. (§6/§6a/§7.1/§10) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/models/sheen-chair-poster.webp"
          alt="Interactive 3D chair — drag to spin"
          width={640}
          height={640}
          // Hero poster = the LCP element (§10): eager + high fetch priority.
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-contain"
          style={{
            opacity: revealed ? 0 : 1,
            transition: 'opacity 400ms cubic-bezier(.22,1,.36,1)',
            pointerEvents: 'none',
          }}
        />
        {/* Live viewer mounts ON TOP of the persistent poster (no `poster` attr,
            so it adds no competing LCP candidate; the <canvas> is not an LCP
            candidate). It stays transparent until its 'load' event, then fades IN
            over the identical poster — imperceptible swap (§6/§7.1). */}
        {loadViewer && (
          <model-viewer
            ref={attachMv}
            src="/models/sheen-chair.glb"
            alt="Interactive 3D chair — drag to spin"
            camera-controls
            auto-rotate
            auto-rotate-delay="1500"
            rotation-per-second="8deg"
            interaction-prompt="none"
            reveal="auto"
            ar
            ar-modes="webxr scene-viewer quick-look"
            shadow-intensity="0.6"
            exposure="1.05"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'transparent',
              opacity: revealed ? 1 : 0,
              transition: 'opacity 400ms cubic-bezier(.22,1,.36,1)',
              pointerEvents: revealed ? 'auto' : 'none',
            }}
          />
        )}
        {/* Hero auto-presents once warm (§6a): suppress the CTA once auto-started
            so the live viewer reveals with no "Loading…" flash. The button
            remains for the reduced-motion / Save-Data fallback (no auto-present)
            and as a keyboard affordance until then. */}
        {!loadViewer && !autoStarted && (
          <button
            type="button"
            onClick={activate}
            onMouseEnter={() => {
              // Warm the model-viewer module on hover too (belt-and-braces).
              import('@google/model-viewer').catch(() => {});
            }}
            className="absolute inset-0 flex items-end justify-center pb-6 group focus-visible:outline-none"
            aria-label="Spin it in 3D — loads the live interactive model"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-contrast text-sm font-semibold px-4 py-2.5 shadow-lg transition-micro group-hover:bg-primary-deep group-focus-visible:ring-2 group-focus-visible:ring-accent group-focus-visible:ring-offset-2">
              {loading ? <span className="tt-mono">Loading…</span> : 'Spin it in 3D'}
            </span>
          </button>
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
              {/* Teal dot indicator on the active swatch — kept off pink so the
                  Blush product-finish swatch stays the ONE pink element in this
                  viewport (DESIGN-SPEC §1 one-pink rule). */}
              {active === i && (
                <span
                  aria-hidden
                  className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-primary"
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
