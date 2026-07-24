/**
 * Typed content contract for `content/site.json` — the single content source.
 *
 * WHY THIS EXISTS (phase-1 QA carry-forward): pages used to read site.json
 * through `(siteData as any)` plus page-local FALLBACK objects. That made
 * schema drift a silent runtime bug (the empty-CTA incident) and let the
 * fallbacks diverge from the real content. Now:
 *
 *   - `site` is site.json assigned to `SiteContent` WITHOUT a cast, so any
 *     drift between the JSON and the declared shape is a COMPILE-TIME error
 *     (`tsc --noEmit` and `next build` both fail).
 *   - Pages import the typed getters below; there are no page-local fallback
 *     copies of content.
 *   - The only runtime-tolerant reader is `ctaLabel()` (label/text keys),
 *     kept because the Tyashin editor historically emitted either key.
 *
 * If you change site.json's shape, update the types here in the same commit.
 */

import rawSite from '@/../content/site.json';
import type { Cta } from '@/lib/cta';

export type NavLink = { label: string; href: string };
export type ClientLogo = { name: string; logoUrl: string };
export type ProofMetric = { value: string; label: string };
/** REAL quotes only (No-Faking rule) — company-level attribution, exactly as
 *  production thridify.com renders them. */
export type Testimonial = { quote: string; company: string };
export type VerticalItem = { name: string; pain: string };
export type TrioItem = { id: string; name: string; description: string };
export type PlatformProduct = {
  id: string;
  name: string;
  tagline: string;
  description: string;
};
export type Integration = { name: string; description: string };
export type Office = {
  region: string;
  city: string;
  detail?: string;
  phone?: string;
  phoneRaw?: string;
  whatsapp?: string;
  email?: string;
};
export type ValueItem = { title: string; description: string };
export type SectionIntro = { eyebrow: string; title: string; lead?: string };

export type HeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
};

export type CtaSection = {
  title: string;
  subtitle?: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
};

export type HomeContent = {
  hero: HeroContent;
  clients: { eyebrow: string; logos: ClientLogo[] };
  beforeAfter: { eyebrow: string; title: string; lead: string };
  verticals: { eyebrow: string; title: string; items: VerticalItem[] };
  productTrio: { eyebrow: string; title: string; items: TrioItem[] };
  proof: {
    eyebrow: string;
    title: string;
    metrics: ProofMetric[];
    testimonials: Testimonial[];
  };
  cta: CtaSection;
};

export type PlatformContent = {
  hero: HeroContent;
  products: { items: PlatformProduct[] };
  integrations: { eyebrow: string; title: string; items: Integration[] };
  cta: CtaSection;
};

export type AboutContent = {
  hero: HeroContent;
  founders: { eyebrow: string; title: string; story: string[] };
  mission: { eyebrow: string; title: string; body: string };
  presence: { eyebrow: string; title: string; items: Office[] };
  values: { eyebrow: string; title: string; items: ValueItem[] };
  cta: CtaSection;
};

export type ContactContent = {
  hero: HeroContent;
  email: string;
  offices: Office[];
  form: { title: string; subtitle: string };
};

export type IndustriesContent = {
  hero: { eyebrow: string; title: string; subtitle: string; image?: string };
  services: {
    eyebrow: string;
    title: string;
    items: { name: string; description: string }[];
  };
  cta: CtaSection;
};

export type BlogContent = {
  hero: { eyebrow: string; title: string; subtitle: string; image?: string };
  newsletter: {
    eyebrow: string;
    title: string;
    subtitle: string;
    placeholder: string;
    submit: string;
  };
};

export type FooterLink = { label: string; href: string };
export type FooterColumn = { title: string; links: FooterLink[] };
export type FooterContent = {
  tagline: string;
  copyright: string;
  socials: FooterLink[];
  columns: FooterColumn[];
  legal: FooterLink[];
};

export type HeaderContent = {
  siteName: string;
  nav: NavLink[];
  cta: { label: string; href: string };
};

export type SiteContent = {
  header: HeaderContent;
  pages: {
    home: HomeContent;
    platform: PlatformContent;
    about: AboutContent;
    contact: ContactContent;
    industries: IndustriesContent;
    blog: BlogContent;
  };
  footer: FooterContent;
};

// NO CAST — structural assignment. If site.json drifts from SiteContent,
// this line is a compile error and the build fails loudly.
const site: SiteContent = rawSite;

export default site;

export const headerContent = site.header;
export const footerContent = site.footer;
export const homeContent = site.pages.home;
export const platformContent = site.pages.platform;
export const aboutContent = site.pages.about;
export const contactContent = site.pages.contact;
export const industriesContent = site.pages.industries;
export const blogContent = site.pages.blog;
