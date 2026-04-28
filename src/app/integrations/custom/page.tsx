import { HeroSplit } from '@/components/sections/HeroSplit';
import { FeaturesList } from '@/components/sections/FeaturesList';
import { CTA } from '@/components/sections/CTA';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom Integration',
  description: 'Build custom 3D and AR integrations with our flexible APIs. Perfect for enterprise and custom e-commerce solutions.',
  openGraph: {
    title: 'Custom Integration | Thridify APIs',
    description: 'Build custom 3D and AR integrations with our flexible APIs',
  },
};

export default function CustomIntegrationPage() {
  return (
    <>
      <HeroSplit 
        title="Custom Integration"
        subtitle="Build custom 3D and AR integrations with our flexible APIs"
        primaryCTA={{
          text: "View Documentation",
          url: "#"
        }}
      />
      <FeaturesList 
        title="Custom Integration Benefits"
        features={[
          {
            title: "Flexible APIs",
            description: "RESTful APIs and SDKs for any platform or framework"
          },
          {
            title: "White Label Solution",
            description: "Fully customizable to match your brand and requirements"
          },
          {
            title: "Enterprise Support",
            description: "Dedicated support team for custom implementations"
          }
        ]}
      />
      <CTA 
        title="Ready to Build Something Custom?"
        primaryCTA={{
          text: "Contact Our Team",
          url: "/contact"
        }}
        secondaryCTA={{
          text: "View Documentation",
          url: "#"
        }}
      />
    </>
  );
}