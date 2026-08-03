import type { Metadata } from 'next';
import { LegalDocument, LegalSection } from '@/components/LegalDocument';
import { SITE_URL } from '@/lib/schema';

// Phase-4 privacy policy — an honest, reviewable GDPR / DPDP Act 2023 / PIPEDA
// -aware baseline reflecting the site's ACTUAL data practices (contact form +
// future consent-gated analytics; no third-party ad trackers). Written to be
// reviewed by a lawyer before Phase-7 launch. Legal facts needing confirmation
// are flagged in docs/ASSET-DEBT.md.
// Per-page metadata + canonical; noindex on the workers.dev / sites.tyashin.com
// preview inherits from src/middleware.ts (host-conditional).

const CANONICAL = '/privacy';
const MAIL = 'contact@thridify.com';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Thridify (Aapastech Private Limited) collects, uses, shares and protects personal information through this website — with GDPR, India DPDP Act 2023 and PIPEDA data-subject rights.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Privacy Policy — Thridify',
    description:
      'What Thridify collects through this website, why, the legal basis, how long we keep it, who we share it with, and your rights under GDPR, the DPDP Act and PIPEDA.',
    url: `${SITE_URL}${CANONICAL}`,
    type: 'website',
    siteName: 'Thridify',
    images: ['/og/default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — Thridify',
    images: ['/og/default.png'],
  },
};

function Mail() {
  return (
    <a href={`mailto:${MAIL}`} className="text-primary underline underline-offset-4">
      {MAIL}
    </a>
  );
}

export default function PrivacyPage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: `${SITE_URL}${CANONICAL}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <LegalDocument eyebrow="Legal" title="Privacy Policy" effectiveDate="3 August 2026">
        <LegalSection title="Summary">
          <p>
            This website is a marketing site for Thridify, our 3D and augmented-reality
            commerce platform and 3D modelling service. We collect the details you send
            through our contact form so we can reply and set up a demo. We do not run
            third-party advertising trackers, and we do not sell your personal
            information. This policy explains, in plain terms, what we collect, why, how
            long we keep it, who we share it with, and the rights you have — including
            under the EU/UK GDPR, India&rsquo;s Digital Personal Data Protection Act 2023
            (DPDP Act) and Canada&rsquo;s PIPEDA.
          </p>
        </LegalSection>

        <LegalSection title="Who we are (data controller)">
          <p>
            This website is operated by <strong>Aapastech Private Limited</strong>, a
            company incorporated in India, which builds and operates the Thridify
            platform (&ldquo;Thridify&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;,
            &ldquo;our&rdquo;). For personal information collected through this website,
            Aapastech Private Limited is the data controller (the &ldquo;Data
            Fiduciary&rdquo; under India&rsquo;s DPDP Act). You can reach us about any
            privacy matter at <Mail />.
          </p>
        </LegalSection>

        <LegalSection title="What we collect">
          <p>
            We only collect what you choose to give us, plus basic technical data needed
            to serve the site securely.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Contact-form details</strong> — your name, work email address,
              company name, the product category you sell, and any message you write.
            </li>
            <li>
              <strong>Server and security logs</strong> — our hosting provider
              (Cloudflare) processes technical data such as IP address, browser type and
              request time to deliver the site, prevent abuse and keep it secure. This is
              standard for any website.
            </li>
            <li>
              <strong>Analytics (not active yet)</strong> — privacy-conscious, aggregated
              usage analytics may be added later. If and when analytics is enabled it
              will be <strong>consent-gated</strong> (see &ldquo;Cookies and similar
              technologies&rdquo; below). No analytics or advertising trackers run on this
              site today.
            </li>
          </ul>
          <p>
            We do not intentionally collect special-category / sensitive personal data
            through this site, and we do not buy or sell personal information.
          </p>
        </LegalSection>

        <LegalSection title="Why we use it and our legal basis">
          <p>We use the information above for these purposes:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>To respond to your enquiry</strong> and prepare a relevant demo of
              Thridify. Legal basis: your <strong>consent</strong> when you submit the
              form, and our <strong>legitimate interest</strong> (GDPR Art. 6(1)(f)) /
              steps taken at your request before entering a contract (Art. 6(1)(b)) in
              responding to a business enquiry you initiated. Under the DPDP Act we rely on
              your consent for the specified purpose; under PIPEDA, on your implied or
              express consent.
            </li>
            <li>
              <strong>To follow up</strong> about your interest in the platform. You can
              ask us to stop at any time.
            </li>
            <li>
              <strong>To operate, secure and improve the site</strong> (server/security
              logs). Legal basis: legitimate interest in a safe, functioning website.
            </li>
          </ul>
          <p>
            We do not use your submission for automated decision-making or profiling that
            produces legal or similarly significant effects.
          </p>
        </LegalSection>

        <LegalSection title="Who we share it with (processors)">
          <p>
            We do not sell personal information and we share it only with service providers
            that process it on our behalf, under contract, for the purposes above:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Cloudflare</strong> — website hosting, content delivery and security.
            </li>
            <li>
              <strong>The Tyashin platform</strong> (operated by Aapastech Private Limited)
              — contact-form submissions are forwarded to, and stored in, our own
              lead-management system on this platform so our team can respond, and to the
              email inbox that receives new enquiries.
            </li>
            <li>
              <strong>Analytics provider</strong> — only if analytics is enabled in future,
              and only after consent, as described below.
            </li>
          </ul>
          <p>
            We may also disclose information where required by law, to protect our rights,
            or as part of a business reorganisation, in each case consistent with this
            policy.
          </p>
        </LegalSection>

        <LegalSection title="International transfers">
          <p>
            We operate across India, North America (including Canada) and Europe, and our
            service providers may process data in countries other than your own. Where we
            transfer personal data internationally (for example between India, Canada and
            the EU/EEA), we rely on appropriate safeguards such as the European
            Commission&rsquo;s Standard Contractual Clauses and our providers&rsquo; own
            transfer mechanisms, and we take steps consistent with the DPDP Act and PIPEDA
            to protect your information in transit and at rest.
          </p>
        </LegalSection>

        <LegalSection title="How long we keep it">
          <p>
            We keep enquiry details for as long as needed to handle your request and any
            resulting business relationship, and for a reasonable period afterwards for our
            records, after which they are deleted or anonymised. Server and security logs
            are retained only for a short period for security and diagnostics. You can ask
            us to delete your details sooner at any time.
          </p>
        </LegalSection>

        <LegalSection title="Cookies and similar technologies">
          <p>
            <strong>Today this site sets only strictly necessary cookies</strong> — those
            required to serve the site securely and reliably (for example, Cloudflare
            security cookies). We do <strong>not</strong> run advertising, marketing or
            cross-site tracking cookies, and no analytics is wired into the site at
            present.
          </p>
          <p>
            If we introduce analytics or any non-essential cookies in future, they will be{' '}
            <strong>off by default and loaded only after you consent</strong> through a
            cookie/consent banner, and you will be able to withdraw consent at any time.
            Strictly necessary cookies do not require consent. We will update this section
            and list the specific technologies before any such change goes live.
          </p>
        </LegalSection>

        <LegalSection title="Your rights">
          <p>
            Depending on where you live, you have some or all of the following rights over
            your personal information. We honour these requests regardless of your location,
            to the extent applicable law allows.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Access</strong> — ask for a copy of the personal information we hold
              about you.
            </li>
            <li>
              <strong>Rectification / correction</strong> — ask us to correct inaccurate or
              incomplete details.
            </li>
            <li>
              <strong>Erasure</strong> — ask us to delete your details (also the DPDP Act
              right to erasure and the PIPEDA ability to withdraw consent).
            </li>
            <li>
              <strong>Restriction and objection</strong> — ask us to limit or stop certain
              processing, including direct follow-ups.
            </li>
            <li>
              <strong>Portability</strong> — receive the details you gave us in a portable,
              machine-readable format (GDPR).
            </li>
            <li>
              <strong>Withdraw consent</strong> — where we rely on consent, withdraw it at
              any time without affecting processing already carried out.
            </li>
            <li>
              <strong>Grievance / nomination (DPDP Act)</strong> — raise a grievance with
              us, and nominate another person to exercise your rights in the event of death
              or incapacity.
            </li>
          </ul>
          <p>
            To exercise any of these, email <Mail /> and we will respond within the time
            required by applicable law. We may need to verify your identity first.
          </p>
        </LegalSection>

        <LegalSection title="Complaints and supervisory authorities">
          <p>
            We would like the chance to resolve any concern directly, so please contact us
            first at <Mail />. You also have the right to complain to a data-protection
            authority:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>India</strong> — the Data Protection Board of India, once established
              under the DPDP Act 2023.
            </li>
            <li>
              <strong>EU / EEA / UK</strong> — your local supervisory authority (for the
              UK, the Information Commissioner&rsquo;s Office).
            </li>
            <li>
              <strong>Canada</strong> — the Office of the Privacy Commissioner of Canada, or
              your provincial privacy commissioner.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="Children">
          <p>
            This is a business-to-business website and is not directed at children. We do
            not knowingly collect personal information from anyone under 16 (or the age of
            digital consent in your jurisdiction). If you believe a child has given us
            personal information, contact <Mail /> and we will delete it.
          </p>
        </LegalSection>

        <LegalSection title="Changes to this policy">
          <p>
            We may update this policy from time to time; the effective date at the top
            shows when it was last revised. Material changes will be reflected here before
            they take effect.
          </p>
        </LegalSection>

        <LegalSection title="Contact">
          <p>
            Aapastech Private Limited (Data Controller / Data Fiduciary)
            <br />
            Email: <Mail />
          </p>
        </LegalSection>
      </LegalDocument>
    </>
  );
}
