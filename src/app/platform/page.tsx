import type { Metadata } from 'next';
import Link from 'next/link';
import { platformContent } from '@/lib/content';
import { ctaLabel } from '@/lib/cta';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { ProductVisual, type ProductVisualVariant } from '@/components/ProductVisual';
import { CapabilityDemo, type DemoMode } from '@/components/signature/CapabilityDemo';
import { CTABand } from '@/components/signature/CTABand';

// The three product capabilities that CAN be shown as a live interactive
// demo (DEMO-FIRST, §6a) — everything else (content/analytics) has no
// interactive form and keeps an abstract ProductVisual as a last resort.
const DEMO_MODES = new Set<string>(['viewer', 'configurator', 'ar']);

export const metadata: Metadata = {
  title: 'Platform — 3D & AR Commerce Suite',
  description:
    'The Thridify platform: 3D 360° Viewer, 3D Configurator with live pricing and BOM export, app-free AR Viewer, done-for-you 3D Modelling Service and Analytics.',
  alternates: { canonical: '/platform' },
  openGraph: {
    title: 'The Thridify Platform — Five modules, one immersive commerce stack',
    description:
      '3D 360° Viewer, 3D Configurator, AR Viewer, 3D Modelling Service and Analytics — one no-code layer.',
    images: ['/og/platform.png'],
  },
};

const c = platformContent;

// §8 order: deep-dives (viewer/configurator/AR/content) → integrations row →
// standalone Analytics section → CTABand. Analytics is pulled OUT of the
// deep-dive run so it stands alone AFTER integrations (D-2).
const deepDives = c.products.items.filter((p) => p.id !== 'analytics');
const analytics = c.products.items.find((p) => p.id === 'analytics');

export default function PlatformPage() {
  return (
    <>
      {/* HERO — headline 6 words (≤12); subline 14 words (≤24). */}
      <section className="relative aurora overflow-hidden">
        <div className="container-x relative section text-center">
          <p className="eyebrow reveal">{c.hero.eyebrow}</p>
          <h1 className="tt-display mt-6 max-w-5xl mx-auto reveal">{c.hero.title}</h1>
          <p className="mt-8 lead max-w-2xl mx-auto reveal">{c.hero.subtitle}</p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center reveal">
            {c.hero.primaryCta && (
              <a
                href={c.hero.primaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                {ctaLabel(c.hero.primaryCta)}
              </a>
            )}
            {c.hero.secondaryCta && (
              <Link href={c.hero.secondaryCta.href} className="btn btn-ghost">
                {ctaLabel(c.hero.secondaryCta)}
              </Link>
            )}
          </div>

          {/* HERO DEMO (§8 Platform hero, DEMO-FIRST §6a) — a live interactive
              viewer, poster-first + activate-on-interaction, not an
              infographic montage. Breaks the text-only hero (D-3). */}
          <div className="mt-14 max-w-2xl mx-auto reveal">
            <CapabilityDemo mode="viewer" aspect="aspect-[16/10]" />
          </div>
        </div>
      </section>

      {/* PRODUCT DEEP-DIVES — four core products (Analytics is a standalone
          section after integrations, §8), alternating light/dark (§8), ≤40
          words each, one visual slot per product. Visuals are brand-colored
          abstract representations until real captures exist (ASSET-DEBT #4). */}
      {deepDives.map((p, i) => {
        const dark = i % 2 === 1;
        return (
          <section
            key={p.id}
            id={p.id}
            className={`section scroll-mt-20 ${dark ? 'on-dark bg-ink text-paper' : ''}`}
          >
            <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <Reveal
                direction={dark ? 'left' : 'right'}
                distance={32}
                className={`lg:col-span-5 ${dark ? 'lg:order-2' : ''}`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                      dark ? 'bg-paper text-ink' : 'bg-foreground text-background'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={`text-sm font-medium ${dark ? 'text-muted-dark' : 'text-foreground/60'}`}>
                    {p.tagline}
                  </span>
                </div>
                <h2 className={`tt-2 ${dark ? 'text-paper' : ''}`}>{p.name}</h2>
                <p className={`mt-4 text-lg leading-relaxed ${dark ? 'text-muted-dark' : 'text-foreground/75'}`}>
                  {p.description}
                </p>
                {p.id === 'modelling' && (
                  <Link
                    href="/services/3d-modelling"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
                  >
                    Explore the 3D modelling service <span aria-hidden>→</span>
                  </Link>
                )}
              </Reveal>
              <Reveal
                direction={dark ? 'right' : 'left'}
                distance={32}
                className={`lg:col-span-7 ${dark ? 'lg:order-1' : ''}`}
              >
                {DEMO_MODES.has(p.id) ? (
                  <CapabilityDemo mode={p.id as DemoMode} onDark={dark} aspect="aspect-[16/10]" />
                ) : (
                  <ProductVisual variant={p.id as ProductVisualVariant} onDark={dark} />
                )}
              </Reveal>
            </div>
          </section>
        );
      })}

      {/* INTEGRATIONS ROW — text/logo row, no fake screenshots. */}
      <section className="section bg-surface/50 border-y border-foreground/5">
        <div className="container-x">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow">{c.integrations.eyebrow}</p>
            <h2 className="tt-1">{c.integrations.title}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {c.integrations.items.map((it, i) => (
              <Reveal key={it.name} delay={i * 0.06} className="card p-7">
                <h3 className="font-heading text-lg font-semibold tracking-tight">{it.name}</h3>
                <p className="mt-2 text-sm text-foreground/65 leading-relaxed">{it.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ANALYTICS — standalone section AFTER the integrations row (§8, D-2).
          Dark showroom treatment; keeps id="analytics" for the footer anchor. */}
      {analytics && (
        <section id="analytics" className="section scroll-mt-20 on-dark bg-ink text-paper">
          <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <Reveal direction="right" distance={32} className="lg:col-span-5">
              <SectionHeading
                eyebrow={analytics.tagline}
                title={analytics.name}
                lead={analytics.description}
                dark
              />
            </Reveal>
            <Reveal direction="left" distance={32} className="lg:col-span-7">
              <ProductVisual variant="analytics" onDark />
            </Reveal>
          </div>
        </section>
      )}

      {/* CTA BAND */}
      <CTABand headline={c.cta.title} ctaLabel={ctaLabel(c.cta.primaryCta) || 'Book a Demo'} />
    </>
  );
}
