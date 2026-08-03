/**
 * LegalDocument — shared layout for the /privacy and /terms pages.
 *
 * Keeps both legal pages on the design system (DESIGN-SPEC §7): eyebrow +
 * tt-display hero, then a single prose column capped at 65ch (§4) with tt-
 * namespace headings. Single point of change so the two pages never drift.
 *
 * NOTE (Phase 4): these are honest, reviewable GDPR/DPDP/PIPEDA-aware
 * baselines reflecting the site's ACTUAL data practices. They are written to
 * be read by a lawyer before Phase-7 launch — any legal fact needing
 * confirmation is flagged in docs/ASSET-DEBT.md.
 */
import Link from 'next/link';
import type { ReactNode } from 'react';

export function LegalDocument({
  eyebrow,
  title,
  effectiveDate,
  breadcrumbLabel,
  children,
}: {
  eyebrow: string;
  title: string;
  effectiveDate: string;
  /** Short label for the visible breadcrumb trail (defaults to the title). */
  breadcrumbLabel?: string;
  children: ReactNode;
}) {
  return (
    <>
      {/* Visible breadcrumb (JSON-LD BreadcrumbList lives in the page). */}
      <nav aria-label="Breadcrumb" className="container-x pt-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-foreground/70">
          <li>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-foreground/80" aria-current="page">
            {breadcrumbLabel ?? title}
          </li>
        </ol>
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-60" aria-hidden />
        <div className="container-x relative section pt-12 pb-10 md:pb-14">
          <div className="max-w-3xl">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="tt-display text-foreground">{title}</h1>
            <p className="text-sm text-foreground/70">Effective date: {effectiveDate}</p>
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
