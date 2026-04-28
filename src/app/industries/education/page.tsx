import { HeroSplit } from '@/components/sections/HeroSplit';
import { FeaturesList } from '@/components/sections/FeaturesList';
import { CTA } from '@/components/sections/CTA';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Education Industry Solutions',
  description: 'AR learning experiences for educational institutions. Bring textbooks to life with interactive 3D content.',
  openGraph: {
    title: 'Education Industry | Thridify AR Learning',
    description: 'AR learning experiences and interactive 3D content for education',
  },
};

export default function EducationIndustryPage() {
  return (
    <>
      <HeroSplit 
        title="AR in Education"
        subtitle="Bring textbooks to life with interactive 3D content and AR learning experiences"
        primaryCTA={{
          text: "Book a Demo",
          url: "https://calendly.com/thridify"
        }}
      />
      <FeaturesList 
        title="Educational AR Features"
        features={[
          {
            title: "Interactive Textbooks",
            description: "Transform static content into engaging 3D experiences"
          },
          {
            title: "Virtual Laboratories",
            description: "Conduct experiments safely in virtual environments"
          },
          {
            title: "Historical Reconstruction",
            description: "Explore ancient civilizations and historical events in AR"
          },
          {
            title: "STEM Visualization",
            description: "Make complex scientific concepts easy to understand"
          }
        ]}
      />
      <CTA 
        title="Transform Education with AR"
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