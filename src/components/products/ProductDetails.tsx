'use client';
import { useState } from 'react';
import { Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';
import { AddToCartButton } from './AddToCartButton';
import { formatPrice, calcTax } from '@/lib/format';
import type { Product } from '@/lib/tyashin';

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  
  const currentVariant = product.variants?.find(v => v.id === selectedVariant);
  const currentPrice = currentVariant?.price || product.price;
  const currentComparePrice = currentVariant?.compareAtPrice || product.compareAtPrice;
  const currentStock = currentVariant?.stock ?? product.stock;
  
  const hasDiscount = currentComparePrice && currentComparePrice > currentPrice;
  const taxAmount = product.taxRate ? calcTax(currentPrice, product.taxRate, product.taxInclusive || false) : 0;
  
  // Group variants by attribute type for better UX
  const variantAttributes = product.variants?.reduce((acc, variant) => {
    Object.entries(variant.attributes).forEach(([key, value]) => {
      if (!acc[key]) acc[key] = new Set();
      acc[key].add(value);
    });
    return acc;
  }, {} as Record<string, Set<string>>);

  return (
    <div className="space-y-6">
      {/* Product Title & Rating */}
      <div>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
          {product.name}
        </h1>
        {product.categoryName && (
          <p className="text-muted mb-4">{product.categoryName}</p>
        )}
        
        {/* Placeholder rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-sm text-muted">(4.8 • 124 reviews)</span>
        </div>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-foreground">
            {formatPrice(currentPrice, 'USD')}
          </span>
          {hasDiscount && (
            <span className="text-xl text-muted line-through">
              {formatPrice(currentComparePrice!, 'USD')}
            </span>
          )}
        </div>
        
        {/* Tax breakdown */}
        {product.taxRate && (
          <div className="text-sm text-muted space-y-1">
            {product.taxInclusive ? (
              <div>
                <div>Price: {formatPrice(currentPrice - taxAmount, 'USD')}</div>
                <div>{product.taxName || 'Tax'} ({product.taxRate}%): {formatPrice(taxAmount, 'USD')} (included)</div>
                <div className="font-semibold border-t pt-1 mt-1">
                  Total: {formatPrice(currentPrice, 'USD')}
                </div>
              </div>
            ) : (
              <div>
                <div>Price: {formatPrice(currentPrice, 'USD')}</div>
                <div>{product.taxName || 'Tax'} ({product.taxRate}%): {formatPrice(taxAmount, 'USD')}</div>
                <div className="font-semibold border-t pt-1 mt-1">
                  Total: {formatPrice(currentPrice + taxAmount, 'USD')}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Description */}
      {product.description && (
        <div className="prose prose-sm max-w-none">
          <p className="text-muted leading-relaxed">{product.description}</p>
        </div>
      )}

      {/* Variant Selection */}
      {product.hasVariants && variantAttributes && (
        <div className="space-y-4">
          {Object.entries(variantAttributes).map(([attribute, values]) => (
            <div key={attribute}>
              <label className="block text-sm font-semibold text-foreground mb-2 capitalize">
                {attribute}
              </label>
              <div className="flex flex-wrap gap-2">
                {Array.from(values).map((value) => {
                  const variant = product.variants?.find(v => v.attributes[attribute] === value);
                  const isSelected = selectedVariant === variant?.id;
                  const isAvailable = variant && variant.isActive && variant.stock > 0;
                  
                  return (
                    <button
                      key={value}
                      onClick={() => setSelectedVariant(isSelected ? undefined : variant?.id)}
                      disabled={!isAvailable}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                        isSelected
                          ? 'border-primary bg-primary text-white'
                          : isAvailable
                          ? 'border-border hover:border-primary'
                          : 'border-border bg-gray-50 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quantity & Stock */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Quantity
          </label>
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-gray-50 transition-colors"
                disabled={quantity <= 1}
              >
                −
              </button>
              <span className="px-4 py-2 border-x border-border">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                className="px-3 py-2 hover:bg-gray-50 transition-colors"
                disabled={quantity >= currentStock}
              >
                +
              </button>
            </div>
            <span className="text-sm text-muted">
              {currentStock > 0 ? `${currentStock} in stock` : 'Out of stock'}
            </span>
          </div>
        </div>
      </div>

      {/* Add to Cart */}
      <div className="space-y-3">
        <AddToCartButton
          product={product}
          variantId={selectedVariant}
          quantity={quantity}
          disabled={currentStock <= 0}
          size="lg"
          className="w-full"
        />
        
        <Button variant="outline" size="lg" className="w-full">
          Add to Wishlist
        </Button>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <Truck className="w-5 h-5 text-primary" />
          <div>
            <div className="font-semibold text-foreground text-sm">Free Shipping</div>
            <div className="text-xs text-muted">On orders over $50</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-primary" />
          <div>
            <div className="font-semibold text-foreground text-sm">2 Year Warranty</div>
            <div className="text-xs text-muted">Full coverage</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <RotateCcw className="w-5 h-5 text-primary" />
          <div>
            <div className="font-semibold text-foreground text-sm">30 Day Returns</div>
            <div className="text-xs text-muted">Easy returns</div>
          </div>
        </div>
      </div>
    </div>
  );
}