import type { Metadata } from 'next';
import Link from 'next/link';
import siteData from '@/../content/site.json';

export const metadata: Metadata = {
  title: 'Platform — 3D & AR Commerce Suite',
  description:
    'Explore the Thridify platform: 3D 360° Viewer, Real-Time Configurator, App-Free AR, AI Visuals, and 3D DAM with analytics.',
};

type PlatformContent = {
  hero: { eyebrow?: string; title: string; subtitle?: string; primaryCta?: { label: string; href: string }; secondaryCta?: { label: string; href: string } };
  products: { title: string; subtitle?: string; items: { name: string; tagline?: string; description: string; features?: string[] }[] };
  capabilities: { title: string; subtitle?: string; items: { title: string; description: string }[] };
  cta: { title: string; subtitle?: string; primaryCta?: { label: string; href: string }; secondaryCta?: { label: string; href: string } };
};

const FALLBACK: PlatformContent = {
  hero: {
    eyebrow: 'The Thridify Platform',
    title: 'One platform. Every immersive product experience.',
    subtitle:
      'A complete 3D and AR commerce suite — from interactive viewers and configurators to app-free AR, AI visuals, and digital asset management with built-in analytics.',
    primaryCta: { label: 'Book a Demo', href: '/contact' },
    secondaryCta: { label: 'See Industries', href: '/industries' },
  },
  products: {
    title: 'Five products. Infinite possibilities.',
    subtitle: 'Each module ships standalone or together — no code required, integrates with 8+ e-commerce platforms.',
    items: [
      {
        name: '3D 360° Product Viewer',
        tagline: 'Spin. Zoom. Explore.',
        description: 'Let shoppers inspect every angle of your product in stunning real-time 3D, on any device.',
        features: ['Real-time WebGL rendering', 'Mobile + desktop optimized', 'Hotspots & annotations', 'Lightning-fast load times'],
      },
      {
        name: 'Real-Time 3D Configurator',
        tagline: 'Customize before you buy.',
        description: 'Empower customers to personalize colors, materials, and features with photoreal 3D in real time.',
        features: ['Live material & color swaps', 'Modular part configuration', 'Dynamic pricing engine', 'Save & share configurations'],
      },
      {
        name: 'App-Free AR Viewer',
        tagline: '“View in Your Room.”',
        description: 'Place products at true scale in any space — directly from the browser, no app downloads.',
        features: ['WebAR — works on all smartphones', 'iOS Quick Look + Android Scene Viewer', 'True-to-scale placement', 'One-tap launch from product page'],
      },
      {
        name: 'AI Visuals & Content Creation',
        tagline: 'Studios, on demand.',
        description: 'Generate photoreal lifestyle imagery, videos, and 360° spins from your 3D assets — at a fraction of the cost.',
        features: ['AI-rendered scenes & lifestyle shots', 'Auto-generated 360° spin sets', 'Bulk variant rendering', 'Cuts photography costs by 70%+'],
      },
      {
        name: '3D Digital Asset Management',
        tagline: 'Your 3D library, organized.',
        description: 'Centralize, govern, and deploy every 3D asset across channels — with engagement analytics and ROI tracking.',
        features: ['Centralized asset library', 'Version control & permissions', 'Engagement & conversion analytics', 'ROI dashboards'],
      },
    ],
  },
  capabilities: {
    title: 'Built for the way modern brands ship.',
    subtitle: 'Enterprise-grade infrastructure with the simplicity of a no-code tool.',
    items: [
      { title: 'No-code integration', description: 'Drop a snippet into Shopify, WooCommerce, Magento, BigCommerce, and 4+ more platforms.' },
      { title: 'Works on every device', description: 'Optimized for all smartphones, tablets, and desktops — no app, no plugin, no friction.' },
      { title: 'Engagement analytics', description: 'Track interactions, time-on-asset, configuration paths, and conversion impact in real time.' },
      { title: 'Boost conversions', description: 'Brands using Thridify see up to 40% higher conversion rates and 25% fewer returns.' },
      { title: 'Reduce returns', description: 'Customers see exactly what they’re buying — fewer surprises, fewer refunds.' },
      { title: 'Cut photography costs', description: 'Replace expensive photo shoots with AI-rendered visuals from a single 3D source of truth.' },
    ],
  },
  cta: {
    title: 'See your product reimagined in 3D.',
    subtitle: 'Get a personalized demo with a sample of your own product, rendered in 3D and AR within 48 hours.',
    primaryCta: { label: 'Book a Demo', href: '/contact' },
    secondaryCta: { label: 'Talk to Sales', href: '/contact' },
  },
};

function getContent(): PlatformContent {
  const raw = (siteData as any).pages?.platform;
  if (!raw || raw.ref) return FALLBACK;
  return { ...FALLBACK, ...raw };
}

export default function PlatformPage() {
  const c = getContent();

  return (
    <>
      {/* HERO */}
      <section className="relative aurora overflow-hidden">
        <div className="container-x relative section text-center">
          {c.hero.eyebrow && <p className="eyebrow reveal">{c.hero.eyebrow}</p>}
          <h1 className="h-display mt-6 max-w-5xl mx-auto reveal">
            {c.hero.title}
          </h1>
          {c.hero.subtitle && (
            <p className="mt-8 text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed reveal">
              {c.hero.subtitle}
            </p>
          )}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center reveal">
            {c.hero.primaryCta && (
              <Link href={c.hero.primaryCta.href} className="btn btn-primary">
                {c.hero.primaryCta.label}
              </Link>
            )}
            {c.hero.secondaryCta && (
              <Link href={c.hero.secondaryCta.href} className="btn btn-ghost">
                {c.hero.secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* PRODUCTS — alternating editorial rows */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-3xl mb-20">
            <p className="eyebrow">Products</p>
            <h2 className="h-1 mt-4">{c.products.title}</h2>
            {c.products.subtitle && (
              <p className="mt-6 text-lg text-foreground/70 leading-relaxed">{c.products.subtitle}</p>
            )}
          </div>

          <div className="space-y-24 md:space-y-32">
            {c.products.items.map((p, i) => (
              <div
                key={p.name}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              >
                <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-semibold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {p.tagline && (
                      <span className="text-sm font-medium text-foreground/60">{p.tagline}</span>
                    )}
                  </div>
                  <h3 className="h-2">{p.name}</h3>
                  <p className="mt-5 text-lg text-foreground/75 leading-relaxed">{p.description}</p>
                  {p.features && (
                    <ul className="mt-8 space-y-3">
                      {p.features.map(f => (
                        <li key={f} className="flex items-start gap-3 text-foreground/85">
                          <span
                            className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0"
                            aria-hidden
                          />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden card grain">
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `
                          radial-gradient(60% 50% at ${20 + i * 15}% ${30 + (i % 2) * 30}%, color-mix(in oklab, var(--brand-primary) 55%, transparent) 0%, transparent 60%),
                          radial-gradient(50% 60% at ${75 - i * 10}% ${70 - (i % 2) * 25}%, color-mix(in oklab, var(--brand-accent) 60%, transparent) 0%, transparent 60%),
                          color-mix(in oklab, var(--brand-surface) 95%, transparent)
                        `,
                      }}
                      aria-hidden
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-heading text-7xl md:text-8xl font-black text-foreground/10 tracking-tighter">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                      <span className="text-xs uppercase tracking-[0.18em] text-foreground/50">
                        Module · {p.name.split(' ').slice(0, 2).join(' ')}
                      </span>
                      <span className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center text-xs">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES — feature grid */}
      <section className="section bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 aurora pointer-events-none" aria-hidden />
        <div className="container-x relative">
          <div className="max-w-3xl mb-16">
            <p className="eyebrow text-background/50">Capabilities</p>
            <h2 className="h-1 mt-4">{c.capabilities.title}</h2>
            {c.capabilities.subtitle && (
              <p className="mt-6 text-lg text-background/70 leading-relaxed">{c.capabilities.subtitle}</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-background/10 rounded-lg overflow-hidden">
            {c.capabilities.items.map((item, i) => (
              <div
                key={item.title}
                className="bg-foreground p-8 md:p-10 hover:bg-background/5 transition-colors"
              >
                <div className="text-xs font-semibold tracking-[0.18em] text-background/40 mb-5">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-semibold mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-background/65 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-lg aurora p-10 md:p-20 text-center">
            <h2 className="h-1 max-w-3xl mx-auto">{c.cta.title}</h2>
            {c.cta.subtitle && (
              <p className="mt-6 text-lg text-foreground/75 max-w-2xl mx-auto leading-relaxed">
                {c.cta.subtitle}
              </p>
            )}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              {c.cta.primaryCta && (
                <Link href={c.cta.primaryCta.href} className="btn btn-primary">
                  {c.cta.primaryCta.label}
                </Link>
              )}
              {c.cta.secondaryCta && (
                <Link href={c.cta.secondaryCta.href} className="btn btn-ghost">
                  {c.cta.secondaryCta.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
