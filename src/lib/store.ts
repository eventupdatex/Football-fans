/**
 * Client-side store (localStorage). Supabase can replace these later.
 */
import { NEWS as SEED_NEWS, PRODUCTS as SEED_PRODUCTS, PODCASTS as SEED_PODCASTS, NewsArticle, Product } from '../data';

const KEYS = {
  news: 'fft_news',
  products: 'fft_products',
  orders: 'fft_orders',
  subs: 'fft_subs',
  settings: 'fft_settings',
  ads: 'fft_ad_bookings',
  users: 'fft_users',
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

export type AdBookingStatus = 'pending' | 'approved' | 'rejected' | 'live' | 'paid';

export type AdBooking = {
  id: string;
  createdAt: string;
  status: AdBookingStatus;
  packageId: string;
  packageName: string;
  packagePriceLabel: string;
  amountNaira: number;
  company: string;
  contactName: string;
  email: string;
  phone: string;
  bannerUrl: string;
  message?: string;
  paystackRef?: string;
  mode?: 'live' | 'demo';
};

export type CrmUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'advertiser' | 'staff';
  note?: string;
  createdAt: string;
};

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

export const AD_PACKAGE_NGN: Record<string, number> = {
  a1: 450000,
  a2: 280000,
  a3: 350000,
  a4: 500000,
};

export function getAdBookings(): AdBooking[] {
  return read(KEYS.ads, [] as AdBooking[]);
}
export function saveAdBookings(list: AdBooking[]) {
  write(KEYS.ads, list);
}
export function addAdBooking(b: AdBooking) {
  const all = getAdBookings();
  all.unshift(b);
  saveAdBookings(all);
  return b;
}
export function updateAdBookingStatus(id: string, status: AdBookingStatus) {
  saveAdBookings(getAdBookings().map((b) => (b.id === id ? { ...b, status } : b)));
}

export function getUsers(): CrmUser[] {
  return read(KEYS.users, [] as CrmUser[]);
}
export function saveUsers(list: CrmUser[]) {
  write(KEYS.users, list);
}
export function upsertUserFromCustomer(
  c: { name: string; email: string; phone: string },
  role: CrmUser['role'] = 'customer',
) {
  const all = getUsers();
  const i = all.findIndex((u) => u.email.toLowerCase() === c.email.toLowerCase());
  if (i >= 0) {
    all[i] = { ...all[i], name: c.name, phone: c.phone, role };
    saveUsers(all);
    return all[i];
  }
  const u: CrmUser = {
    id: `u-${Date.now()}`,
    name: c.name,
    email: c.email,
    phone: c.phone,
    role,
    createdAt: new Date().toISOString(),
  };
  all.unshift(u);
  saveUsers(all);
  return u;
}

export function adminStats() {
  const orders = getOrders();
  const paid = orders.filter((o) => o.status === 'paid' || o.status === 'shipped');
  const revenue = paid.reduce((s, o) => s + o.totalNaira, 0);
  const ads = getAdBookings();
  return {
    newsCount: getNews().length,
    productCount: getProducts().length,
    orderCount: orders.length,
    paidCount: paid.length,
    revenue,
    subCount: getSubscribers().length,
    adPending: ads.filter((a) => a.status === 'pending' || a.status === 'paid').length,
    userCount: getUsers().length,
  };
}
