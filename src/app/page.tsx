import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Sofa, ChefHat, DoorOpen, Warehouse, Wrench, Layers, type LucideIcon } from 'lucide-react';
import { homeContent } from '@/lib/content';
import { INDUSTRIES, type Industry } from '@/lib/industries';
import { ctaLabel } from '@/lib/cta';
import { Reveal } from '@/components/Reveal';
import { LogoMarquee } from '@/components/LogoMarquee';
import { SectionHeading } from '@/components/SectionHeading';
import { CapabilityDemo, type DemoMode } from '@/components/signature/CapabilityDemo';
import { HeroObject } from '@/components/signature/HeroObject';
import { MetricBar } from '@/components/signature/MetricBar';
import { BeforeAfter } from '@/components/signature/BeforeAfter';
import { PipelineStrip } from '@/components/signature/PipelineStrip';
import { VerticalCard } from '@/components/signature/VerticalCard';
import { ProofCard } from '@/components/signature/ProofCard';
import { CTABand } from '@/components/signature/CTABand';
import { WebsiteSchema } from '@/components/SiteSchema';
import { SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Thridify — Reimagine how the world experiences your products',
  description:
    'No-code 3D and AR commerce: interactive product viewers, real-time configurators and app-free AR that help brands convert more and return less.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Thridify — 3D & AR Commerce Platform',
    description:
      'No-code 3D and AR product experiences: viewers, configurators and app-free AR for e-commerce brands.',
    url: `${SITE_URL}/`,
    images: ['/og/home.png'],
  },
};

// Icon per canonical industry (keyed on the industry's own icon token — no
// keyword guessing, no Education branch: education is spun out to WonderlyAR,
// DESIGN-SPEC §6).
const INDUSTRY_ICON: Record<Industry['icon'], LucideIcon> = {
  sofa: Sofa,
  kitchen: ChefHat,
  door: DoorOpen,
  prefab: Warehouse,
  machinery: Wrench,
  laminate: Layers,
};

// Home content — typed, single-sourced from content/site.json (src/lib/content.ts).
const home = homeContent;

export default function HomePage() {
  return (
    <>
      {/* WebSite entity — Home + /platform only, on top of sitewide EntitySchema. */}
      <WebsiteSchema />
      {/* 1. HERO — showroom mode (DESIGN-SPEC §7.1/§8): dark ink, live 3D
          object. Headline 7 words (≤12); subline 19 words (≤24). */}
      <section className="on-dark bg-ink text-paper relative overflow-hidden">
        <div
          className="absolute -right-40 top-1/4 w-[36rem] h-[36rem] rounded-full bg-accent/10 blur-3xl pointer-events-none"
          aria-hidden
        />
        <div className="container-x section grid lg:grid-cols-2 gap-14 items-center relative">
          <div className="reveal-stagger">
            <p className="eyebrow">{home.hero.eyebrow}</p>
            <h1 className="tt-display text-paper">{home.hero.title}</h1>
            <p className="lead max-w-xl">{home.hero.subtitle}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={home.hero.primaryCta?.href ?? 'https://calendly.com/hello-thridify/30min'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary px-7 py-4 text-base"
              >
                {ctaLabel(home.hero.primaryCta) || 'Book a Demo'}
              </a>
              {home.hero.secondaryCta && (
                <Link
                  href={home.hero.secondaryCta.href}
                  className="btn btn-ghost px-7 py-4 text-base"
                >
                  {ctaLabel(home.hero.secondaryCta)}
                </Link>
              )}
            </div>
          </div>
          {/* The HeroObject IS the live demo (§9 no-gate secondary CTA target).
              id="demo" is where the "Try the live demo" secondary scrolls. */}
          <div id="demo" className="scroll-mt-24">
            <HeroObject />
          </div>
        </div>
      </section>

      {/* 2. METRIC BAR — directly under hero (DESIGN-SPEC §7.2; the 4
          strongest canonical impact stats from thridify.com production:
          75% returns / 3× conversion / 100% engagement / 70% photo cost). */}
      <MetricBar />

      {/* 3. LOGO MARQUEE — real client logos only. */}
      <LogoMarquee eyebrow={home.clients.eyebrow} logos={home.clients.logos} />

      {/* 4. BEFORE / AFTER — the positioning made physical (§7.3). */}
      <section className="section">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow={home.beforeAfter.eyebrow}
              title={home.beforeAfter.title}
              lead={home.beforeAfter.lead}
            />
          </div>
          <div className="lg:col-span-8">
            <BeforeAfter />
          </div>
        </div>
      </section>

      {/* 5. PIPELINE STRIP — dark (§7.4). */}
      <PipelineStrip />

      {/* 6. VERTICALS GRID — the 6 canonical industries (§7.5/§8). EACH card
          links to its own /industries/<slug> SEO page. No per-vertical
          metrics until real, sourced numbers exist (ASSET-DEBT #12). */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-2xl mb-14">
            <SectionHeading eyebrow={home.verticals.eyebrow} title={home.verticals.title} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.slug} delay={i * 0.05}>
                <VerticalCard
                  icon={INDUSTRY_ICON[ind.icon]}
                  name={ind.gridName}
                  pain={ind.pain}
                  href={`/industries/${ind.slug}`}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PRODUCT TRIO — viewer / configurator / AR as INTERACTIVE mini-demos
          (DEMO-FIRST, §6a): poster-first, activate-on-interaction so only one
          heavy demo runs at a time and LCP holds (§10). Placeholder model
          stands in until real Thridify experience embeds land (ASSET-DEBT
          #4/#16, docs/integration/). */}
      <section className="section bg-surface/50 border-y border-foreground/5">
        <div className="container-x">
          <div className="max-w-2xl mb-14">
            <SectionHeading eyebrow={home.productTrio.eyebrow} title={home.productTrio.title} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {home.productTrio.items.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08} className="card flex flex-col p-6 h-full">
                <CapabilityDemo mode={p.id as DemoMode} />
                <h3 className="font-heading text-xl font-semibold tracking-tight mt-6 mb-2">{p.name}</h3>
                <p className="text-foreground/70 leading-relaxed">{p.description}</p>
                <Link
                  href={`/platform#${p.id}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
                >
                  Explore <span aria-hidden>→</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PROOF — the 6 canonical impact metrics + REAL customer quotes
          (verbatim from production thridify.com, user-confirmed 2026-07-24)
          + real client logos (§7.6, No-Faking). */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-2xl mb-14">
            <SectionHeading eyebrow={home.proof.eyebrow} title={home.proof.title} />
          </div>
          <dl className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {home.proof.metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.08} className="card p-8">
                <dd
                  className={`font-mono tabular-nums text-4xl md:text-5xl font-medium ${
                    i === 1 ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {m.value}
                </dd>
                <dt className="mt-3 text-foreground/65">{m.label}</dt>
              </Reveal>
            ))}
          </dl>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {home.proof.testimonials.map((t, i) => (
              <Reveal key={t.company} delay={i * 0.08}>
                <ProofCard quote={t.quote} company={t.company} />
              </Reveal>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
            <span className="text-sm text-foreground/55">Client work includes</span>
            {home.clients.logos.map((logo) => (
              <Image
                key={logo.name}
                src={logo.logoUrl}
                alt={logo.name}
                width={120}
                height={36}
                className="h-8 w-auto object-contain opacity-80"
                unoptimized
              />
            ))}
          </div>
        </div>
      </section>

      {/* 9. CTA BAND (§7.7). */}
      <CTABand headline={home.cta.title} ctaLabel={ctaLabel(home.cta.primaryCta) || 'Book a Demo'} />
    </>
  );
}
