import Link from 'next/link';
import { Plug, ArrowRight } from 'lucide-react';
import { WOO_PAGE_PATH } from '@/lib/woocommerce-plugin';

/**
 * "Available on WordPress.org": the one-line pointer that relevant pages carry
 * to the canonical WooCommerce plugin page (/integrations/woocommerce). Kept to
 * one link so the internal-link signal points at a single URL; that page links
 * out to WordPress.org.
 */
export function WooCommercePluginNote({
  text = 'Run a WooCommerce store? Thridify has a free plugin.',
  className = '',
}: {
  text?: string;
  className?: string;
}) {
  return (
    <p className={`inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-primary/25 bg-primary/5 px-4 py-2 text-sm ${className}`}>
      <Plug className="w-4 h-4 text-primary shrink-0" strokeWidth={1.75} aria-hidden />
      <span className="text-foreground/80">{text}</span>
      <Link
        href={WOO_PAGE_PATH}
        className="inline-flex items-center gap-1 font-semibold text-primary hover:gap-2 transition-all"
      >
        Available on WordPress.org <ArrowRight className="w-3.5 h-3.5" aria-hidden />
      </Link>
    </p>
  );
}
