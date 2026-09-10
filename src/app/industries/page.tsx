import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { industriesContent, homeContent } from '@/lib/content';
import { INDUSTRIES } from '@/lib/industries';
import { VerticalCard } from '@/components/signature/VerticalCard';
import { ctaLabel } from '@/lib/cta';
import { JsonLd } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';

const SITE_URL =
  process.env.SITE_URL ?? 'https://team-website-moj7aqqd.sites.tyashin.com';

export const metadata = pageMetadata({
  title: 'Industries — 3D & AR Commerce for Every Sector',
  description:
    'Thridify powers immersive 3D and AR product experiences across furniture, modular kitchens, doors & windows, prefab structures, industrial machinery and laminates & surfaces.',
  path: '/industries',
  image: '/og/industries.png',
  ogDescription:
    'Furniture, modular kitchens, doors & windows, prefab structures, machinery and laminates — immersive commerce per sector.',
});

const page = industriesContent;
const proof = homeContent.proof;

export default function IndustriesPage() {
  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Thridify industries',
    itemListElement: INDUSTRIES.map((ind, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `Thridify for ${ind.gridName}`,
      url: `${SITE_URL}/industries/${ind.slug}`,
    })),
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Industries', item: `${SITE_URL}/industries` },
    ],
  };

  return (
    <>
      <JsonLd nodes={[itemListLd, breadcrumbLd]} />

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

          {/* Quick links to each industry page */}
          <div className="mt-16 flex flex-wrap gap-2.5">
            {INDUSTRIES.map((i) => (
              <Link
                key={i.slug}
                href={`/industries/${i.slug}`}
                className="px-4 py-2 rounded-full border border-foreground/15 text-sm font-medium text-foreground/80 bg-surface/60 backdrop-blur-sm hover:border-primary/40 hover:text-primary transition-colors"
              >
                {i.gridName}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRY GRID — the shared VerticalCard (same as the home grid); each
          card links to its own SEO page (§8). */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mb-14">
            <p className="eyebrow mb-4">{page.services.eyebrow}</p>
            <h2 className="tt-1">{page.services.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES.map((ind) => (
              <VerticalCard
                key={ind.slug}
                icon={ind.icon}
                name={ind.gridName}
                pain={ind.pain}
                art={ind.hubArt}
                href={`/industries/${ind.slug}`}
              />
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
          <div className="on-dark relative overflow-hidden rounded-lg bg-ink text-paper border border-paper/10 p-10 md:p-16">
            <div className="absolute inset-0 aurora opacity-40 pointer-events-none" aria-hidden />
            <div className="relative max-w-3xl">
              <h2 className="tt-1 text-paper">{page.cta.title}</h2>
              {page.cta.subtitle && (
                <p className="mt-5 text-lg text-muted-dark leading-relaxed">{page.cta.subtitle}</p>
              )}
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href={page.cta.primaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-paper text-ink font-semibold hover:bg-primary hover:text-primary-contrast transition-colors"
                >
                  {ctaLabel(page.cta.primaryCta)} <ArrowRight className="w-4 h-4" aria-hidden />
                </a>
                {page.cta.secondaryCta && (
                  <Link
                    href={page.cta.secondaryCta.href}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-paper/30 text-paper font-semibold hover:bg-paper/10 transition-colors"
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
