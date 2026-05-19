'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export interface ImpactStat {
  value: number;
  suffix: string;
  label: string;
}

export interface ClientLogo {
  name: string;
  initials: string;
}

interface AnimatedCounterProps {
  value: number;
  suffix: string;
  isVisible: boolean;
}

function AnimatedCounter({ value, suffix, isVisible }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value, isVisible]);

  return (
    <span className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight">
      {count}
      <span className="text-primary">{suffix}</span>
    </span>
  );
}

interface ImpactBlockProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  stats: ImpactStat[];
  logos: ClientLogo[];
}

export function ImpactBlock({
  eyebrow = 'The Thridify Impact',
  title,
  highlight,
  subtitle,
  stats,
  logos,
}: ImpactBlockProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Render the title with `highlight` colored in primary if it appears in the title string.
  const renderTitle = () => {
    if (!highlight || !title.includes(highlight)) return title;
    const [before, after] = title.split(highlight);
    return (
      <>
        {before}
        <span className="text-primary">{highlight}</span>
        {after}
      </>
    );
  };

  return (
    <section className="section bg-surface/40 relative overflow-hidden">
      <div className="container-x">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-primary text-primary-contrast rounded-full text-sm font-medium mb-5">
            {eyebrow}
          </span>
          <h2 className="h-1 text-foreground">{renderTitle()}</h2>
          {subtitle && <p className="lead">{subtitle}</p>}
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} isVisible={isInView} />
              <p className="mt-3 text-foreground/65 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Client logo marquee */}
        {logos.length > 0 && (
          <motion.div
            className="relative overflow-hidden py-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="flex animate-marquee w-max">
              {/* Duplicate the array several times so the loop is seamless. */}
              {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 mx-6 px-7 py-4 bg-background rounded-xl border border-foreground/8 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                      {logo.initials}
                    </div>
                    <span className="font-semibold text-foreground whitespace-nowrap">
                      {logo.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
