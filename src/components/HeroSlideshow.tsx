'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export interface HeroSlide {
  number: string;
  title: string;
  subtitle: string;
}

interface HeroSlideshowProps {
  slides: HeroSlide[];
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Auto-rotation interval (ms). Pass 0 to disable auto-advance. */
  rotateMs?: number;
}

export function HeroSlideshow({
  slides,
  primaryCta,
  secondaryCta,
  rotateMs = 5000,
}: HeroSlideshowProps) {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  useEffect(() => {
    if (!rotateMs || total <= 1) return;
    const timer = setInterval(() => setCurrent((p) => (p + 1) % total), rotateMs);
    return () => clearInterval(timer);
  }, [rotateMs, total]);

  const next = () => setCurrent((p) => (p + 1) % total);
  const prev = () => setCurrent((p) => (p - 1 + total) % total);

  const slide = slides[current];

  return (
    <section className="relative min-h-[88vh] overflow-hidden pt-24 pb-20 bg-background">
      {/* Floating decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-primary/10 blur-sm"
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 right-20 w-28 h-28 rounded-full bg-accent/40 blur-md"
          animate={{ y: [0, 22, 0], x: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-24 h-24 rounded-full bg-primary/5 blur-sm"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-12 h-12 rounded-full bg-primary/15"
          animate={{ y: [0, -25, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container-x relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center min-h-[70vh]">
          {/* Left — copy */}
          <div className="lg:col-span-7 relative">
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3">
              <button
                onClick={prev}
                aria-label="Previous slide"
                className="p-2 rounded-full bg-surface border border-foreground/10 hover:bg-primary hover:text-primary-contrast transition-colors shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                aria-label="Next slide"
                className="p-2 rounded-full bg-surface border border-foreground/10 hover:bg-primary hover:text-primary-contrast transition-colors shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="pl-0 lg:pl-14">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="eyebrow" style={{ marginBottom: 16 }}>
                    {slide.number} / {String(total).padStart(2, '0')}
                  </span>
                  <h1 className="h-display text-foreground mt-2">{slide.title}</h1>
                  <p className="lead max-w-xl">{slide.subtitle}</p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link href={primaryCta.href} className="btn btn-primary text-base px-7 py-4">
                  {primaryCta.label}
                </Link>
                {secondaryCta && (
                  <Link href={secondaryCta.href} className="btn btn-ghost text-base px-7 py-4">
                    {secondaryCta.label}
                  </Link>
                )}
              </div>

              <div className="flex gap-2 mt-12">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === current ? 'w-12 bg-primary' : 'w-6 bg-foreground/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right — phone mockup */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="relative mx-auto max-w-sm"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="bg-surface rounded-[2.5rem] p-3 border border-foreground/10 shadow-xl">
                <div className="bg-background rounded-[2rem] overflow-hidden aspect-[9/16] flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-16 h-16 text-primary"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
                        <polyline points="7.5 19.79 7.5 14.6 3 12" />
                        <polyline points="21 12 16.5 14.6 16.5 19.79" />
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                        <line x1="12" y1="22.08" x2="12" y2="12" />
                      </svg>
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                      3D Product View
                    </h3>
                    <p className="text-sm text-foreground/65">
                      Rotate, zoom &amp; explore in full 360°
                    </p>
                    <div className="mt-6 flex justify-center gap-3">
                      <span className="px-3 py-1 bg-foreground/8 rounded-full text-xs font-medium">
                        2D Images
                      </span>
                      <span className="px-3 py-1 bg-primary text-primary-contrast rounded-full text-xs font-medium">
                        3D 360° View
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -left-3 top-1/4 bg-surface rounded-xl p-3 border border-foreground/10 shadow-lg"
              animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="text-2xl" aria-hidden>
                🎨
              </span>
            </motion.div>
            <motion.div
              className="absolute -right-3 bottom-1/4 bg-surface rounded-xl p-3 border border-foreground/10 shadow-lg"
              animate={{ y: [0, 10, 0], rotate: [0, -2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <span className="text-2xl" aria-hidden>
                ✨
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
