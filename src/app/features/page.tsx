import type { Metadata } from "next";
import Link from "next/link";
import {
  LayoutPanelTop,
  Rotate3d,
  Plug,
  BarChart3,
  ShieldCheck,
  Check,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { PILLARS, type Pillar } from "@/lib/features";
import { SITE_URL } from "@/lib/schema";

const CALENDLY = "https://calendly.com/hello-thridify/30min";

// lucide export-name → component (features.ts stays server-safe).
const PILLAR_ICON: Record<Pillar["icon"], LucideIcon> = {
  LayoutPanelTop,
  Rotate3d,
  Plug,
  BarChart3,
  ShieldCheck,
};

// Per-pillar keyword lead (long-tail SEO) + related internal links. Kept in
// the page (not features.ts) so the catalog stays copy-lean; the keyword
// phrases target the queries merchants actually Google.
const PILLAR_SEO: Record<
  Pillar["id"],
  { keyword: string; lead: string; links: { label: string; href: string }[] }
> = {
  studio: {
    keyword: "3D configurator material library",
    lead: "Build a 3D configurator with a full material library — wood, leather, metal, marble — and publish it yourself, no 3D team or code required.",
    links: [
      { label: "3D Modelling Service", href: "/services/3d-modelling" },
      { label: "Furniture", href: "/industries/furniture" },
    ],
  },
  experience: {
    keyword: "AR furniture viewer & 3D product viewer",
    lead: "An AR furniture viewer and interactive 3D product viewer on every PDP — sofas, tables, chairs and beds shoppers can spin, configure and place in their own room.",
    links: [
      { label: "Modular kitchens", href: "/industries/modular-kitchens" },
      { label: "Doors & windows", href: "/industries/doors-and-windows" },
    ],
  },
  distribute: {
    keyword: "embeddable 3D product viewer & one-click plugins",
    lead: "One-click plugins for major commerce platforms, a lightweight embeddable 3D viewer and AR for any storefront, plus API and MCP tooling for custom and enterprise stacks.",
    links: [
      { label: "See all integrations", href: "/integrations" },
      { label: "Custom integration", href: "/integrations/custom-integration" },
    ],
  },
  measure: {
    keyword: "3D commerce analytics",
    lead: "3D commerce analytics show which finishes and colours shoppers explore and which drive the sale — with an event bridge for shopper interactions.",
    links: [{ label: "The platform", href: "/platform" }],
  },
  operate: {
    keyword: "enterprise 3D commerce & data compliance",
    lead: "Multi-user teams, secure token handling, GDPR-ready endpoints and campaign vouchers — enterprise 3D commerce operations for brand teams.",
    links: [
      { label: "Security & practices", href: "/security" },
      { label: "Custom integration", href: "/integrations/custom-integration" },
    ],
  },
};

const FAQS: { q: string; a: string }[] = [
  {
    q: "Does Thridify work with my commerce platform?",
    a: "Yes. Thridify is platform-agnostic: it installs as a one-click plugin on major commerce platforms and as a lightweight embed on any other storefront — product and collection pages, no re-platforming. See the integrations hub for your platform.",
  },
  {
    q: "Can I customize materials and finishes?",
    a: "Yes. A material library (wood, leather, metal, marble) and a texture library with bulk operations let you build variants for colour, finish and texture, and modularize configurable furniture parts — all no-code.",
  },
  {
    q: "Does it work without an app?",
    a: "Yes. AR runs in the browser on any modern smartphone, so shoppers place furniture at true scale in their real room in one tap — no app download.",
  },
  {
    q: "Can I see which finishes convert?",
    a: "Yes. Variant-level view analytics show which finishes and colours win attention, alongside 3D interaction analytics and an event bridge for opens, closes and variant interactions.",
  },
  {
    q: "Do I need a 3D team or code to publish?",
    a: "No. The Studio is a no-code draft-to-live workflow: create, edit and update 3D products, manage variants and materials, and control brand assets yourself. If you need models built, our human-delivered 3D Modelling Service produces AR-ready assets for you.",
  },
  {
    q: "Can I add 3D to any storefront?",
    a: "Yes. An embeddable widget, a CDN-light integration and API token access add the 3D viewer, configurator and AR to WooCommerce, Wix, BigCommerce, Adobe Commerce, commercetools, Squarespace, PrestaShop, Drupal or any custom storefront.",
  },
];

export const metadata: Metadata = {
  title: "Features — Everything Thridify Does",
  description:
    "The full Thridify capability reference: no-code 3D publishing, an interactive 3D viewer and app-free AR, one-click plugins plus embeddable distribution for any storefront, variant-level analytics and enterprise-ready operations.",
  keywords: [
    "3D configurator material library",
    "one-click 3D commerce plugins",
    "ar furniture viewer",
    "3d commerce analytics",
    "no-code 3D product publishing",
    "embeddable 3D product viewer",
  ],
  alternates: { canonical: "/features" },
  openGraph: {
    title: "Thridify Features — the full 3D & AR commerce capability set",
    description:
      "Studio, Experience, Distribute, Measure and Operate — every Thridify capability, grouped into five pillars.",
    url: `${SITE_URL}/features`,
    type: "website",
    siteName: "Thridify",
    images: ["/og/default.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thridify Features — 3D & AR commerce capabilities",
    images: ["/og/default.png"],
  },
};

export default function FeaturesPage() {
  const canonicalUrl = `${SITE_URL}/features`;

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Thridify 3D & AR Commerce Platform",
    serviceType: "3D and AR product visualization for ecommerce",
    description: metadata.description,
    url: canonicalUrl,
    provider: { "@type": "Organization", name: "Thridify", url: SITE_URL },
    areaServed: ["IN", "CA", "US", "GB", "EU"],
    audience: {
      "@type": "BusinessAudience",
      name: "Furniture and retail brands",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Thridify capabilities",
      itemListElement: PILLARS.map((p) => ({
        "@type": "OfferCatalog",
        name: p.label,
        description: p.title,
      })),
    },
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Features",
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Breadcrumb (visible) */}
      <nav aria-label="Breadcrumb" className="container-x pt-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-foreground/70">
          <li>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-foreground/80" aria-current="page">
            Features
          </li>
        </ol>
      </nav>

      {/* HERO — pain-led H1 (6 words ≤12); lead 37 words (≤40). */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 aurora opacity-60 pointer-events-none"
          aria-hidden
        />
        <div className="container-x relative section pt-12">
          <p className="eyebrow">Capability reference</p>
          <h1 className="tt-display max-w-4xl">
            Everything Thridify does for your product pages
          </h1>
          <p className="mt-8 lead max-w-2xl">
            Flat photos stall the sale and drive returns. Thridify turns every
            product page into an interactive 3D showroom — publish it yourself,
            distribute it anywhere, and measure what converts. Here is the full
            capability reference, grouped into five pillars.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Book a Demo
            </a>
            <Link href="/#demo" className="btn btn-ghost">
              Try the live demo
            </Link>
          </div>

          {/* Pillar jump chips — scannable index of the five pillars. */}
          <ul className="mt-12 flex flex-wrap gap-3">
            {PILLARS.map((p) => {
              const Icon = PILLAR_ICON[p.icon];
              return (
                <li key={p.id}>
                  <a
                    href={`#${p.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-foreground/12 bg-surface/50 px-4 py-2 text-sm font-semibold hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    <Icon
                      className="w-4 h-4 text-primary"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    {p.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* FIVE PILLAR SECTIONS — icon chip + benefit H2 + keyword lead + 2-col
          scannable feature list (never a single 37-item wall). */}
      {PILLARS.map((p, i) => {
        const Icon = PILLAR_ICON[p.icon];
        const seo = PILLAR_SEO[p.id];
        const dark = i % 2 === 1;
        return (
          <section
            key={p.id}
            id={p.id}
            className={`section scroll-mt-20 ${dark ? "on-dark bg-ink text-paper" : ""}`}
          >
            <div className="container-x">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      dark
                        ? "bg-primary-soft/10 text-primary-soft"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    <Icon className="w-6 h-6" strokeWidth={1.5} aria-hidden />
                  </span>
                  {/* On dark, `.on-dark .eyebrow` re-tints to --brand-primary-soft
                      teal (globals.css) — no per-page pink override (§1 one-pink). */}
                  <p className="eyebrow mb-0">
                    {String(i + 1).padStart(2, "0")} · {p.label}
                  </p>
                </div>
                <h2 className={`tt-2 ${dark ? "text-paper" : ""}`}>
                  {p.title}
                </h2>
                <p
                  className={`mt-3 font-medium ${dark ? "text-muted-dark" : "text-foreground/70"}`}
                >
                  {p.tagline}
                </p>
                <p
                  className={`mt-4 text-sm leading-relaxed ${dark ? "text-muted-dark" : "text-foreground/70"}`}
                >
                  {seo.lead}
                </p>
              </div>

              <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check
                      className={`w-5 h-5 shrink-0 mt-0.5 ${dark ? "text-primary-soft" : "text-primary"}`}
                      strokeWidth={2}
                      aria-hidden
                    />
                    <span
                      className={`text-sm leading-relaxed ${dark ? "text-paper/90" : "text-foreground/85"}`}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
                {seo.links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`inline-flex items-center gap-1.5 text-sm font-semibold hover:gap-2.5 transition-all ${
                      dark ? "text-primary-soft" : "text-primary"
                    }`}
                  >
                    {l.label} <ArrowRight className="w-4 h-4" aria-hidden />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* FAQ — questions merchants Google (FAQPage schema above). */}
      <section className="section">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <p className="eyebrow">FAQ</p>
            <h2 className="tt-2">Thridify features, answered</h2>
            <p className="mt-4 text-foreground/70">
              The questions furniture and retail brands ask most.
            </p>
          </div>
          <div className="lg:col-span-8 divide-y divide-foreground/10 border-t border-foreground/10">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-heading text-lg font-semibold tracking-tight">
                  {f.q}
                  <ArrowRight
                    className="w-5 h-5 text-primary shrink-0 transition-transform group-open:rotate-90"
                    aria-hidden
                  />
                </summary>
                <p className="mt-3 text-foreground/70 leading-relaxed max-w-2xl">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND — Book a Demo (Calendly) primary + Try the live demo secondary. */}
      <section className="on-dark relative bg-ink text-paper overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 aurora pointer-events-none"
          aria-hidden
        />
        <div className="container-x section relative text-center">
          <h2 className="tt-1 text-paper max-w-3xl mx-auto">
            See every capability on your own catalog.
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary px-8 py-4 text-base"
            >
              Book a Demo
            </a>
            <Link href="/#demo" className="btn btn-ghost px-8 py-4 text-base">
              Try the live demo
            </Link>
          </div>
          <p className="mt-6 text-sm text-muted-dark">
            Or explore{" "}
            <Link
              href="/platform"
              className="text-primary-soft font-semibold hover:underline"
            >
              the platform
            </Link>{" "}
            and{" "}
            <Link
              href="/integrations"
              className="text-primary-soft font-semibold hover:underline"
            >
              all integrations
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
