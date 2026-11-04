import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { SHOPIFY_PAGE_PATH } from '@/lib/shopify-app';

/**
 * "Available on Shopify" — the one-line pointer that relevant pages carry to
 * the canonical Shopify app page (/integrations/shopify). Kept to one link so
 * the internal-link signal points at a single URL; that page links out to the
 * App Store.
 */
export function ShopifyAppNote({
  text = 'Run a Shopify store? Thridify is on the Shopify App Store.',
  className = '',
}: {
  text?: string;
  className?: string;
}) {
  return (
    <p className={`inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-primary/25 bg-primary/5 px-4 py-2 text-sm ${className}`}>
      <ShoppingBag className="w-4 h-4 text-primary shrink-0" strokeWidth={1.75} aria-hidden />
      <span className="text-foreground/80">{text}</span>
      <Link
        href={SHOPIFY_PAGE_PATH}
        className="inline-flex items-center gap-1 font-semibold text-primary hover:gap-2 transition-all"
      >
        Available on Shopify <ArrowRight className="w-3.5 h-3.5" aria-hidden />
      </Link>
    </p>
  );
}
