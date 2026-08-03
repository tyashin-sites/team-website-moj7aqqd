'use client';

/**
 * CapabilityDemo — DESIGN-SPEC §6a (DEMO-FIRST PRINCIPLE). An interactive
 * mini-demo of the real model, NOT an infographic. Poster-first +
 * ACTIVATE-ON-INTERACTION: the seamless raster poster (§6) renders for LCP;
 * the live <model-viewer> only mounts when the user taps/clicks, so only one
 * heavy WebGL demo instantiates at a time and the perf budget (§10) holds.
 *
 * Three modes map to the three product capabilities:
 *   - 'viewer'       → drag-to-spin + slow auto-rotate (3D 360° Viewer)
 *   - 'configurator' → live finish swatches + mono price (3D Configurator)
 *   - 'ar'           → view-in-your-room button (mobile) / QR (desktop)
 *
 * Placeholder model: the same first-party CC0 SheenChair the hero uses
 * (docs/ASSET-DEBT.md #1/#4/#8). Real Thridify experience embeds (per
 * docs/integration/HERO-EMBED-REQUIREMENTS.md) replace these later — and the
 * poster is regenerated the same way at that point (§6).
 *
 * The `model-viewer` JSX intrinsic element is typed once in HeroObject.tsx
 * (ambient `declare module 'react'` augmentation, project-wide).
 */

import { useRef, useState } from 'react';
import { RotateCcw, SlidersHorizontal, Smartphone, Play } from 'lucide-react';

export type DemoMode = 'viewer' | 'configurator' | 'ar';

const DEFAULT_MODEL_SRC = '/models/sheen-chair.glb';
const DEFAULT_POSTER_SRC = '/models/sheen-chair-poster.webp';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

type Finish = { name: string; swatch: string; rgba: [number, number, number, number]; price: number };
// Index 0 (Coral) is the model's OWN native material — "fabric Mystere Mango
// Velvet", baseColorFactor [0.883, 0.035, 0, 1] — matching the seamless poster
// exactly (DESIGN-SPEC §6/§7.1), so the initial state has no color pop.
const FINISHES: Finish[] = [
  { name: 'Coral', swatch: '#F13400', rgba: [0.883, 0.035, 0, 1], price: 1269 },
  { name: 'Forest', swatch: '#007050', rgba: [0.04, 0.3, 0.2, 1], price: 1249 },
  { name: 'Blush', swatch: '#FEBFCC', rgba: [0.96, 0.62, 0.7, 1], price: 1329 },
  { name: 'Natural', swatch: '#C9BBA4', rgba: [0.72, 0.66, 0.55, 1], price: 1189 },
];

const MODE_META: Record<DemoMode, { verb: string; icon: typeof Play }> = {
  viewer: { verb: 'Spin it in 3D', icon: RotateCcw },
  configurator: { verb: 'Configure it live', icon: SlidersHorizontal },
  ar: { verb: 'Place it in your room', icon: Smartphone },
};

export function CapabilityDemo({
  mode,
  onDark = false,
  className = '',
  aspect = 'aspect-[4/3]',
  model = DEFAULT_MODEL_SRC,
  poster = DEFAULT_POSTER_SRC,
  modelLabel = 'product',
  priority = false,
}: {
  mode: DemoMode;
  onDark?: boolean;
  className?: string;
  aspect?: string;
  /** Per-industry model + seamless poster (DESIGN-SPEC §6/§6a). Defaults to
      the placeholder chair; industry pages pass their own relevant model. */
  model?: string;
  poster?: string;
  /** Short noun for alt text, e.g. the industry name. */
  modelLabel?: string;
  /** True ONLY for the above-the-fold hero instance on a page — the poster is
      the LCP element (§10), so load it eagerly at high fetch priority. Every
      below-the-fold instance (home trio, /platform deep-dives) leaves this
      false so its poster lazy-loads and never competes with the hero LCP. */
  priority?: boolean;
}) {
  const MODEL_SRC = model;
  const POSTER_SRC = poster;
  const [live, setLive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
  const [displayPrice, setDisplayPrice] = useState(FINISHES[0].price);
  const [isCoarse, setIsCoarse] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const mvRef = useRef<HTMLElement | null>(null);
  const tickRef = useRef<number | null>(null);

  const meta = MODE_META[mode];

  function activate() {
    if (live || loading) return;
    setIsCoarse(window.matchMedia('(pointer: coarse)').matches);
    setLoading(true);
    import('@google/model-viewer')
      .then(() => {
        setLive(true);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  // Apply a finish's base color to the model fabric material (no-op until ready).
  function applyMaterial(i: number) {
    const mv = mvRef.current as unknown as {
      model?: { materials?: Array<{ name?: string; pbrMetallicRoughness?: { setBaseColorFactor: (c: number[]) => void } }> };
    } | null;
    try {
      const materials = mv?.model?.materials ?? [];
      const fabric = materials.find((m) => (m.name || '').toLowerCase().includes('fabric')) ?? materials[0];
      fabric?.pbrMetallicRoughness?.setBaseColorFactor(FINISHES[i].rgba as unknown as number[]);
    } catch {
      // viewer not ready — price/UI still updates
    }
  }

  // DESIGN-SPEC §7.1 (SEAMLESS POSTER RULE): the loaded model must match the
  // poster with NO color pop. The default active finish (FINISHES[0], Coral) IS
  // the model's own native material, so we do NOT override the material on load
  // — the live viewer renders the native finish the poster already shows, and
  // the active-swatch indicator (Coral) agrees with it. Clicking any OTHER
  // swatch changes the material on user action.

  function selectFinish(i: number) {
    setActive(i);
    applyMaterial(i);
    const target = FINISHES[i].price;
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
      setDisplayPrice(target);
      return;
    }
    if (tickRef.current) cancelAnimationFrame(tickRef.current);
    const from = displayPrice;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / 400);
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
    <div className={className}>
      <div
        className={`relative ${aspect} rounded-lg overflow-hidden border ${
          onDark ? 'bg-paper/[0.04] border-paper/15' : 'bg-tint border-foreground/10'
        }`}
      >
        {live ? (
          <model-viewer
            ref={(el: HTMLElement | null) => {
              mvRef.current = el;
            }}
            src={MODEL_SRC}
            poster={POSTER_SRC}
            alt={`Interactive 3D ${modelLabel} demo — ${meta.verb.toLowerCase()}`}
            camera-controls
            {...(mode === 'viewer' ? { 'auto-rotate': true, 'auto-rotate-delay': '600', 'rotation-per-second': '18deg' } : {})}
            {...(mode === 'ar' ? { ar: true, 'ar-modes': 'webxr scene-viewer quick-look' } : {})}
            interaction-prompt="none"
            shadow-intensity="0.6"
            exposure="1.05"
            style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
          />
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={POSTER_SRC}
              alt={`3D ${modelLabel} — activate to interact`}
              width={640}
              height={480}
              loading={priority ? 'eager' : 'lazy'}
              // fetchPriority high only for the hero LCP poster (§10).
              fetchPriority={priority ? 'high' : 'auto'}
              decoding="async"
              className="w-full h-full object-contain"
            />
            <button
              type="button"
              onClick={activate}
              onMouseEnter={() => {
                // Warm the module on hover so the click is instant (§10).
                import('@google/model-viewer').catch(() => {});
              }}
              className="absolute inset-0 flex items-end justify-center pb-5 group focus-visible:outline-none"
              aria-label={`${meta.verb} — loads the live 3D demo`}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-contrast text-sm font-semibold px-4 py-2.5 shadow-lg transition-micro group-hover:bg-primary-deep group-focus-visible:ring-2 group-focus-visible:ring-accent group-focus-visible:ring-offset-2">
                {loading ? (
                  <span className="tt-mono">Loading…</span>
                ) : (
                  <>
                    <meta.icon className="w-4 h-4" strokeWidth={1.75} aria-hidden />
                    {meta.verb}
                  </>
                )}
              </span>
            </button>
          </>
        )}
      </div>

      {/* Configurator controls — only meaningful once live */}
      {mode === 'configurator' && live && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5" role="radiogroup" aria-label="Finish">
            {FINISHES.map((f, i) => (
              <button
                key={f.name}
                type="button"
                role="radio"
                aria-checked={active === i}
                aria-label={`${f.name} finish`}
                onClick={() => selectFinish(i)}
                className={`relative w-8 h-8 rounded-full border-2 transition-micro ${
                  active === i ? 'border-primary scale-110' : 'border-foreground/20 hover:border-foreground/40'
                }`}
                style={{ backgroundColor: f.swatch }}
              >
                {active === i && (
                  <span aria-hidden className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary" />
                )}
              </button>
            ))}
            <span className={`text-sm ml-1 ${onDark ? 'text-muted-dark' : 'text-foreground/60'}`}>
              {FINISHES[active].name}
            </span>
          </div>
          <p className={`tt-mono text-lg ${onDark ? 'text-paper' : 'text-foreground'}`} aria-live="polite">
            ${displayPrice.toLocaleString('en-US')}
          </p>
        </div>
      )}

      {/* AR controls — only meaningful once live */}
      {mode === 'ar' && live && (
        <div className="mt-4 flex items-center gap-3">
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
                className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-full border transition-micro ${
                  onDark ? 'border-primary/40 text-paper hover:bg-primary/10' : 'border-primary/40 text-foreground hover:bg-primary/10'
                }`}
                aria-expanded={qrOpen}
              >
                <span aria-hidden className="w-2 h-2 rounded-full bg-primary" />
                Scan for AR
              </button>
              {qrOpen && (
                <div className="absolute bottom-full left-0 mb-3 p-4 glass-card w-44 text-center z-10">
                  {/* Real, scannable QR — deep-links to the model's AR view
                      (Google scene-viewer intent for the demo GLB). Scanning it
                      launches AR on a phone. Regenerate per model when real
                      client models land (docs/ASSET-DEBT.md #10). */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/models/ar-qr-chair.svg"
                    alt="QR code — scan to view this product in AR on your phone"
                    width={128}
                    height={128}
                    className="w-32 h-32 mx-auto rounded-md bg-white p-1.5"
                  />
                  <p className={`mt-2 text-xs ${onDark ? 'text-muted-dark' : 'text-foreground/60'}`}>
                    Scan to view in your room
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
