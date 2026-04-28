import { HeroSplit } from '@/components/sections/HeroSplit';
import { FeaturesList } from '@/components/sections/FeaturesList';
import { CTA } from '@/components/sections/CTA';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AR Viewer',
  description: 'No-app-needed augmented reality experiences for your customers. Let them visualize products in their space.',
  openGraph: {
    title: 'AR Viewer | Thridify',
    description: 'No-app-needed augmented reality experiences for your customers',
  },
};

export default function ARViewerPage() {
  return (
    <>
      <HeroSplit 
        title="AR Viewer"
        subtitle="No-app-needed augmented reality experiences for your customers"
        primaryCTA={{
          text: "Book a Demo",
          url: "https://calendly.com/thridify"
        }}
      />
      <FeaturesList 
        title="AR Experience Features"
        features={[
          {
            title: "WebAR Technology",
            description: "Works directly in web browsers without app downloads"
          },
          {
            title: "Try Before You Buy",
            description: "Visualize products in real environments"
          },
          {
            title: "Cross-Platform",
            description: "Compatible with iOS and Android devices"
          }
        ]}
      />
      <CTA 
        title="Experience AR Commerce"
        primaryCTA={{
          text: "Book a Demo",
          url: "https://calendly.com/thridify"
        }}
      />
    </>
  );
}