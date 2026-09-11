import Link from "next/link";
import { pageMetadata, siteUrl } from "@/lib/seo";
import { breadcrumbLd, webPageLd, type LdNode } from "@/lib/knowledge-graph";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { FaqExplorer } from "@/components/FaqExplorer";
import { ALL_FAQS, CALENDLY_URL, FAQ_CATEGORIES } from "@/lib/faq";

/**
 * /faq — the sitewide FAQ hub.
 *
 * One page owns the "questions people actually ask" intent — for humans
 * (searchable, deep-linkable explorer) AND for machines (a single FAQPage
 * JSON-LD carrying every Q&A verbatim, the same content the on-site AI
 * assistant is trained on). Category-level questions stay duplicated on the
 * industry/integration pages they belong to; this hub carries the cross-
 * cutting set.
 */

const TOTAL = ALL_FAQS.length;

export const metadata = pageMetadata({
  title: "FAQ — Thridify Questions, Answered",
  description: `${TOTAL} straight answers about Thridify: 3D product configurators, app-free AR, the done-for-you 3D modelling service, integrations, plans, device support and getting started.`,
  keywords: [
    "Thridify FAQ",
    "3D product configurator questions",
    "AR viewer without app",
    "3D modelling service for ecommerce",
    "how much does a 3D configurator cost",
    "add 3D to product pages",
  ],
  path: "/faq",
  image: "/og/default.png",
  ogTitle: "Thridify FAQ — every question, answered straight",
  ogDescription:
    "Getting started, the platform, 3D modelling, AR and devices, integrations, plans and the company — searchable and deep-linkable.",
});

export default function FaqPage() {
  const faqLd: LdNode = {
    "@type": "FAQPage",
    "@id": `${siteUrl("/faq")}#faq`,
    mainEntity: ALL_FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd
        nodes={[
          webPageLd({
            path: "/faq",
            name: "Thridify FAQ",
            description: `${TOTAL} answers about 3D and AR commerce with Thridify.`,
          }),
          faqLd,
          breadcrumbLd("/faq", [
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
        ]}
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
            FAQ
          </li>
        </ol>
      </nav>

      {/* HERO — H1 4 words (≤12); lead 24 words (≤40). */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 aurora opacity-60 pointer-events-none"
          aria-hidden
        />
        <div className="container-x relative section pb-10 md:pb-12">
          <Reveal>
            <p className="eyebrow">FAQ</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="tt-display mt-5 max-w-3xl">
              Every question, answered straight.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 lead max-w-2xl">
              {TOTAL} answers across {FAQ_CATEGORIES.length} topics — the same
              knowledge our on-page assistant is trained on. Search it, filter
              it, or share a link to any single answer.
            </p>
          </Reveal>
        </div>
      </section>

      {/* EXPLORER */}
      <section className="section pt-0">
        <div className="container-x">
          <FaqExplorer />
        </div>
      </section>

      {/* CTA BAND — the two things that are always free. */}
      <section className="on-dark relative bg-ink text-paper overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 aurora pointer-events-none"
          aria-hidden
        />
        <div className="container-x section relative text-center">
          <p className="eyebrow eyebrow-center">Still deciding?</p>
          <h2 className="tt-1 mt-4 max-w-2xl mx-auto">
            See it answered live, on products like yours.
          </h2>
          <p className="mt-5 text-paper/70 max-w-xl mx-auto">
            A free 30-minute demo built around your industry — and a 15-day
            free trial of the platform when you're ready.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Book a Demo
            </a>
            <Link href="/contact" className="btn-ghost">
              Talk to the team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
