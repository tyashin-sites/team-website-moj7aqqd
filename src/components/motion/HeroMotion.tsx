'use client';

/**
 * HeroMotion — the homepage hero's orchestrated entrance (luxury pass).
 *
 * Rendered as an invisible marker INSIDE the hero section; it finds the
 * stage via closest('[data-hero-stage]') and choreographs the elements
 * tagged data-hero="eyebrow|title|lead|ctas|demo".
 *
 * LCP LAW (learned from a 13s lab LCP): the h1 IS this page's LCP element
 * (the demo frame renders nothing server-side — the viewer SDK owns its
 * poster). An element that is ever opacity-0/masked stops counting as
 * painted, and every re-paint stamps a NEW, later LCP candidate. So the
 * headline and the demo frame animate TRANSFORM-ONLY — visible from first
 * paint, they merely settle into place. Opacity intros are reserved for
 * the small elements (eyebrow, lead, CTAs) that can never be the LCP.
 * The masked SplitText word reveal lives below the fold instead
 * (ScrollFX's data-fx="words", used by the CTA band).
 *
 * Reduced motion → the server-rendered hero stays exactly as painted.
 */

import { useRef } from 'react';
import { gsap, useGSAP, reduced } from '@/components/motion/gsap';

export function HeroMotion() {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const stage = ref.current?.closest<HTMLElement>('[data-hero-stage]');
      if (!stage || reduced()) return;
      const q = (name: string) => stage.querySelector<HTMLElement>(`[data-hero="${name}"]`);
      const eyebrow = q('eyebrow');
      const title = q('title');
      const lead = q('lead');
      const ctas = q('ctas');
      const demo = q('demo');
      if (!title) return;

      const tl = gsap.timeline({ defaults: { ease: 'brand' } });
      if (eyebrow) tl.from(eyebrow, { opacity: 0, y: 14, duration: 0.6 }, 0);
      // Transform-only — the headline is never hidden (LCP LAW above).
      tl.from(title, { y: 26, duration: 1.0, clearProps: 'transform' }, 0.05);
      if (lead)
        tl.from(
          lead,
          { opacity: 0, y: 20, filter: 'blur(6px)', duration: 0.8, clearProps: 'filter,transform' },
          0.45
        );
      if (ctas && ctas.children.length > 0)
        tl.from(
          ctas.children,
          { opacity: 0, y: 18, duration: 0.7, stagger: 0.08, clearProps: 'transform' },
          0.6
        );
      // Transform-only for the demo frame too (it hosts the future poster).
      if (demo)
        tl.from(demo, { y: 28, scale: 0.965, duration: 1.1, clearProps: 'transform' }, 0.3);

      // Scrubbed depth: the demo frame drifts up slightly slower than the
      // page while the hero leaves the viewport.
      if (demo)
        gsap.to(demo, {
          y: -30,
          ease: 'none',
          scrollTrigger: { trigger: stage, start: 'top top', end: 'bottom top', scrub: 0.8 },
        });
    },
    { scope: ref as React.RefObject<HTMLElement> }
  );

  return <span ref={ref} hidden aria-hidden />;
}
