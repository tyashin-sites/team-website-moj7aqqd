'use client';

/**
 * Reveal / Stagger — scroll-triggered entrances, GSAP edition (luxury pass).
 *
 * Same public API as the original framer-motion version (delay, direction,
 * distance, className, as), so every existing call site upgrades in place.
 * Now driven by ScrollTrigger with the shared 'brand' ease: elements rise
 * and settle into focus (blur 6px → sharp), fire once at 88% viewport, and
 * clear their inline transform/filter on complete so CSS hover states
 * (.card lift etc.) keep working untouched afterwards.
 *
 * Reduced motion → no tween is ever created; server-rendered content simply
 * stays visible. Same for no-JS visitors (nothing is hidden pre-hydration).
 */

import { useRef, type ReactNode } from 'react';
import { gsap, useGSAP, reduced } from '@/components/motion/gsap';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  distance?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'header' | 'span' | 'li';
}

const offsetFor = (dir: Direction, dist: number) => {
  switch (dir) {
    case 'up': return { y: dist };
    case 'down': return { y: -dist };
    case 'left': return { x: dist };
    case 'right': return { x: -dist };
    default: return {};
  }
};

export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  distance = 24,
  className,
  as = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced()) return;
      gsap.from(el, {
        opacity: 0,
        filter: 'blur(6px)',
        ...offsetFor(direction, distance),
        duration: 0.9,
        delay,
        ease: 'brand',
        clearProps: 'filter,transform',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    },
    { scope: ref as React.RefObject<HTMLElement> }
  );

  const Tag = as as 'div';
  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {children}
    </Tag>
  );
}

interface StaggerProps {
  children: ReactNode;
  delay?: number;
  stagger?: number;
  className?: string;
  as?: 'div' | 'section' | 'ul' | 'ol';
}

/** Stagger — animates DIRECT children with an increasing delay. */
export function Stagger({
  children,
  delay = 0,
  stagger = 0.08,
  className,
  as = 'div',
}: StaggerProps) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced() || el.children.length === 0) return;
      gsap.from(el.children, {
        opacity: 0,
        y: 24,
        filter: 'blur(6px)',
        duration: 0.9,
        delay,
        stagger,
        ease: 'brand',
        clearProps: 'filter,transform',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    },
    { scope: ref as React.RefObject<HTMLElement> }
  );

  const Tag = as as 'div';
  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {children}
    </Tag>
  );
}
