'use client';

/**
 * HeroMotion — the homepage hero's orchestrated entrance (luxury pass).
 *
 * Rendered as an invisible marker INSIDE the hero section; it finds the
 * stage via closest('[data-hero-stage]') and choreographs the elements
 * tagged data-hero="eyebrow|title|lead|ctas|demo":
 *
 *   1. eyebrow fades up
 *   2. headline words rise out of per-word masks (SplitText), staggered
 *   3. lead settles into focus
 *   4. CTAs rise in sequence
 *   5. demo frame eases in from scale 0.965 — TRANSFORM ONLY, never
 *      opacity: the poster inside is the LCP element and must stay
 *      paintable from the first frame (DESIGN-SPEC §10)
 *
 * plus a gentle scrubbed drift of the demo frame as the hero scrolls away.
 *
 * Runs after document.fonts.ready so SplitText measures the real Space
 * Grotesk. The deferred work is registered via context.add(), so useGSAP
 * still reverts it on unmount. Reduced motion / SplitText failure → the
 * server-rendered hero stays exactly as painted.
 */

import { useRef } from 'react';
import { gsap, SplitText, useGSAP, reduced } from '@/components/motion/gsap';

export function HeroMotion() {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    (context) => {
      const stage = ref.current?.closest<HTMLElement>('[data-hero-stage]');
      if (!stage || reduced() || !context) return;
      const q = (name: string) => stage.querySelector<HTMLElement>(`[data-hero="${name}"]`);
      const eyebrow = q('eyebrow');
      const title = q('title');
      const lead = q('lead');
      const ctas = q('ctas');
      const demo = q('demo');
      if (!title) return;

      // context.add() runs the work inside this component's GSAP context even
      // though it fires later (after fonts load), so unmount still reverts it.
      const run = () => context.add(() => {
        let words: Element[] = [title];
        try {
          const split = new SplitText(title, {
            type: 'words',
            mask: 'words',
            wordsClass: 'hero-word',
          });
          if (split.words.length > 0) words = split.words;
        } catch {
          // SplitText unavailable → animate the whole headline as one block.
        }

        const tl = gsap.timeline({ defaults: { ease: 'brand' } });
        if (eyebrow) tl.from(eyebrow, { opacity: 0, y: 14, duration: 0.6 }, 0);
        tl.from(
          words,
          words.length > 1
            ? { yPercent: 115, duration: 0.9, stagger: 0.055 }
            : { opacity: 0, y: 24, duration: 0.9 },
          0.1
        );
        if (lead)
          tl.from(
            lead,
            { opacity: 0, y: 20, filter: 'blur(6px)', duration: 0.8, clearProps: 'filter,transform' },
            0.55
          );
        if (ctas && ctas.children.length > 0)
          tl.from(
            ctas.children,
            { opacity: 0, y: 18, duration: 0.7, stagger: 0.08, clearProps: 'transform' },
            0.7
          );
        if (demo)
          tl.from(demo, { y: 28, scale: 0.965, duration: 1.1, clearProps: 'transform' }, 0.35);

        // Scrubbed depth: the demo frame drifts up slightly slower than the
        // page while the hero leaves the viewport.
        if (demo)
          gsap.to(demo, {
            y: -30,
            ease: 'none',
            scrollTrigger: { trigger: stage, start: 'top top', end: 'bottom top', scrub: 0.8 },
          });
      });

      if (document.fonts?.ready) {
        document.fonts.ready.then(run);
      } else {
        run();
      }
    },
    { scope: ref as React.RefObject<HTMLElement> }
  );

  return <span ref={ref} hidden aria-hidden />;
}
