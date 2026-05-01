import type { Metadata } from 'next';
import Link from 'next/link';
import siteData from '@/../content/site.json';

export const metadata: Metadata = {
  title: 'Industries — 3D & AR Commerce for Every Sector',
  description:
    'Thridify powers immersive 3D and AR product experiences across furniture, automotive, modular kitchens, doors & windows, retail, industrial machinery and more.',
};

type Industry = {
  name: string;
  tagline?: string;
  description?: string;
  useCases?: string[];
  icon?: string;
};

type Testimonial = { quote: string; author: string; role?: string };

const FALLBACK_INDUSTRIES: Industry[] = [
  {
    name: 'Furniture',
    tagline: 'Sell every piece in every fabric',
    description:
      'Let shoppers configure upholstery, finishes and dimensions in real time, then place the final piece in their living room with AR.',
    useCases: ['Real-time fabric & finish configurator', 'View-in-room AR placement', 'Hero shots auto-generated from 3D'],
    icon: '◐',
  },
  {
    name: 'Modular Kitchens',
    tagline: 'Design at full scale, before the install',
    description:
      'Walk customers through cabinet layouts, countertop materials and appliance options without building a single sample.',
    useCases: ['Layout configurator', '1:1 scale AR walkthroughs', 'Quote-ready BOM exports'],
    icon: '◑',
  },
  {
    name: 'Automotive',
    tagline: 'Showrooms without the floor space',
    description:
      'Trim levels, paint, wheels, interiors — everything spinnable in 3D and viewable life-size in the customer\'s driveway.',
    useCases: ['360° exterior & interior viewer', 'Trim & color configurator', 'Life-size AR test-fit'],
    icon: '◒',
  },
  {
    name: 'Doors & Windows',
    tagline: 'Bespoke, visualised instantly',
    description:
      'Frame profiles, glazing, hardware and finishes — configured live and previewed against the customer\'s actual façade.',
    useCases: ['Profile & glazing configurator', 'AR placement on real openings', 'Quote automation'],
    icon: '◓',
  },
  {
    name: 'Pre-schools',
    tagline: 'Bring learning materials to life',
    description:
      'Interactive 3D learning kits and AR-enabled flashcards that turn catalogue pages into immersive experiences for parents and educators.',
    useCases: ['Interactive 3D catalogues', 'AR storybooks', 'Engagement analytics'],
    icon: '◔',
  },
  {
    name: 'Personalized Retail',
    tagline: 'One product, infinite expressions',
    description:
      'Empower buyers to customise color, engraving, materials and components — and see the result rendered photoreal in seconds.',
    useCases: ['Live product personalisation', 'Photoreal preview rendering', 'Shopify, WooCommerce & more'],
    icon: '◕',
  },
  {
    name: 'Industrial Machinery',
    tagline: 'Specs, but make them spatial',
    description:
      'Replace static PDFs with explorable 3D machinery — exploded views, animated workflows and on-site AR scaling.',
    useCases: ['Exploded part viewers', 'Animated workflow demos', 'On-site AR scale checks'],
    icon: '◖',
  },
  {
    name: 'Lighting & Décor',
    tagline: 'Mood, materials, the right glow',
    description:
      'Show how every fixture casts light, fits a space and pairs with finishes — long before checkout.',
    useCases: ['Material & finish swap', 'AR room placement', 'Configurable bundles'],
    icon: '◗',
  },
];

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'We replaced 60% of our photoshoots with Thridify renders, and conversion on configurable SKUs jumped almost 2×.',
    author: 'Director of Digital',
    role: 'Premium Furniture Brand',
  },
  {
    quote:
      'Customers spend real time inside the configurator now. Returns on customised orders dropped to single digits.',
    author: 'Head of E-commerce',
    role: 'Modular Kitchen Studio',
  },
  {
    quote:
      'AR “view in your driveway” is the demo that closes the test-drive booking. It just works on every phone.',
    author: 'Marketing Lead',
    role: 'Automotive OEM',
  },
];

export default function IndustriesPage() {
  const page = (siteData as any).pages?.industries ?? {};
  const hero = page.hero ?? {
    eyebrow: 'Industries',
    title: 'Built for any product worth seeing in 3D.',
    subtitle:
      'From living-room sofas to factory floor machinery, Thridify gives every category an immersive, no-code commerce layer.',
  };
  const industries: Industry[] = page.industries ?? page.services?.items ?? FALLBACK_INDUSTRIES;
  const testimonials: Testimonial[] = page.testimonials?.items ?? FALLBACK_TESTIMONIALS;
  const cta = page.cta ?? {
    title: 'Don\'t see your industry? We probably already render it.',
    subtitle:
      'Tell us what you sell. We\'ll show you the fastest path from your catalogue to a fully immersive 3D + AR storefront.',
    primaryCta: { text: 'Book a Demo', href: '/contact' },
    secondaryCta: { text: 'Explore the Platform', href: '/platform' },
  };

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-70 pointer-events-none" aria-hidden />
        <div className="container-x relative section pb-16 md:pb-24">
          <div className="max-w-4xl reveal">
            <p className="eyebrow mb-6">{hero.eyebrow ?? 'Industries'}</p>
            <h1 className="h-display">{hero.title}</h1>
            {hero.subtitle && (
              <p className="mt-7 text-lg md:text-xl text-foreground/70 max-w-2xl leading-relaxed">
                {hero.subtitle}
              </p>
            )}
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary">Book a Demo</Link>
              <Link href="/platform" className="btn btn-ghost">See the Platform</Link>
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
            <p className="eyebrow mb-4">Sectors we serve</p>
            <h2 className="h-1">Every category. One immersive commerce layer.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, idx) => (
              <article
                key={ind.name}
                id={slug(ind.name)}
                className="card p-8 flex flex-col scroll-mt-24"
              >
                <div className="flex items-center justify-between mb-6">
                  <span
                    aria-hidden
                    className="text-3xl text-primary"
                    style={{ fontFamily: 'var(--brand-heading-font)' }}
                  >
                    {ind.icon ?? '◐'}
                  </span>
                  <span className="text-xs font-mono text-foreground/40">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="h-2 text-2xl mb-2">{ind.name}</h3>
                {ind.tagline && (
                  <p className="text-primary font-medium mb-3">{ind.tagline}</p>
                )}
                {ind.description && (
                  <p className="text-foreground/70 leading-relaxed mb-6">{ind.description}</p>
                )}
                {ind.useCases && ind.useCases.length > 0 && (
                  <ul className="mt-auto space-y-2 pt-4 border-t border-foreground/10">
                    {ind.useCases.map((uc) => (
                      <li key={uc} className="flex items-start gap-3 text-sm text-foreground/80">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" aria-hidden />
                        <span>{uc}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section bg-surface">
        <div className="container-x">
          <div className="max-w-3xl mb-14">
            <p className="eyebrow mb-4">Proof, across industries</p>
            <h2 className="h-1">Operators measure it in conversion, returns and ROI.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <figure key={i} className="card p-8 flex flex-col">
                <div aria-hidden className="text-5xl leading-none text-primary mb-4 font-heading">“</div>
                <blockquote className="text-foreground text-lg leading-relaxed flex-1">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 pt-5 border-t border-foreground/10">
                  <div className="font-semibold text-foreground">{t.author}</div>
                  {t.role && <div className="text-sm text-foreground/60">{t.role}</div>}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-lg bg-foreground text-background p-10 md:p-16">
            <div className="absolute inset-0 aurora opacity-40 pointer-events-none" aria-hidden />
            <div className="relative max-w-3xl">
              <h2 className="h-1">{cta.title}</h2>
              {cta.subtitle && (
                <p className="mt-5 text-lg text-background/75 leading-relaxed">{cta.subtitle}</p>
              )}
              <div className="mt-9 flex flex-wrap gap-3">
                {cta.primaryCta && (
                  <Link
                    href={cta.primaryCta.href}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-background text-foreground font-semibold hover:bg-primary hover:text-primary-contrast transition-colors"
                  >
                    {cta.primaryCta.text} <span aria-hidden>→</span>
                  </Link>
                )}
                {cta.secondaryCta && (
                  <Link
                    href={cta.secondaryCta.href}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-background/30 text-background font-semibold hover:bg-background/10 transition-colors"
                  >
                    {cta.secondaryCta.text}
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
