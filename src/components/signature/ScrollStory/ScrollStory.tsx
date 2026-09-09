'use client';

/**
 * ScrollStory — the signature scroll-driven 3D story (homepage).
 *
 * The flagship product stays pinned while scrolling advances a narrative
 * through the four pipeline beats (Configure → Live price → Instant quote →
 * BOM to factory): the camera orbits, the finish swaps, the price ticks, a
 * quote assembles, and part callouts land on the model with their BOM codes.
 *
 * Three renderings of the same markup, chosen with gsap.matchMedia:
 *  - Desktop (≥1024px, motion OK): ScrollTrigger PIN + SCRUB. One timeline,
 *    one beat per unit of time; camera + copy panels + rail are scrubbed,
 *    finish/callout state flips through scrub-safe callbacks (same pattern
 *    as PipelineStrip's chips).
 *  - Mobile / tablet (motion OK): NO pin. The stage is CSS-sticky and the
 *    panels scroll beneath it; each panel entering the reading line tweens
 *    the camera to that beat's pose (brand ease) and applies its state.
 *  - Reduced motion: nothing is wired — stage + stacked panels, poster only.
 *
 * Animated properties are transform/opacity only; the camera is driven
 * through the SceneBackend seam (backend.ts), never the viewer element.
 */

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, reduced } from '@/components/motion/gsap';
import {
  BEATS,
  BOM,
  CALLOUTS,
  FINISHES,
  INITIAL_STATE,
  QUOTE,
  START_POSE,
  type Beat,
  type CameraPose,
  type SceneState,
} from './beats';
import type { BackendKind, SceneBackend } from './backend';
import { StoryStage } from './StoryStage';

/** Scroll distance the desktop scene stays pinned for (per beat ≈ 80vh). */
const PIN_LENGTH = '+=320%';

const formatPrice = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`;

export function ScrollStory({ backend = 'model-viewer' }: { backend?: BackendKind }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const backendRef = useRef<SceneBackend | null>(null);
  const camRef = useRef<CameraPose>({ ...START_POSE });
  const stateRef = useRef<SceneState>(INITIAL_STATE);

  const applyCamera = () => backendRef.current?.setCamera(camRef.current);

  /** Push a beat's product state to the viewer + the copy widgets. */
  const applyState = (state: SceneState, { withPrice }: { withPrice: boolean }) => {
    stateRef.current = state;
    backendRef.current?.setVariant(state.variant);
    const section = sectionRef.current;
    if (stageRef.current) stageRef.current.dataset.callouts = state.callouts ? 'on' : 'off';
    if (!section) return;
    const finish = FINISHES.find((f) => f.variant === state.variant) ?? FINISHES[0];
    section.querySelectorAll<HTMLElement>('[data-swatch]').forEach((el) => {
      el.classList.toggle('is-active', el.dataset.swatch === finish.variant);
    });
    section.querySelectorAll<HTMLElement>('[data-story-finish]').forEach((el) => {
      el.textContent = finish.name;
    });
    section.querySelectorAll<HTMLElement>('[data-story-frame]').forEach((el) => {
      el.textContent = finish.frame;
    });
    if (withPrice) {
      const priceEl = section.querySelector<HTMLElement>('[data-story-price]');
      if (priceEl) priceEl.textContent = formatPrice(state.price);
    }
  };

  const onBackend = (b: SceneBackend | null) => {
    backendRef.current = b;
    if (!b) return;
    b.setVariant(stateRef.current.variant);
    // Reveal at the pose the reader has scrolled to, not the poster's.
    void b.whenReady().then(() => backendRef.current === b && applyCamera());
  };

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      const panels = gsap.utils.toArray<HTMLElement>('.story-panel', section);
      const priceEl = section.querySelector<HTMLElement>('[data-story-price]');
      const cam = camRef.current;
      const price = { value: INITIAL_STATE.price };
      const writePrice = () => {
        if (priceEl) priceEl.textContent = formatPrice(price.value);
      };

      // Static fallback: initial product state, panels stacked (CSS), no
      // scroll coupling of any kind.
      if (reduced()) {
        applyState(INITIAL_STATE, { withPrice: true });
        return;
      }

      const reset = () => {
        Object.assign(cam, START_POSE);
        applyCamera();
        price.value = INITIAL_STATE.price;
        writePrice();
        applyState(INITIAL_STATE, { withPrice: false });
      };

      const buildPinned = () => {
        const rail = section.querySelector<HTMLElement>('.story-rail-fill');
        const steps = gsap.utils.toArray<HTMLElement>('.story-rail-step', section);

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: PIN_LENGTH,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        if (rail) tl.fromTo(rail, { scaleX: 0 }, { scaleX: 1, duration: BEATS.length }, 0);

        BEATS.forEach((beat: Beat, i) => {
          const t0 = i;
          // Camera: continuous, scrubbed, pushed through the backend seam.
          tl.fromTo(cam, { ...beat.camera.from }, { ...beat.camera.to, duration: 1, onUpdate: applyCamera }, t0);

          // Copy panel: rise in, hold, drift out (the last one stays).
          const panel = panels[i];
          if (panel) {
            if (i > 0) tl.fromTo(panel, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.2, ease: 'brand' }, t0);
            if (i < BEATS.length - 1) tl.to(panel, { opacity: 0, y: -22, duration: 0.14, ease: 'brand' }, t0 + 0.84);
          }
          if (steps[i]) tl.to(steps[i], { opacity: 1, duration: 0.08 }, t0);

          // Product state flips mid-beat. Scrub-safe: re-evaluated in both
          // directions by comparing the playhead to the label.
          const at = t0 + 0.5;
          const prev = i > 0 ? BEATS[i - 1].state : INITIAL_STATE;
          tl.add(() => applyState(tl.time() >= at ? beat.state : prev, { withPrice: false }), at);
        });

        // Live price ticks up through the second beat.
        tl.fromTo(
          price,
          { value: BEATS[0].state.price },
          { value: BEATS[1].state.price, duration: 0.5, onUpdate: writePrice },
          1.15,
        );
      };

      const buildStacked = () => {
        const goTo = (i: number) => {
          const target = i < 0 ? START_POSE : BEATS[i].camera.to;
          const state = i < 0 ? INITIAL_STATE : BEATS[i].state;
          gsap.to(cam, { ...target, duration: 1.4, ease: 'brand', overwrite: 'auto', onUpdate: applyCamera });
          gsap.to(price, { value: state.price, duration: 0.8, ease: 'brand', overwrite: 'auto', onUpdate: writePrice });
          applyState(state, { withPrice: false });
        };
        panels.forEach((panel, i) => {
          gsap.from(panel, {
            opacity: 0,
            y: 24,
            duration: 0.9,
            ease: 'brand',
            clearProps: 'transform',
            scrollTrigger: { trigger: panel, start: 'top 88%', once: true },
          });
          ScrollTrigger.create({
            trigger: panel,
            start: 'top 58%',
            end: 'bottom 58%',
            onToggle: (self) => self.isActive && goTo(i),
            onLeaveBack: () => i === 0 && goTo(-1),
          });
        });
      };

      // matchMedia is created inside the useGSAP context, so it is reverted
      // (and rebuilt on breakpoint changes) with the component.
      const mm = gsap.matchMedia();
      mm.add({ desktop: '(min-width: 1024px)', mobile: '(max-width: 1023.98px)' }, (ctx) => {
        reset();
        const { desktop } = ctx.conditions as { desktop: boolean };
        if (desktop) buildPinned();
        else buildStacked();
      });
    },
    { scope: sectionRef as React.RefObject<HTMLElement> },
  );

  return (
    <section
      ref={sectionRef}
      // No overflow-hidden here: it would turn the section into the sticky
      // stage's containing scrollport and stop it sticking to the viewport.
      className="scroll-story on-dark bg-ink text-paper relative"
      aria-labelledby="scroll-story-title"
    >
      <div className="story-frame container-x">
        <div className="story-head">
          <p className="eyebrow">From click to factory floor</p>
          <h2 id="scroll-story-title" className="tt-1 text-paper">
            One continuous pipeline.
          </h2>
        </div>

        <div className="story-grid">
          <div className="story-stage-col">
            <StoryStage rootRef={stageRef} backend={backend} onBackend={onBackend} />
          </div>

          <div className="story-copy-col">
            {/* Progress rail (desktop, pinned mode only — CSS) */}
            <ol className="story-rail" aria-hidden>
              <li className="story-rail-track">
                <span className="story-rail-fill" />
              </li>
              {BEATS.map((b) => (
                <li key={b.id} className="story-rail-step tt-mono">
                  {b.step}
                </li>
              ))}
            </ol>

            <div className="story-panels">
              {BEATS.map((beat) => (
                <article key={beat.id} className="story-panel" data-beat={beat.id}>
                  <p className="tt-mono text-primary-soft mb-4">
                    {beat.step} <span className="text-muted-dark">/ {beat.title}</span>
                  </p>
                  <h3 className="tt-2 text-paper">{beat.copy}</h3>
                  <p className="text-muted-dark max-w-md leading-relaxed">{beat.detail}</p>
                  <div className="mt-8">{renderWidget(beat)}</div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** The small live widget under each beat's copy. Values are demo values. */
function renderWidget(beat: Beat) {
  switch (beat.id) {
    case 'configure':
      return (
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <ul className="flex items-center gap-3" aria-label="Finish">
            {FINISHES.map((f, i) => (
              <li
                key={f.variant}
                data-swatch={f.variant}
                className={`story-swatch ${i === 0 ? 'is-active' : ''}`}
                style={{ backgroundColor: f.swatch }}
                title={f.name}
              />
            ))}
          </ul>
          <p className="text-sm text-muted-dark">
            Finish · <span className="text-paper" data-story-finish>{FINISHES[0].name}</span>
          </p>
          <p className="text-sm text-muted-dark">
            Frame · <span className="text-paper" data-story-frame>{FINISHES[0].frame}</span>
          </p>
        </div>
      );
    case 'price':
      return (
        <div className="flex items-baseline gap-4">
          <p className="font-mono tabular-nums text-4xl md:text-5xl text-paper" data-story-price aria-live="off">
            {formatPrice(INITIAL_STATE.price)}
          </p>
          <p className="text-sm text-muted-dark">
            incl. <span className="text-paper">+$80</span> Peacock velvet
          </p>
        </div>
      );
    case 'quote':
      return (
        <div className="glass-card p-5 max-w-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="tt-mono text-primary-soft">Quote {QUOTE.ref}</span>
            <span className="tt-mono text-muted-dark">ready to sign</span>
          </div>
          <dl className="divide-y divide-paper/10">
            {QUOTE.lines.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-2 text-sm">
                <dt className="text-muted-dark">{k}</dt>
                <dd className="tt-mono text-paper">{v}</dd>
              </div>
            ))}
            <div className="flex justify-between gap-4 pt-3 text-sm font-medium">
              <dt className="text-paper">Total</dt>
              <dd className="tt-mono text-paper">{QUOTE.total}</dd>
            </div>
          </dl>
        </div>
      );
    case 'bom':
      return (
        <div className="glass-card p-5 max-w-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="tt-mono text-primary-soft">BOM · {QUOTE.ref}</span>
            <span className="tt-mono text-muted-dark">→ factory</span>
          </div>
          <ul className="divide-y divide-paper/10">
            {BOM.map((row) => {
              const called = CALLOUTS.some((c) => c.code === row.code);
              return (
                <li key={row.code} className="flex items-center gap-3 py-2 text-sm">
                  <span className="tt-mono text-paper w-28 shrink-0">{row.code}</span>
                  <span className={`flex-1 ${called ? 'text-paper' : 'text-muted-dark'}`}>{row.part}</span>
                  <span className="tt-mono text-muted-dark">{row.qty}</span>
                </li>
              );
            })}
          </ul>
        </div>
      );
  }
}
