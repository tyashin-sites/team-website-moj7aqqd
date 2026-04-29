// Server-side API client — used in Server Components only
const API_BASE = process.env.TYASHIN_API_URL || '';
const API_KEY = process.env.TYASHIN_API_KEY || '';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: { code: string; message: string };
  meta?: PaginationMeta;
}

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  images?: { url: string; alt?: string; order: number; isPrimary: boolean }[];
  category?: string;
  categoryName?: string;
  variants?: Variant[];
  featured?: boolean;
  status: 'active' | 'draft' | 'archived';
  taxRate?: number;
  taxName?: string;
  taxInclusive?: boolean;
  stock: number;
  sku?: string;
}

interface Variant {
  id: string;
  name: string;
  sku?: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  attributes: Record<string, string>;
  imageUrl?: string;
  isActive: boolean;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  parentId?: string;
  order: number;
  productCount: number;
}

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  category?: string;
  author?: string;
  publishedAt: string;
  updatedAt: string;
  status: 'published' | 'draft';
}

interface StoreInfo {
  storeName: string;
  currency: string;
  taxName: string;
  taxRate: number;
  taxInclusive: boolean;
  paymentGateway: 'stripe' | 'razorpay' | 'none';
  enableCod: boolean;
  enableWhatsapp: boolean;
}

async function serverFetch<T>(path: string, opts?: RequestInit & { revalidate?: number }): Promise<T> {
  const res = await fetch(`${API_BASE}/api/v1/public/ecommerce${path}`, {
    ...opts,
    headers: {
      'X-API-Key': API_KEY,
      'Content-Type': 'application/json',
      ...opts?.headers,
    },
    next: { revalidate: opts?.revalidate ?? 60 },
  });
  
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  
  const data: ApiResponse<T> = await res.json();
  
  if (!data.success) {
    throw new Error(data.error?.message || 'API error');
  }
  
  return data.data;
}

// Blog API endpoints
async function blogFetch<T>(path: string, opts?: RequestInit & { revalidate?: number }): Promise<T> {
  const res = await fetch(`${API_BASE}/api/v1/public/blog${path}`, {
    ...opts,
    headers: {
      'X-API-Key': API_KEY,
      'Content-Type': 'application/json',
      ...opts?.headers,
    },
    next: { revalidate: opts?.revalidate ?? 60 },
  });
  
  if (!res.ok) {
    throw new Error(`Blog API error: ${res.status}`);
  }
  
  const data: ApiResponse<T> = await res.json();
  
  if (!data.success) {
    throw new Error(data.error?.message || 'Blog API error');
  }
  
  return data.data;
}

export async function getStoreInfo(): Promise<StoreInfo> {
  return serverFetch<StoreInfo>('/store-info');
}

export async function getProducts(params?: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<{ products: Product[]; meta: PaginationMeta }> {
  const qs = new URLSearchParams();
  if (params?.category) qs.set('category', params.category);
  if (params?.search) qs.set('search', params.search);
  if (params?.page) qs.set('page', String(params.page));
  if (params?.limit) qs.set('limit', String(params.limit));
  const query = qs.toString() ? '?' + qs.toString() : '';
  
  const data = await serverFetch<{ products: Product[]; meta: PaginationMeta }>('/products' + query);
  return data;
}

export async function getProduct(slug: string): Promise<{ product: Product }> {
  return serverFetch<{ product: Product }>('/products/' + slug);
}

export async function getCategories(): Promise<{ categories: Category[] }> {
  return serverFetch<{ categories: Category[] }>('/categories');
}

export async function getFeaturedProducts(): Promise<{ products: Product[] }> {
  return serverFetch<{ products: Product[] }>('/products?featured=true&limit=8');
}

// Blog endpoints
export async function getBlogPosts(params?: {
  page?: number;
  limit?: number;
}): Promise<{ posts: BlogPost[]; meta: PaginationMeta }> {
  const qs = new URLSearchParams();
  if (params?.page) qs.set('page', String(params.page));
  if (params?.limit) qs.set('limit', String(params.limit));
  const query = qs.toString() ? '?' + qs.toString() : '';
  
  const data = await blogFetch<{ posts: BlogPost[]; meta: PaginationMeta }>('/posts' + query);
  return data;
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  return blogFetch<BlogPost>('/posts/' + slug);
}

export type { Product, Category, BlogPost, StoreInfo, Variant, PaginationMeta };