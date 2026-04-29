import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Mission } from '@/components/sections/Mission';
import { GlobalOffices } from '@/components/sections/GlobalOffices';
import { Values } from '@/components/sections/Values';
import { CTA } from '@/components/sections/CTA';
import siteData from '../../../content/site.json';

export const metadata: Metadata = {
  title: 'About Us - Reimagining Commerce with 3D & AR',
  description: "We're Aapastech Private Limited, creators of Thridify — the platform that's transforming how the world experiences products online.",
};

export default function AboutPage() {
  const { pages } = siteData;
  const aboutData = pages.about;

  return (
    <div className="overflow-hidden">
      <Hero data={aboutData.hero} />
      <About data={aboutData.story} />
      <Mission data={aboutData.mission} />
      <GlobalOffices data={aboutData.globalOffices} />
      <Values data={aboutData.values} />
      <CTA data={aboutData.cta} />
    </div>
  );
}