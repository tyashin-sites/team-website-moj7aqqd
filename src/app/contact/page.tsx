import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { Contact } from '@/components/sections/Contact';
import siteData from '../../../content/site.json';

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch',
  description: 'Ready to transform your product experience? Contact our team for a personalized demo.',
};

export default function ContactPage() {
  const { pages } = siteData;
  const contactData = pages.contact;

  return (
    <div className="overflow-hidden">
      <Hero data={contactData.hero} />
      <Contact data={contactData.contact} />
    </div>
  );
}