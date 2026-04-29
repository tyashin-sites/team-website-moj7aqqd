import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { getBrandKit } from '@/lib/brand-kit';
import siteData from '../../content/site.json';

export async function Footer() {
  const brandKit = await getBrandKit();
  const logoUrl = brandKit.logo?.light;
  const siteName = brandKit.siteName || 'Thridify';
  const { footer } = siteData;

  return (
    <footer className="bg-surface border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={siteName}
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              ) : (
                <span className="text-xl font-heading font-bold text-primary">{siteName}</span>
              )}
            </Link>
            <p className="text-muted mb-6 max-w-sm">
              {footer.description}
            </p>
            <div className="flex space-x-4">
              {footer.socialLinks.map((social: { name: string; url: string }) => {
                const Icon = {
                  LinkedIn: Linkedin,
                  Facebook: Facebook,
                  Instagram: Instagram,
                  WhatsApp: MessageCircle,
                }[social.name] || MessageCircle;

                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white rounded-lg hover:bg-primary hover:text-white transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Sections */}
          {Object.entries(footer.sections).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-foreground mb-4">{title}</h3>
              <ul className="space-y-2">
                {(links as { name: string; href: string }[]).map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted text-sm">
            {footer.copyright}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-muted hover:text-primary text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted hover:text-primary text-sm transition-colors">
              Terms of Service
            </Link>
            <a
              href={`mailto:${footer.contact}`}
              className="text-muted hover:text-primary text-sm transition-colors"
            >
              {footer.contact}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
