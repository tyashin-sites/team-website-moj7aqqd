'use client';

/**
 * ScrollFX — the sitewide declarative scroll-effects layer (luxury pass).
 *
 * Mounted once in the root layout. Scans the rendered page for data
 * attributes and wires GSAP ScrollTriggers to them, so SERVER components
 * get scroll choreography without becoming client components:
 *
 *   data-parallax="0.15"  → gentle vertical drift while the element's
 *                           parent traverses the viewport (scrubbed).
 *                           Positive = moves slower than the page (depth
 *                           behind), tuned for decorative glows/auroras
 *                           and soft panel offsets. Keep ≤ 0.2 — this is
 *                           atmosphere, not a theme-park ride.
 *   data-fx="rise"        → one-shot rise + blur-settle entrance at 88%.
 *   data-fx="draw"        → one-shot scaleX 0→1 draw for hairlines
 *                           (transform-origin from CSS; defaults left).
 *
 * Re-inits on every route change (usePathname dep + revertOnUpdate) and
 * refreshes trigger positions once the window fully loads (images/fonts
 * shift layout). Reduced motion → nothing is wired at all.
 */

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap, ScrollTrigger, useGSAP, reduced } from '@/components/motion/gsap';

export function ScrollFX() {
  const pathname = usePathname();

  useGSAP(
    () => {
      if (reduced()) return;

      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || '0.15');
        const travel = () => speed * Math.min(window.innerHeight, 900) * 0.5;
        gsap.fromTo(
          el,
          { y: () => -travel() },
          {
            y: () => travel(),
            ease: 'none',
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-fx="rise"]').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 28,
          filter: 'blur(6px)',
          duration: 1,
          ease: 'brand',
          clearProps: 'filter,transform',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-fx="draw"]').forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          duration: 1.2,
          ease: 'brand',
          clearProps: 'transform',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        });
      });
    },
    { dependencies: [pathname], revertOnUpdate: true }
  );

  // Trigger positions depend on late layout (images, fonts, 3D posters) —
  // re-measure once everything has loaded.
  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    if (document.readyState === 'complete') return;
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return null;
}
