'use client';

/**
 * Route transition (luxury pass) — every client-side navigation eases the
 * incoming page up and into focus (500ms, brand ease). template.tsx
 * remounts per navigation, which is exactly what retriggers the tween.
 * Reduced motion / first server paint → content renders as-is.
 */

import { useRef, type ReactNode } from 'react';
import { gsap, useGSAP, reduced } from '@/components/motion/gsap';

export default function Template({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current || reduced()) return;
      gsap.from(ref.current, {
        opacity: 0,
        y: 14,
        duration: 0.5,
        ease: 'brand',
        clearProps: 'all',
      });
    },
    { scope: ref as React.RefObject<HTMLElement> }
  );

  return <div ref={ref}>{children}</div>;
}
