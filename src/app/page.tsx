import Link from 'next/link';
import siteData from '../../content/site.json';

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

const home = (siteData as unknown as { pages: { home: HomeData } }).pages.home;

export const metadata = {
  title: 'Thridify — Reimagine how the world experiences your products',
  description: 'No-code 3D and AR commerce experiences that boost conversions, reduce returns, and cut photography costs.',
};

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden aurora grain">
        <div className="container-x section relative">
          <div className="max-w-4xl reveal">
            {home.hero.eyebrow && <p className="eyebrow mb-6">{home.hero.eyebrow}</p>}
            <h1 className="h-display text-foreground">{home.hero.title}</h1>
            <p className="mt-8 text-xl md:text-2xl text-foreground/70 leading-relaxed max-w-2xl">
              {home.hero.subtitle}
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Link href={home.hero.primaryCta.href} className="btn btn-primary text-base px-7 py-4">
                {home.hero.primaryCta.label}
                <span aria-hidden>→</span>
              </Link>
              {home.hero.secondaryCta && (
                <Link href={home.hero.secondaryCta.href} className="btn btn-ghost text-base px-7 py-4">
                  {home.hero.secondaryCta.label}
                </Link>
              )}
            </div>
          </div>

          {home.hero.metrics && (
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/10 rounded-lg overflow-hidden border border-foreground/10">
              {home.hero.metrics.map((m) => (
                <div key={m.label} className="bg-background/80 backdrop-blur p-6 md:p-8">
                  <div className="font-heading text-3xl md:text-4xl font-bold tracking-tight">{m.value}</div>
                  <div className="mt-2 text-sm text-foreground/60">{m.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CLIENTS / INTEGRATIONS */}
      <section className="border-y border-foreground/5 bg-surface/40">
        <div className="container-x py-12">
          <p className="eyebrow text-center mb-8">{home.clients.title}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {home.clients.logos.map((logo) => (
              <span key={logo} className="text-foreground/50 font-heading font-semibold text-lg tracking-tight">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-3xl mb-16">
            {home.features.eyebrow && <p className="eyebrow mb-4">{home.features.eyebrow}</p>}
            <h2 className="h-1 text-foreground">{home.features.title}</h2>
            {home.features.subtitle && <p className="mt-6 text-lg text-foreground/70 max-w-2xl">{home.features.subtitle}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {home.features.items.map((f, i) => (
              <div key={f.title} className="card p-8 group">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-lg bg-foreground text-background flex items-center justify-center text-xl">
                    {f.icon || '◆'}
                  </div>
                  <span className="text-foreground/30 font-heading font-bold text-sm tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3 tracking-tight">{f.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 aurora pointer-events-none" aria-hidden />
        <div className="container-x py-20 md:py-24 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
            {home.stats.items.map((s) => (
              <div key={s.label}>
                <div className="font-heading text-5xl md:text-6xl font-bold tracking-tight">{s.value}</div>
                <div className="mt-3 text-sm uppercase tracking-[0.18em] text-background/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
            {home.categories.items.map((c) => (
              <div key={c.name} className="bg-background p-8 hover:bg-surface transition-colors">
                <h3 className="font-heading text-lg font-semibold tracking-tight">{c.name}</h3>
                <p className="mt-3 text-sm text-foreground/65 leading-relaxed">{c.description}</p>
              </div>
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
            {home.process.steps.map((s) => (
              <div key={s.number} className="relative">
                <div className="font-heading text-7xl font-bold text-foreground/10 tracking-tighter leading-none">{s.number}</div>
                <h3 className="mt-4 font-heading text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-foreground/70 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container-x">
          <h2 className="h-1 text-center max-w-3xl mx-auto mb-16">{home.testimonials.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {home.testimonials.items.map((t) => (
              <figure key={t.author} className="card p-8 flex flex-col">
                <div aria-hidden className="font-heading text-5xl text-foreground/20 leading-none mb-4">&ldquo;</div>
                <blockquote className="text-lg leading-relaxed text-foreground/85 flex-1">{t.quote}</blockquote>
                <figcaption className="mt-6 pt-6 border-t border-foreground/10">
                  <div className="font-semibold">{t.author}</div>
                  {t.role && <div className="text-sm text-foreground/60 mt-0.5">{t.role}</div>}
                </figcaption>
              </figure>
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
            {home.team.offices.map((o) => (
              <div key={o.region} className="bg-foreground p-8">
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
              </div>
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
