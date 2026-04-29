'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import type { Category } from '@/lib/tyashin';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory?: string;
}

export function CategoryFilter({ categories, selectedCategory }: CategoryFilterProps) {
  const searchParams = useSearchParams();
  
  const createCategoryUrl = (categorySlug?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (categorySlug) {
      params.set('category', categorySlug);
    } else {
      params.delete('category');
    }
    params.delete('page'); // Reset pagination when filtering
    const query = params.toString();
    return `/products${query ? `?${query}` : ''}`;
  };

  return (
    <div>
      <h3 className="font-semibold text-foreground mb-4">Categories</h3>
      <div className="space-y-2">
        <Link
          href={createCategoryUrl()}
          className={`block px-3 py-2 rounded-lg transition-colors ${
            !selectedCategory
              ? 'bg-primary text-white'
              : 'text-muted hover:text-foreground hover:bg-gray-100'
          }`}
        >
          All Products
        </Link>
        
        {categories.map((category) => (
          <Link
            key={category._id}
            href={createCategoryUrl(category.slug)}
            className={`block px-3 py-2 rounded-lg transition-colors ${
              selectedCategory === category.slug
                ? 'bg-primary text-white'
                : 'text-muted hover:text-foreground hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{category.name}</span>
              <span className="text-xs opacity-75">({category.productCount})</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}