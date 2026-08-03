import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Boxes,
  Upload,
  ScanLine,
  PackageCheck,
  Layers,
  Gauge,
  ArrowRight,
  Sofa,
  ChefHat,
  DoorOpen,
  type LucideIcon,
} from 'lucide-react';
import { CapabilityDemo } from '@/components/signature/CapabilityDemo';
import { CANONICAL_METRICS } from '@/lib/industries';

const SITE_URL =
  process.env.SITE_URL ?? 'https://site-thridify.snowy-cherry-cd2c.workers.dev';
const CALENDLY = 'https://calendly.com/hello-thridify/30min';
const CANONICAL = '/services/3d-modelling';

// FULLY STATIC — build-time content only, no runtime data.
export const dynamicParams = false;

export const metadata: Metadata = {
  title: '3D Product Modelling Service | glTF, GLB & USDZ',
  description:
    'Outsource 3D product modelling to Thridify. We build photoreal, AR-ready 3D models (glTF/GLB/USDZ) from your catalog — fast turnaround, no in-house 3D team required.',
  keywords: [
    '3D product modelling service',
    '3D model creation for ecommerce',
    'product 3D modelling company',
    'outsource 3D product modelling',
    'glTF GLB USDZ model creation',
    '3D modelling for furniture',
    '3D modelling for retail',
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: '3D Product Modelling Service — Photoreal models, built for you',
    description:
      'Send your catalog. We model each SKU into interactive, AR-ready 3D assets (glTF/GLB/USDZ). Fast turnaround, photoreal, production-ready.',
    url: `${SITE_URL}${CANONICAL}`,
    type: 'website',
    siteName: 'Thridify',
    images: ['/og/services-3d-modelling.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '3D Product Modelling Service | Thridify',
    images: ['/og/services-3d-modelling.png'],
  },
};

const WHAT_YOU_GET: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Boxes,
    title: 'Photoreal, production-ready models',
    body: 'Accurate geometry, PBR materials and true-to-catalog finishes — models that look like the real product, not a rough approximation.',
  },
  {
    icon: Layers,
    title: 'Every AR-ready format',
    body: 'Delivered as glTF/GLB for web and USDZ for iOS Quick Look, draco-compressed and optimised to load fast on any device.',
  },
  {
    icon: Gauge,
    title: 'Fast, predictable turnaround',
    body: 'A clear per-SKU timeline from the first model, so you can plan a rollout across your catalog instead of waiting on a studio.',
  },
];

const HOW_IT_WORKS: { icon: LucideIcon; step: string; title: string; body: string }[] = [
  {
    icon: Upload,
    step: '01',
    title: 'Send your catalog',
    body: 'Share reference photos, dimensions, CAD or spec sheets for the SKUs you want modelled — one product or the whole range.',
  },
  {
    icon: ScanLine,
    step: '02',
    title: 'We model each SKU',
    body: 'Our 3D team builds each product as a photoreal, configurable asset with correct materials, scale and finish variants.',
  },
  {
    icon: PackageCheck,
    step: '03',
    title: 'Delivered or embedded',
    body: 'Get the files (glTF/GLB/USDZ) to use anywhere, or have them live on your product pages inside the Thridify viewer, configurator and AR.',
  },
];

// Canonical impact metrics ONLY (DESIGN-SPEC §7.2) — the ones that honestly
// follow from having real 3D models. No invented numbers.
const OUTCOMES: { key: keyof typeof CANONICAL_METRICS; context: string }[] = [
  { key: 'photography', context: 'One 3D model renders every angle, finish and scene — no photoshoot per variant.' },
  { key: 'returns', context: 'Buyers who see accurate scale, material and finish send back fewer "not as pictured" orders.' },
  { key: 'conversion', context: 'Interactive, configurable products turn browsers into confident buyers.' },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: 'What is a 3D product modelling service?',
    a: 'It is a done-for-you service where our 3D team builds photoreal, interactive models of your products from your references, so you get AR-ready 3D assets without hiring or managing an in-house 3D team.',
  },
  {
    q: 'What file formats do you deliver?',
    a: 'We deliver web-ready glTF/GLB and USDZ for iOS AR Quick Look, draco-compressed and optimised for fast loading. You own the files and can embed them anywhere, or run them inside Thridify.',
  },
  {
    q: 'Can you model my whole catalog?',
    a: 'Yes. Most teams start with a single SKU or a small set to prove the ROI, then expand across the catalog once the impact on conversion and returns is clear.',
  },
  {
    q: 'What do you need from me to start?',
    a: 'Reference photos, dimensions, and any CAD, spec sheets or material samples for each SKU. The more accurate the reference, the more photoreal and true-to-product the model.',
  },
  {
    q: 'Do I need the Thridify platform to use the models?',
    a: 'No. The models are standard glTF/GLB/USDZ files you can use in any 3D or AR pipeline. Pairing them with the Thridify viewer, configurator and AR is optional — and the fastest way to get them selling.',
  },
  {
    q: 'How fast is turnaround?',
    a: 'We agree a clear per-SKU timeline up front so you can plan a rollout. A single hero product can move quickly; larger catalogs are scheduled in batches.',
  },
];

const WEDGE_STEPS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Sofa,
    title: 'Model one SKU',
    body: 'Start with a single hero product — we model it and put it live in interactive 3D.',
  },
  {
    icon: ChefHat,
    title: 'Prove the ROI',
    body: 'Watch it lift conversion, cut returns and replace repeat photoshoots on that one product.',
  },
  {
    icon: DoorOpen,
    title: 'Expand to the platform',
    body: 'Scale modelling across the catalog and add the configurator and app-free AR on top.',
  },
];

export default function ThreeDModellingServicePage() {
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: '3D Product Modelling Service',
    serviceType: '3D product modelling service',
    description:
      'Done-for-you 3D product modelling: photoreal, AR-ready models (glTF/GLB/USDZ) built from your catalog for ecommerce and retail.',
    url: `${SITE_URL}${CANONICAL}`,
    provider: { '@type': 'Organization', name: 'Thridify', url: SITE_URL },
    areaServed: ['CA', 'US', 'IN', 'GB', 'EU'],
    audience: { '@type': 'BusinessAudience', name: 'Retailers, suppliers and manufacturers' },
  };
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
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
      { '@type': 'ListItem', position: 2, name: 'Platform', item: `${SITE_URL}/platform` },
      { '@type': 'ListItem', position: 3, name: '3D Modelling Service', item: `${SITE_URL}${CANONICAL}` },
    ],
  };

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
          <li><Link href="/platform" className="hover:text-primary">Platform</Link></li>
          <li aria-hidden>/</li>
          <li className="text-foreground/80" aria-current="page">3D Modelling Service</li>
        </ol>
      </nav>

      {/* HERO — pain-led, ≤12-word H1 with the primary keyword + live demo */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-60 pointer-events-none" aria-hidden />
        <div className="container-x relative section pt-12 grid lg:grid-cols-2 gap-12 items-center">
          <div className="reveal-stagger">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Boxes className="w-6 h-6" strokeWidth={1.5} aria-hidden />
              </span>
              <p className="eyebrow mb-0">3D Modelling Service</p>
            </div>
            <h1 className="tt-1">Photoreal 3D product models, built for you.</h1>
            <p className="mt-6 lead max-w-xl">
              Send your catalog — our team models each SKU into interactive, AR-ready assets
              (glTF/GLB/USDZ). No photoshoots, no in-house 3D team, no long timelines.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Book a Demo
              </a>
              <Link href="/#demo" className="btn btn-ghost">Try the live demo</Link>
            </div>
          </div>
          <div>
            {/* DEMO-FIRST (§6a): a live model of the kind we deliver. */}
            <CapabilityDemo mode="viewer" aspect="aspect-[4/3]" />
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mb-12">
            <p className="eyebrow">What you get</p>
            <h2 className="tt-2">3D model creation for ecommerce, done for you</h2>
            <p className="mt-4 lead">
              Production-ready models in every format buyers and platforms need — built by our team, not your roadmap.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHAT_YOU_GET.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="card p-7 h-full">
                  <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" strokeWidth={1.5} aria-hidden />
                  </span>
                  <h3 className="font-heading text-lg font-semibold tracking-tight mb-2">{f.title}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{f.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section on-dark bg-ink text-paper">
        <div className="container-x">
          <div className="max-w-3xl mb-12">
            <p className="eyebrow">How it works</p>
            <h2 className="tt-2 text-paper">From catalog to interactive 3D, in three steps</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.step} className="glass-card p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="tt-mono text-primary text-sm">{s.step}</span>
                    <span className="w-10 h-10 rounded-xl bg-primary/15 text-paper flex items-center justify-center">
                      <Icon className="w-5 h-5" strokeWidth={1.5} aria-hidden />
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold tracking-tight mb-2 text-paper">{s.title}</h3>
                  <p className="text-sm text-muted-dark leading-relaxed">{s.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* THE WEDGE — modelling → configurator/AR platform */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-3xl mb-12">
            <p className="eyebrow">Start small, scale up</p>
            <h2 className="tt-2">Outsource 3D product modelling, then grow into the platform</h2>
            <p className="mt-4 lead">
              The fastest path to immersive commerce: model one SKU, prove the return, then expand
              modelling across your catalog and layer on the configurator and app-free AR.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WEDGE_STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="card p-7 h-full relative">
                  <span className="absolute top-6 right-6 tt-mono text-foreground/30 text-sm">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" strokeWidth={1.5} aria-hidden />
                  </span>
                  <h3 className="font-heading text-lg font-semibold tracking-tight mb-2">{s.title}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{s.body}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-8">
            <Link
              href="/platform"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
            >
              See the full platform <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* OUTCOMES — canonical metric set ONLY (§7.2) */}
      <section className="section on-dark bg-ink text-paper">
        <div className="container-x">
          <div className="max-w-3xl mb-12">
            <p className="eyebrow">The impact</p>
            <h2 className="tt-2 text-paper">What real 3D models change</h2>
          </div>
          <dl className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {OUTCOMES.map((o, idx) => {
              const m = CANONICAL_METRICS[o.key];
              return (
                <div key={o.key} className="glass-card p-8">
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

      {/* FAQ — FAQPage schema above */}
      <section className="section">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <p className="eyebrow">FAQ</p>
            <h2 className="tt-2">3D modelling, answered</h2>
            <p className="mt-4 text-foreground/70">The questions teams ask before they outsource modelling.</p>
          </div>
          <div className="lg:col-span-8 divide-y divide-foreground/10 border-t border-foreground/10">
            {FAQS.map((f) => (
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

      {/* CTA BAND */}
      <section className="on-dark relative bg-ink text-paper overflow-hidden">
        <div className="absolute inset-0 opacity-20 aurora pointer-events-none" aria-hidden />
        <div className="container-x section relative text-center">
          <h2 className="tt-1 text-paper max-w-3xl mx-auto">
            Send us one SKU. See it rebuilt in 3D — live.
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
