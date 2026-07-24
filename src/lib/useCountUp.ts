'use client';

/**
 * useCountUp — the ONE counter implementation (DESIGN-SPEC §5):
 * count-up over 1.4s ease-out (cubic), fires when `run` flips true.
 * `prefers-reduced-motion: reduce` → the final value is shown immediately,
 * no animation. Shared by MetricBar and ImpactBlock so the two counters on
 * one page can never disagree again (design-audit M-3).
 */

import { useEffect, useState } from 'react';

export const COUNT_UP_DURATION_MS = 1400;

export function useCountUp(target: number, run: boolean, durationMs = COUNT_UP_DURATION_MS): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, target, durationMs]);

  return value;
}
