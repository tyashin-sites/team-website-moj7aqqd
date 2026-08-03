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
import { platformContent } from "@/lib/content";
import { ctaLabel } from "@/lib/cta";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import {
  ProductVisual,
  type ProductVisualVariant,
} from "@/components/ProductVisual";
import {
  CapabilityDemo,
  type DemoMode,
} from "@/components/signature/CapabilityDemo";
import { CTABand } from "@/components/signature/CTABand";
import { WebsiteSchema } from "@/components/SiteSchema";
import { SITE_URL } from "@/lib/schema";
import { PILLARS, getPillar, topFeatures, type Pillar } from "@/lib/features";

// The three product capabilities that CAN be shown as a live interactive
// demo (DEMO-FIRST, §6a). Studio/Distribute/Operate have no interactive form,
// so they render as scannable capability sections (last resort per §6a).
const DEMO_MODES = new Set<string>(["viewer", "configurator", "ar"]);

const PILLAR_ICON: Record<Pillar["icon"], LucideIcon> = {
  LayoutPanelTop,
  Rotate3d,
  Plug,
  BarChart3,
  ShieldCheck,
};

export const metadata: Metadata = {
  title: "Platform — 3D & AR Commerce, Five Pillars",
  description:
    "The Thridify platform across five pillars: Studio (no-code 3D publishing), Experience (3D viewer, configurator, app-free AR), Distribute (one-click Shopify plus embeddable everywhere), Measure (variant-level analytics) and Operate (enterprise-ready teams and compliance).",
  alternates: { canonical: "/platform" },
  openGraph: {
    title:
      "The Thridify Platform — Studio · Experience · Distribute · Measure · Operate",
    description:
      "No-code 3D publishing, an interactive viewer + app-free AR, one-click Shopify, variant-level analytics and enterprise operations — one immersive commerce stack.",
    url: `${SITE_URL}/platform`,
    images: ["/og/platform.png"],
  },
};

const c = platformContent;

// Canonical modules mapped into the pillar narrative:
//   Experience → 3D 360° Viewer · 3D Configurator · AR Viewer (live demos)
//   3D Modelling Service → its own offering (human-delivered)
//   Measure → Analytics
const experienceModules = c.products.items.filter((p) =>
  ["viewer", "configurator", "ar"].includes(p.id),
);
const modelling = c.products.items.find((p) => p.id === "modelling");
const analytics = c.products.items.find((p) => p.id === "analytics");

// Small reusable pillar header (icon chip + benefit headline + tagline).
function PillarHeader({
  pillarId,
  dark,
}: {
  pillarId: Pillar["id"];
  dark?: boolean;
}) {
  const p = getPillar(pillarId);
  const Icon = PILLAR_ICON[p.icon];
  return (
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
        {/* On dark, `.on-dark .eyebrow` re-tints to --brand-primary-soft teal
            (globals.css) — no per-page pink override (§1 one-pink). */}
        <p className="eyebrow mb-0">{p.label}</p>
      </div>
      <h2 className={`tt-2 ${dark ? "text-paper" : ""}`}>{p.title}</h2>
      <p
        className={`mt-3 font-medium ${dark ? "text-muted-dark" : "text-foreground/70"}`}
      >
        {p.tagline}
      </p>
    </div>
  );
}

// Curated (not full) benefit-feature list — the full capability catalog
// (37 unique capabilities; API token access is framed under two pillars) lives
// on /features.
function FeatureList({
  pillarId,
  count,
  dark,
}: {
  pillarId: Pillar["id"];
  count: number;
  dark?: boolean;
}) {
  const items = topFeatures(pillarId, count);
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
      {items.map((f) => (
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
  );
}

function SeeAll({
  pillarId,
  dark,
}: {
  pillarId: Pillar["id"];
  dark?: boolean;
}) {
  return (
    <Link
      href={`/features#${pillarId}`}
      className={`inline-flex items-center gap-1.5 text-sm font-semibold hover:gap-2.5 transition-all ${
        dark ? "text-primary-soft" : "text-primary"
      }`}
    >
      See all capabilities <ArrowRight className="w-4 h-4" aria-hidden />
    </Link>
  );
}

export default function PlatformPage() {
  return (
    <>
      {/* WebSite entity — Home + /platform only, on top of sitewide EntitySchema. */}
      <WebsiteSchema />

      {/* HERO — headline 6 words (≤12); subline 14 words (≤24). */}
      <section className="relative aurora overflow-hidden">
        <div className="container-x relative section text-center">
          <p className="eyebrow reveal">{c.hero.eyebrow}</p>
          <h1 className="tt-display mt-6 max-w-5xl mx-auto reveal">
            {c.hero.title}
          </h1>
          <p className="mt-8 lead max-w-2xl mx-auto reveal">
            {c.hero.subtitle}
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center reveal">
            {c.hero.primaryCta && (
              <a
                href={c.hero.primaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                {ctaLabel(c.hero.primaryCta)}
              </a>
            )}
            {c.hero.secondaryCta && (
              <Link href={c.hero.secondaryCta.href} className="btn btn-ghost">
                {ctaLabel(c.hero.secondaryCta)}
              </Link>
            )}
          </div>

          {/* HERO DEMO (§8 Platform hero, DEMO-FIRST §6a) — a live interactive
              viewer, poster-first + activate-on-interaction. */}
          <div className="mt-14 max-w-2xl mx-auto reveal">
            <CapabilityDemo mode="viewer" aspect="aspect-[16/10]" priority />
          </div>
        </div>
      </section>

      {/* FIVE PILLARS OVERVIEW — the story spine. Each card jumps to the full
          capability reference on /features. */}
      <section className="section bg-surface/50 border-y border-foreground/5">
        <div className="container-x">
          <SectionHeading
            eyebrow="The platform in five pillars"
            title="Everything from publishing to measuring the sale."
            lead="Studio to publish, Experience for the showroom, Distribute to ship it anywhere, Measure what converts, Operate at brand-team scale."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {PILLARS.map((p, i) => {
              const Icon = PILLAR_ICON[p.icon];
              return (
                <Reveal key={p.id} delay={i * 0.06}>
                  <Link
                    href={`/features#${p.id}`}
                    className="group card p-6 h-full flex flex-col hover:-translate-y-1 transition-ui"
                  >
                    <span className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-contrast transition-colors">
                      <Icon className="w-5 h-5" strokeWidth={1.5} aria-hidden />
                    </span>
                    <span className="block mt-4 font-heading font-semibold tracking-tight group-hover:text-primary transition-colors">
                      {p.label}
                    </span>
                    <span className="block mt-2 text-sm text-foreground/65 leading-relaxed">
                      {p.tagline}
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PILLAR 1 — STUDIO (no interactive form → scannable capability section). */}
      <section id="studio" className="section scroll-mt-20">
        <div className="container-x">
          <PillarHeader pillarId="studio" />
          <div className="mt-10">
            <FeatureList pillarId="studio" count={6} />
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
            <SeeAll pillarId="studio" />
            <Link
              href="/services/3d-modelling"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
            >
              Need models built for you?{" "}
              <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* PILLAR 2 — EXPERIENCE. Intro header, then the three live demo modules
          (DEMO-FIRST §6a), alternating light/dark (§8). */}
      <section className="section pb-0 on-dark bg-ink text-paper">
        <div className="container-x">
          <PillarHeader pillarId="experience" dark />
        </div>
      </section>
      {experienceModules.map((p, i) => {
        const dark = i % 2 === 0; // first (viewer) dark to continue the intro band
        return (
          <section
            key={p.id}
            id={p.id}
            className={`section scroll-mt-20 ${dark ? "on-dark bg-ink text-paper" : ""}`}
          >
            <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <Reveal
                direction={dark ? "left" : "right"}
                distance={32}
                className={`lg:col-span-5 ${dark ? "lg:order-2" : ""}`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                      dark
                        ? "bg-paper text-ink"
                        : "bg-foreground text-background"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-sm font-medium ${dark ? "text-muted-dark" : "text-foreground/60"}`}
                  >
                    {p.tagline}
                  </span>
                </div>
                <h3 className={`tt-2 ${dark ? "text-paper" : ""}`}>{p.name}</h3>
                <p
                  className={`mt-4 text-lg leading-relaxed ${dark ? "text-muted-dark" : "text-foreground/75"}`}
                >
                  {p.description}
                </p>
              </Reveal>
              <Reveal
                direction={dark ? "right" : "left"}
                distance={32}
                className={`lg:col-span-7 ${dark ? "lg:order-1" : ""}`}
              >
                {DEMO_MODES.has(p.id) ? (
                  <CapabilityDemo
                    mode={p.id as DemoMode}
                    onDark={dark}
                    aspect="aspect-[16/10]"
                  />
                ) : (
                  <ProductVisual
                    variant={p.id as ProductVisualVariant}
                    onDark={dark}
                  />
                )}
              </Reveal>
            </div>
          </section>
        );
      })}
      <section className="section pt-0">
        <div className="container-x">
          <FeatureList pillarId="experience" count={4} />
          <div className="mt-8">
            <SeeAll pillarId="experience" />
          </div>
        </div>
      </section>

      {/* 3D MODELLING SERVICE — its own offering (human-delivered, §8). */}
      {modelling && (
        <section
          id="modelling"
          className="section scroll-mt-20 on-dark bg-ink text-paper"
        >
          <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <Reveal direction="right" distance={32} className="lg:col-span-5">
              <span className="text-sm font-medium text-muted-dark">
                {modelling.tagline}
              </span>
              <h2 className="tt-2 text-paper mt-3">{modelling.name}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-dark">
                {modelling.description}
              </p>
              <Link
                href="/services/3d-modelling"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-soft hover:gap-2.5 transition-all"
              >
                Explore the 3D modelling service{" "}
                <ArrowRight className="w-4 h-4" aria-hidden />
              </Link>
            </Reveal>
            <Reveal direction="left" distance={32} className="lg:col-span-7">
              <ProductVisual variant="modelling" onDark />
            </Reveal>
          </div>
        </section>
      )}

      {/* PILLAR 3 — DISTRIBUTE. Shopify one-click + embeddable everywhere, with
          the integrations row folded in. */}
      <section id="distribute" className="section scroll-mt-20">
        <div className="container-x">
          <PillarHeader pillarId="distribute" />
          <div className="mt-10">
            <FeatureList pillarId="distribute" count={6} />
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
            <SeeAll pillarId="distribute" />
            <Link
              href="/integrations/shopify"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
            >
              One-click on Shopify{" "}
              <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          </div>

          {/* Integrations row — text/logo, no fake screenshots. */}
          <div className="mt-14">
            <p className="eyebrow">{c.integrations.eyebrow}</p>
            <h3 className="tt-2">{c.integrations.title}</h3>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {c.integrations.items.map((it, i) => (
                <Reveal key={it.name} delay={i * 0.06} className="card p-7">
                  <h4 className="font-heading text-lg font-semibold tracking-tight">
                    {it.name}
                  </h4>
                  <p className="mt-2 text-sm text-foreground/65 leading-relaxed">
                    {it.description}
                  </p>
                </Reveal>
              ))}
            </div>
            <Link
              href="/integrations"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
            >
              See all integrations{" "}
              <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* PILLAR 4 — MEASURE / Analytics (dark showroom, §8). Keeps id="analytics"
          for the footer anchor. */}
      {analytics && (
        <section
          id="analytics"
          className="section scroll-mt-20 on-dark bg-ink text-paper"
        >
          <div className="container-x">
            <PillarHeader pillarId="measure" dark />
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <Reveal direction="right" distance={32} className="lg:col-span-5">
                <SectionHeading
                  eyebrow={analytics.tagline}
                  title={analytics.name}
                  lead={analytics.description}
                  dark
                />
                <div className="mt-6">
                  <FeatureList pillarId="measure" count={3} dark />
                </div>
                <div className="mt-8">
                  <SeeAll pillarId="measure" dark />
                </div>
              </Reveal>
              <Reveal direction="left" distance={32} className="lg:col-span-7">
                <ProductVisual variant="analytics" onDark />
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* PILLAR 5 — OPERATE (enterprise-ready). */}
      <section id="operate" className="section scroll-mt-20">
        <div className="container-x">
          <PillarHeader pillarId="operate" />
          <div className="mt-10">
            <FeatureList pillarId="operate" count={6} />
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
            <SeeAll pillarId="operate" />
            <Link
              href="/security"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
            >
              Security & practices{" "}
              <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <CTABand
        headline={c.cta.title}
        ctaLabel={ctaLabel(c.cta.primaryCta) || "Book a Demo"}
      />
    </>
  );
}
