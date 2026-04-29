'use client';
import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCart } from '../CartProvider';
import type { Product } from '@/lib/tyashin';

interface AddToCartButtonProps {
  product: Product;
  variantId?: string;
  quantity?: number;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function AddToCartButton({
  product,
  variantId,
  quantity = 1,
  disabled = false,
  size = 'md',
  className,
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { add } = useCart();

  const handleAddToCart = async () => {
    if (disabled || isAdding) return;

    setIsAdding(true);
    try {
      await add(product._id, variantId, quantity);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      // You could show an error toast here
    } finally {
      setIsAdding(false);
    }
  };

  if (justAdded) {
    return (
      <Button
        size={size}
        className={`bg-green-500 hover:bg-green-600 ${className}`}
        disabled
      >
        <Check className="w-4 h-4 mr-2" />
        Added to Cart
      </Button>
    );
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={disabled || isAdding}
      size={size}
      className={className}
    >
      <ShoppingCart className="w-4 h-4 mr-2" />
      {isAdding ? 'Adding...' : disabled ? 'Out of Stock' : 'Add to Cart'}
    </Button>
  );
}