/**
 * VerticalCard — DESIGN-SPEC §7.5. THE industry card, shared by the home
 * verticals grid and the /industries hub so both read identically:
 * the vertical's real product render (Industry.hubArt — an animated WebP
 * turntable / sway / variant switch, with a still for reduced motion) on a
 * soft brand-light field, the icon chip (48px, teal/10 → solid teal on
 * hover), the vertical name, its 1-line pain, an optional REAL metric, and
 * an "Explore" affordance.
 *
 * No-Faking rule: `metric` renders only when a real, sourced number is
 * provided — per-vertical metrics are NOT invented (docs/ASSET-DEBT.md #12);
 * `art` renders only when a real product render exists.
 * Server component; hover states are pure CSS (group-hover).
 */

import Link from 'next/link';
import {
  ArrowRight,
  Sofa,
  ChefHat,
  DoorOpen,
  Warehouse,
  Wrench,
  Layers,
  type LucideIcon,
} from 'lucide-react';
import type { Industry } from '@/lib/industries';

// Industry icon key → lucide icon (the one place this mapping lives).
const INDUSTRY_ICON: Record<Industry['icon'], LucideIcon> = {
  sofa: Sofa,
  kitchen: ChefHat,
  door: DoorOpen,
  prefab: Warehouse,
  machinery: Wrench,
  laminate: Layers,
};

export type VerticalCardProps = {
  /** An industry icon key (preferred) or a lucide icon component. */
  icon: Industry['icon'] | LucideIcon;
  name: string;
  /** 1-line pain, in the vertical's vocabulary (DESIGN-SPEC §7.5). */
  pain: string;
  /** One REAL metric, e.g. "75% lower product returns". Optional until sourced. */
  metric?: string;
  /** The vertical's real product render (Industry.hubArt). */
  art?: Industry['hubArt'];
  href?: string;
  className?: string;
};

export function VerticalCard({
  icon,
  name,
  pain,
  metric,
  art,
  href = '/industries',
  className = '',
}: VerticalCardProps) {
  const Icon = typeof icon === 'string' ? INDUSTRY_ICON[icon] : icon;
  return (
    <Link
      href={href}
      className={`group card p-7 md:p-8 flex flex-col h-full hover:-translate-y-1 transition-ui overflow-hidden ${className}`}
    >
      <span className="relative flex items-end justify-between mb-6 min-h-12">
        {/* Icon chip — 48px rounded-xl, teal/10 → solid teal on hover (§6) */}
        <span className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-contrast transition-colors duration-300">
          <Icon className="w-6 h-6" strokeWidth={1.5} aria-hidden />
        </span>
        {art && (
          <span className="relative w-36 h-36 -mr-5 -mt-5 shrink-0">
            <span
              className="absolute inset-3 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/15 transition-colors"
              aria-hidden
            />
            <picture>
              <source srcSet={art.still} media="(prefers-reduced-motion: reduce)" />
              <img
                src={art.turn}
                alt={art.alt}
                width={480}
                height={480}
                loading="lazy"
                decoding="async"
                className="relative w-full h-full object-contain drop-shadow-lg transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.03]"
              />
            </picture>
          </span>
        )}
      </span>
      <h3 className="font-heading text-xl md:text-2xl font-medium tracking-tight mb-2 group-hover:text-primary transition-colors">
        {name}
      </h3>
      <p className="text-sm md:text-base text-foreground/70 leading-relaxed flex-1">{pain}</p>
      {metric && <p className="mt-4 tt-mono text-primary font-medium">{metric}</p>}
      <span className="mt-5 self-start inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
        Explore {name}
        <ArrowRight
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden
        />
      </span>
    </Link>
  );
}
