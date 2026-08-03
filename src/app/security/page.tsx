import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalDocument, LegalSection } from '@/components/LegalDocument';
import { SITE_URL } from '@/lib/schema';

// Phase-4 security & practices page — a modest, HONEST description of how this
// website handles data. NO fabricated compliance badges or certifications
// (No-Faking): we do not claim SOC 2 / ISO 27001 because we have not earned
// them. Per-page metadata + canonical + BreadcrumbList JSON-LD. Linked from
// the footer and included in the sitemap. Preview noindex via src/middleware.ts.

const CANONICAL = '/security';
const MAIL = 'contact@thridify.com';

export const metadata: Metadata = {
  title: 'Security & Data Practices',
  description:
    'How Thridify (Aapastech Private Limited) protects information on this website — encryption in transit, access controls, our processor list, data-region note and responsible-disclosure contact.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Security & Data Practices — Thridify',
    description:
      'How we protect information on this website: HTTPS everywhere, access controls, our processors, and how to report a security issue.',
    url: `${SITE_URL}${CANONICAL}`,
    type: 'website',
    siteName: 'Thridify',
    images: ['/og/default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Security & Data Practices — Thridify',
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

export default function SecurityPage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Security & Data Practices', item: `${SITE_URL}${CANONICAL}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <LegalDocument
        eyebrow="Trust"
        title="Security & Data Practices"
        breadcrumbLabel="Security"
        effectiveDate="3 August 2026"
      >
        <LegalSection title="Our approach">
          <p>
            We take a straightforward, honest approach to security: collect only what we
            need, protect it in transit and at rest through reputable infrastructure, and
            limit who can access it. This page describes the measures that apply to{' '}
            <strong>this website</strong> and the enquiries you send through it. It is a
            factual summary, not a marketing claim.
          </p>
        </LegalSection>

        <LegalSection title="Encryption in transit">
          <p>
            This website is served entirely over HTTPS (TLS). Traffic is delivered through
            Cloudflare&rsquo;s global network, which terminates TLS, and provides
            distributed-denial-of-service protection and a web application firewall.
            Enquiry submissions from the contact form are sent over encrypted connections
            to our systems.
          </p>
        </LegalSection>

        <LegalSection title="Access controls">
          <p>
            Contact-form submissions are stored in our own lead-management system on the
            Tyashin platform (operated by Aapastech Private Limited). Access is limited to
            the team members who need it to respond to you, using individual accounts.
            We follow least-privilege principles and do not share your enquiry outside the
            purposes described in our{' '}
            <Link href="/privacy" className="text-primary underline underline-offset-4">
              Privacy Policy
            </Link>
            .
          </p>
        </LegalSection>

        <LegalSection title="Service providers (processors)">
          <p>
            We keep our supplier list short and use established providers that maintain
            their own security programmes:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Cloudflare</strong> — hosting, content delivery, TLS and network
              security.
            </li>
            <li>
              <strong>Tyashin platform</strong> (Aapastech Private Limited) — receives and
              stores contact-form leads so our team can respond.
            </li>
            <li>
              <strong>Calendly</strong> — used only when you choose to book a demo through
              the scheduling link.
            </li>
          </ul>
          <p>
            The full purpose, legal basis and retention for each is described in our
            Privacy Policy.
          </p>
        </LegalSection>

        <LegalSection title="Where data is processed">
          <p>
            We operate across India, North America (including Canada) and Europe, and our
            providers may process data in more than one region. Where information moves
            across borders, we rely on the safeguards described under &ldquo;International
            transfers&rdquo; in our{' '}
            <Link href="/privacy" className="text-primary underline underline-offset-4">
              Privacy Policy
            </Link>
            .
          </p>
        </LegalSection>

        <LegalSection title="Cookies and tracking">
          <p>
            This website sets only strictly necessary cookies and does not run advertising
            or cross-site tracking. Any analytics we add in future will be consent-gated.
            See the Privacy Policy for details.
          </p>
        </LegalSection>

        <LegalSection title="Certifications — an honest note">
          <p>
            We do <strong>not</strong> currently claim formal third-party certifications
            such as SOC 2 or ISO 27001 for this marketing website, and we will not display
            a badge we have not earned. If that changes, we will say so here with
            verifiable detail. For questions about the security of the Thridify product
            itself (as opposed to this website), contact us and we will share what we can.
          </p>
        </LegalSection>

        <LegalSection title="Reporting a security issue (responsible disclosure)">
          <p>
            If you believe you have found a security vulnerability in this website, please
            tell us privately at <Mail /> before disclosing it publicly. Include enough
            detail for us to reproduce the issue. We will acknowledge your report, keep you
            updated, and work in good faith to fix confirmed issues promptly. We ask that
            you avoid accessing or modifying other people&rsquo;s data and give us a
            reasonable opportunity to respond before any public disclosure.
          </p>
        </LegalSection>

        <LegalSection title="Contact">
          <p>
            Aapastech Private Limited
            <br />
            Security &amp; privacy: <Mail />
          </p>
        </LegalSection>
      </LegalDocument>
    </>
  );
}
