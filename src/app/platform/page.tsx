import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Process } from '@/components/sections/Process';
import { CTA } from '@/components/sections/CTA';
import siteData from '../../../content/site.json';

export const metadata: Metadata = {
  title: 'Platform - Complete 3D & AR Commerce Platform',
  description: 'Everything you need to create immersive product experiences that drive conversions and reduce returns.',
};

export default function PlatformPage() {
  const { pages } = siteData;
  const platformData = pages.platform;

  return (
    <div className="overflow-hidden">
      <Hero data={platformData.hero} />
      <Features data={platformData.features} />
      <Process data={platformData.process} />
      <CTA data={platformData.cta} />
    </div>
  );
}