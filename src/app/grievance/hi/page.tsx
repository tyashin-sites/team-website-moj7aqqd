import type { Metadata } from 'next';
import { LegalDocument, LegalSection } from '@/components/LegalDocument';
import { LegalLink, LegalMail } from '@/components/LegalEntity';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';
import { OFFICER } from '@/content/legal/group';

// Grievance Officer page in Hindi (publish kit K3, verbatim). The document is
// marked lang="hi" (LegalDocument wrapper) because the root layout is English.
// English version: /grievance (K2), which prevails if the two differ.

const CANONICAL = '/grievance/hi';
const LINK = 'text-primary underline underline-offset-4';
const DESCRIPTION =
  'अगर आपको Thridify से, हमारे द्वारा होस्ट किए गए किसी पेज या साइट की सामग्री से, या आपके निजी डेटा को संभालने के हमारे तरीके से कोई शिकायत है, तो हमें लिखें।';

const base = pageMetadata({
  title: 'शिकायत अधिकारी',
  description: DESCRIPTION,
  path: CANONICAL,
  image: '/og/default.png',
  ogTitle: 'शिकायत अधिकारी | Thridify',
});

export const metadata: Metadata = {
  ...base,
  alternates: {
    canonical: CANONICAL,
    languages: { en: '/grievance', hi: '/grievance/hi' },
  },
  openGraph: { ...base.openGraph, locale: 'hi_IN' },
};

export default function GrievanceHindiPage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'शिकायत अधिकारी', item: `${SITE_URL}${CANONICAL}` },
    ],
  };

  return (
    <>
      <JsonLd nodes={[breadcrumbLd]} />

      <LegalDocument
        eyebrow="Thridify"
        title="शिकायत अधिकारी"
        effectiveDate="26 अक्टूबर 2026"
        lang="hi"
        labels={{ home: 'होम', effectiveDate: 'प्रभावी तिथि:' }}
      >
        <p lang="en" className="text-sm">
          <LegalLink href="/grievance">Read this page in English</LegalLink>
        </p>

        <p className="mt-6">
          अगर आपको Thridify से, हमारे द्वारा होस्ट किए गए किसी पेज या साइट की सामग्री से, या आपके
          निजी डेटा को संभालने के हमारे तरीके से कोई शिकायत है, तो हमें लिखें। कोई भी व्यक्ति शिकायत
          कर सकता है, चाहे उसका खाता हो या न हो।
        </p>

        <address className="not-italic mt-8 rounded-2xl border border-foreground/10 p-6 leading-relaxed">
          <strong className="text-foreground">शिकायत अधिकारी</strong>
          <br />
          शिखा गुप्ता
          <br />
          आपसटेक प्राइवेट लिमिटेड (<span lang="en">Aapastech Private Limited</span>)
          <br />
          8/3, दूसरी मंज़िल, रूप नगर, दिल्ली 110007, भारत
          <br />
          ईमेल: <LegalMail />
          <br />
          फ़ोन:{' '}
          <a href={OFFICER.phoneIndiaHref} className={LINK}>
            {OFFICER.phoneIndia}
          </a>
        </address>

        <LegalSection title="शिकायत कैसे करें" id="how-to-complain">
          <p>
            विषय पंक्ति में &ldquo;Grievance&rdquo; या &ldquo;शिकायत&rdquo; लिखकर ईमेल करें। अपना
            नाम और संपर्क, जिस पेज, साइट या खाते के बारे में शिकायत है, क्या हुआ, और आप हमसे क्या
            चाहते हैं, यह बताएँ। स्क्रीनशॉट या लिंक हों तो जोड़ें। अपने निजी डेटा के बारे में अनुरोध हो
            तो बताएँ कि आप कौन सा उत्पाद इस्तेमाल करते हैं और हमारे साथ कौन सा ईमेल पता इस्तेमाल
            करते हैं।
          </p>
        </LegalSection>

        <LegalSection title="आगे क्या होगा" id="what-happens-next">
          <ul className="list-disc pl-5 space-y-2">
            <li>हम 24 घंटे के भीतर आपकी शिकायत की पावती देंगे और एक संदर्भ संख्या देंगे।</li>
            <li>हम 7 दिनों के भीतर शिकायत का समाधान करेंगे।</li>
            <li>
              अगर आप हमारे होस्ट की गई ऐसी सामग्री हटाने को कहते हैं जो हमारे{' '}
              <LegalLink href="/legal/platform-terms#rules">उपयोगकर्ता नियमों</LegalLink> को
              तोड़ती है, तो हम 36 घंटे के भीतर कार्रवाई करेंगे। स्वामित्व या बौद्धिक संपदा से जुड़े
              दावों में 7 दिन तक लग सकते हैं, क्योंकि हमें दोनों पक्षों को सुनना होता है।
            </li>
            <li>
              अगर कोई सामग्री आपको निजी या यौन रूप में दिखाती है, या आपका रूप धारण करती है (AI से
              बदली गई तस्वीरों सहित), तो रिपोर्ट करें। हम 2 घंटे के भीतर उसे हटा देंगे या उस तक
              पहुँच रोक देंगे।
            </li>
            <li>
              अपना निजी डेटा देखने, सुधारने या मिटाने, या सहमति वापस लेने के अनुरोधों का उत्तर एक
              महीने के भीतर दिया जाता है।
            </li>
            <li>
              अदालतों और सरकारी प्राधिकरणों के आदेश और सूचनाएँ इसी पते पर भेजी जा सकती हैं। हम कानून
              में तय समय के भीतर उन पर कार्रवाई करते हैं।
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="अगर आप संतुष्ट नहीं हैं" id="if-not-satisfied">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              सूचना प्रौद्योगिकी (मध्यवर्ती दिशानिर्देश और डिजिटल मीडिया आचार संहिता) नियम, 2021
              के तहत आप हमारा जवाब मिलने के 30 दिनों के भीतर{' '}
              <a href="https://gac.gov.in" className={LINK} lang="en">
                gac.gov.in
              </a>{' '}
              पर शिकायत अपील समिति (<span lang="en">Grievance Appellate Committee</span>) में अपील
              कर सकते हैं।
            </li>
            <li>
              निजी डेटा के मामलों में, डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 के संबंधित
              प्रावधान लागू होने के बाद, इस प्रक्रिया का उपयोग करने के बाद आप भारतीय डेटा संरक्षण
              बोर्ड से शिकायत कर सकते हैं।
            </li>
          </ul>
        </LegalSection>

        <p className="mt-12">
          यह हिंदी अनुवाद है। किसी अंतर की स्थिति में{' '}
          <LegalLink href="/grievance">अंग्रेज़ी संस्करण</LegalLink> मान्य होगा।
        </p>
      </LegalDocument>
    </>
  );
}
