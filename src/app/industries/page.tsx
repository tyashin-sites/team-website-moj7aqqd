import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { Industries } from '@/components/sections/Industries';
import { CTA } from '@/components/sections/CTA';
import siteData from '../../../content/site.json';

export const metadata: Metadata = {
  title: 'Industries - Transforming Commerce Across Industries',
  description: 'Discover how Thridify\'s 3D and AR solutions drive results in your specific industry.',
};

export default function IndustriesPage() {
  const { pages } = siteData;
  const industriesData = pages.industries;

  return (
    <div className="overflow-hidden">
      <Hero data={industriesData.hero} />
      <Industries data={industriesData.industries} />
      <CTA data={industriesData.cta} />
    </div>
  );
}