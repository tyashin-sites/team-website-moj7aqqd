/**
 * Shared legal building blocks: the regional entity statement (publish kit K1),
 * the legal mailbox link and an inline link. Used by every legal page so the
 * wording stays identical across them.
 */
import Link from 'next/link';
import type { ReactNode } from 'react';
import { CANADA_ENTITY, ESTONIA_ENTITY, INDIA_ENTITY, LEGAL_EMAIL } from '@/content/legal/group';

const LINK_CLASS = 'text-primary underline underline-offset-4';

/** mailto link to the legal and privacy mailbox (contact@aapastech.com). */
export function LegalMail({ email = LEGAL_EMAIL }: { email?: string }) {
  return (
    <a href={`mailto:${email}`} className={LINK_CLASS}>
      {email}
    </a>
  );
}

/** Styled internal link for legal prose. */
export function LegalLink({
  href,
  hrefLang,
  children,
}: {
  href: string;
  /** Language of the linked page when it differs (e.g. 'hi' for a Hindi version). */
  hrefLang?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} hrefLang={hrefLang} className={LINK_CLASS}>
      {children}
    </Link>
  );
}

/** Publish kit v2.0 K1 (same for Tyashin, Thridify and YOM), verbatim with {Brand} = Thridify. */
export function RegionalEntityBlock() {
  return (
    <>
      <p>
        Thridify is run by three companies in the same group. Which one you deal with depends
        on where you are. For a business account, that is the country of the business&rsquo;s
        billing address.
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>India:</strong> {INDIA_ENTITY.name} (CIN {INDIA_ENTITY.cin}; registered
          office {INDIA_ENTITY.address}, {INDIA_ENTITY.country}). It is the data fiduciary for
          your personal data under Indian law.
        </li>
        <li>
          <strong>European Union and United Kingdom:</strong> {ESTONIA_ENTITY.name} (registry
          code {ESTONIA_ENTITY.registryCode}, VAT {ESTONIA_ENTITY.vat}, {ESTONIA_ENTITY.address},{' '}
          {ESTONIA_ENTITY.country}). It is the controller of your personal data under the GDPR
          and the UK GDPR.
        </li>
        <li>
          <strong>Everywhere else:</strong> {CANADA_ENTITY.name} ({CANADA_ENTITY.place},{' '}
          {CANADA_ENTITY.country}). It is the controller of your personal data.
        </li>
      </ul>
      <p>
        The three companies share engineering, hosting and support, and each processes personal
        data for the others under a written intra-group agreement. In this document
        &ldquo;Thridify&rdquo;, &ldquo;we&rdquo; and &ldquo;us&rdquo; mean whichever of them you
        deal with.
      </p>
    </>
  );
}

/** Publish kit v2.0 K1 governing-law clause (website Terms of Use), verbatim. */
export function GoverningLawClause() {
  return (
    <p>
      If you are in India, Indian law governs these terms and the courts at Delhi have
      jurisdiction. If you are in the European Union or the United Kingdom, Estonian law governs
      them and the Harju County Court in Tallinn has jurisdiction, but you keep any protection
      that the mandatory law of the country where you live gives consumers. Everywhere else, the
      laws of the Province of Ontario and the federal laws of Canada that apply there govern
      them, and the courts of Ontario have jurisdiction.
    </p>
  );
}

/**
 * Hindi translation of RegionalEntityBlock (publish kit K1) for the Hindi
 * privacy policy and terms. Names, numbers and addresses stay in English.
 * The English K1 prevails if the two differ.
 */
export function RegionalEntityBlockHindi() {
  return (
    <>
      <p>
        Thridify को एक ही समूह की तीन कंपनियाँ चलाती हैं। आप किस कंपनी से जुड़े हैं, यह इस पर
        निर्भर करता है कि आप कहाँ हैं। व्यावसायिक खाते के लिए यह व्यवसाय के बिलिंग पते का देश है।
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>भारत:</strong> <span lang="en">{INDIA_ENTITY.name}</span> (CIN{' '}
          <span lang="en">{INDIA_ENTITY.cin}</span>; पंजीकृत कार्यालय{' '}
          <span lang="en">
            {INDIA_ENTITY.address}, {INDIA_ENTITY.country}
          </span>
          )। भारतीय कानून के तहत यह आपके व्यक्तिगत डेटा की डेटा न्यासी (data fiduciary) है।
        </li>
        <li>
          <strong>यूरोपीय संघ और यूनाइटेड किंगडम:</strong>{' '}
          <span lang="en">{ESTONIA_ENTITY.name}</span> (रजिस्ट्री कोड{' '}
          <span lang="en">{ESTONIA_ENTITY.registryCode}</span>, VAT{' '}
          <span lang="en">{ESTONIA_ENTITY.vat}</span>,{' '}
          <span lang="en">
            {ESTONIA_ENTITY.address}, {ESTONIA_ENTITY.country}
          </span>
          )। GDPR और UK GDPR के तहत यह आपके व्यक्तिगत डेटा की नियंत्रक (controller) है।
        </li>
        <li>
          <strong>बाकी सभी जगह:</strong> <span lang="en">{CANADA_ENTITY.name}</span> (
          <span lang="en">
            {CANADA_ENTITY.place}, {CANADA_ENTITY.country}
          </span>
          )। यह आपके व्यक्तिगत डेटा की नियंत्रक है।
        </li>
      </ul>
      <p>
        तीनों कंपनियाँ इंजीनियरिंग, होस्टिंग और सहायता साझा करती हैं, और हर कंपनी समूह के भीतर के
        एक लिखित समझौते के तहत बाकी कंपनियों के लिए व्यक्तिगत डेटा प्रोसेस करती है। इस दस्तावेज़ में
        &ldquo;Thridify&rdquo;, &ldquo;हम&rdquo; और &ldquo;हमें&rdquo; का अर्थ इनमें से वह कंपनी है
        जिससे आप जुड़े हैं।
      </p>
    </>
  );
}

/** Hindi translation of GoverningLawClause (publish kit K1). The English clause prevails. */
export function GoverningLawClauseHindi() {
  return (
    <p>
      अगर आप भारत में हैं, तो ये शर्तें भारतीय कानून के अधीन हैं और दिल्ली की अदालतों को
      क्षेत्राधिकार है। अगर आप यूरोपीय संघ या यूनाइटेड किंगडम में हैं, तो ये शर्तें एस्टोनिया के
      कानून के अधीन हैं और तालिन की हार्जु काउंटी कोर्ट (<span lang="en">Harju County Court</span>)
      को क्षेत्राधिकार है, लेकिन जिस देश में आप रहते हैं, उसका अनिवार्य कानून उपभोक्ताओं को जो
      सुरक्षा देता है, वह आपको मिलती रहेगी। बाकी सभी जगह, ये शर्तें ओंटारियो प्रांत के कानूनों और
      वहाँ लागू कनाडा के संघीय कानूनों के अधीन हैं, और ओंटारियो की अदालतों को क्षेत्राधिकार है।
    </p>
  );
}
