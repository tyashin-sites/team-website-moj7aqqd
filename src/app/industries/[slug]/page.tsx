import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Sofa,
  ChefHat,
  DoorOpen,
  Warehouse,
  Wrench,
  Layers,
  RotateCcw,
  SlidersHorizontal,
  Smartphone,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import {
  INDUSTRIES,
  CANONICAL_METRICS,
  getIndustry,
  type Industry,
} from '@/lib/industries';
import { industryStaticParams } from '@/lib/site-routes';
import type { DemoMode } from '@/components/signature/CapabilityDemo';
import { CapabilityDemo } from '@/components/signature/CapabilityDemo';
import { ProofCard } from '@/components/signature/ProofCard';

const SITE_URL =
  process.env.SITE_URL ?? 'https://team-website-moj7aqqd.sites.tyashin.com';
const CALENDLY = 'https://calendly.com/hello-thridify/30min';

// Real quote only (No-Faking) — verbatim from production thridify.com.
const GUNTIER_QUOTE =
  'Our sales cycle has reduced from months to days and sometimes to hours with Thridify.';

const INDUSTRY_ICON: Record<Industry['icon'], LucideIcon> = {
  sofa: Sofa,
  kitchen: ChefHat,
  door: DoorOpen,
  prefab: Warehouse,
  machinery: Wrench,
  laminate: Layers,
};

const CAPABILITY_META: Record<DemoMode, { label: string; icon: LucideIcon }> = {
  viewer: { label: '3D 360° Viewer', icon: RotateCcw },
  configurator: { label: '3D Configurator', icon: SlidersHorizontal },
  ar: { label: 'AR Viewer', icon: Smartphone },
};

// Statically generate one page per canonical vertical (DESIGN-SPEC §8).
export function generateStaticParams() {
  // Sourced from the single site-routes list so the prerendered set and the
  // page sitemap (/sitemap-pages.xml) can never diverge. See src/lib/site-routes.ts.
  return industryStaticParams();
}

// FULLY STATIC (not ISR). The 6 canonical verticals are 100% build-time
// content (src/lib/industries.ts — no runtime/external data), so with
// generateStaticParams + dynamicParams:false + NO `revalidate` Next prerenders
// all 6 into fully-static HTML that OpenNext-Cloudflare emits to
// `.open-next/assets/industries/<slug>.html` and serves directly via the
// ASSETS binding — no incremental cache, so no cache-MISS 404. Any non-canonical
// slug falls through to a genuine framework 404 (dynamicParams:false), not a
// soft-404. (The prior ISR `revalidate=3600` made notFound() serve HTTP 200
// under OpenNext because this project configures no incremental-cache binding;
// see open-next.config.ts.)
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) return {};
  const canonical = `/industries/${ind.slug}`;
  const og = `/og/industry-${ind.slug}.png`;
  return {
    title: ind.seoTitle,
    description: ind.seoDescription,
    keywords: ind.keywords,
    alternates: { canonical },
    openGraph: {
      title: `${ind.seoTitle} | Thridify`,
      description: ind.seoDescription,
      url: `${SITE_URL}${canonical}`,
      type: 'website',
      siteName: 'Thridify',
      images: [og],
    },
    twitter: { card: 'summary_large_image', title: `${ind.seoTitle} | Thridify`, images: [og] },
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();

  const canonicalUrl = `${SITE_URL}/industries/${ind.slug}`;
  const HeroIcon = INDUSTRY_ICON[ind.icon];

  // ── JSON-LD (addendum §3b): Service + FAQPage + BreadcrumbList ──────────
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Thridify for ${ind.name}`,
    serviceType: ind.primaryKeyword,
    description: ind.seoDescription,
    url: canonicalUrl,
    provider: {
      '@type': 'Organization',
      name: 'Thridify',
      url: SITE_URL,
    },
    areaServed: ['IN', 'CA', 'US', 'GB', 'EU'],
    audience: { '@type': 'BusinessAudience', name: ind.name },
  };
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ind.faqs.map((f) => ({
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
      { '@type': 'ListItem', position: 2, name: 'Industries', item: `${SITE_URL}/industries` },
      { '@type': 'ListItem', position: 3, name: ind.name, item: canonicalUrl },
    ],
  };

  const related = ind.related
    .map((slug) => INDUSTRIES.find((i) => i.slug === slug))
    .filter((x): x is Industry => Boolean(x));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* Breadcrumb (visible) */}
      <nav aria-label="Breadcrumb" className="container-x pt-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-foreground/70">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/industries" className="hover:text-primary">Industries</Link></li>
          <li aria-hidden>/</li>
          <li className="text-foreground/80" aria-current="page">{ind.name}</li>
        </ol>
      </nav>

      {/* HERO — pain-led, keyword H1, live demo (DEMO-FIRST §6a) */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-60 pointer-events-none" aria-hidden />
        <div className="container-x relative section pt-12 grid lg:grid-cols-2 gap-12 items-center">
          <div className="reveal-stagger">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <HeroIcon className="w-6 h-6" strokeWidth={1.5} aria-hidden />
              </span>
              <p className="eyebrow mb-0">{ind.hero.eyebrow}</p>
            </div>
            <h1 className="tt-1">{ind.hero.h1}</h1>
            <p className="mt-6 lead max-w-xl">{ind.hero.subtitle}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Book a Demo
              </a>
              <Link href="/#demo" className="btn btn-ghost">Try the live demo</Link>
            </div>
          </div>
          <div>
            <CapabilityDemo
              mode={ind.heroDemo}
              aspect="aspect-[4/3]"
              model={ind.demoModel}
              poster={ind.demoPoster}
              modelLabel={ind.name.toLowerCase()}
              priority
            />
          </div>
        </div>
      </section>

      {/* HOW THRIDIFY HELPS <INDUSTRY> — capability → sales workflow */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mb-12">
            <p className="eyebrow">How it works</p>
            <h2 className="tt-2">How Thridify helps {ind.name.toLowerCase()}</h2>
            <p className="mt-4 lead">{ind.helpsIntro}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ind.helps.map((h) => {
              const cap = CAPABILITY_META[h.capability];
              const CapIcon = cap.icon;
              return (
                <div key={h.heading} className="card p-7 h-full">
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <CapIcon className="w-5 h-5" strokeWidth={1.5} aria-hidden />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
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

      {/* OUTCOMES — canonical metric set ONLY (§7.2), industry-framed */}
      <section className="section on-dark bg-ink text-paper">
        <div className="container-x">
          <div className="max-w-3xl mb-12">
            <p className="eyebrow">The impact</p>
            <h2 className="tt-2 text-paper">What {ind.name.toLowerCase()} sellers gain</h2>
          </div>
          <dl className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ind.outcomes.map((o, idx) => {
              const m = CANONICAL_METRICS[o.metric];
              return (
                <div key={o.metric} className="glass-card p-8">
                  <dd className={`font-mono tabular-nums text-4xl md:text-5xl font-medium ${idx === 0 ? 'text-accent' : 'text-paper'}`}>
                    {m.value}
                  </dd>
                  <dt className="mt-2 text-muted-dark">{m.label}</dt>
                  <dd className="mt-3 text-sm text-muted-dark leading-relaxed">{o.context}</dd>
                </div>
              );
            })}
          </dl>
          {ind.showGuntierQuote && (
            <div className="mt-8 max-w-2xl">
              <ProofCard quote={GUNTIER_QUOTE} company="Guntier" />
            </div>
          )}
        </div>
      </section>

      {/* FAQ — real questions the industry Googles (FAQPage schema above) */}
      <section className="section">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <p className="eyebrow">FAQ</p>
            <h2 className="tt-2">{ind.name}, answered</h2>
            <p className="mt-4 text-foreground/70">The questions buyers and teams ask most.</p>
          </div>
          <div className="lg:col-span-8 divide-y divide-foreground/10 border-t border-foreground/10">
            {ind.faqs.map((f) => (
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

      {/* RELATED + PLATFORM internal links (no ghost links, addendum §3d) */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <h2 className="tt-2">Explore related industries</h2>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link href="/services/3d-modelling" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all">
                Need the models built? 3D modelling service <ArrowRight className="w-4 h-4" aria-hidden />
              </Link>
              <Link href="/platform" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all">
                See the full platform <ArrowRight className="w-4 h-4" aria-hidden />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((r) => {
              const RIcon = INDUSTRY_ICON[r.icon];
              return (
                <Link
                  key={r.slug}
                  href={`/industries/${r.slug}`}
                  className="group card p-6 flex items-start gap-4 hover:-translate-y-1 transition-ui"
                >
                  <span className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-contrast transition-colors">
                    <RIcon className="w-5 h-5" strokeWidth={1.5} aria-hidden />
                  </span>
                  <span>
                    <span className="block font-heading font-semibold tracking-tight group-hover:text-primary transition-colors">
                      {r.name}
                    </span>
                    <span className="block mt-1 text-sm text-foreground/60 leading-relaxed">{r.pain}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA BAND — Book a Demo (Calendly) primary + Try the live demo secondary */}
      <section className="on-dark relative bg-ink text-paper overflow-hidden">
        <div className="absolute inset-0 opacity-20 aurora pointer-events-none" aria-hidden />
        <div className="container-x section relative text-center">
          <h2 className="tt-1 text-paper max-w-3xl mx-auto">
            See your {ind.name.toLowerCase()} range rebuilt in 3D — live.
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
