import { HeroSplit } from '@/components/sections/HeroSplit';
import { FeaturesList } from '@/components/sections/FeaturesList';
import { CTA } from '@/components/sections/CTA';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CommerceTools Integration',
  description: 'Headless 3D and AR solution for CommerceTools. API-first integration for modern commerce architectures.',
  openGraph: {
    title: 'Thridify for CommerceTools | Headless 3D & AR',
    description: 'API-first 3D and AR integration for CommerceTools',
  },
};

export default function CommerceToolsIntegrationPage() {
  return (
    <>
      <HeroSplit 
        title="Thridify for CommerceTools"
        subtitle="API-first 3D and AR solution for modern commerce architectures"
        primaryCTA={{
          text: "Get API Access",
          url: "#"
        }}
      />
      <FeaturesList 
        title="CommerceTools-Specific Benefits"
        features={[
          {
            title: "Headless Architecture",
            description: "API-first integration perfect for headless commerce"
          },
          {
            title: "GraphQL Support",
            description: "Native GraphQL APIs for efficient data fetching"
          },
          {
            title: "Microservices Ready",
            description: "Designed for modern microservices architectures"
          }
        ]}
      />
      <CTA 
        title="Build the Future of Commerce"
        primaryCTA={{
          text: "Get API Access",
          url: "#"
        }}
        secondaryCTA={{
          text: "Book a Demo",
          url: "https://calendly.com/thridify"
        }}
      />
    </>
  );
}