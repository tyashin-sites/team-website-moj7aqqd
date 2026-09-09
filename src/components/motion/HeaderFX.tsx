'use client';

/**
 * HeaderFX — toggles .is-scrolled on the sticky header once the page has
 * scrolled past the hero's first pixels. The visual change (height ease,
 * lifted shadow, denser glass) lives in globals.css; this only flips the
 * class. State-based, not motion-based, so it runs for reduced-motion
 * visitors too (the CSS transition is neutralized by the global
 * reduced-motion block).
 */

import { ScrollTrigger, useGSAP } from '@/components/motion/gsap';

export function HeaderFX() {
  useGSAP(() => {
    const header = document.querySelector<HTMLElement>('header.site-header');
    if (!header) return;
    ScrollTrigger.create({
      start: 12,
      end: 'max',
      onToggle: (self) => header.classList.toggle('is-scrolled', self.isActive),
    });
  });
  return null;
}
