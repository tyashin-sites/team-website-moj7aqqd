import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'That page has moved or never existed. Jump back to the Thridify 3D & AR commerce platform.',
  robots: { index: false, follow: true },
};

const CALENDLY = 'https://calendly.com/hello-thridify/30min';

// Key destinations for a lost visitor — the same spine as the primary nav,
// plus the two highest-intent SEO surfaces (no ghost links, addendum §3d).
const LINKS: { label: string; href: string; note: string }[] = [
  { label: 'Platform', href: '/platform', note: '3D viewers, configurators & app-free AR' },
  { label: 'Industries', href: '/industries', note: 'Furniture, kitchens, laminates & more' },
  { label: 'Integrations', href: '/integrations', note: 'One-click plugins or embed on any store' },
  { label: 'What is Thridify?', href: '/what-is-thridify', note: 'The one-page explainer' },
  { label: 'About', href: '/about', note: 'The team building it' },
  { label: 'Contact', href: '/contact', note: 'Talk to a human' },
];

/**
 * 404 — an editorial dark page: the numeral as a hairline typographic
 * object behind the headline, a ruled index of destinations instead of a
 * card grid, one primary CTA. Same on-dark token patterns as the showroom
 * sections (pink accent only as the hero-metric colour; teal-soft eyebrow).
 */
export default function NotFound() {
  return (
    <section className="on-dark bg-ink text-paper relative overflow-hidden grain">
      {/* Single scarce-pink glow (DESIGN-SPEC §1) + a deep teal from below. */}
      <div
        data-parallax="0.14"
        className="absolute -right-40 -top-20 w-[36rem] h-[36rem] rounded-full bg-accent/10 blur-3xl pointer-events-none"
        aria-hidden
      />
      <div
        data-parallax="0.08"
        className="absolute -left-48 bottom-0 w-[40rem] h-[40rem] rounded-full bg-primary/15 blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="container-x section relative">
        <div className="relative">
          {/* The numeral — decorative, behind the headline. */}
          <span
            className="numeral-outline absolute -top-12 -left-2 md:-top-24 select-none"
            aria-hidden
          >
            404
          </span>
          <div className="relative pt-24 md:pt-40 max-w-2xl">
            <p className="eyebrow">Page not found</p>
            <h1 className="tt-display text-paper">This page isn&rsquo;t here.</h1>
            <p className="lead max-w-xl">
              The link may be broken or the page may have moved. Here are the
              places most people are looking for.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary px-7 py-4 text-base"
              >
                Book a Demo
              </a>
              <Link href="/" className="btn btn-ghost px-7 py-4 text-base inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" strokeWidth={1.75} aria-hidden />
                Back to home
              </Link>
            </div>
          </div>
        </div>

        <nav aria-label="Helpful links" className="mt-20 md:mt-24 max-w-3xl">
          <div className="hairline mb-2" aria-hidden />
          <ol className="divide-y divide-paper/10">
            {LINKS.map((l, i) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group flex items-baseline gap-5 md:gap-8 py-5 transition-micro hover:pl-2"
                >
                  <span className="tt-mono text-primary-soft w-7 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-heading font-medium text-xl md:text-2xl tracking-tight text-paper">
                      {l.label}
                    </span>
                    <span className="block mt-1 text-sm text-muted-dark">{l.note}</span>
                  </span>
                  <ArrowUpRight
                    className="w-5 h-5 shrink-0 self-center text-primary-soft transition-micro group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}
