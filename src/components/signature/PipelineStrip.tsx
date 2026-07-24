'use client';

/**
 * PipelineStrip — DESIGN-SPEC §7.4. Dark ink section with one continuous
 * SVG line drawing itself as the section scrolls through the viewport:
 * Configure → Live price → Instant quote → BOM to factory.
 * Each node is a glass card (icon + ≤10 words).
 * Reduced motion → line fully drawn, no scroll coupling.
 */

import { useEffect, useRef, useState } from 'react';
import { Sliders, BadgeDollarSign, FileText, Factory } from 'lucide-react';

const NODES = [
  { icon: Sliders, title: 'Configure', copy: 'Buyers build their exact product.' },
  { icon: BadgeDollarSign, title: 'Live price', copy: 'Every change reprices instantly.' },
  { icon: FileText, title: 'Instant quote', copy: 'A ready-to-sign quote, no waiting.' },
  { icon: Factory, title: 'BOM to factory', copy: 'Production specs flow straight through.' },
];

const PATH_LENGTH = 1000;

export function PipelineStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1);
      return;
    }
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the section top enters the viewport bottom,
      // 1 by the time the section middle passes the viewport middle.
      const raw = (vh - rect.top) / (vh * 0.9 + rect.height * 0.5);
      setProgress(Math.max(0, Math.min(1, raw)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="section bg-ink text-paper relative overflow-hidden">
      <div className="container-x relative">
        <p className="eyebrow">From click to factory floor</p>
        <h2 className="tt-1 text-paper">One continuous pipeline.</h2>

        <div className="relative mt-12">
          {/* The continuous line — drawn via stroke-dashoffset on scroll */}
          <svg
            className="absolute inset-x-0 top-10 hidden lg:block w-full h-10"
            viewBox="0 0 1000 40"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M0 20 C 150 20 180 8 250 8 S 400 32 500 32 S 700 8 750 8 S 900 20 1000 20"
              fill="none"
              stroke="#007050"
              strokeWidth="2"
              pathLength={PATH_LENGTH}
              strokeDasharray={PATH_LENGTH}
              strokeDashoffset={PATH_LENGTH * (1 - progress)}
            />
          </svg>

          <ol className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {NODES.map((n, i) => {
              const Icon = n.icon;
              const lit = progress >= (i + 1) / (NODES.length + 0.5);
              return (
                <li
                  key={n.title}
                  className="glass-card p-6 transition-ui"
                  style={{ opacity: lit ? 1 : 0.45 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-paper flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading font-medium text-lg">{n.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-dark">{n.copy}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
