/**
 * LegalDocument — shared layout for the /privacy and /terms pages.
 *
 * Keeps both legal pages on the design system (DESIGN-SPEC §7): eyebrow +
 * tt-display hero, then a single prose column capped at 65ch (§4) with tt-
 * namespace headings. Single point of change so the two pages never drift.
 *
 * NOTE (Phase 4): these are an honest Phase-2 baseline reflecting current data
 * practices only. BUILD-PLAN Phase 4 expands them into full GDPR/PIPEDA-aware
 * policies (data-subject request flows, lawful bases, sub-processor list,
 * cookie/consent handling) once the compliance inputs land.
 */
import type { ReactNode } from 'react';

export function LegalDocument({
  eyebrow,
  title,
  effectiveDate,
  children,
}: {
  eyebrow: string;
  title: string;
  effectiveDate: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-60" aria-hidden />
        <div className="container-x relative section pb-10 md:pb-14">
          <div className="max-w-3xl">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="tt-display text-foreground">{title}</h1>
            <p className="text-sm text-foreground/55">Effective date: {effectiveDate}</p>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          {/* Prose column — 65ch reading measure (§4). */}
          <div className="legal-prose max-w-[65ch] text-foreground/75 leading-relaxed">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}

/** A titled section within a legal document (tt-2 heading + body). */
export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12 first:mt-0">
      <h2 className="tt-2 text-foreground">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
