import type { Metadata } from 'next';
import { Sofa, ChefHat, Wrench } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { FormField, inputClass } from '@/components/FormField';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { HeroObject } from '@/components/signature/HeroObject';
import { MetricBar } from '@/components/signature/MetricBar';
import { PipelineStrip } from '@/components/signature/PipelineStrip';
import { BeforeAfter } from '@/components/signature/BeforeAfter';
import { CTABand } from '@/components/signature/CTABand';
import { VerticalCard } from '@/components/signature/VerticalCard';
import { ProofCard } from '@/components/signature/ProofCard';

/**
 * /gallery — internal component QA surface (BUILD-PLAN Phase 1 exit gate:
 * "Lighthouse perf ≥ 85 mobile on a component gallery page"). Renders every
 * design-system + signature component in both light and dark contexts so
 * auditors can verify them live.
 *
 * NOT part of the public site: no nav/sitemap entry links here, and the
 * route is force-noindexed below so it stays out of indexes even after the
 * preview-wide noindex is lifted at launch (Phase 7).
 */

export const metadata: Metadata = {
  title: 'Component Gallery (internal QA)',
  robots: { index: false, follow: false },
};

function Swatch({ name, hex, border = false }: { name: string; hex: string; border?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`w-10 h-10 rounded-md ${border ? 'border border-foreground/15' : ''}`}
        style={{ backgroundColor: hex }}
        aria-hidden
      />
      <span className="tt-mono">{name} · {hex}</span>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <>
      {/* ── Intro ─────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="Internal QA"
            title="Component gallery"
            lead="Every design-system and signature component, rendered live in light and dark contexts. Not linked from the public site; noindexed."
          />
        </div>
      </section>

      {/* ── Palette ───────────────────────────────────────────────────── */}
      <section className="section pt-0">
        <div className="container-x">
          <h2 className="tt-2">Canonical palette</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Swatch name="primary" hex="#007050" />
            <Swatch name="primary-deep" hex="#004D37" />
            <Swatch name="accent" hex="#FEBFCC" />
            <Swatch name="ink" hex="#021F17" />
            <Swatch name="paper" hex="#FFFFFF" border />
            <Swatch name="paper-tint" hex="#F0F5FA" border />
            <Swatch name="muted-dark" hex="#A3BFB5" />
            <Swatch name="primary-soft (on-dark)" hex="#6FCFAB" />
          </div>
        </div>
      </section>

      {/* ── Typography + eyebrow, light ───────────────────────────────── */}
      <section className="section pt-0">
        <div className="container-x">
          <p className="eyebrow">Eyebrow on light</p>
          <p className="tt-display">Display tt-display</p>
          <p className="tt-1">Heading tt-1</p>
          <p className="tt-2">Heading tt-2</p>
          <p className="lead max-w-2xl">Lead paragraph — clamp-based, line-height 1.55, used for section intros under 40 words.</p>
          <p className="tt-mono mt-4">tt-mono 0.8125rem · $1,249 · BOM-4417</p>
          <p className="tt-mono text-lg mt-2">tt-mono + text-lg utility (must render 18px — cascade-layer check)</p>
        </div>
      </section>

      {/* ── Buttons, light ────────────────────────────────────────────── */}
      <section className="section pt-0">
        <div className="container-x">
          <h2 className="tt-2">Buttons — light surface</h2>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#buttons" className="btn btn-primary">Primary</a>
            <a href="#buttons" className="btn btn-ghost">Ghost on light</a>
            <Button variant="primary">Button primary</Button>
            <Button variant="ghost">Button ghost</Button>
            <button type="button" className="btn btn-primary" disabled>Disabled</button>
          </div>
        </div>
      </section>

      {/* ── Dark surface: buttons, eyebrow, glass card ───────────────── */}
      <section className="on-dark section bg-ink text-paper">
        <div className="container-x">
          <p className="eyebrow">Eyebrow on dark (primary-soft)</p>
          <h2 className="tt-2 text-paper">Dark showroom surface</h2>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#dark" className="btn btn-primary">Primary on dark</a>
            <a href="#dark" className="btn btn-ghost">Ghost on dark (.on-dark)</a>
            <a href="#dark" className="btn btn-ghost-dark">Ghost via .btn-ghost-dark</a>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            <div className="glass-card p-6">
              <h3 className="font-heading font-medium text-lg">Glass card</h3>
              <p className="mt-1.5 text-sm text-muted-dark">rgba(0,112,80,.08) bg, teal border, blur.</p>
            </div>
            <div className="glass-card p-6">
              <p className="lead">Lead on dark — muted-dark via .on-dark.</p>
            </div>
          </div>
          <div className="accent-line mt-10 max-w-xs" aria-hidden />
        </div>
      </section>

      {/* ── Cards + FormField ─────────────────────────────────────────── */}
      <section className="section">
        <div className="container-x grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="tt-2">Card</h2>
            <Card>
              <h3 className="font-heading text-xl font-semibold mb-2">Card primitive</h3>
              <p className="text-foreground/70">16px radius, teal-cast shadow, −4px hover lift.</p>
            </Card>
          </div>
          <div>
            <h2 className="tt-2">FormField</h2>
            <form className="space-y-5 max-w-md" aria-label="Gallery demo form">
              <FormField label="Work email" htmlFor="g-email">
                <input id="g-email" type="email" name="email" autoComplete="email" className={inputClass} placeholder="you@company.com" />
              </FormField>
              <FormField label="Product category" htmlFor="g-cat">
                <input id="g-cat" type="text" name="category" autoComplete="organization-title" className={inputClass} placeholder="e.g. Furniture" />
              </FormField>
            </form>
          </div>
        </div>
      </section>

      {/* ── SectionHeading variants ───────────────────────────────────── */}
      <section className="section bg-surface/50">
        <div className="container-x space-y-12">
          <SectionHeading eyebrow="Left aligned" title="SectionHeading default" lead="Eyebrow + title + lead, left aligned." />
          <SectionHeading eyebrow="Centered" title="SectionHeading centered" lead="Centered — CTA bands only." center />
        </div>
      </section>
      <section className="on-dark section bg-ink text-paper">
        <div className="container-x">
          <SectionHeading eyebrow="On dark" title="SectionHeading dark" lead="Dark variant with muted-dark lead." dark />
        </div>
      </section>

      {/* ── VerticalCard ──────────────────────────────────────────────── */}
      <section className="section">
        <div className="container-x">
          <h2 className="tt-2">VerticalCard</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <VerticalCard icon={Sofa} name="Furniture" pain="Shoppers can’t judge scale or fabric from flat photos." metric="75% lower product returns" />
            <VerticalCard icon={ChefHat} name="Modular Kitchens" pain="Quotes stall while layouts bounce between sales and design." />
            <VerticalCard icon={Wrench} name="Industrial Machinery" pain="Internals and motion are invisible in a brochure PDF." />
          </div>
        </div>
      </section>

      {/* ── Signature components, full width ─────────────────────────── */}
      <section className="on-dark section bg-ink text-paper">
        <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="eyebrow">HeroObject</p>
            <h2 className="tt-2 text-paper">Showroom hero object</h2>
            <p className="lead">Poster-first, deferred model-viewer, swatches, mono price ticker, AR chip.</p>
          </div>
          <HeroObject />
        </div>
      </section>

      <MetricBar />

      {/* ── ProofCard ─────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container-x">
          <h2 className="tt-2">ProofCard</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <ProofCard
              quote="Our sales cycle has reduced from months to days and sometimes to hours with Thridify."
              company="Guntier"
            />
            <ProofCard quote="Thridify is just Wow." company="Sunbaby" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <h2 className="tt-2">BeforeAfter</h2>
          <BeforeAfter />
        </div>
      </section>

      <PipelineStrip />

      <CTABand />
    </>
  );
}
