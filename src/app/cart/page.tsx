'use client';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function CartPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Cart</h1>
        <p className="text-muted mb-8">Shopping cart functionality coming soon.</p>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
