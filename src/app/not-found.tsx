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
  { label: 'Integrations', href: '/integrations', note: 'Shopify, WooCommerce, Wix, Magento…' },
  { label: 'What is Thridify?', href: '/what-is-thridify', note: 'The one-page explainer' },
  { label: 'About', href: '/about', note: 'The team building it' },
  { label: 'Contact', href: '/contact', note: 'Talk to a human' },
];

export default function NotFound() {
  return (
    <section className="on-dark bg-ink text-paper relative overflow-hidden">
      {/* Single scarce-pink glow (DESIGN-SPEC §1) behind the 404 mark. */}
      <div
        className="absolute -right-40 top-0 w-[36rem] h-[36rem] rounded-full bg-accent/10 blur-3xl pointer-events-none"
        aria-hidden
      />
      <div className="container-x section relative">
        <div className="max-w-2xl">
          <p className="tt-mono text-primary-soft text-sm">Error 404</p>
          <h1 className="tt-display mt-4 text-paper">This page isn&rsquo;t here.</h1>
          <p className="mt-6 lead max-w-xl">
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

        <nav aria-label="Helpful links" className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group rounded-lg border border-paper/15 bg-paper/[0.04] p-6 transition-micro hover:border-primary/50 hover:bg-paper/[0.07]"
            >
              <span className="flex items-center justify-between gap-3">
                <span className="font-heading font-semibold text-lg text-paper">{l.label}</span>
                <ArrowUpRight
                  className="w-5 h-5 text-primary-soft transition-micro group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </span>
              <span className="mt-2 block text-sm text-muted-dark">{l.note}</span>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
