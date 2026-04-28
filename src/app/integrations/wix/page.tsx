import { HeroSplit } from '@/components/sections/HeroSplit';
import { FeaturesList } from '@/components/sections/FeaturesList';
import { CTA } from '@/components/sections/CTA';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wix Integration',
  description: 'Add 3D and AR to your Wix store with our easy-to-use app. No coding required, visual editor integration.',
  openGraph: {
    title: 'Thridify for Wix | No-Code 3D & AR',
    description: 'Add 3D and AR to your Wix store with no coding required',
  },
};

export default function WixIntegrationPage() {
  return (
    <>
      <HeroSplit 
        title="Thridify for Wix"
        subtitle="Add 3D and AR to your Wix store with no coding required"
        primaryCTA={{
          text: "Install App",
          url: "#"
        }}
      />
      <FeaturesList 
        title="Wix-Specific Benefits"
        features={[
          {
            title: "Visual Editor Integration",
            description: "Drag and drop 3D elements directly in Wix Editor"
          },
          {
            title: "No Coding Required",
            description: "Set up 3D and AR experiences without any technical knowledge"
          },
          {
            title: "Mobile Optimized",
            description: "Automatically optimized for Wix mobile sites"
          }
        ]}
      />
      <CTA 
        title="Transform Your Wix Store"
        primaryCTA={{
          text: "Install App",
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