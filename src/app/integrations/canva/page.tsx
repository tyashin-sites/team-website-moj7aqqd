import { HeroSplit } from '@/components/sections/HeroSplit';
import { FeaturesList } from '@/components/sections/FeaturesList';
import { CTA } from '@/components/sections/CTA';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Canva Integration',
  description: 'Create stunning 3D product visuals with Canva integration. Design and export 3D assets directly from Canva.',
  openGraph: {
    title: 'Thridify for Canva | 3D Design Integration',
    description: 'Create stunning 3D product visuals with Canva integration',
  },
};

export default function CanvaIntegrationPage() {
  return (
    <>
      <HeroSplit 
        title="Thridify for Canva"
        subtitle="Create stunning 3D product visuals directly in Canva"
        primaryCTA={{
          text: "Install Extension",
          url: "#"
        }}
      />
      <FeaturesList 
        title="Canva-Specific Benefits"
        features={[
          {
            title: "Design Integration",
            description: "Add 3D elements directly to your Canva designs"
          },
          {
            title: "Template Library",
            description: "Access pre-made 3D product templates"
          },
          {
            title: "Export Options",
            description: "Export 3D visuals for web, print, and social media"
          }
        ]}
      />
      <CTA 
        title="Enhance Your Design Workflow"
        primaryCTA={{
          text: "Install Extension",
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