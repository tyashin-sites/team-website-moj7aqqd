'use client';

/**
 * MetricBar — DESIGN-SPEC §7.2. Sits directly under the hero:
 * 30% fewer returns · 3× faster close · 65% less rework · +23% recovery.
 * Count-up over 1.4s ease-out when scrolled into view, once. Mono font,
 * exactly ONE pink stat. Reduced motion → final values, no animation.
 */

import { useEffect, useRef, useState } from 'react';
import { useCountUp } from '@/lib/useCountUp';

export type Metric = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  /** Exactly one metric should set this — the pink "moment" stat. */
  pink?: boolean;
};

// Canonical metrics from DESIGN-SPEC §7.2.
const DEFAULT_METRICS: Metric[] = [
  { value: 30, suffix: '%', label: 'fewer returns' },
  { value: 3, suffix: '×', label: 'faster close' },
  { value: 65, suffix: '%', label: 'less rework' },
  { value: 23, prefix: '+', suffix: '%', label: 'recovery', pink: true },
];

function CountUp({ metric, run }: { metric: Metric; run: boolean }) {
  // Shared 1.4s ease-out counter (src/lib/useCountUp.ts) — reduced motion
  // shows the final value immediately.
  const display = useCountUp(metric.value, run);

  return (
    <span className="font-mono tabular-nums">
      {metric.prefix ?? ''}
      {display}
      {metric.suffix ?? ''}
    </span>
  );
}

export function MetricBar({ metrics = DEFAULT_METRICS }: { metrics?: Metric[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRun(true); // fires once
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Dark ink bar: canonical pink #FEBFCC only ever carries a large stat on
  // dark backgrounds (DESIGN-SPEC §9 contrast rule) — never body text and
  // never pink-on-light.
  return (
    <div ref={ref} className="bg-ink border-y border-paper/10">
      <dl className="container-x grid grid-cols-2 md:grid-cols-4 gap-y-8 py-10 md:py-12">
        {metrics.map((m) => (
          <div key={m.label} className="text-center md:text-left">
            <dt className="sr-only">{m.label}</dt>
            <dd
              className={`text-3xl md:text-4xl font-medium ${
                m.pink ? 'text-accent' : 'text-paper'
              }`}
            >
              <CountUp metric={m} run={run} />
            </dd>
            <p className="mt-1.5 text-sm text-muted-dark">{m.label}</p>
          </div>
        ))}
      </dl>
    </div>
  );
}
