'use client';

/**
 * PipelineStrip — DESIGN-SPEC §7.4, GSAP edition (luxury pass). Dark ink
 * section with one continuous SVG line drawing itself as the section scrolls
 * through the viewport: Configure → Live price → Instant quote → BOM to
 * factory. Each node is a glass card (icon + ≤10 words).
 *
 * The draw is a ScrollTrigger-SCRUBBED timeline (smoothed, scrub: 0.6) —
 * the line advances with the reader and each node wakes (opacity 0.75 → 1,
 * y 14 → 0, icon chip tints teal) as the line reaches it, in sequence.
 *
 * A11y floor: unlit cards stay at opacity 0.75 so both the white heading
 * and the muted-dark label clear WCAG AA 4.5:1 in EVERY scroll state.
 * Reduced motion → line fully drawn, nodes fully lit, no scroll coupling.
 */

import { useRef } from 'react';
import { Sliders, BadgeDollarSign, FileText, Factory } from 'lucide-react';
import { gsap, useGSAP, reduced } from '@/components/motion/gsap';

const NODES = [
  { icon: Sliders, title: 'Configure', copy: 'Buyers build their exact product.' },
  { icon: BadgeDollarSign, title: 'Live price', copy: 'Every change reprices instantly.' },
  { icon: FileText, title: 'Instant quote', copy: 'A ready-to-sign quote, no waiting.' },
  { icon: Factory, title: 'BOM to factory', copy: 'Production specs flow straight through.' },
];

const PATH_LENGTH = 1000;

export function PipelineStrip() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      const path = section.querySelector<SVGPathElement>('.pipeline-path');
      const cards = gsap.utils.toArray<HTMLElement>('.pipeline-node', section);

      if (reduced()) {
        if (path) gsap.set(path, { strokeDashoffset: 0 });
        gsap.set(cards, { opacity: 1 });
        section.querySelectorAll('.pipeline-chip').forEach((c) => c.classList.add('is-lit'));
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'center 40%',
          scrub: 0.6,
        },
      });

      if (path) {
        tl.fromTo(
          path,
          { strokeDashoffset: PATH_LENGTH },
          { strokeDashoffset: 0, duration: 1 },
          0
        );
      }

      // Nodes wake in sequence as the line reaches them (¼ of the draw each).
      cards.forEach((card, i) => {
        const at = (i / cards.length) * 0.85;
        tl.fromTo(
          card,
          { opacity: 0.75, y: 14 },
          { opacity: 1, y: 0, duration: 0.18, ease: 'brand' },
          at
        );
        const chip = card.querySelector('.pipeline-chip');
        if (chip) {
          tl.add(() => {
            // Scrub-safe class flip: lights when the playhead passes, unlights
            // when the reader scrolls back up through it.
            chip.classList.toggle('is-lit', tl.time() >= at);
          }, at + 0.09);
        }
      });
    },
    { scope: sectionRef as React.RefObject<HTMLElement> }
  );

  return (
    <section ref={sectionRef} className="on-dark section bg-ink text-paper relative overflow-hidden">
      <div className="container-x relative">
        <p className="eyebrow">From click to factory floor</p>
        <h2 className="tt-1 text-paper">One continuous pipeline.</h2>

        <div className="relative mt-12">
          {/* The continuous line — drawn via stroke-dashoffset, scrubbed */}
          <svg
            className="absolute inset-x-0 top-10 hidden lg:block w-full h-10"
            viewBox="0 0 1000 40"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              className="pipeline-path"
              d="M0 20 C 150 20 180 8 250 8 S 400 32 500 32 S 700 8 750 8 S 900 20 1000 20"
              fill="none"
              stroke="#007050"
              strokeWidth="2"
              pathLength={PATH_LENGTH}
              strokeDasharray={PATH_LENGTH}
              strokeDashoffset={PATH_LENGTH}
            />
          </svg>

          <ol className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {NODES.map((n) => {
              const Icon = n.icon;
              return (
                <li
                  key={n.title}
                  // Unlit floor ≥0.75 (a11y — see header comment); GSAP owns
                  // the scroll-coupled wake.
                  className="pipeline-node glass-card p-6"
                  style={{ opacity: 0.75 }}
                >
                  <div className="pipeline-chip w-12 h-12 rounded-xl bg-primary/10 text-paper flex items-center justify-center mb-4">
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
