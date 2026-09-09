'use client';

/**
 * StoryStage — the product frame inside the ScrollStory.
 *
 * Poster-first, exactly like HeroObject (§6a/§10): the seamless poster
 * <img> paints immediately (fixed-size box → no CLS); the model-viewer
 * library + GLB only load once the stage comes within ~900px of the
 * viewport, after `window.load`, and never in lite mode (reduced motion /
 * Save-Data), where the poster simply stays. On the model's `load` the
 * poster cross-fades out under the live canvas (the model reveals at the
 * poster's own pose, so the swap is silent).
 *
 * The stage hands its SceneBackend to the story via `onBackend`; the story
 * never touches the viewer element. Part callouts are model-viewer hotspots
 * (positioned in model space by the viewer) and are shown/hidden with the
 * `data-callouts` attribute the story toggles on the stage root.
 */

import { useEffect, useRef, useState } from 'react';
import type React from 'react';
import { CALLOUTS, START_POSE } from './beats';
import { createModelViewerBackend, createThridifyViewBackend, type BackendKind, type SceneBackend } from './backend';

const MODEL_SRC = '/models/sheen-chair.glb';
const POSTER_SRC = '/models/sheen-chair-poster.webp';

function isLiteMode(): boolean {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const conn = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
  return reducedMotion || !!conn?.saveData;
}

/**
 * Resolve once a `model-viewer` element is registered. The Thridify viewer
 * runtime (mviewer.js, loaded by the live embeds elsewhere on the page)
 * bundles and registers model-viewer itself, and a second registration
 * throws — in whichever bundle defines it last. So when that runtime is on
 * the page, wait for ITS definition rather than racing it with ours; only
 * import @google/model-viewer on pages without it.
 */
function ensureModelViewer(): Promise<void> {
  if (customElements.get('model-viewer')) return Promise.resolve();
  if (document.querySelector('script[data-thridify-mviewer]')) {
    return customElements.whenDefined('model-viewer').then(() => undefined);
  }
  return import('@google/model-viewer')
    .then(() => undefined)
    .catch(() => {
      if (!customElements.get('model-viewer')) throw new Error('model-viewer unavailable');
    });
}

export function StoryStage({
  rootRef,
  backend = 'model-viewer',
  onBackend,
}: {
  rootRef: React.RefObject<HTMLDivElement | null>;
  backend?: BackendKind;
  onBackend: (backend: SceneBackend | null) => void;
}) {
  const [libReady, setLibReady] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const backendRef = useRef<SceneBackend | null>(null);

  // Lazy activation: library + model only when the stage approaches, after
  // the page has fully loaded, and not in lite mode.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || isLiteMode()) return;
    let cancelled = false;
    let io: IntersectionObserver | null = null;

    const arm = () => {
      if (cancelled) return;
      io = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          io?.disconnect();
          ensureModelViewer()
            .then(() => !cancelled && setLibReady(true))
            .catch(() => {});
        },
        { rootMargin: '900px 0px' },
      );
      io.observe(el);
    };
    if (document.readyState === 'complete') arm();
    else window.addEventListener('load', arm, { once: true });

    return () => {
      cancelled = true;
      io?.disconnect();
      window.removeEventListener('load', arm);
    };
  }, [rootRef]);

  // Ref callback: create the backend once the viewer element exists, reveal
  // on its `load`. React 19 calls it with null on unmount.
  function attach(el: HTMLElement | null) {
    if (!el) {
      backendRef.current?.dispose();
      backendRef.current = null;
      onBackend(null);
      return;
    }
    if (backendRef.current) return;
    const b = backend === 'thridify-view' ? createThridifyViewBackend(el) : createModelViewerBackend(el);
    backendRef.current = b;
    onBackend(b);
    void b.whenReady().then(() => {
      if (backendRef.current !== b) return;
      setRevealed(true);
      rootRef.current?.setAttribute('data-live', '1');
    });
  }

  return (
    <div
      ref={rootRef}
      className="story-stage relative rounded-lg overflow-hidden"
      data-live="0"
      data-callouts="off"
    >
      {/* Soft key light behind the product — atmosphere, not a surface. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(55% 45% at 50% 62%, rgba(0,112,80,0.28) 0%, rgba(0,112,80,0.06) 55%, transparent 75%)',
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={POSTER_SRC}
        alt="Lounge chair in mango velvet — the configured product"
        width={640}
        height={640}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-contain"
        style={{
          opacity: revealed ? 0 : 1,
          transition: 'opacity 400ms var(--ease-brand)',
          pointerEvents: 'none',
        }}
      />
      {libReady && (
        <model-viewer
          ref={attach}
          src={MODEL_SRC}
          alt="Lounge chair — the camera moves with the story as you scroll"
          loading="eager"
          reveal="auto"
          interaction-prompt="none"
          disable-zoom
          disable-pan
          disable-tap
          camera-orbit={`${START_POSE.theta}deg ${START_POSE.phi}deg ${START_POSE.radius}%`}
          shadow-intensity="0.7"
          shadow-softness="0.9"
          exposure="1.05"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            opacity: revealed ? 1 : 0,
            transition: 'opacity 400ms var(--ease-brand)',
            pointerEvents: 'none',
            // Hotspots facing away from the camera fade fully out.
            ['--min-hotspot-opacity' as string]: '0',
          }}
        >
          {CALLOUTS.map((c) => (
            <div
              key={c.id}
              slot={`hotspot-${c.id}`}
              data-position={c.position}
              data-normal={c.normal}
              className="story-callout"
              aria-hidden
            >
              <span className="story-callout-dot" />
              <span className="story-callout-label glass-card">
                <span className="tt-mono text-primary-soft">{c.code}</span>
                <span>{c.label}</span>
              </span>
            </div>
          ))}
        </model-viewer>
      )}
    </div>
  );
}
