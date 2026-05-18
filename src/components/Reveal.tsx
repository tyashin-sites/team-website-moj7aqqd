'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

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
  const reduced = useReducedMotion();
  const variants: Variants = reduced
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, ...offsetFor(direction, distance) },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
        },
      };

  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={variants}
    >
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

/** Stagger child Reveals — each direct Reveal child inherits an increasing delay. */
export function Stagger({
  children,
  delay = 0,
  stagger = 0.08,
  className,
  as = 'div',
}: StaggerProps) {
  const reduced = useReducedMotion();
  const container: Variants = {
    hidden: {},
    visible: {
      transition: reduced
        ? {}
        : { staggerChildren: stagger, delayChildren: delay },
    },
  };
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={container}
    >
      {children}
    </Tag>
  );
}
