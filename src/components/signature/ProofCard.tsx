import { Quote } from 'lucide-react';

/**
 * ProofCard — DESIGN-SPEC §7.6. REAL customer quotes only (No-Faking rule),
 * captured verbatim from production thridify.com (user-confirmed 2026-07-24).
 * Attribution is company-level ("— Guntier"), exactly as production does —
 * never invented person names.
 */
export function ProofCard({ quote, company }: { quote: string; company: string }) {
  return (
    <figure className="card p-8 h-full flex flex-col">
      <span
        className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary"
        aria-hidden
      >
        <Quote className="w-6 h-6" strokeWidth={1.5} />
      </span>
      <blockquote className="mt-5 text-lg leading-relaxed text-foreground/85 flex-1">
        “{quote}”
      </blockquote>
      <figcaption className="mt-6 font-mono text-sm text-foreground/60">— {company}</figcaption>
    </figure>
  );
}
