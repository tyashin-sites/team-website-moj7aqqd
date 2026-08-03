import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Plug,
  ShoppingBag,
  LayoutTemplate,
  Store,
  ShoppingCart,
  Boxes,
  Palette,
  Globe,
  Code2,
  RotateCcw,
  SlidersHorizontal,
  Smartphone,
  ArrowRight,
  Check,
  type LucideIcon,
} from 'lucide-react';
import {
  INTEGRATIONS,
  INTEGRATION_SLUGS,
  CANONICAL_METRICS,
  getIntegration,
  type Integration,
} from '@/lib/integrations';
import { INDUSTRIES, type Industry } from '@/lib/industries';
import type { DemoMode } from '@/components/signature/CapabilityDemo';
import { CapabilityDemo } from '@/components/signature/CapabilityDemo';

const SITE_URL =
  process.env.SITE_URL ?? 'https://site-thridify.snowy-cherry-cd2c.workers.dev';
const CALENDLY = 'https://calendly.com/hello-thridify/30min';

const INTEGRATION_ICON: Record<Integration['icon'], LucideIcon> = {
  plugin: Plug,
  shopify: ShoppingBag,
  wix: LayoutTemplate,
  bigcommerce: Store,
  magento: ShoppingCart,
  headless: Boxes,
  canva: Palette,
  wordpress: Globe,
  code: Code2,
};

const CAPABILITY_META: Record<DemoMode, { label: string; icon: LucideIcon }> = {
  viewer: { label: '3D 360° Viewer', icon: RotateCcw },
  configurator: { label: '3D Configurator', icon: SlidersHorizontal },
  ar: { label: 'AR Viewer', icon: Smartphone },
};

// Statically generate one page per integration. dynamicParams:false + NO
// `revalidate` → Next prerenders all 9 to fully-static HTML that
// OpenNext-Cloudflare emits to `.open-next/assets/integrations/<slug>.html` and
// serves via the ASSETS binding. Any non-canonical slug is a genuine framework
// 404 (not a soft-404 200). This is the OpenNext SSG fix that closed F-1 — see
// the /industries/[slug] note.
export function generateStaticParams() {
  return INTEGRATION_SLUGS.map((slug) => ({ slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const it = getIntegration(slug);
  if (!it) return {};
  const canonical = `/integrations/${it.slug}`;
  const og = '/og/default.png';
  return {
    title: it.seoTitle,
    description: it.seoDescription,
    keywords: it.keywords,
    alternates: { canonical },
    openGraph: {
      title: `${it.seoTitle} | Thridify`,
      description: it.seoDescription,
      url: `${SITE_URL}${canonical}`,
      type: 'website',
      siteName: 'Thridify',
      images: [og],
    },
    twitter: { card: 'summary_large_image', title: `${it.seoTitle} | Thridify`, images: [og] },
  };
}

export default async function IntegrationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const it = getIntegration(slug);
  if (!it) notFound();

  const canonicalUrl = `${SITE_URL}/integrations/${it.slug}`;
  const HeroIcon = INTEGRATION_ICON[it.icon];

  // ── JSON-LD (addendum §3b): Service + FAQPage + BreadcrumbList ──────────
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Thridify for ${it.name}`,
    serviceType: it.primaryKeyword,
    description: it.seoDescription,
    url: canonicalUrl,
    provider: { '@type': 'Organization', name: 'Thridify', url: SITE_URL },
    areaServed: ['IN', 'CA', 'US', 'GB', 'EU'],
    audience: { '@type': 'BusinessAudience', name: `${it.name} merchants` },
  };
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: it.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Integrations', item: `${SITE_URL}/integrations` },
      { '@type': 'ListItem', position: 3, name: it.name, item: canonicalUrl },
    ],
  };

  const related = it.related
    .map((s) => INTEGRATIONS.find((i) => i.slug === s))
    .filter((x): x is Integration => Boolean(x));
  const relatedIndustries = it.relatedIndustries
    .map((s) => INDUSTRIES.find((i) => i.slug === s))
    .filter((x): x is Industry => Boolean(x));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* Breadcrumb (visible) */}
      <nav aria-label="Breadcrumb" className="container-x pt-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-foreground/55">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/integrations" className="hover:text-primary">Integrations</Link></li>
          <li aria-hidden>/</li>
          <li className="text-foreground/80" aria-current="page">{it.name}</li>
        </ol>
      </nav>

      {/* HERO — keyword H1, live demo (DEMO-FIRST §6a) */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-60 pointer-events-none" aria-hidden />
        <div className="container-x relative section pt-12 grid lg:grid-cols-2 gap-12 items-center">
          <div className="reveal-stagger">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <HeroIcon className="w-6 h-6" strokeWidth={1.5} aria-hidden />
              </span>
              <p className="eyebrow mb-0">{it.hero.eyebrow}</p>
            </div>
            <h1 className="tt-1">{it.hero.h1}</h1>
            <p className="mt-6 lead max-w-xl">{it.hero.subtitle}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Book a Demo
              </a>
              <Link href="/#demo" className="btn btn-ghost">Try the live demo</Link>
            </div>
          </div>
          <div>
            <CapabilityDemo mode={it.heroDemo} aspect="aspect-[4/3]" modelLabel={`${it.name} product`} />
          </div>
        </div>
      </section>

      {/* HOW THRIDIFY INTEGRATES WITH <PLATFORM> — the real mechanism */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mb-10">
            <p className="eyebrow">How it integrates</p>
            <h2 className="tt-2">How Thridify integrates with {it.name}</h2>
            <p className="mt-4 lead">{it.integrationIntro}</p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary">
              <Plug className="w-4 h-4" strokeWidth={1.75} aria-hidden />
              {it.installLabel}
            </p>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {it.steps.map((s, idx) => (
              <li key={s.heading} className="card p-7 h-full">
                <span className="font-mono tabular-nums text-sm text-primary">{`0${idx + 1}`}</span>
                <h3 className="font-heading text-lg font-semibold tracking-tight mt-3 mb-2">{s.heading}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* WHAT YOU GET — capabilities framed for this platform's merchants */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mb-12">
            <p className="eyebrow">What you get</p>
            <h2 className="tt-2">3D, AR and configuration on {it.name}</h2>
            <p className="mt-4 lead">{it.helpsIntro}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {it.helps.map((h) => {
              const cap = CAPABILITY_META[h.capability];
              const CapIcon = cap.icon;
              return (
                <div key={h.heading} className="card p-7 h-full">
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <CapIcon className="w-5 h-5" strokeWidth={1.5} aria-hidden />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-foreground/50">
                      {cap.label}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold tracking-tight mb-2">{h.heading}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{h.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OUTCOMES — canonical metric set ONLY (§7.2), platform-framed */}
      <section className="section on-dark bg-ink text-paper">
        <div className="container-x">
          <div className="max-w-3xl mb-12">
            <p className="eyebrow">The impact</p>
            <h2 className="tt-2 text-paper">What {it.name} merchants gain</h2>
          </div>
          <dl className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {it.outcomes.map((o, idx) => {
              const m = CANONICAL_METRICS[o.metric];
              return (
                <div key={o.metric} className="glass-card p-8">
                  <dd className={`font-mono tabular-nums text-4xl md:text-5xl font-medium ${idx === 0 ? 'text-accent' : 'text-paper'}`}>
                    {m.value}
                  </dd>
                  <dt className="mt-2 text-muted-dark">{m.label}</dt>
                  <p className="mt-3 text-sm text-muted-dark leading-relaxed">{o.context}</p>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      {/* FAQ — real questions merchants Google (FAQPage schema above) */}
      <section className="section">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <p className="eyebrow">FAQ</p>
            <h2 className="tt-2">{it.name} integration, answered</h2>
            <p className="mt-4 text-foreground/70">The questions {it.name} merchants ask most.</p>
          </div>
          <div className="lg:col-span-8 divide-y divide-foreground/10 border-t border-foreground/10">
            {it.faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-heading text-lg font-semibold tracking-tight">
                  {f.q}
                  <ArrowRight className="w-5 h-5 text-primary shrink-0 transition-transform group-open:rotate-90" aria-hidden />
                </summary>
                <p className="mt-3 text-foreground/70 leading-relaxed max-w-2xl">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED integrations + industries + PLATFORM (no ghost links, §3d) */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <h2 className="tt-2">Explore more integrations</h2>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link href="/integrations" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all">
                All integrations <ArrowRight className="w-4 h-4" aria-hidden />
              </Link>
              <Link href="/platform" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all">
                See the full platform <ArrowRight className="w-4 h-4" aria-hidden />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((r) => {
              const RIcon = INTEGRATION_ICON[r.icon];
              return (
                <Link
                  key={r.slug}
                  href={`/integrations/${r.slug}`}
                  className="group card p-6 flex items-start gap-4 hover:-translate-y-1 transition-ui"
                >
                  <span className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-contrast transition-colors">
                    <RIcon className="w-5 h-5" strokeWidth={1.5} aria-hidden />
                  </span>
                  <span>
                    <span className="block font-heading font-semibold tracking-tight group-hover:text-primary transition-colors">
                      {r.name}
                    </span>
                    <span className="block mt-1 text-sm text-foreground/60 leading-relaxed">{r.tagline}</span>
                  </span>
                </Link>
              );
            })}
          </div>

          {relatedIndustries.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm">
              <span className="inline-flex items-center gap-1.5 text-foreground/55">
                <Check className="w-4 h-4 text-primary" aria-hidden /> Popular for:
              </span>
              {relatedIndustries.map((r, i) => (
                <span key={r.slug} className="inline-flex items-center gap-2">
                  <Link href={`/industries/${r.slug}`} className="font-semibold text-primary hover:underline">
                    {r.name}
                  </Link>
                  {i < relatedIndustries.length - 1 && <span aria-hidden className="text-foreground/30">·</span>}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA BAND — Book a Demo (Calendly) primary + Try the live demo secondary */}
      <section className="on-dark relative bg-ink text-paper overflow-hidden">
        <div className="absolute inset-0 opacity-20 aurora pointer-events-none" aria-hidden />
        <div className="container-x section relative text-center">
          <h2 className="tt-1 text-paper max-w-3xl mx-auto">
            Add 3D & AR to your {it.name} store — live.
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn btn-primary px-8 py-4 text-base">
              Book a Demo
            </a>
            <Link href="/#demo" className="btn btn-ghost px-8 py-4 text-base">
              Try the live demo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
