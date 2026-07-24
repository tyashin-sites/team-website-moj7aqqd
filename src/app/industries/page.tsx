import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { industriesContent, homeContent } from '@/lib/content';
import { ctaLabel } from '@/lib/cta';

export const metadata: Metadata = {
  title: 'Industries — 3D & AR Commerce for Every Sector',
  description:
    'Thridify powers immersive 3D and AR product experiences across furniture, modular kitchens, doors & windows, retail, industrial machinery and more.',
  openGraph: {
    title: 'Industries — 3D & AR Commerce for Every Sector',
    description:
      'Furniture, modular kitchens, doors & windows, machinery and more — immersive commerce per sector.',
    images: ['/og/default.png'],
  },
};

// Typed, single-sourced content (src/lib/content.ts). The former page-local
// FALLBACK_INDUSTRIES copy and the invented FALLBACK_TESTIMONIALS were
// removed in Phase 2 (No-Faking rule) — proof is the permitted metric set
// only, shared with the home page. Full §8 vertical-page treatment lands in
// Phase 3.
const page = industriesContent;
const proof = homeContent.proof;

export default function IndustriesPage() {
  const industries = page.services.items;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-70 pointer-events-none" aria-hidden />
        <div className="container-x relative section pb-16 md:pb-24">
          <div className="max-w-4xl reveal">
            <p className="eyebrow mb-6">{page.hero.eyebrow}</p>
            <h1 className="tt-display">{page.hero.title}</h1>
            <p className="mt-7 lead max-w-2xl">{page.hero.subtitle}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="https://calendly.com/hello-thridify/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Book a Demo
              </a>
              <Link href="/#demo" className="btn btn-ghost">
                Try the live demo
              </Link>
            </div>
          </div>

          {/* Industry chips */}
          <div className="mt-16 flex flex-wrap gap-2.5">
            {industries.map((i) => (
              <a
                key={i.name}
                href={`#${slug(i.name)}`}
                className="px-4 py-2 rounded-full border border-foreground/15 text-sm font-medium text-foreground/80 bg-surface/60 backdrop-blur-sm hover:border-foreground/40 hover:text-foreground transition-colors"
              >
                {i.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRY GRID */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mb-14">
            <p className="eyebrow mb-4">{page.services.eyebrow}</p>
            <h2 className="tt-1">{page.services.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, idx) => (
              <article key={ind.name} id={slug(ind.name)} className="card p-8 flex flex-col scroll-mt-24">
                <div className="flex items-center justify-between mb-6">
                  <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-heading font-bold">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="tt-2 text-2xl mb-2">{ind.name}</h3>
                <p className="text-foreground/70 leading-relaxed">{ind.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF — permitted platform metrics only (No-Faking rule). */}
      <section className="section bg-surface">
        <div className="container-x">
          <div className="max-w-3xl mb-14">
            <p className="eyebrow mb-4">{proof.eyebrow}</p>
            <h2 className="tt-1">{proof.title}</h2>
          </div>
          <dl className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {proof.metrics.map((m) => (
              <div key={m.label} className="card p-8">
                <dd className="font-mono tabular-nums text-4xl md:text-5xl font-medium text-foreground">
                  {m.value}
                </dd>
                <dt className="mt-3 text-foreground/65">{m.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-lg bg-foreground text-background p-10 md:p-16">
            <div className="absolute inset-0 aurora opacity-40 pointer-events-none" aria-hidden />
            <div className="relative max-w-3xl">
              <h2 className="tt-1">{page.cta.title}</h2>
              {page.cta.subtitle && (
                <p className="mt-5 text-lg text-background/75 leading-relaxed">{page.cta.subtitle}</p>
              )}
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href={page.cta.primaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-background text-foreground font-semibold hover:bg-primary hover:text-primary-contrast transition-colors"
                >
                  {ctaLabel(page.cta.primaryCta)} <ArrowRight className="w-4 h-4" aria-hidden />
                </a>
                {page.cta.secondaryCta && (
                  <Link
                    href={page.cta.secondaryCta.href}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-background/30 text-background font-semibold hover:bg-background/10 transition-colors"
                  >
                    {ctaLabel(page.cta.secondaryCta)}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
