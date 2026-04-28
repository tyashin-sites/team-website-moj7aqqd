import { HeroSplit } from '@/components/sections/HeroSplit';
import { FeaturesList } from '@/components/sections/FeaturesList';
import { CTA } from '@/components/sections/CTA';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Furniture Industry Solutions',
  description: '3D visualization and AR for furniture brands. Let customers see how furniture looks in their space before buying.',
  openGraph: {
    title: 'Furniture Industry | Thridify 3D & AR Solutions',
    description: '3D visualization and AR solutions specifically for furniture brands',
  },
};

export default function FurnitureIndustryPage() {
  return (
    <>
      <HeroSplit 
        title="3D & AR for Furniture"
        subtitle="Let customers visualize furniture in their space with realistic 3D and AR experiences"
        primaryCTA={{
          text: "Book a Demo",
          url: "https://calendly.com/thridify"
        }}
      />
      <FeaturesList 
        title="Furniture-Specific Features"
        features={[
          {
            title: "Room Visualization",
            description: "Place furniture in real rooms using AR technology"
          },
          {
            title: "Material Configurator",
            description: "Change fabrics, colors, and finishes in real-time"
          },
          {
            title: "Scale Accuracy",
            description: "Precise measurements ensure perfect fit in customer spaces"
          },
          {
            title: "Style Matching",
            description: "AI-powered recommendations based on room aesthetics"
          }
        ]}
      />
      <CTA 
        title="Transform Your Furniture Business"
        primaryCTA={{
          text: "Book a Demo",
          url: "https://calendly.com/thridify"
        }}
        secondaryCTA={{
          text: "Contact Sales",
          url: "/contact"
        }}
      />
    </>
  );
}