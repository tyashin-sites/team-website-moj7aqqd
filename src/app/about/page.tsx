import { HeroMinimal } from '@/components/sections/HeroMinimal';
import { About } from '@/components/sections/About';
import { Team } from '@/components/sections/Team';
import { Values } from '@/components/sections/Values';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Thridify',
  description: 'Pioneering the future of e-commerce with 3D and AR technology. Learn about our mission, team, and values.',
  openGraph: {
    title: 'About Thridify - Pioneering 3D & AR Commerce',
    description: 'Learn about our mission to transform e-commerce with cutting-edge 3D and AR technology',
  },
};

export default function AboutPage() {
  return (
    <>
      <HeroMinimal 
        title="About Thridify"
        subtitle="Pioneering the future of e-commerce with 3D and AR technology"
      />
      <About />
      <Team />
      <Values />
    </>
  );
}