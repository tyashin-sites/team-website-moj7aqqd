import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  SITE_URL,
  CANONICAL_DESCRIPTION,
  LEGAL_NAME,
} from '@/lib/schema';
import { CANONICAL_METRICS } from '@/lib/industries';

const CALENDLY = 'https://calendly.com/hello-thridify/30min';
const CANONICAL = '/what-is-thridify';

// FULLY STATIC — declarative, build-time content only.
export const dynamicParams = false;

export const metadata: Metadata = {
  title: 'What is Thridify? No-code 3D & AR commerce platform',
  description:
    'Thridify is a no-code 3D and AR commerce platform and 3D modelling service for furniture, kitchen, door and custom-product brands — 3D configurators, app-free AR and photoreal 3D models.',
  keywords: [
    'what is Thridify',
    'no-code 3D commerce platform',
    'AR commerce platform',
    '3D product configurator',
    '3D modelling service',
    'app-free AR viewer',
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'What is Thridify?',
    description: CANONICAL_DESCRIPTION,
    url: `${SITE_URL}${CANONICAL}`,
    type: 'website',
    siteName: 'Thridify',
    images: ['/og/default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What is Thridify?',
    images: ['/og/default.png'],
  },
};

// Declarative Q → one-line-answer blocks. Structured for machine extraction:
// each H2 is a question, each first sentence is a complete, quotable answer.
const SECTIONS: { id: string; q: string; answer: string; more?: string[] }[] = [
  {
    id: 'what',
    q: 'What is Thridify?',
    answer: CANONICAL_DESCRIPTION,
    more: [
      'Thridify is built and operated by Aapastech Private Limited.',
      'It is "no-code": brands add 3D and AR to their product pages without writing code or building a 3D team.',
    ],
  },
  {
    id: 'who',
    q: 'Who is Thridify for?',
    answer:
      'Thridify is for furniture, modular-kitchen, door-and-window, prefab-structure, industrial-machinery and laminate brands that sell configurable or custom products.',
    more: [
      'It fits retailers, suppliers and manufacturers whose products vary by size, finish or material.',
      'It is used by ecommerce and B2B sales teams that need to show a product before it is built.',
    ],
  },
  {
    id: 'what-it-does',
    q: 'What does Thridify do?',
    answer:
      'Thridify turns flat product photos into interactive 3D and AR experiences that shoppers can rotate, configure and view in their own space.',
    more: [
      'Thridify offers five products: a 3D 360° Viewer, a 3D Configurator with live pricing, an app-free AR Viewer, a done-for-you 3D Modelling Service, and Analytics.',
      'The 3D Modelling Service is human-delivered: Thridify models a brand’s catalog into interactive, AR-ready assets (glTF/GLB/USDZ) — no in-house 3D team required.',
      'It integrates with Shopify, WooCommerce, WordPress and custom storefronts.',
    ],
  },
  {
    id: 'different',
    q: 'How is Thridify different?',
    answer:
      'Thridify pairs a no-code 3D and AR platform with a done-for-you 3D modelling service, so brands get the 3D assets AND the experience from one vendor.',
    more: [
      'Its AR is app-free: shoppers view products in their room from the browser, with no app to install.',
      'Thridify does not do automated content generation — 3D models are built by its modelling team, not generated as synthetic photos or video.',
      'Teams typically start by modelling one SKU to prove ROI, then expand to the configurator and AR across the catalog.',
    ],
  },
];

// Canonical impact metrics ONLY (DESIGN-SPEC §7.2). No other numbers on-site.
const PROOF_KEYS: (keyof typeof CANONICAL_METRICS)[] = [
  'returns',
  'conversion',
  'engagement',
  'photography',
  'ctr',
  'inventory',
];

const FACTS: { label: string; value: string }[] = [
  { label: 'Category', value: 'No-code 3D & AR commerce platform + 3D modelling service' },
  { label: 'Products', value: '3D 360° Viewer, 3D Configurator, AR Viewer, 3D Modelling Service, Analytics' },
  { label: 'Industries', value: 'Furniture, modular kitchens, doors & windows, prefab structures, industrial machinery, laminates & surfaces' },
  { label: 'Integrations', value: 'Shopify, WooCommerce, WordPress, custom storefronts' },
  { label: 'Model formats', value: 'glTF, GLB, USDZ (photoreal, AR-ready)' },
  { label: 'Company', value: `${LEGAL_NAME} (parent company)` },
  { label: 'Founders', value: 'Shikha Gupta (CEO), Aditya Gupta (CTO)' },
  { label: 'Geography', value: 'Founded in Delhi, India; North American expansion from the Greater Toronto Area' },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: 'What is Thridify in one sentence?',
    a: CANONICAL_DESCRIPTION,
  },
  {
    q: 'Is Thridify a platform or a service?',
    a: 'Both. Thridify is a no-code 3D and AR commerce platform, and it also offers a done-for-you 3D modelling service that builds photoreal, AR-ready models from your catalog.',
  },
  {
    q: 'Does Thridify require an app for AR?',
    a: 'No. Thridify’s AR viewer is app-free — shoppers view products in their own space directly from the browser, with no app to download.',
  },
  {
    q: 'What platforms does Thridify integrate with?',
    a: 'Thridify integrates with Shopify, WooCommerce, WordPress and custom storefronts.',
  },
  {
    q: 'Who is behind Thridify?',
    a: 'Thridify is built by Aapastech Private Limited, founded by Shikha Gupta (CEO) and Aditya Gupta (CTO). It was founded in Delhi, India, with North American expansion from the Greater Toronto Area.',
  },
];

export default function WhatIsThridifyPage() {
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
      { '@type': 'ListItem', position: 2, name: 'What is Thridify?', item: `${SITE_URL}${CANONICAL}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* Breadcrumb (visible) */}
      <nav aria-label="Breadcrumb" className="container-x pt-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-foreground/70">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li aria-hidden>/</li>
          <li className="text-foreground/80" aria-current="page">What is Thridify?</li>
        </ol>
      </nav>

      {/* HERO — H1 + canonical description VERBATIM as the first BODY
          paragraph (not an oversized .lead). DESIGN-SPEC §8 exception: the
          canonical entity description is a machine-extraction surface rendered
          verbatim and is exempt from the §3 lead/subline word caps; as body
          prose (2 sentences) it still satisfies §3's ≤3-sentence rule. */}
      <section className="container-x section pt-12">
        <p className="eyebrow">Fact sheet</p>
        <h1 className="tt-1 max-w-4xl">What is Thridify?</h1>
        <p className="mt-6 max-w-[65ch] text-foreground/80 leading-relaxed">{CANONICAL_DESCRIPTION}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Book a Demo
          </a>
          <Link href="/#demo" className="btn btn-ghost">Try the live demo</Link>
        </div>
      </section>

      {/* FACTS TABLE — dense, machine-readable key/value pairs. */}
      <section className="container-x section pt-0">
        <h2 className="tt-2">Thridify at a glance</h2>
        <dl className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10 rounded-2xl overflow-hidden">
          {FACTS.map((row) => (
            <div key={row.label} className="bg-background p-6">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">{row.label}</dt>
              <dd className="text-foreground/80 leading-relaxed">{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Q-STYLE SECTIONS — each first sentence is a complete, quotable answer. */}
      <section className="container-x section pt-0">
        <div className="grid gap-12 max-w-3xl">
          {SECTIONS.map((s) => (
            <div key={s.id} id={s.id}>
              <h2 className="tt-2">{s.q}</h2>
              <p className="mt-4 lead">{s.answer}</p>
              {s.more && (
                <ul className="mt-5 space-y-3">
                  {s.more.map((m) => (
                    <li key={m} className="flex gap-3 text-foreground/80 leading-relaxed">
                      <ArrowRight className="w-5 h-5 text-primary shrink-0 mt-1" aria-hidden />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* PROOF — canonical metrics only (§7.2). */}
      <section className="section on-dark bg-ink text-paper">
        <div className="container-x">
          <p className="eyebrow">The impact</p>
          <h2 className="tt-2 text-paper">What Thridify changes for brands</h2>
          <dl className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-6">
            {PROOF_KEYS.map((k, idx) => {
              const m = CANONICAL_METRICS[k];
              return (
                <div key={k} className="glass-card p-6">
                  <dd className={`font-mono tabular-nums text-3xl md:text-4xl font-medium ${idx === 0 ? 'text-accent' : 'text-paper'}`}>
                    {m.value}
                  </dd>
                  <dt className="mt-2 text-sm text-muted-dark">{m.label}</dt>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      {/* FAQ — FAQPage schema above. */}
      <section className="container-x section">
        <p className="eyebrow">FAQ</p>
        <h2 className="tt-2">Thridify, answered</h2>
        <div className="mt-8 max-w-3xl divide-y divide-foreground/10 border-t border-foreground/10">
          {FAQS.map((f) => (
            <div key={f.q} className="py-5">
              <h3 className="font-heading text-lg font-semibold tracking-tight">{f.q}</h3>
              <p className="mt-2 text-foreground/70 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related links (no ghost links — all resolve). */}
      <section className="container-x section pt-0">
        <h2 className="tt-2">Explore Thridify</h2>
        <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
          <Link href="/platform" className="text-primary hover:underline">The platform →</Link>
          <Link href="/services/3d-modelling" className="text-primary hover:underline">3D Modelling Service →</Link>
          <Link href="/industries" className="text-primary hover:underline">Industries →</Link>
          <Link href="/about" className="text-primary hover:underline">About →</Link>
          <Link href="/compare/threekit" className="text-primary hover:underline">Thridify vs Threekit →</Link>
          <Link href="/compare/zakeke" className="text-primary hover:underline">Thridify vs Zakeke →</Link>
          <Link href="/compare/marxent" className="text-primary hover:underline">Thridify vs Marxent →</Link>
        </div>
      </section>
    </>
  );
}
