'use client';
// Client-side SDK — cart, wishlist, session management

const API_BASE = process.env.NEXT_PUBLIC_TYASHIN_API_URL || '';
const API_KEY = process.env.NEXT_PUBLIC_TYASHIN_API_KEY || '';
const SESSION_KEY = 'tyashin_session_id';

interface CartData {
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  taxName: string;
  taxInclusive: boolean;
  total: number;
  currency: string;
  coupon?: { code: string; discount: number };
}

interface CartItem {
  productId: string;
  variantId?: string;
  name: string;
  image?: string;
  price: number;
  quantity: number;
  subtotal: number;
  taxRate: number;
}

function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let sid = localStorage.getItem(SESSION_KEY);
  if (!sid) {
    sid = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, sid);
  }
  return sid;
}

async function clientFetch<T>(path: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}/api/v1/public/ecommerce${path}`, {
    ...opts,
    headers: {
      'X-API-Key': API_KEY,
      'X-Session-Id': getSessionId(),
      'Content-Type': 'application/json',
      ...opts?.headers,
    },
  });
  
  const data = await res.json();
  
  if (!data.success) {
    throw new Error(data.error?.message || 'API error');
  }
  
  return data.data;
}

export async function getCart(): Promise<CartData> {
  return clientFetch<CartData>('/cart');
}

export async function addToCart(
  productId: string,
  variantId?: string,
  quantity = 1
): Promise<CartData> {
  return clientFetch<CartData>('/cart/items', {
    method: 'POST',
    body: JSON.stringify({ productId, variantId, quantity }),
  });
}

export async function updateCartItem(
  productId: string,
  quantity: number,
  variantId?: string
): Promise<CartData> {
  const qs = variantId ? '?variantId=' + variantId : '';
  return clientFetch<CartData>('/cart/items/' + productId + qs, {
    method: 'PATCH',
    body: JSON.stringify({ quantity }),
  });
}

export async function removeCartItem(
  productId: string,
  variantId?: string
): Promise<CartData> {
  return updateCartItem(productId, 0, variantId);
}

export async function applyCoupon(code: string): Promise<CartData> {
  return clientFetch<CartData>('/cart/coupon', {
    method: 'POST',
    body: JSON.stringify({ code }),
  });
}

export type { CartData, CartItem };