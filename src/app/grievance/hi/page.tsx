import type { Metadata } from 'next';
import { LegalDocument, LegalSection } from '@/components/LegalDocument';
import { LegalLink, LegalMail } from '@/components/LegalEntity';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';
import { INDIA_ENTITY, OFFICER } from '@/content/legal/group';

// Grievance Officer page in Hindi (publish kit K3 and K3b user rules, verbatim,
// v1.1). The principal place of business line is given in English. The document is
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
          <span lang="en">Principal place of business: {INDIA_ENTITY.principalPlace}</span>
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
              <LegalLink href="#user-rules">उपयोगकर्ता नियमों</LegalLink> को
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

        <LegalSection title="उपयोगकर्ताओं के लिए नियम" id="user-rules">
          <p>
            Thridify पर आप जो कुछ भी अपलोड, प्रकाशित या होस्ट करते हैं, उसकी ज़िम्मेदारी आपकी है,
            जिसमें आपके आगंतुकों या कर्मचारियों द्वारा जोड़ी गई सामग्री भी शामिल है। आप Thridify का
            उपयोग ऐसी कोई भी सामग्री होस्ट, प्रदर्शित, अपलोड, बदलने, प्रकाशित, भेजने, संग्रहीत करने या
            साझा करने के लिए नहीं करेंगे, और न ही किसी और को अपने खाते या साइट से ऐसा करने देंगे, जो:
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>किसी और की हो और जिसके उपयोग का आपको अधिकार न हो;</li>
            <li>
              अश्लील, पोर्नोग्राफ़िक या बाल यौन शोषण से जुड़ी हो, किसी की निजता (शारीरिक निजता सहित)
              का उल्लंघन करती हो, लिंग के आधार पर अपमान या उत्पीड़न करती हो, नस्लीय या जातीय रूप से
              आपत्तिजनक हो, धन शोधन या जुए से जुड़ी हो या उसे बढ़ावा देती हो, या हिंसा भड़काने के इरादे
              से धर्म या जाति के आधार पर समूहों के बीच शत्रुता बढ़ाती हो;
            </li>
            <li>बच्चों के लिए हानिकारक हो;</li>
            <li>किसी पेटेंट, ट्रेडमार्क, कॉपीराइट या अन्य स्वामित्व अधिकार का उल्लंघन करती हो;</li>
            <li>
              संदेश के स्रोत के बारे में धोखा देती या भ्रमित करती हो, या जानबूझकर गलत या भ्रामक
              जानकारी फैलाती हो;
            </li>
            <li>किसी अन्य व्यक्ति का रूप धारण करती हो;</li>
            <li>
              भारत की एकता, अखंडता, रक्षा, सुरक्षा या संप्रभुता, अन्य देशों के साथ मैत्रीपूर्ण संबंधों
              या सार्वजनिक व्यवस्था के लिए ख़तरा हो, किसी संज्ञेय अपराध के लिए उकसाती हो, किसी अपराध
              की जाँच में बाधा डालती हो, या किसी अन्य राष्ट्र का अपमान करती हो;
            </li>
            <li>
              ऐसा वायरस या कोड रखती हो जो किसी कंप्यूटर संसाधन को बाधित, नष्ट या सीमित करने के लिए
              बना हो;
            </li>
            <li>
              ऐसा ऑनलाइन गेम हो जो अनुमत गेम के रूप में सत्यापित नहीं है, या ऐसे गेम का विज्ञापन या
              प्रचार करती हो; या
            </li>
            <li>किसी लागू कानून का उल्लंघन करती हो।</li>
          </ol>
          <p>
            <strong>हम क्या कर सकते हैं।</strong> इन नियमों, हमारी गोपनीयता नीति या हमारी शर्तों का
            उल्लंघन होने पर हम आपकी पहुँच तुरंत निलंबित या समाप्त कर सकते हैं, और सामग्री हटा सकते
            हैं या उस तक पहुँच रोक सकते हैं। अगर सामग्री कानून का उल्लंघन करती है, तो आप पर सूचना
            प्रौद्योगिकी अधिनियम, 2000 और अन्य कानूनों के तहत दंड लग सकता है। अगर उल्लंघन ऐसा अपराध है
            जिसकी सूचना देना कानूनन अनिवार्य है, जैसे भारतीय नागरिक सुरक्षा संहिता, 2023 या लैंगिक
            अपराधों से बालकों का संरक्षण अधिनियम, 2012 के तहत, तो हम उसकी सूचना प्राधिकरणों को देंगे।
            AI टूल्स का दुरुपयोग करके गैरकानूनी सामग्री, जैसे असली लोगों के नकली चित्र या वीडियो,
            बनाना भी इन्हीं कानूनों के तहत दंडनीय हो सकता है। AI से बनी सामग्री पर लगे लेबल या
            मेटाडेटा न हटाएँ। हम हर तीन महीने में कम से कम एक बार सभी उपयोगकर्ताओं को इन नियमों की
            याद दिलाते हैं।
          </p>
        </LegalSection>

        <p className="mt-12">
          यह हिंदी अनुवाद है। किसी अंतर की स्थिति में{' '}
          <LegalLink href="/grievance">अंग्रेज़ी संस्करण</LegalLink> मान्य होगा।
        </p>
      </LegalDocument>
    </>
  );
}
