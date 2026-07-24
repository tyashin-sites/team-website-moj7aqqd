/**
 * VerticalCard — DESIGN-SPEC §7.5. One card per industry vertical:
 * icon chip (48px, primary/10 teal → solid teal + white icon on hover),
 * vertical name, 1-line pain in the vertical's vocabulary, one metric,
 * and an "Explore →" affordance that slides in on hover.
 *
 * No-Faking rule: `metric` renders only when a real, sourced number is
 * provided — per-vertical metrics are NOT invented (docs/ASSET-DEBT.md #12).
 * Server component; hover states are pure CSS (group-hover).
 */

import Link from 'next/link';
import { ArrowRight, type LucideIcon } from 'lucide-react';

export type VerticalCardProps = {
  icon: LucideIcon;
  name: string;
  /** 1-line pain, in the vertical's vocabulary (DESIGN-SPEC §7.5). */
  pain: string;
  /** One REAL metric, e.g. "75% lower product returns". Optional until sourced. */
  metric?: string;
  href?: string;
  className?: string;
};

export function VerticalCard({
  icon: Icon,
  name,
  pain,
  metric,
  href = '/industries',
  className = '',
}: VerticalCardProps) {
  return (
    <Link
      href={href}
      className={`group relative block rounded-lg border border-foreground/10 bg-surface/40 p-7 transition-ui hover:bg-surface hover:-translate-y-1 hover:shadow-lg hover:border-primary/20 overflow-hidden ${className}`}
    >
      {/* decorative blob */}
      <div
        className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500"
        aria-hidden
      />
      <div className="relative">
        {/* Icon chip — 48px rounded-xl, teal/10 → solid teal on hover (§6) */}
        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-contrast transition-colors duration-300">
          <Icon className="w-6 h-6" strokeWidth={1.5} />
        </div>
        <h3 className="font-heading text-lg font-semibold tracking-tight mb-2">{name}</h3>
        <p className="text-sm text-foreground/65 leading-relaxed">{pain}</p>
        {metric && (
          <p className="mt-4 tt-mono text-primary font-medium">{metric}</p>
        )}
        {/* "Explore →" slide-in on hover (§7.5) */}
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          Explore <ArrowRight className="w-4 h-4" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
