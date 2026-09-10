import Link from 'next/link';
import Image from 'next/image';
import { homeContent } from '@/lib/content';
import { INDUSTRIES } from '@/lib/industries';
import { ctaLabel } from '@/lib/cta';
import { Reveal } from '@/components/Reveal';
import { LogoMarquee } from '@/components/LogoMarquee';
import { SectionHeading } from '@/components/SectionHeading';
import { CapabilityDemo, type DemoMode } from '@/components/signature/CapabilityDemo';
import { HeroObject } from '@/components/signature/HeroObject';
import { HeroMotion } from '@/components/motion/HeroMotion';
import { EXP } from '@/lib/thridify';

// Home product trio → a distinct live Thridify experience per capability.
const TRIO_EXPERIENCE: Record<string, string> = {
  viewer: EXP.bicycle,
  configurator: EXP.nasherLuggage,
  ar: EXP.loungeChair,
};
import { MetricBar } from '@/components/signature/MetricBar';
import { BeforeAfter } from '@/components/signature/BeforeAfter';
import { PipelineStrip } from '@/components/signature/PipelineStrip';
import { ScrollStory, SCROLL_STORY_ENABLED } from '@/components/signature/ScrollStory';
import { VerticalCard } from '@/components/signature/VerticalCard';
import { ProofCard } from '@/components/signature/ProofCard';
import { CTABand } from '@/components/signature/CTABand';
import { SITE_URL } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Thridify — Reimagine how the world experiences your products',
  description:
    'No-code 3D and AR commerce: interactive product viewers, real-time configurators and app-free AR that help brands convert more and return less.',
  path: '/',
  image: '/og/home.png',
  ogTitle: 'Thridify — 3D & AR Commerce Platform',
  ogDescription:
    'No-code 3D and AR product experiences: viewers, configurators and app-free AR for e-commerce brands.',
});

// Home content — typed, single-sourced from content/site.json (src/lib/content.ts).
const home = homeContent;

// The first real testimonial carries the dark "voice" band; the rest stay
// as ProofCards. Order is content order — nothing is re-ranked here.
const [leadQuote, ...otherQuotes] = home.proof.testimonials;

export default function HomePage() {
  return (
    <>
      {/* 1. HERO — showroom mode (DESIGN-SPEC §7.1/§8): dark ink, live 3D
          object. Headline 7 words (≤12); subline 19 words (≤24). */}
      <section data-hero-stage className="on-dark bg-ink text-paper relative overflow-hidden grain">
        {/* GSAP entrance timeline + scrubbed demo drift (see HeroMotion). */}
        <HeroMotion />
        <div
          data-parallax="0.16"
          className="absolute -right-40 top-1/4 w-[36rem] h-[36rem] rounded-full bg-accent/10 blur-3xl pointer-events-none"
          aria-hidden
        />
        {/* Second glow — deep teal from the lower left, so the ink reads as a
            lit room rather than a flat fill (luxury pass). */}
        <div
          data-parallax="0.1"
          className="absolute -left-48 -bottom-48 w-[42rem] h-[42rem] rounded-full bg-primary/15 blur-3xl pointer-events-none"
          aria-hidden
        />
        <div className="container-x section grid lg:grid-cols-2 gap-14 items-center relative">
          <div>
            <p data-hero="eyebrow" className="eyebrow">{home.hero.eyebrow}</p>
            <h1 data-hero="title" className="tt-display text-paper">{home.hero.title}</h1>
            <p data-hero="lead" className="lead max-w-xl">{home.hero.subtitle}</p>
            <div data-hero="ctas" className="mt-10 flex flex-wrap gap-4">
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
          <div id="demo" data-hero="demo" className="scroll-mt-24">
            {/* Hero = the single primary showcase. `ready` (not `instant`) so
                mobile shows the poster instantly and the SDK governor keeps just
                ~1 live context — Instant would auto-downgrade to Ready here
                anyway (Experience Modes §3). */}
            <HeroObject experiencePreviewId={EXP.modernSofa} experienceMode="ready" />
            {/* After the single live showcase, invite visitors to browse the
                full Thridify demo storefront (every product live in 3D/AR). */}
            <div className="mt-6 text-center">
              <a
                href="https://demo.thridify.com"
                target="_blank"
                rel="noopener"
                className="btn btn-ghost px-6 py-3 text-base"
              >
                Explore the full demo store →
              </a>
            </div>
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

      {/* 5. PIPELINE — dark (§7.4). The signature scroll-driven 3D story
          (pinned product, four scrubbed beats) when enabled; the flat
          PipelineStrip otherwise. Feature flag lives in ScrollStory/index. */}
      {SCROLL_STORY_ENABLED ? <ScrollStory /> : <PipelineStrip />}

      {/* 6. VERTICALS GRID — the 6 canonical industries (§7.5/§8), the SAME
          VerticalCard the /industries hub uses (real product renders, one
          look). EACH card links to its own /industries/<slug> SEO page. No
          per-vertical metrics until real, sourced numbers exist (ASSET-DEBT #12). */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-2xl mb-14">
            <SectionHeading eyebrow={home.verticals.eyebrow} title={home.verticals.title} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.slug} delay={i * 0.05}>
                <VerticalCard
                  icon={ind.icon}
                  name={ind.gridName}
                  pain={ind.pain}
                  art={ind.hubArt}
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
                {/* Three live experiences in a row, below the fold → `on-demand`
                    (poster now, load on tap): most visitors won't engage all
                    three, so this avoids warming three heavy contexts at once
                    (Experience Modes §3/§9). */}
                <CapabilityDemo
                  mode={p.id as DemoMode}
                  experiencePreviewId={TRIO_EXPERIENCE[p.id]}
                  experienceMode="on-demand"
                />
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

      {/* 8a. VOICE — the lead REAL customer quote given a full dark-band
          moment (luxury pass, editorial restraint): one voice at display
          scale instead of three equal cards. Same verbatim quote, same
          company-level attribution (No-Faking); layout only. */}
      {leadQuote && (
        <section className="on-dark bg-ink text-paper relative overflow-hidden grain">
          <div
            data-parallax="0.12"
            className="absolute -left-40 -top-40 w-[40rem] h-[40rem] rounded-full bg-primary/15 blur-3xl pointer-events-none"
            aria-hidden
          />
          <div
            data-parallax="0.08"
            className="absolute -right-32 -bottom-40 w-[32rem] h-[32rem] rounded-full bg-accent/10 blur-3xl pointer-events-none"
            aria-hidden
          />
          <div className="container-x section relative">
            <figure className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-2 flex lg:justify-end">
                <span data-fx="rise" className="voice-mark" aria-hidden>
                  &ldquo;
                </span>
              </div>
              <div className="lg:col-span-9">
                <blockquote data-fx="rise" className="tt-1 text-paper max-w-4xl m-0">
                  {leadQuote.quote}
                </blockquote>
                <figcaption data-fx="rise" className="mt-10 flex items-center gap-4">
                  <span className="hairline w-16" aria-hidden />
                  <span className="tt-mono text-primary-soft">{leadQuote.company}</span>
                </figcaption>
              </div>
            </figure>
          </div>
        </section>
      )}

      {/* 8b. PROOF — the 6 canonical impact metrics as a ruled ledger (not a
          card grid), the remaining REAL quotes (verbatim from production
          thridify.com, user-confirmed 2026-07-24) + real client logos
          (§7.6, No-Faking). */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-2xl mb-14">
            <SectionHeading eyebrow={home.proof.eyebrow} title={home.proof.title} />
          </div>
          <dl className="stat-row">
            {home.proof.metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.06}>
                <dd
                  className={`font-mono tabular-nums text-4xl md:text-5xl font-normal tracking-tight ${
                    i === 1 ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {m.value}
                </dd>
                <dt className="mt-3 text-[13px] tracking-[0.08em] uppercase text-foreground/60">{m.label}</dt>
              </Reveal>
            ))}
          </dl>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherQuotes.map((t, i) => (
              <Reveal key={t.company} delay={i * 0.08}>
                <ProofCard quote={t.quote} company={t.company} />
              </Reveal>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
            <span className="text-sm text-foreground/70">Client work includes</span>
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
