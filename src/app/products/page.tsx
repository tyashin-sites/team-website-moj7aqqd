import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ProductGrid } from '@/components/products/ProductGrid';
import { CategoryFilter } from '@/components/products/CategoryFilter';
import { SearchForm } from '@/components/products/SearchForm';
import { getProducts, getCategories } from '@/lib/tyashin';

export const metadata: Metadata = {
  title: 'Products - Browse Our Collection',
  description: 'Explore our complete product collection with immersive 3D and AR experiences.',
};

interface ProductsPageProps {
  searchParams: {
    category?: string;
    search?: string;
    page?: string;
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const page = parseInt(searchParams.page || '1', 10);
  const { products, meta } = await getProducts({
    category: searchParams.category,
    search: searchParams.search,
    page,
    limit: 12,
  });
  const { categories } = await getCategories();

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Our Products
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Explore our complete product collection with immersive 3D and AR experiences.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="space-y-6">
              <SearchForm />
              <CategoryFilter categories={categories} selectedCategory={searchParams.category} />
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1">
            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductGrid products={products} meta={meta} />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="h-64 bg-gray-200" />
          <div className="p-4">
            <div className="h-6 bg-gray-200 rounded mb-2" />
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
            <div className="h-8 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}