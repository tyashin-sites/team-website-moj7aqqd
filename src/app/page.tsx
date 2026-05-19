import Link from 'next/link';
import siteData from '../../content/site.json';
import { Reveal } from '@/components/Reveal';
import { HeroSlideshow, type HeroSlide } from '@/components/HeroSlideshow';
import { ImpactBlock, type ImpactStat, type ClientLogo } from '@/components/ImpactBlock';

// Hero slides — content from thridify.com homepage (verbatim).
const HERO_SLIDES: HeroSlide[] = [
  {
    number: '01',
    title: 'Reimagine how the world experiences your products.',
    subtitle:
      'Empower customers to decide faster, engage deeper, buy with confidence — and see your brand stand apart.',
  },
  {
    number: '02',
    title: "Don't settle for Immersive.",
    subtitle:
      'Immersive experiences blended with interactivity stop scrolls. Turn static product pages into sales-driving journeys.',
  },
  {
    number: '03',
    title: 'Experience is best experienced, not told.',
    subtitle:
      "Instead of selling products' photoshoot, empower customers with 3D and AR experiences that build trust and drive action.",
  },
];

// Impact stats — verbatim from thridify.com "The Thridify Impact" section.
const IMPACT_STATS: ImpactStat[] = [
  { value: 40, suffix: '%', label: 'Lower Product Returns' },
  { value: 3, suffix: 'X', label: 'Higher Conversion Rates' },
  { value: 94, suffix: '%', label: 'More Engagement' },
  { value: 70, suffix: '%', label: 'Lower Photography Cost' },
  { value: 200, suffix: '%', label: 'Higher Click-through Rate' },
  { value: 25, suffix: '%', label: 'Lower Inventory Cost' },
];

// Real client logos (from thridify.com).
const CLIENT_LOGOS: ClientLogo[] = [
  { name: 'Nasher Miles', initials: 'NM' },
  { name: 'Guntier', initials: 'GT' },
  { name: 'Sunbaby', initials: 'SB' },
  { name: 'Vortex Splash', initials: 'VS' },
];

type HomeData = {
  hero: { eyebrow?: string; title: string; subtitle: string; primaryCta: { label: string; href: string }; secondaryCta?: { label: string; href: string }; metrics?: { value: string; label: string }[] };
  clients: { title: string; logos: string[] };
  features: { eyebrow?: string; title: string; subtitle?: string; items: { title: string; description: string; icon?: string }[] };
  stats: { items: { value: string; label: string }[] };
  categories: { eyebrow?: string; title: string; subtitle?: string; items: { name: string; description: string }[] };
  process: { eyebrow?: string; title: string; subtitle?: string; steps: { number: string; title: string; description: string }[] };
  testimonials: { title: string; items: { quote: string; author: string; role?: string }[] };
  team: { eyebrow?: string; title: string; subtitle?: string; offices: { region: string; city: string; phone?: string; whatsapp?: string; email?: string }[] };
  cta: { title: string; subtitle?: string; primaryCta: { label: string; href: string }; secondaryCta?: { label: string; href: string } };
};

const FALLBACK_HOME: HomeData = {
  hero: {
    eyebrow: '3D & AR Commerce',
    title: 'Reimagine how the world experiences your products.',
    subtitle: 'Thridify turns flat product pages into immersive 3D and AR moments.',
    primaryCta: { label: 'Book a Demo', href: '/contact' },
    secondaryCta: { label: 'Explore the Platform', href: '/platform' },
    metrics: [],
  },
  clients: { title: 'Trusted by ambitious commerce teams', logos: [] },
  features: { eyebrow: 'The Platform', title: 'Everything you need to ship a 3D-native storefront.', subtitle: '', items: [] },
  stats: { items: [] },
  categories: { eyebrow: 'Industries', title: 'Built for catalogs that deserve more than flat photos.', subtitle: '', items: [] },
  process: { eyebrow: 'How it works', title: 'From SKU to immersive in days, not quarters.', steps: [] },
  testimonials: { title: 'Brands stop talking about features. They talk about lift.', items: [] },
  team: { eyebrow: 'Global Offices', title: 'Three continents. One immersive commerce platform.', subtitle: '', offices: [] },
  cta: { title: 'Ready to retire flat product pages?', subtitle: '', primaryCta: { label: 'Book a Demo', href: '/contact' }, secondaryCta: { label: 'Explore Platform', href: '/platform' } },
};

function getHome(): HomeData {
  const raw = (siteData as any)?.pages?.home;
  if (!raw || typeof raw !== 'object') return FALLBACK_HOME;
  return {
    hero: raw.hero ?? FALLBACK_HOME.hero,
    clients: raw.clients ?? FALLBACK_HOME.clients,
    features: raw.features ?? FALLBACK_HOME.features,
    stats: raw.stats ?? FALLBACK_HOME.stats,
    categories: raw.categories ?? FALLBACK_HOME.categories,
    process: raw.process ?? FALLBACK_HOME.process,
    testimonials: raw.testimonials ?? FALLBACK_HOME.testimonials,
    team: raw.team ?? FALLBACK_HOME.team,
    cta: raw.cta ?? FALLBACK_HOME.cta,
  };
}

const home = getHome();

export const metadata = {
  title: 'Thridify – Reimagine how the world experiences your products',
  description: 'No-code 3D and AR commerce experiences that boost conversions, reduce returns, and cut photography costs.',
};

export default function HomePage() {
  return (
    <>
      {/* HERO — rotating slides with phone mockup */}
      <HeroSlideshow
        slides={HERO_SLIDES}
        primaryCta={{ label: 'Book A Demo', href: 'https://calendly.com/hello-thridify/30min' }}
        secondaryCta={{ label: 'Talk to Us', href: '/contact' }}
      />

      {/* FEATURES */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-3xl mb-16">
            {home.features.eyebrow && <p className="eyebrow mb-4">{home.features.eyebrow}</p>}
            <h2 className="h-1 text-foreground">{home.features.title}</h2>
            {home.features.subtitle && <p className="mt-6 text-lg text-foreground/70 max-w-2xl">{home.features.subtitle}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(home.features.items ?? []).map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08} className="card p-8 group">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-lg bg-foreground text-background flex items-center justify-center text-xl">
                    {f.icon || '✨'}
                  </div>
                  <span className="text-foreground/30 font-heading font-bold text-sm tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3 tracking-tight">{f.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{f.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT — animated counters + client logo marquee */}
      <ImpactBlock
        title="We don't just create experiences; we drive measurable results"
        highlight="measurable results"
        subtitle="See the tangible impact Thridify brings to businesses like yours."
        stats={IMPACT_STATS}
        logos={CLIENT_LOGOS}
      />

      {/* CATEGORIES / INDUSTRIES */}
      <section className="section">
        <div className="container-x">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div className="max-w-2xl">
              {home.categories.eyebrow && <p className="eyebrow mb-4">{home.categories.eyebrow}</p>}
              <h2 className="h-1">{home.categories.title}</h2>
              {home.categories.subtitle && <p className="mt-5 text-lg text-foreground/70">{home.categories.subtitle}</p>}
            </div>
            <Link href="/industries" className="btn btn-ghost">All industries →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10 rounded-lg overflow-hidden border border-foreground/10">
            {(home.categories.items ?? []).map((c, i) => (
              <Reveal key={c.name} delay={i * 0.05} className="bg-background p-8 hover:bg-surface transition-colors">
                <h3 className="font-heading text-lg font-semibold tracking-tight">{c.name}</h3>
                <p className="mt-3 text-sm text-foreground/65 leading-relaxed">{c.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section bg-surface/50 border-y border-foreground/5">
        <div className="container-x">
          <div className="max-w-3xl mb-16">
            {home.process.eyebrow && <p className="eyebrow mb-4">{home.process.eyebrow}</p>}
            <h2 className="h-1">{home.process.title}</h2>
            {home.process.subtitle && <p className="mt-5 text-lg text-foreground/70">{home.process.subtitle}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(home.process.steps ?? []).map((s, i) => (
              <Reveal key={s.number} delay={i * 0.1} className="relative">
                <div className="font-heading text-7xl font-bold text-primary/30 tracking-tighter leading-none">{s.number}</div>
                <h3 className="mt-4 font-heading text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-foreground/70 leading-relaxed">{s.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container-x">
          <h2 className="h-1 text-center max-w-3xl mx-auto mb-16">{home.testimonials.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(home.testimonials.items ?? []).map((t, i) => (
              <Reveal key={t.author} delay={i * 0.08} as="article" className="card p-8 flex flex-col">
                <div aria-hidden className="font-heading text-5xl text-primary/40 leading-none mb-4">&ldquo;</div>
                <blockquote className="text-lg leading-relaxed text-foreground/85 flex-1">{t.quote}</blockquote>
                <div className="mt-6 pt-6 border-t border-foreground/10">
                  <div className="font-semibold">{t.author}</div>
                  {t.role && <div className="text-sm text-foreground/60 mt-0.5">{t.role}</div>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL OFFICES (team slot) */}
      <section className="section bg-foreground text-background">
        <div className="container-x">
          <div className="max-w-3xl mb-16">
            {home.team.eyebrow && <p className="eyebrow text-background/60 mb-4">{home.team.eyebrow}</p>}
            <h2 className="h-1">{home.team.title}</h2>
            {home.team.subtitle && <p className="mt-5 text-lg text-background/70">{home.team.subtitle}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-background/10 rounded-lg overflow-hidden">
            {(home.team.offices ?? []).map((o, i) => (
              <Reveal key={o.region} delay={i * 0.08} className="bg-foreground p-8">
                <p className="eyebrow text-background/50 mb-3">{o.region}</p>
                <h3 className="font-heading text-2xl font-semibold tracking-tight">{o.city}</h3>
                <div className="mt-6 space-y-2 text-background/80">
                  {o.phone && (
                    <div className="flex items-center gap-3">
                      <a href={`tel:${o.phone.replace(/[^+\d]/g, '')}`} className="hover:text-background transition-colors">{o.phone}</a>
                      {o.whatsapp && (
                        <a href={o.whatsapp} target="_blank" rel="noopener noreferrer" className="text-xs px-2 py-1 rounded-full bg-background/10 hover:bg-background/20 transition-colors">WhatsApp</a>
                      )}
                    </div>
                  )}
                  {o.email && (
                    <a href={`mailto:${o.email}`} className="block hover:text-background transition-colors">{o.email}</a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section relative overflow-hidden aurora grain">
        <div className="container-x relative text-center">
          <h2 className="h-display max-w-4xl mx-auto">{home.cta.title}</h2>
          {home.cta.subtitle && <p className="mt-8 text-xl text-foreground/70 max-w-2xl mx-auto">{home.cta.subtitle}</p>}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={home.cta.primaryCta.href} className="btn btn-primary px-8 py-4 text-base">
              {home.cta.primaryCta.label} →
            </Link>
            {home.cta.secondaryCta && (
              <Link href={home.cta.secondaryCta.href} className="btn btn-ghost px-8 py-4 text-base">
                {home.cta.secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
