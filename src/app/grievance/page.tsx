import type { Metadata } from 'next';
import { LegalDocument, LegalSection } from '@/components/LegalDocument';
import { LegalLink, LegalMail } from '@/components/LegalEntity';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';
import { INDIA_ENTITY, LEGAL_UPDATE_DATE, OFFICER } from '@/content/legal/group';

// Grievance Officer page (publish kit v2.0 K2, English, verbatim, with the
// EU/UK and Canada/Quebec lines). Required by the IT (Intermediary Guidelines) Rules
// 2021 r.3(2)(a), SPDI Rules r.5(9) and the E-Commerce Rules; linked from the
// footer on every page. Hindi version: /grievance/hi (K3).

const CANONICAL = '/grievance';
const LINK = 'text-primary underline underline-offset-4';

const base = pageMetadata({
  title: 'Grievance Officer',
  description:
    'How to complain to Thridify’s Grievance Officer about our service, content we host or your personal data, and how quickly we respond.',
  path: CANONICAL,
  image: '/og/default.png',
  ogTitle: 'Grievance Officer | Thridify',
});

export const metadata: Metadata = {
  ...base,
  alternates: {
    canonical: CANONICAL,
    languages: { en: '/grievance', hi: '/grievance/hi' },
  },
};

export default function GrievancePage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Grievance Officer', item: `${SITE_URL}${CANONICAL}` },
    ],
  };

  return (
    <>
      <JsonLd nodes={[breadcrumbLd]} />

      <LegalDocument eyebrow="Legal" title="Grievance Officer" effectiveDate={LEGAL_UPDATE_DATE}>
        <p>
          Write to us if you have a complaint about Thridify, about content on a page or site we
          host, or about how we handle your personal data. Complaints from anyone are welcome,
          whether or not you have an account.
        </p>

        <address className="not-italic mt-8 rounded-2xl border border-foreground/10 p-6 leading-relaxed">
          <strong className="text-foreground">Grievance Officer</strong>
          <br />
          {OFFICER.name}
          <br />
          {INDIA_ENTITY.name}
          <br />
          {INDIA_ENTITY.address}, {INDIA_ENTITY.country}
          <br />
          Principal place of business: {INDIA_ENTITY.principalPlace}
          <br />
          Email: <LegalMail />
          <br />
          Phone:{' '}
          <a href={OFFICER.phoneIndiaHref} className={LINK}>
            {OFFICER.phoneIndia}
          </a>
        </address>

        <LegalSection title="How to complain" id="how-to-complain">
          <p>
            Email us with &ldquo;Grievance&rdquo; in the subject line. Tell us your name and how
            to reach you, the page, site or account the complaint is about, what happened, and
            what you would like us to do. Attach screenshots or links if you have them. For a
            request about your personal data, tell us which product you use and the email
            address you use with us, so we can find your records without asking for more than
            we need.
          </p>
        </LegalSection>

        <LegalSection title="What happens next" id="what-happens-next">
          <ul className="list-disc pl-5 space-y-2">
            <li>We acknowledge your complaint within 24 hours and give you a reference number.</li>
            <li>We resolve it within 7 days.</li>
            <li>
              If you ask us to remove content we host that breaks our rules for users (see{' '}
              <LegalLink href="/legal/platform-terms#rules">our terms</LegalLink>), we act within
              36 hours. Claims about who owns the content, or about intellectual property, can
              take up to 7 days because we need to hear from both sides.
            </li>
            <li>
              If content shows you in a private or sexual way, or pretends to be you, including
              images changed with AI, report it and we will remove it or block access within 2
              hours.
            </li>
            <li>
              Requests to see, correct or delete your personal data, or to withdraw consent, are
              answered within one month. Most take far less.
            </li>
            <li>
              Orders and notices from courts and government authorities can be sent to the same
              address. We act on them within the time the law sets.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="If you are not satisfied" id="if-not-satisfied">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Under India&rsquo;s Information Technology (Intermediary Guidelines and Digital
              Media Ethics Code) Rules, 2021, you can appeal our decision to the Grievance
              Appellate Committee at{' '}
              <a href="https://gac.gov.in" className={LINK} rel="noopener">
                gac.gov.in
              </a>{' '}
              within 30 days of hearing from us.
            </li>
            <li>
              For personal data, once the relevant parts of the Digital Personal Data Protection
              Act, 2023 apply, you can complain to the Data Protection Board of India after using
              this process.
            </li>
            <li>
              In the European Union you can complain to the Estonian Data Protection Inspectorate
              (Andmekaitse Inspektsioon,{' '}
              <a href="https://www.aki.ee" className={LINK} rel="noopener">
                www.aki.ee
              </a>
              ) or to the data protection authority where you live. In the United Kingdom you can
              complain to the Information Commissioner&rsquo;s Office (
              <a href="https://ico.org.uk" className={LINK} rel="noopener">
                ico.org.uk
              </a>
              ). {OFFICER.name} is also the privacy contact for Aapastech OÜ.
            </li>
            <li>
              In Canada you can contact the Office of the Privacy Commissioner of Canada, and in
              Quebec the Commission d&rsquo;accès à l&rsquo;information. {OFFICER.name} is also
              our Privacy Officer for 14818032 Canada Inc. and the person in charge of the
              protection of personal information for Quebec (<LegalMail />,{' '}
              <a href={OFFICER.phoneCanadaHref} className={LINK}>
                {OFFICER.phoneCanada}
              </a>
              ).
            </li>
          </ul>
        </LegalSection>

        <p className="mt-12">
          This page is also available in <LegalLink href="/grievance/hi">Hindi</LegalLink>. Ask
          us at the address above if you need it in another language listed in the Eighth
          Schedule to the Constitution of India and we will send it within 7 days.
        </p>
      </LegalDocument>
    </>
  );
}
