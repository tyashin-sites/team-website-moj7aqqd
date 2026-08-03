import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { aboutContent } from '@/lib/content';
import { ctaLabel } from '@/lib/cta';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { CTABand } from '@/components/signature/CTABand';

export const metadata: Metadata = {
  title: 'About — Founded in Delhi, scaling from Toronto',
  description:
    'Thridify, by Aapastech Private Limited, was founded in Delhi in 2022. CEO Shikha Gupta now leads North American growth from the Greater Toronto Area.',
  openGraph: {
    title: 'About Thridify',
    description:
      'Founded in Delhi, led from the Greater Toronto Area — the team building no-code 3D and AR commerce.',
    images: ['/og/about.png'],
  },
};

const d = aboutContent;

export default function AboutPage() {
  return (
    <>
      {/* HERO — headline 6 words (≤12); subline 22 words (≤24).
          No stock/Unsplash imagery (DESIGN-SPEC §6) — brand geometry only;
          real team/office photography is tracked in ASSET-DEBT. */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-70" aria-hidden />
        <div className="container-x relative section">
          <div className="max-w-4xl reveal">
            <p className="eyebrow">{d.hero.eyebrow}</p>
            <h1 className="tt-display text-foreground">{d.hero.title}</h1>
            <p className="lead max-w-2xl">{d.hero.subtitle}</p>
          </div>
          {/* Brand mark geometry — the two overlapping rounded squares from
              the Thridify logo, as a dimensional signature (not stock). */}
          <div className="mt-14 relative h-40 md:h-52" aria-hidden>
            <div className="absolute left-4 top-4 w-32 h-32 md:w-44 md:h-44 rounded-3xl bg-accent/70 -rotate-[8deg]" />
            <div className="absolute left-10 top-0 w-32 h-32 md:w-44 md:h-44 rounded-3xl bg-primary rotate-[4deg]" />
            <div className="absolute left-44 md:left-64 top-8 hidden sm:block">
              <div className="accent-line w-40 md:w-64" />
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER STORY — Shikha-fronted per brand rules; Aditya named in
          company context only. Founders are based in Canada — never imply
          physical presence in India. */}
      <section className="section">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={d.founders.eyebrow} title={d.founders.title} />
          </div>
          <div className="lg:col-span-7">
            <div className="space-y-6 text-lg text-foreground/75 leading-relaxed max-w-xl">
              {d.founders.story.map((p, i) => (
                <Reveal key={i} delay={i * 0.08} as="div">
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Shikha Gupta — Co-Founder &amp; CEO
              </span>
              <span className="px-4 py-2 rounded-full bg-surface text-foreground/70 text-sm font-medium border border-foreground/10">
                Aditya Gupta — Co-Founder &amp; CTO
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION — ≤80 words (currently 47). Dark showroom interlude with a
          brand-abstract visual (two-square logo geometry) so the About page
          never runs >2 consecutive text-only sections (D-4, §3). No stock/
          team photos (ASSET-DEBT #15). */}
      <section className="on-dark section bg-ink text-paper overflow-hidden">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 max-w-2xl">
            <p className="eyebrow">{d.mission.eyebrow}</p>
            <h2 className="tt-1 text-paper">{d.mission.title}</h2>
            <p className="lead">{d.mission.body}</p>
          </div>
          {/* Brand-mark geometry on dark — the overlapping rounded squares
              from the Thridify logo, a dimensional signature (not stock). One
              pink element in this viewport (§1). */}
          <div className="lg:col-span-5 relative h-48 md:h-60" aria-hidden>
            <div className="absolute right-10 top-6 w-32 h-32 md:w-44 md:h-44 rounded-3xl bg-accent/70 -rotate-[8deg]" />
            <div className="absolute right-16 top-0 w-32 h-32 md:w-44 md:h-44 rounded-3xl bg-primary rotate-[4deg]" />
            <div className="absolute right-0 bottom-4 hidden sm:block">
              <div className="accent-line w-40 md:w-56" />
            </div>
          </div>
        </div>
      </section>

      {/* GLOBAL PRESENCE — India / Americas / Europe cards. */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-2xl mb-12">
            <SectionHeading eyebrow={d.presence.eyebrow} title={d.presence.title} />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {d.presence.items.map((o, i) => (
              <Reveal key={o.region} delay={i * 0.08} className="card p-7">
                <div className="text-xs uppercase tracking-[0.18em] text-foreground/70">{o.region}</div>
                <div className="mt-2 font-heading font-bold text-2xl">{o.city}</div>
                {o.detail && <p className="mt-2 text-sm text-foreground/65">{o.detail}</p>}
                <div className="mt-5 flex flex-wrap gap-3 text-sm">
                  {o.phone && (
                    <a
                      href={`tel:${o.phoneRaw ?? o.phone.replace(/[^+\d]/g, '')}`}
                      className="underline underline-offset-4 hover:text-primary whitespace-nowrap"
                    >
                      {o.phone}
                    </a>
                  )}
                  {o.whatsapp && (
                    <a
                      href={o.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:opacity-80"
                    >
                      WhatsApp <ArrowUpRight className="inline w-3.5 h-3.5 align-[-0.125em]" aria-hidden />
                    </a>
                  )}
                  {o.email && !o.phone && (
                    <a href={`mailto:${o.email}`} className="underline underline-offset-4 hover:text-primary">
                      {o.email}
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section bg-surface/40 border-y border-foreground/10">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={d.values.eyebrow} title={d.values.title} />
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {d.values.items.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08} className="rounded-lg border border-foreground/10 bg-background/60 p-7">
                <div className="font-heading font-bold text-lg flex items-center gap-3">
                  <span className="text-primary font-mono text-sm">0{i + 1}</span>
                  {v.title}
                </div>
                <p className="mt-3 text-foreground/70 leading-relaxed">{v.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <CTABand headline={d.cta.title} ctaLabel={ctaLabel(d.cta.primaryCta) || 'Book a Demo'} />
    </>
  );
}
