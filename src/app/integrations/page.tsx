import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Plug,
  ShoppingBag,
  LayoutTemplate,
  Store,
  ShoppingCart,
  Boxes,
  Palette,
  Globe,
  Code2,
  Droplet,
  Square,
  ShoppingBasket,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import {
  INTEGRATIONS,
  type Integration,
  type IntegrationGroup,
} from '@/lib/integrations';
import { homeContent } from '@/lib/content';

const SITE_URL =
  process.env.SITE_URL ?? 'https://team-website-moj7aqqd.sites.tyashin.com';

export const metadata: Metadata = {
  title: 'Integrations — 3D & AR for Every Store',
  description:
    'Add a 3D configurator, 360° viewer and app-free AR to Shopify, WooCommerce, WordPress, Adobe Commerce (Magento), BigCommerce, Wix, commercetools, Squarespace, PrestaShop, Drupal, Canva or any custom site — via a native plugin or a lightweight embed.',
  alternates: { canonical: '/integrations' },
  openGraph: {
    title: 'Integrations — 3D & AR for Every Store',
    description:
      'Works with every major commerce platform — and any storefront via a lightweight embed. Native plugins for Shopify, WooCommerce and WordPress; embeds for everything else.',
    url: `${SITE_URL}/integrations`,
    type: 'website',
    siteName: 'Thridify',
    images: ['/og/default.png'],
  },
  twitter: { card: 'summary_large_image', title: 'Integrations — 3D & AR for Every Store', images: ['/og/default.png'] },
};

const INTEGRATION_ICON: Record<Integration['icon'], LucideIcon> = {
  plugin: Plug,
  shopify: ShoppingBag,
  wix: LayoutTemplate,
  bigcommerce: Store,
  magento: ShoppingCart,
  headless: Boxes,
  canva: Palette,
  wordpress: Globe,
  code: Code2,
  drupal: Droplet,
  squarespace: Square,
  prestashop: ShoppingBasket,
};

// Hub grouping: native plugin/app vs embed-on-any-store vs custom catch-all.
const GROUPS: {
  id: IntegrationGroup;
  eyebrow: string;
  title: string;
  blurb: string;
}[] = [
  {
    id: 'native',
    eyebrow: 'Native plugin / app',
    title: 'One-click on the platforms with a Thridify app',
    blurb:
      'A first-party Thridify plugin or app installs in a few clicks — no code, no re-platforming.',
  },
  {
    id: 'embed',
    eyebrow: 'Embed on any store',
    title: 'Any storefront, via a lightweight embed',
    blurb:
      'No native app needed — drop the Thridify embed or JS SDK onto your product page and go live.',
  },
  {
    id: 'custom',
    eyebrow: 'Custom / any platform',
    title: 'Build it your way with the SDK & API',
    blurb:
      'For bespoke stacks, the JS SDK, embed code and API add 3D and AR to any custom site or app.',
  },
];

const proof = homeContent.proof;

export default function IntegrationsIndexPage() {
  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Thridify integrations',
    itemListElement: INTEGRATIONS.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `Thridify for ${it.name}`,
      url: `${SITE_URL}/integrations/${it.slug}`,
    })),
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Integrations', item: `${SITE_URL}/integrations` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-70 pointer-events-none" aria-hidden />
        <div className="container-x relative section pb-16 md:pb-24">
          <div className="max-w-4xl reveal">
            <p className="eyebrow mb-6">Integrations</p>
            <h1 className="tt-display">Add 3D & AR to the store you already run.</h1>
            <p className="mt-7 lead max-w-2xl">
              Thridify works with every major commerce platform — and any storefront via a lightweight
              embed. A 3D configurator, 360° viewer and app-free AR on your product pages. No
              re-platforming, no app for your shoppers.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="https://calendly.com/hello-thridify/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Book a Demo
              </a>
              <Link href="/#demo" className="btn btn-ghost">Try the live demo</Link>
            </div>
          </div>

          {/* Quick links to each integration page */}
          <div className="mt-16 flex flex-wrap gap-2.5">
            {INTEGRATIONS.map((it) => (
              <Link
                key={it.slug}
                href={`/integrations/${it.slug}`}
                className="px-4 py-2 rounded-full border border-foreground/15 text-sm font-medium text-foreground/80 bg-surface/60 backdrop-blur-sm hover:border-primary/40 hover:text-primary transition-colors"
              >
                {it.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATION GRID — grouped (native plugin/app · embed · custom); each
          card links to its own SEO page. */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mb-14">
            <p className="eyebrow mb-4">One engine, every storefront</p>
            <h2 className="tt-1">
              {INTEGRATIONS.length} ways to go live with Thridify.
            </h2>
          </div>

          <div className="space-y-16">
            {GROUPS.map((g) => {
              const items = INTEGRATIONS.filter((it) => it.group === g.id);
              if (items.length === 0) return null;
              return (
                <div key={g.id}>
                  <div className="max-w-2xl mb-8">
                    <p className="eyebrow mb-3">{g.eyebrow}</p>
                    <h3 className="tt-2">{g.title}</h3>
                    <p className="mt-3 text-foreground/70 leading-relaxed">
                      {g.blurb}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((it) => {
                      const Icon = INTEGRATION_ICON[it.icon];
                      return (
                        <Link
                          key={it.slug}
                          href={`/integrations/${it.slug}`}
                          className="group card p-8 flex flex-col hover:-translate-y-1 transition-ui"
                        >
                          <span className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-contrast transition-colors">
                            <Icon className="w-6 h-6" strokeWidth={1.5} aria-hidden />
                          </span>
                          <h4 className="tt-2 text-2xl mb-2 group-hover:text-primary transition-colors">
                            {it.name}
                          </h4>
                          <p className="text-foreground/70 leading-relaxed flex-1">
                            {it.tagline}
                          </p>
                          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                            {it.name} integration{' '}
                            <ArrowRight className="w-4 h-4" aria-hidden />
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
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
              <h2 className="tt-1">Not sure which fits your stack?</h2>
              <p className="mt-5 text-lg text-background/75 leading-relaxed">
                Book a demo and we will show Thridify running on your platform — or wire it into a custom build
                with the SDK and API.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="https://calendly.com/hello-thridify/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-background text-foreground font-semibold hover:bg-primary hover:text-primary-contrast transition-colors"
                >
                  Book a Demo <ArrowRight className="w-4 h-4" aria-hidden />
                </a>
                <Link
                  href="/integrations/custom-integration"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-background/30 text-background font-semibold hover:bg-background/10 transition-colors"
                >
                  Custom integration
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
