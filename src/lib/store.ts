/**
 * Client-side store (localStorage).
 * When you add a real backend later, swap these helpers for API calls.
 * Admin + checkout both use this so Paystack orders land in Admin → Orders.
 */
import { NEWS as SEED_NEWS, PRODUCTS as SEED_PRODUCTS, PODCASTS as SEED_PODCASTS, NewsArticle, Product } from '../data';

const KEYS = {
  news: 'fft_news',
  products: 'fft_products',
  orders: 'fft_orders',
  subs: 'fft_subs',
  settings: 'fft_settings',
} as const;

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'cancelled';

export type StoreOrder = {
  id: string;
  reference: string;
  createdAt: string;
  status: OrderStatus;
  customer: { name: string; email: string; phone: string; address: string; city: string; note?: string };
  lines: { productId: string; name: string; size: string; qty: number; unitPriceNaira: number }[];
  totalNaira: number;
  paystackRef?: string;
  mode?: 'live' | 'demo';
};

export type Subscriber = { email: string; joinedAt: string };

export type SiteSettings = {
  siteName: string;
  supportEmail: string;
  supportPhone: string;
  paystackReady: boolean;
};

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getNews(): NewsArticle[] {
  return read(KEYS.news, SEED_NEWS);
}
export function saveNews(list: NewsArticle[]) {
  write(KEYS.news, list);
}

export function getProducts(): Product[] {
  return read(KEYS.products, SEED_PRODUCTS);
}
export function saveProducts(list: Product[]) {
  write(KEYS.products, list);
}

export function getOrders(): StoreOrder[] {
  return read(KEYS.orders, [] as StoreOrder[]);
}
export function saveOrders(list: StoreOrder[]) {
  write(KEYS.orders, list);
}
export function addOrder(order: StoreOrder) {
  const all = getOrders();
  all.unshift(order);
  saveOrders(all);
  return order;
}
export function updateOrderStatus(id: string, status: OrderStatus) {
  const all = getOrders().map((o) => (o.id === id ? { ...o, status } : o));
  saveOrders(all);
}

export function getSubscribers(): Subscriber[] {
  return read(KEYS.subs, [] as Subscriber[]);
}
export function addSubscriber(email: string) {
  const all = getSubscribers();
  if (all.some((s) => s.email.toLowerCase() === email.toLowerCase())) return;
  all.unshift({ email, joinedAt: new Date().toISOString() });
  write(KEYS.subs, all);
}

export function getSettings(): SiteSettings {
  return read(KEYS.settings, {
    siteName: 'Football Fans Tribe',
    supportEmail: 'hello@footballfanstribe.com',
    supportPhone: '+234 800 000 0000',
    paystackReady: Boolean(import.meta.env.VITE_PAYSTACK_PUBLIC_KEY),
  });
}
export function saveSettings(s: SiteSettings) {
  write(KEYS.settings, s);
}

export function getPodcasts() {
  return SEED_PODCASTS;
}

export function adminStats() {
  const orders = getOrders();
  const paid = orders.filter((o) => o.status === 'paid' || o.status === 'shipped');
  const revenue = paid.reduce((s, o) => s + o.totalNaira, 0);
  return {
    newsCount: getNews().length,
    productCount: getProducts().length,
    orderCount: orders.length,
    paidCount: paid.length,
    revenue,
    subCount: getSubscribers().length,
  };
}
