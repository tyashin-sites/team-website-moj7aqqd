import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { AddToCartButton } from './AddToCartButton';
import { formatPrice } from '@/lib/format';
import type { Product, PaginationMeta } from '@/lib/tyashin';

interface ProductGridProps {
  products: Product[];
  meta: PaginationMeta;
}

export function ProductGrid({ products, meta }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-4">No products found</h2>
        <p className="text-muted">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];
          const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
          
          return (
            <Card key={product._id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <Link href={`/products/${product.slug}`}>
                <div className="aspect-square relative bg-gray-100">
                  {primaryImage ? (
                    <Image
                      src={primaryImage.url}
                      alt={primaryImage.alt || product.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <ShoppingCart className="w-16 h-16" />
                    </div>
                  )}
                  
                  {hasDiscount && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                      Sale
                    </div>
                  )}
                  
                  {product.stock <= 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-white text-black px-4 py-2 rounded-lg font-semibold">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>
              </Link>
              
              <CardContent className="p-4">
                <div className="mb-2">
                  {product.categoryName && (
                    <span className="text-sm text-muted">{product.categoryName}</span>
                  )}
                </div>
                
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                  <Link href={`/products/${product.slug}`} className="hover:text-primary transition-colors">
                    {product.name}
                  </Link>
                </h3>
                
                {product.shortDescription && (
                  <p className="text-sm text-muted mb-3 line-clamp-2">
                    {product.shortDescription}
                  </p>
                )}
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-foreground">
                    {formatPrice(product.price, 'USD')}
                  </span>
                  {hasDiscount && (
                    <span className="text-sm text-muted line-through">
                      {formatPrice(product.compareAtPrice!, 'USD')}
                    </span>
                  )}
                </div>
                
                {/* Tax annotation */}
                {product.taxRate && (
                  <div className="text-xs text-muted mb-3">
                    {product.taxInclusive ? (
                      <span>incl. {product.taxName || 'Tax'}</span>
                    ) : (
                      <span>+ {product.taxName || 'Tax'}</span>
                    )}
                  </div>
                )}
                
                <AddToCartButton 
                  product={product}
                  disabled={product.stock <= 0}
                  className="w-full"
                />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4">
          {meta.page > 1 && (
            <Link href={`/products?page=${meta.page - 1}`}>
              <Button variant="outline">Previous</Button>
            </Link>
          )}
          
          <span className="text-muted">
            Page {meta.page} of {meta.totalPages}
          </span>
          
          {meta.page < meta.totalPages && (
            <Link href={`/products?page=${meta.page + 1}`}>
              <Button variant="outline">Next</Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}