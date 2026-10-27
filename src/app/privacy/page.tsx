import { LegalDocument, LegalSection } from '@/components/LegalDocument';
import { LegalLink, LegalMail, RegionalEntityBlock } from '@/components/LegalEntity';
import { SITE_URL } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import {
  BILLING_AGENCY_SENTENCE,
  CANADA_ENTITY,
  ESTONIA_ENTITY,
  INDIA_ENTITY,
  LEGAL_UPDATE_DATE,
  OFFICER,
} from '@/content/legal/group';

// Privacy policy for thridify.com and Thridify account holders. 27 October
// 2026: three-entity model (publish kit v2.0 K1) and the GDPR / UK GDPR
// section (K6-EU v2.0, verbatim; COUNSEL-DETERMINATIONS v2.0 E1). Updated
// 26 October 2026 to the group's counsel determinations (yom-legal-pack v1.0):
// regional entity (publish kit K1), India rights, retention, transfers and
// security (K6 v1.2: future-tense sealed copy, log retention being extended), the Grievance Officer and the
// Quebec person in charge. Chat assistant, site analytics and demo viewer
// storage checked on 26 October 2026 against the live plugin scripts
// (website-api.tyashin.com/api/v1/public/plugins/*.js), tyashin-platform
// origin/main (public-chat-d1.ts, public-analytics.ts, scheduled.ts) and
// thridify-fe origin/master (shopper tracker).
// Shopify app data: /app-privacy. Shopper data we process for customers: /dpa.
// Per-page metadata + canonical; noindex on the workers.dev / sites.tyashin.com
// preview inherits from src/middleware.ts (host-conditional).

const CANONICAL = '/privacy';

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'How Thridify collects, uses, shares and protects personal information, your rights under GDPR, India’s DPDP Act 2023 and PIPEDA, and how to reach our Grievance Officer.',
  path: CANONICAL,
  image: '/og/default.png',
  ogTitle: 'Privacy Policy | Thridify',
  ogDescription:
    'What Thridify collects, why, how long we keep it, who we share it with, and your rights under GDPR, the DPDP Act and PIPEDA.',
});

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
      <JsonLd nodes={[breadcrumbLd]} />

      <LegalDocument eyebrow="Legal" title="Privacy Policy" effectiveDate={LEGAL_UPDATE_DATE}>
        <LegalSection title="Summary">
          <p>
            This website is a marketing site for Thridify, our 3D and augmented-reality
            commerce platform and 3D modelling service. We collect the details you send
            through our contact form or our chat assistant so we can reply and set up a demo,
            the details you give us when you open a Thridify account, and basic information
            about how the site and its 3D demos are used. We do not run advertising trackers,
            and we do not sell your personal information. This policy explains, in
            plain terms, what we collect, why, how long we keep it, who we share it with, and
            the rights you have, including under the EU/UK GDPR, India&rsquo;s Digital
            Personal Data Protection Act 2023 (DPDP Act) and Canada&rsquo;s PIPEDA.
          </p>
        </LegalSection>

        <LegalSection title="Who we are">
          <RegionalEntityBlock />
          <p>
            This policy covers personal data we collect through this website and from people
            who hold a Thridify account. The Thridify app for Shopify has its own{' '}
            <LegalLink href="/app-privacy">app privacy policy</LegalLink>. When our customers
            use Thridify on their own stores and websites, we process their shoppers&rsquo;
            personal data for them, as their processor, under our{' '}
            <LegalLink href="/dpa">Data Processing Addendum</LegalLink>; the customer&rsquo;s
            own privacy policy applies to that data.
          </p>
          <p>
            You can reach us about any privacy matter at <LegalMail />.
          </p>
        </LegalSection>

        <LegalSection title="What we collect">
          <p>
            We only collect what you choose to give us, plus basic technical data needed to
            serve the site securely.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Contact-form details:</strong> your name, work email address, company
              name, the product category you sell, and any message you write.
            </li>
            <li>
              <strong>Thridify account details:</strong> if you open an account, your name,
              email address, company name, country and phone number, a hashed password (never
              the password itself) or the Google account you sign in with, and records of your
              plan, payments and invoices.
            </li>
            <li>
              <strong>Server and security logs:</strong> our hosting provider (Cloudflare)
              processes technical data such as IP address, browser type and request time to
              deliver the site, prevent abuse and keep it secure. This is standard for any
              website.
            </li>
            <li>
              <strong>Chat assistant:</strong> if you use the chat on this site, the messages
              you send and any file you attach, the page you were on, the page that referred
              you, your browser&rsquo;s user agent, your country (as reported by Cloudflare) and
              random visitor, session and conversation IDs. If you type your email address, or
              leave a message for our team when no one is available, we may save it as an
              enquiry so we can reply.
            </li>
            <li>
              <strong>Site analytics:</strong> for each page you view, the page address and
              title, the page that referred you, your browser&rsquo;s user agent, screen size and
              language, a session ID and a random visitor ID stored in your browser.
            </li>
            <li>
              <strong>3D demos:</strong> the Thridify viewer in our demos records how they are
              used (the product and experience, the features used, the page address and
              referrer, and the device type). Without your consent it keeps its session ID only
              in memory.
            </li>
          </ul>
          <p>
            We do not intentionally collect special-category or sensitive personal data
            through this site, and we do not buy or sell personal information.
          </p>
        </LegalSection>

        <LegalSection title="Why we use it and our legal basis">
          <p>We use the information above for these purposes:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>To respond to your enquiry</strong> and prepare a relevant demo of
              Thridify. Legal basis: your <strong>consent</strong> when you submit the form,
              and our <strong>legitimate interest</strong> (GDPR Art. 6(1)(f)) or steps taken
              at your request before entering a contract (Art. 6(1)(b)) in responding to a
              business enquiry you initiated. Under the DPDP Act we rely on your consent for
              the specified purpose; under PIPEDA, on your implied or express consent.
            </li>
            <li>
              <strong>To follow up</strong> about your interest in the platform. You can ask us
              to stop at any time.
            </li>
            <li>
              <strong>To run your Thridify account:</strong> to sign you in, provide the
              service, bill you and send you emails about your account. Legal basis: our
              contract with you (GDPR Art. 6(1)(b)); under the DPDP Act, the specified purpose
              for which you gave us the data; under PIPEDA, your consent.
            </li>
            <li>
              <strong>To answer questions through our chat assistant</strong>, and to pass the
              conversation to our team when you ask. Legal basis: your consent when you choose
              to start a chat (GDPR Art. 6(1)(a); under the DPDP Act, consent for that purpose;
              under PIPEDA, your express consent).
            </li>
            <li>
              <strong>To understand how the site and our demos are used</strong> and improve
              them (site analytics and demo events). Legal basis: legitimate interest in
              understanding how our website is used.
            </li>
            <li>
              <strong>To operate, secure and improve the site</strong> (server and security
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
              <strong>Cloudflare:</strong> website hosting, content delivery and security.
            </li>
            <li>
              <strong>The Tyashin platform</strong> (operated by {INDIA_ENTITY.name}):
              contact-form submissions are forwarded to, and stored in, our own
              lead-management system on this platform so our team can respond, and to the
              email inbox that receives new enquiries. The platform also runs our chat
              assistant and site analytics.
            </li>
            <li>
              <strong>OpenAI:</strong> generates the chat assistant&rsquo;s replies, so the
              messages you send in the chat are passed to it.
            </li>
            <li>
              <strong>YOM (Your Own Metrics)</strong>, our analytics service, operated by{' '}
              {INDIA_ENTITY.name}: processes site analytics and demo events. YOM does not store
              IP addresses.
            </li>
            <li>
              <strong>Google Cloud and MongoDB Atlas:</strong> hosting and database for the
              Thridify platform, including account data.
            </li>
            <li>
              <strong>Resend:</strong> sends account emails, such as sign-up verification and
              password resets.
            </li>
            <li>
              <strong>Razorpay:</strong> processes payments for plans and services you buy from
              us directly. If you use our Shopify app, Shopify bills you instead.{' '}
              {BILLING_AGENCY_SENTENCE}
            </li>
            <li>
              <strong>The other companies in our group</strong> ({INDIA_ENTITY.name},{' '}
              {ESTONIA_ENTITY.name} and {CANADA_ENTITY.name}): engineering, hosting and support,
              under a written intra-group agreement.
            </li>
          </ul>
          <p>
            We may also disclose information where required by law, to protect our rights, or
            as part of a business reorganisation, in each case consistent with this policy.
          </p>
        </LegalSection>

        <LegalSection title="International transfers">
          <p>
            We operate across India, North America (including Canada) and Europe, and our
            service providers may process data in countries other than your own. Where we
            transfer personal data internationally (for example between India, Canada and the
            EU/EEA), we rely on appropriate safeguards such as the European Commission&rsquo;s
            Standard Contractual Clauses and our providers&rsquo; own transfer mechanisms, and
            we take steps consistent with the DPDP Act and PIPEDA to protect your information
            in transit and at rest.
          </p>
          <p>
            We use service providers in other countries, listed in this policy. Transfers out
            of India follow section 16 of the Digital Personal Data Protection Act, 2023; we
            will not transfer data to any country the Government of India restricts.
          </p>
        </LegalSection>

        <LegalSection title="How long we keep it">
          <p>
            We keep personal data while your account is active and as long as we need it for
            the purpose you gave it for, then delete it. Some records stay longer because the
            law requires it: invoices and tax records for 8 years, and security logs for 180
            days under Indian cyber security rules (we are extending this to every system by 31
            December 2026). From 13 May 2027 Indian law will also require us to keep personal
            data, related traffic data and processing logs for one year from processing. From
            then, when we delete your data from our systems we will keep a sealed copy for the
            rest of that year, which nobody uses except to meet that legal duty, and then
            destroy it.
          </p>
          <p>
            Enquiries you send through our contact form are kept while we handle your request
            and any business relationship that follows, and for a reasonable period afterwards
            for our records, then deleted or anonymised. Chat conversations are deleted
            automatically after about 90 days. You can ask us to delete your details sooner at
            any time, subject to the legal duties above.
          </p>
        </LegalSection>

        <LegalSection title="Security">
          <p>
            We keep a documented information security programme: encryption in transit, access
            limited to staff who need it, logging, and incident response. If a breach affects
            your personal data we will tell you and the authorities as the law requires. Our{' '}
            <LegalLink href="/security">security page</LegalLink> has more detail.
          </p>
        </LegalSection>

        <LegalSection title="Cookies and similar technologies" id="cookies">
          <p>
            This site does not set advertising or cross-site tracking cookies. Cloudflare, which
            hosts the site, may set strictly necessary security cookies. Some features keep
            small items in your browser&rsquo;s local storage or session storage instead of
            cookies:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Chat assistant:</strong> a random visitor ID (<code>aapas_chat_vid</code>),
              your current conversation (<code>aapas_chat_cid</code>) and two items that decide
              when to show the chat button (<code>aapas_chat_revealed</code>,{' '}
              <code>aapas_visit_count</code>) in local storage; a session ID (
              <code>aapas_chat_sid</code>) and two display settings (<code>aapas_chat_open</code>
              , <code>aapas_nav_count</code>) in session storage. These let a conversation carry
              on from page to page.
            </li>
            <li>
              <strong>Site analytics:</strong> a random visitor ID (<code>aapas_vid</code>) in
              local storage.
            </li>
            <li>
              <strong>3D demos:</strong> only if you give consent where the viewer asks for it,
              the Thridify viewer stores a session ID, a visitor ID and your choice (
              <code>thridify_session</code>, <code>thridify_visitor</code>,{' '}
              <code>thridify_consent_v2</code>) in local storage.
            </li>
          </ul>
          <p>
            You can clear these items at any time in your browser settings. If we add
            advertising or other non-essential cookies, they will be off by default and loaded
            only after you consent, and we will list them here first.
          </p>
        </LegalSection>

        <LegalSection title="Your rights">
          <p>
            Depending on where you live, you have some or all of the following rights over your
            personal information. We honour these requests regardless of your location, to the
            extent applicable law allows.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Access:</strong> ask for a copy of the personal information we hold about
              you.
            </li>
            <li>
              <strong>Rectification or correction:</strong> ask us to correct inaccurate or
              incomplete details.
            </li>
            <li>
              <strong>Erasure:</strong> ask us to delete your details (also the DPDP Act right
              to erasure and the PIPEDA ability to withdraw consent).
            </li>
            <li>
              <strong>Restriction and objection:</strong> ask us to limit or stop certain
              processing, including direct follow-ups.
            </li>
            <li>
              <strong>Portability:</strong> receive the details you gave us in a portable,
              machine-readable format (GDPR).
            </li>
            <li>
              <strong>Withdraw consent:</strong> where we rely on consent, withdraw it at any
              time without affecting processing already carried out.
            </li>
            <li>
              <strong>Grievance and nomination (DPDP Act):</strong> raise a grievance with our
              Grievance Officer, {OFFICER.name} (see{' '}
              <LegalLink href="/grievance">Grievance Officer</LegalLink>), and nominate another
              person to exercise your rights if you die or become unable to act.
            </li>
          </ul>
          <p>
            To exercise any of these, email <LegalMail /> and we will respond within the time
            required by applicable law. We may need to verify your identity first.
          </p>
        </LegalSection>

        <LegalSection title="Your rights under the GDPR and the UK GDPR" id="gdpr">
          <p>
            <strong>If you are in the European Union or the United Kingdom.</strong> Aapastech OÜ
            is the controller. We process your account and billing data to perform our contract
            with you, tax records to meet legal obligations, and security logs, fraud checks and
            aggregate usage statistics on the basis of our legitimate interest in running a safe
            and reliable service; you can object to that last use at any time. We send marketing
            email only with your consent. You can ask for access to your data, correction,
            deletion, restriction, a portable copy, and you can object or withdraw consent, by
            emailing <LegalMail />. You can complain to the Estonian Data Protection Inspectorate
            (Andmekaitse Inspektsioon,{' '}
            <a href="https://www.aki.ee" className="text-primary underline underline-offset-4" rel="noopener">
              www.aki.ee
            </a>
            ), to the authority where you live, or in the United Kingdom to the Information
            Commissioner&rsquo;s Office (
            <a href="https://ico.org.uk" className="text-primary underline underline-offset-4" rel="noopener">
              ico.org.uk
            </a>
            ). Our group companies operate the services for Aapastech OÜ: 14818032 Canada Inc. in
            Canada, which the European Commission and the United Kingdom recognise as giving
            adequate protection, and Aapastech Private Limited in India. Some of our service
            providers are in the United States. Transfers to India and the United States are
            covered by the European Commission&rsquo;s Standard Contractual Clauses with the UK
            Addendum, or by the EU-U.S. and UK-U.S. Data Privacy Framework where the provider is
            certified. You can ask us for a copy.
          </p>
        </LegalSection>

        <LegalSection title="Your rights in India">
          <p>
            You can ask us for a summary of the personal data we hold about you and what we do
            with it, ask us to correct, complete, update or delete it, withdraw any consent you
            gave (as easily as you gave it), and nominate someone to act for you if you die or
            become unable to act. Email <LegalMail />. We answer within one month, and never
            later than the law allows. We may ask you to confirm your identity, but only with
            information we already hold.
          </p>
        </LegalSection>

        <LegalSection title="Grievance Officer and Privacy Officer">
          <p>
            {OFFICER.name} is our Grievance Officer for India, the Privacy Officer of{' '}
            {CANADA_ENTITY.name}, the person in charge of the protection of personal information
            for Quebec, and the privacy contact for {ESTONIA_ENTITY.name}. Email <LegalMail />, or call{' '}
            <a href={OFFICER.phoneIndiaHref} className="text-primary underline underline-offset-4">
              {OFFICER.phoneIndia}
            </a>{' '}
            (India) or{' '}
            <a href={OFFICER.phoneCanadaHref} className="text-primary underline underline-offset-4">
              {OFFICER.phoneCanada}
            </a>{' '}
            (Canada). Our <LegalLink href="/grievance">grievance page</LegalLink> explains how
            to complain and how quickly we respond.
          </p>
        </LegalSection>

        <LegalSection title="Complaints and supervisory authorities">
          <p>
            We would like the chance to resolve any concern directly, so please contact our
            Grievance Officer first at <LegalMail />. You also have the right to complain to a
            data-protection authority:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>India:</strong> the Data Protection Board of India, which was established
              on 13 November 2025. You can complain to it once the relevant provisions of the
              DPDP Act apply, after using our grievance process.
            </li>
            <li>
              <strong>EU / EEA / UK:</strong> the Estonian Data Protection Inspectorate
              (Andmekaitse Inspektsioon), the authority where you live, or in the UK the
              Information Commissioner&rsquo;s Office (see the GDPR section above).
            </li>
            <li>
              <strong>Canada:</strong> the Office of the Privacy Commissioner of Canada, or your
              provincial privacy commissioner. In Quebec, the Commission d&rsquo;accès à
              l&rsquo;information.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="Children">
          <p>
            This is a business-to-business website and is not directed at children. We do not
            knowingly collect personal information from anyone under 16 (or the age of digital
            consent in your jurisdiction). If you believe a child has given us personal
            information, contact <LegalMail /> and we will delete it.
          </p>
        </LegalSection>

        <LegalSection title="Changes to this policy">
          <p>
            We may update this policy from time to time; the effective date at the top shows
            when it was last revised. Material changes will be reflected here before they take
            effect.
          </p>
        </LegalSection>

        <LegalSection title="Contact">
          <p>
            {INDIA_ENTITY.name} (data fiduciary for India), CIN {INDIA_ENTITY.cin}, registered
            office {INDIA_ENTITY.address}, {INDIA_ENTITY.country}; principal place of business{' '}
            {INDIA_ENTITY.principalPlace}
            <br />
            {ESTONIA_ENTITY.name} (data controller for the European Union and the United
            Kingdom), registry code {ESTONIA_ENTITY.registryCode}, VAT {ESTONIA_ENTITY.vat},{' '}
            {ESTONIA_ENTITY.address}, {ESTONIA_ENTITY.country}
            <br />
            {CANADA_ENTITY.name} (data controller everywhere else), {CANADA_ENTITY.place},{' '}
            {CANADA_ENTITY.country}
            <br />
            Email: <LegalMail />
            <br />
            Grievance Officer: {OFFICER.name} (<LegalLink href="/grievance">how to complain</LegalLink>)
          </p>
        </LegalSection>
      </LegalDocument>
    </>
  );
}
