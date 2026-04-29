'use client';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/components/CartProvider';
import { formatPrice } from '@/lib/format';
import { Button } from '@/components/ui/Button';

export default function CartPage() {
  const { items, count, subtotal, total, taxAmount, taxName, currency, loading, update, remove } = useCart();

  if (loading) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8" />
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-4 p-4 border rounded-lg">
                  <div className="w-20 h-20 bg-gray-200 rounded" />
                  <div className="flex-1 space-y-2">
                    <div className="h-6 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
          <p className="text-muted mb-8">Add some products to get started</p>
          <Link href="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart ({count} items)</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={`${item.productId}-${item.variantId || ''}`} className="flex gap-4 p-4 border rounded-lg">
                {item.imageUrl && (
                  <div className="w-20 h-20 relative bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted">{formatPrice(item.price, currency)}</p>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => update(item.productId, item.quantity - 1, item.variantId)}
                      className="p-1 hover:bg-gray-100 rounded"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => update(item.productId, item.quantity + 1, item.variantId)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => remove(item.productId, item.variantId)}
                      className="p-1 hover:bg-red-100 text-red-600 rounded ml-4"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold">{formatPrice(item.subtotal, currency)}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="bg-gray-50 p-6 rounded-lg h-fit">
            <h2 className="text-xl font-bold text-foreground mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal, currency)}</span>
              </div>
              {taxAmount > 0 && (
                <div className="flex justify-between">
                  <span>{taxName}</span>
                  <span>{formatPrice(taxAmount, currency)}</span>
                </div>
              )}
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice(total, currency)}</span>
              </div>
            </div>
            
            <Link href="/checkout" className="block">
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </Link>
            
            <Link href="/products" className="block mt-4">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}