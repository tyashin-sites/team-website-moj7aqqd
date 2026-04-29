'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { Button } from '../ui/Button';

export function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    
    if (search.trim()) {
      params.set('search', search.trim());
    } else {
      params.delete('search');
    }
    
    params.delete('page'); // Reset pagination when searching
    const query = params.toString();
    router.push(`/products${query ? `?${query}` : ''}`);
  };

  const clearSearch = () => {
    setSearch('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('search');
    params.delete('page');
    const query = params.toString();
    router.push(`/products${query ? `?${query}` : ''}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-10 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
        />
        {search && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-4 h-4 text-muted" />
          </button>
        )}
      </div>
    </form>
  );
}