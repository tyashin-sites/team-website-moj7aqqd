import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import siteData from '@/../content/site.json';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Thridify by Aapastech Private Limited — building no-code 3D and AR commerce experiences for the next decade of online retail.',
};

type AboutData = {
  hero: { eyebrow?: string; title: string; subtitle?: string };
  mission: { title: string; body: string[]; image?: string };
  stats: { items: { value: string; label: string }[] };
  team: { title: string; subtitle?: string; members: { name: string; role: string; image?: string }[] };
  values: { title: string; subtitle?: string; items: { title: string; body: string }[] };
  cta: { title: string; subtitle?: string; primaryCta?: { text: string; href: string }; secondaryCta?: { text: string; href: string } };
  offices?: { city: string; country: string; phone?: string; whatsapp?: string }[];
};

const HERO_IMG =
  'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201600%20900%22%20preserveAspectRatio%3D%22xMidYMid%20slice%22%3E%3Cdefs%3E%3CradialGradient%20id%3D%22g1%22%20cx%3D%2235%25%22%20cy%3D%2256%25%22%20r%3D%2260%25%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23238064%22%20stop-opacity%3D%22.6%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23238064%22%20stop-opacity%3D%220%22%2F%3E%3C%2FradialGradient%3E%3CradialGradient%20id%3D%22g2%22%20cx%3D%2286%25%22%20cy%3D%2266%25%22%20r%3D%2260%25%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%237daa98%22%20stop-opacity%3D%22.5%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%237daa98%22%20stop-opacity%3D%220%22%2F%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%221600%22%20height%3D%22900%22%20fill%3D%22%23fbbecb%22%2F%3E%3Crect%20width%3D%221600%22%20height%3D%22900%22%20fill%3D%22url(%23g1)%22%2F%3E%3Crect%20width%3D%221600%22%20height%3D%22900%22%20fill%3D%22url(%23g2)%22%2F%3E%3C%2Fsvg%3E';

const MISSION_IMG =
  'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201280%201600%22%20preserveAspectRatio%3D%22xMidYMid%20slice%22%3E%3Cdefs%3E%3CradialGradient%20id%3D%22g1%22%20cx%3D%2232%25%22%20cy%3D%2231%25%22%20r%3D%2260%25%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23238064%22%20stop-opacity%3D%22.6%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23238064%22%20stop-opacity%3D%220%22%2F%3E%3C%2FradialGradient%3E%3CradialGradient%20id%3D%22g2%22%20cx%3D%2280%25%22%20cy%3D%2272%25%22%20r%3D%2260%25%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%237daa98%22%20stop-opacity%3D%22.5%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%237daa98%22%20stop-opacity%3D%220%22%2F%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%221280%22%20height%3D%221600%22%20fill%3D%22%23fbbecb%22%2F%3E%3Crect%20width%3D%221280%22%20height%3D%221600%22%20fill%3D%22url(%23g1)%22%2F%3E%3Crect%20width%3D%221280%22%20height%3D%221600%22%20fill%3D%22url(%23g2)%22%2F%3E%3C%2Fsvg%3E';

const TEAM_IMG = (i: number) =>
  `data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201600%201600%22%20preserveAspectRatio%3D%22xMidYMid%20slice%22%3E%3Cdefs%3E%3CradialGradient%20id%3D%22g1${i}%22%20cx%3D%22${50 + i}%25%22%20cy%3D%2238%25%22%20r%3D%2260%25%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23238064%22%20stop-opacity%3D%22.6%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23238064%22%20stop-opacity%3D%220%22%2F%3E%3C%2FradialGradient%3E%3CradialGradient%20id%3D%22g2${i}%22%20cx%3D%2282%25%22%20cy%3D%2280%25%22%20r%3D%2260%25%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%237daa98%22%20stop-opacity%3D%22.5%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%237daa98%22%20stop-opacity%3D%220%22%2F%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%221600%22%20height%3D%221600%22%20fill%3D%22%23fbbecb%22%2F%3E%3Crect%20width%3D%221600%22%20height%3D%221600%22%20fill%3D%22url(%23g1${i})%22%2F%3E%3Crect%20width%3D%221600%22%20height%3D%221600%22%20fill%3D%22url(%23g2${i})%22%2F%3E%3C%2Fsvg%3E`;

const FALLBACK: AboutData = {
  hero: {
    eyebrow: 'About Thridify',
    title: 'We help brands turn flat catalogs into living, breathing experiences.',
    subtitle:
      'Thridify is a 3D and Augmented Reality commerce platform by Aapastech Private Limited — built for a generation of shoppers who want to explore, configure, and visualise products before they buy.',
  },
  mission: {
    title: 'Our mission',
    body: [
      'E-commerce was built on flat photographs. We believe the next decade belongs to spatial commerce — interactive 3D, real-time configuration, and AR experiences that meet customers in their living rooms.',
      'Thridify exists to make that future accessible to every brand. No code. No 3D team required. Just measurable lifts in conversion, fewer returns, and a product story that travels everywhere your customer is.',
    ],
    image: MISSION_IMG,
  },
  stats: {
    items: [
      { value: '8+', label: 'Platforms integrated' },
      { value: '40%', label: 'Avg. conversion lift' },
      { value: '3', label: 'Continents served' },
      { value: '0', label: 'Lines of code needed' },
    ],
  },
  team: {
    title: 'Built by builders.',
    subtitle: 'A small, senior team of engineers, 3D artists, and commerce operators across India, Canada, and Europe.',
    members: [
      { name: 'Founding Engineering', role: 'Real-time 3D & AR pipeline', image: TEAM_IMG(1) },
      { name: '3D Studio', role: 'Photoreal asset creation', image: TEAM_IMG(2) },
      { name: 'Customer Success', role: 'Onboarding & integrations', image: TEAM_IMG(3) },
      { name: 'Product & Design', role: 'Configurator UX', image: TEAM_IMG(4) },
    ],
  },
  values: {
    title: 'How we build',
    subtitle: 'Four principles that guide every product decision.',
    items: [
      { title: 'Outcomes over features', body: 'We measure ourselves on conversion, return rate, and content cost — not on shipping logos.' },
      { title: 'Zero-code by default', body: 'If it requires a developer, it isn\u2019t done. Marketers should ship 3D experiences themselves.' },
      { title: 'Photoreal, always', body: 'Our pipeline produces assets that look like product photography — because that\u2019s the bar shoppers expect.' },
      { title: 'Every device, every shopper', body: 'App-free AR on any modern smartphone. No friction between curiosity and conversion.' },
    ],
  },
  offices: [
    { city: 'Delhi', country: 'India', phone: '+91-966-774-7082', whatsapp: 'https://wa.me/919667747082' },
    { city: 'Toronto', country: 'Canada', phone: '+1-437-800-0190', whatsapp: 'https://wa.me/14378000190' },
    { city: 'Tallinn', country: 'Estonia' },
  ],
  cta: {
    title: 'See your product in 3D in 14 days.',
    subtitle: 'Bring us a single SKU. We\u2019ll show you what spatial commerce can do for your conversion rate.',
    primaryCta: { text: 'Book a Demo', href: '/contact' },
    secondaryCta: { text: 'Explore the platform', href: '/platform' },
  },
};

function read(): AboutData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = (siteData as any).pages?.about;
  if (!raw || raw.ref) return FALLBACK;
  return { ...FALLBACK, ...raw };
}

export default function AboutPage() {
  const d = read();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-70" aria-hidden />
        <div className="container-x relative section pb-20 md:pb-28">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8 reveal">
              {d.hero.eyebrow && <div className="eyebrow mb-6">{d.hero.eyebrow}</div>}
              <h1 className="h-display text-foreground max-w-5xl">{d.hero.title}</h1>
              {d.hero.subtitle && (
                <p className="mt-8 text-lg md:text-xl text-foreground/70 leading-relaxed max-w-2xl">
                  {d.hero.subtitle}
                </p>
              )}
            </div>
            <div className="lg:col-span-4 hidden lg:block">
              <div className="flex flex-col gap-3 text-sm font-medium text-foreground/60">
                <span className="inline-flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Aapastech Private Limited</span>
                <span className="inline-flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Founded for spatial commerce</span>
                <span className="inline-flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Offices in IN \u00B7 CA \u00B7 EE</span>
              </div>
            </div>
          </div>

          <div className="mt-16 relative overflow-hidden rounded-lg border border-foreground/10">
            <Image
              src={HERO_IMG}
              alt="Thridify — global team building 3D and AR commerce"
              width={1600}
              height={900}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="section">
        <div className="container-x grid lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-lg overflow-hidden aspect-[4/5] border border-foreground/10">
              <Image src={d.mission.image || MISSION_IMG} alt="Our mission" fill className="object-cover" />
            </div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="eyebrow mb-5">Mission</div>
            <h2 className="h-1 text-foreground">{d.mission.title}</h2>
            <div className="mt-8 space-y-6 text-lg text-foreground/75 leading-relaxed max-w-xl">
              {d.mission.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 md:py-20 border-y border-foreground/10 bg-surface/50">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-10">
          {d.stats.items.map((s, i) => (
            <div key={i} className="text-left">
              <div className="font-heading font-bold text-5xl md:text-6xl tracking-tight text-foreground">{s.value}</div>
              <div className="mt-3 text-xs uppercase tracking-[0.18em] text-foreground/55">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-2xl">
            <div className="eyebrow mb-5">Team</div>
            <h2 className="h-1 text-foreground">{d.team.title}</h2>
            {d.team.subtitle && <p className="mt-6 text-lg text-foreground/70">{d.team.subtitle}</p>}
          </div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {d.team.members.map((m, i) => (
              <div key={i} className="card p-5">
                <div className="relative aspect-square rounded-md overflow-hidden mb-5">
                  <Image src={m.image || TEAM_IMG(i)} alt={m.name} fill className="object-cover" />
                </div>
                <div className="font-heading font-semibold text-lg text-foreground">{m.name}</div>
                <div className="text-sm text-foreground/60 mt-1">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section bg-surface/40 border-y border-foreground/10">
        <div className="container-x">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <div className="eyebrow mb-5">Principles</div>
              <h2 className="h-1 text-foreground">{d.values.title}</h2>
              {d.values.subtitle && <p className="mt-6 text-lg text-foreground/70 max-w-md">{d.values.subtitle}</p>}
            </div>
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
              {d.values.items.map((v, i) => (
                <div key={i} className="rounded-lg border border-foreground/10 bg-background/60 p-7">
                  <div className="font-heading font-bold text-lg flex items-center gap-3">
                    <span className="text-primary font-mono text-sm">0{i + 1}</span>
                    {v.title}
                  </div>
                  <p className="mt-3 text-foreground/70 leading-relaxed">{v.body}</p>
                </div>
              ))}
            </div>
          </div>

          {d.offices && d.offices.length > 0 && (
            <div className="mt-20">
              <div className="eyebrow mb-6">Global presence</div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {d.offices.map((o, i) => (
                  <div key={i} className="rounded-lg border border-foreground/10 bg-background/60 p-6">
                    <div className="text-xs uppercase tracking-[0.18em] text-foreground/50">{o.country}</div>
                    <div className="mt-2 font-heading font-bold text-2xl">{o.city}</div>
                    {o.phone && (
                      <div className="mt-4 flex flex-wrap gap-3 text-sm">
                        <a href={`tel:${o.phone.replace(/[^+\d]/g, '')}`} className="underline underline-offset-4 hover:text-primary">
                          {o.phone}
                        </a>
                        {o.whatsapp && (
                          <a href={o.whatsapp} target="_blank" rel="noopener noreferrer" className="text-primary hover:opacity-80">
                            WhatsApp \u2192
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-80" aria-hidden />
        <div className="container-x relative section text-center">
          <h2 className="h-1 text-foreground max-w-3xl mx-auto">{d.cta.title}</h2>
          {d.cta.subtitle && <p className="mt-6 text-lg text-foreground/70 max-w-xl mx-auto">{d.cta.subtitle}</p>}
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            {d.cta.primaryCta && (
              <Link href={d.cta.primaryCta.href} className="btn btn-primary">
                {d.cta.primaryCta.text}
              </Link>
            )}
            {d.cta.secondaryCta && (
              <Link href={d.cta.secondaryCta.href} className="btn btn-ghost">
                {d.cta.secondaryCta.text}
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
