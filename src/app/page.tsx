import Link from 'next/link';
import siteData from '../../content/site.json';
import {
  Sofa,
  ChefHat,
  Car,
  DoorOpen,
  GraduationCap,
  ShoppingBag,
  Wrench,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { HeroSlideshow, type HeroSlide } from '@/components/HeroSlideshow';
import { ImpactBlock, type ImpactStat, type ClientLogo } from '@/components/ImpactBlock';

// Pick an icon for each category name. Falls back to ✨ Sparkles for
// anything we don't recognize. Keys are matched case-insensitively
// against the start of the category name, so "Modular Kitchens" matches
// "kitchen", "Doors & Windows" matches "door", etc.
function iconForCategory(name: string) {
  const n = name.toLowerCase();
  if (n.includes('kitchen')) return ChefHat;
  if (n.includes('door') || n.includes('window')) return DoorOpen;
  if (n.includes('school') || n.includes('education')) return GraduationCap;
  if (n.includes('auto') || n.includes('car') || n.includes('vehicle')) return Car;
  if (n.includes('machinery') || n.includes('industrial')) return Wrench;
  if (n.includes('retail') || n.includes('store') || n.includes('shop')) return ShoppingBag;
  if (n.includes('furniture') || n.includes('decor') || n.includes('sofa')) return Sofa;
  return Sparkles;
}

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

// Real client logos — pulled from thridify.com's WordPress media library.
// next.config.ts allows any HTTPS host via `remotePatterns: [{ hostname: '**' }]`.
const CLIENT_LOGOS: ClientLogo[] = [
  { name: 'Nasher Miles', logoUrl: 'https://thridify.com/wp-content/uploads/2025/09/NM.png' },
  { name: 'Guntier', logoUrl: 'https://thridify.com/wp-content/uploads/2025/09/Guntier-1.png' },
  { name: 'Sunbaby', logoUrl: 'https://thridify.com/wp-content/uploads/2025/09/SUN_BABY.png' },
  { name: 'Vortex Splash', logoUrl: 'https://thridify.com/wp-content/uploads/2025/09/Vortex-1.png' },
];

type HomeData = {
  hero: { eyebrow?: string; title: string; subtitle: string; primaryCta: { label: string; href: string }; secondaryCta?: { label: string; href: string }; metrics?: { value: string; label: string }[] };
  clients: { title: string; logos: string[] };
  features: { eyebrow?: string; title: string; subtitle?: string; items: { title: string; description: string; icon?: string }[] };
  stats: { items: { value: string; label: string }[] };
  categories: { eyebrow?: string; title: string; subtitle?: string; items: { name: string; description: string }[] };
  process: { eyebrow?: string; title: string; subtitle?: string; steps: { number: string; title: string; description: string }[] };
  testimonials: { title: string; items: { quote: string; author?: string; name?: string; role?: string }[] };
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(home.categories.items ?? []).map((c, i) => {
              const Icon = iconForCategory(c.name);
              return (
                <Reveal
                  key={c.name}
                  delay={i * 0.05}
                  className="group relative rounded-2xl border border-foreground/10 bg-surface/40 p-7 transition-all duration-300 hover:bg-surface hover:-translate-y-1 hover:shadow-lg hover:border-primary/20 cursor-pointer overflow-hidden"
                >
                  {/* decorative blob */}
                  <div
                    className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500"
                    aria-hidden
                  />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-contrast transition-colors duration-300">
                      <Icon className="w-7 h-7" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-heading text-lg font-semibold tracking-tight mb-2">
                      {c.name}
                    </h3>
                    <p className="text-sm text-foreground/65 leading-relaxed">{c.description}</p>
                    <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      Explore <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </Reveal>
              );
            })}
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
      <section className="section bg-surface/30">
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="eyebrow">Customer Stories</span>
            <h2 className="h-1 mt-2">{home.testimonials.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(home.testimonials.items ?? []).map((t, i) => {
              // Editor stores authors under either `name` (canonical) or
              // `author` (legacy). Accept both.
              const author = t.name || t.author || '';
              const initials = author
                .split(' ')
                .map((w) => w[0])
                .filter(Boolean)
                .slice(0, 2)
                .join('')
                .toUpperCase();
              return (
                <Reveal
                  key={i}
                  delay={i * 0.08}
                  as="article"
                  className="relative rounded-2xl bg-background border border-foreground/10 p-8 flex flex-col shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    aria-hidden
                    className="absolute -top-3 left-7 w-10 h-10 rounded-full bg-primary text-primary-contrast flex items-center justify-center font-heading text-2xl leading-none shadow-md"
                  >
                    &ldquo;
                  </div>
                  <blockquote className="text-base leading-relaxed text-foreground/85 flex-1 mt-2">
                    {t.quote}
                  </blockquote>
                  {author && (
                    <div className="mt-6 pt-6 border-t border-foreground/10 flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
                        {initials || '★'}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{author}</div>
                        {t.role && (
                          <div className="text-sm text-foreground/55 mt-0.5">{t.role}</div>
                        )}
                      </div>
                    </div>
                  )}
                </Reveal>
              );
            })}
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
