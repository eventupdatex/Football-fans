import React, { useEffect, useState } from 'react';
import {
  LayoutDashboard, Newspaper, ShoppingBag, Package, Users, Settings, LogOut,
  Plus, Trash2, Save, Eye, EyeOff, Radio,
} from 'lucide-react';
import {
  adminStats, getNews, saveNews, getProducts, saveProducts, getOrders, updateOrderStatus,
  getSubscribers, getSettings, saveSettings, type StoreOrder, type OrderStatus, type SiteSettings,
} from '../lib/store';
import type { NewsArticle, Product } from '../data';
import { formatNaira } from './pages-checkout';

const ADMIN_PIN = 'tribe2026';

type Tab = 'dashboard' | 'news' | 'products' | 'orders' | 'subs' | 'settings';

function AdminLogin({ onOk }: { onOk: () => void }) {
  const [pin, setPin] = useState('');
  const [show, setShow] = useState(false);
  const [err, setErr] = useState('');
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-3xl glass-strong p-6 space-y-4">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-xs font-black">FFT</div>
          <h1 className="mt-3 text-lg font-black text-slate-900">Admin</h1>
          <p className="text-xs text-slate-500">Football Fans Tribe control room</p>
        </div>
        <label className="block">
          <span className="text-[11px] font-bold text-slate-500">Access PIN</span>
          <div className="mt-1 flex gap-2">
            <input
              type={show ? 'text' : 'password'}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (pin === ADMIN_PIN ? onOk() : setErr('Wrong PIN'))}
              className="flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold outline-none focus:border-brand-500"
              placeholder="••••••••"
            />
            <button type="button" onClick={() => setShow((s) => !s)} className="rounded-xl glass px-3">
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </label>
        {err && <p className="text-xs font-semibold text-red-600">{err}</p>}
        <button type="button" onClick={() => (pin === ADMIN_PIN ? onOk() : setErr('Wrong PIN'))} className="w-full rounded-xl bg-slate-900 py-3 text-xs font-black uppercase text-white">
          Enter admin
        </button>
        <p className="text-[10px] text-center text-slate-400">Default PIN for demo: tribe2026</p>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-100 p-4 shadow-sm">
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
      <p className="mt-1 text-xl font-black text-slate-900 tabular-nums">{value}</p>
    </div>
  );
}

function AdminPage({ onExit }: { onExit: () => void }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('fft_admin') === '1');
  const [tab, setTab] = useState<Tab>('dashboard');
  const [stats, setStats] = useState(adminStats());
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<StoreOrder[]>([]);
  const [subs, setSubs] = useState<{ email: string; joinedAt: string }[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(getSettings());
  const [toast, setToast] = useState('');

  const refresh = () => {
    setStats(adminStats());
    setNews(getNews());
    setProducts(getProducts());
    setOrders(getOrders());
    setSubs(getSubscribers());
    setSettings(getSettings());
  };

  useEffect(() => {
    if (authed) refresh();
  }, [authed, tab]);

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2200);
  };

  if (!authed) {
    return (
      <AdminLogin
        onOk={() => {
          sessionStorage.setItem('fft_admin', '1');
          setAuthed(true);
        }}
      />
    );
  }

  const nav: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
    { id: 'news', label: 'News', icon: <Newspaper className="h-4 w-4" /> },
    { id: 'products', label: 'Shop', icon: <ShoppingBag className="h-4 w-4" /> },
    { id: 'orders', label: 'Orders', icon: <Package className="h-4 w-4" /> },
    { id: 'subs', label: 'Subscribers', icon: <Users className="h-4 w-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-4 pb-8">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-600">Control room</p>
          <h1 className="text-lg font-black text-slate-900">Admin</h1>
        </div>
        <button
          type="button"
          onClick={() => {
            sessionStorage.removeItem('fft_admin');
            setAuthed(false);
            onExit();
          }}
          className="inline-flex items-center gap-1.5 rounded-xl glass px-3 py-2 text-[11px] font-bold text-slate-600"
        >
          <LogOut className="h-3.5 w-3.5" /> Exit
        </button>
      </div>

      {toast && <div className="rounded-xl bg-emerald-600 text-white text-xs font-bold px-3 py-2 text-center">{toast}</div>}

      <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {nav.map((n) => (
          <button
            key={n.id}
            type="button"
            onClick={() => setTab(n.id)}
            className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold ${
              tab === n.id ? 'bg-slate-900 text-white' : 'glass text-slate-600'
            }`}
          >
            {n.icon}
            {n.label}
          </button>
        ))}
      </div>

      {tab === 'dashboard' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <StatCard label="News" value={stats.newsCount} />
            <StatCard label="Products" value={stats.productCount} />
            <StatCard label="Orders" value={stats.orderCount} />
            <StatCard label="Revenue (paid)" value={formatNaira(stats.revenue)} />
            <StatCard label="Paid orders" value={stats.paidCount} />
            <StatCard label="Newsletter" value={stats.subCount} />
          </div>
          <div className="rounded-2xl bg-slate-900 text-white p-4">
            <div className="flex items-center gap-2">
              <Radio className="h-4 w-4 text-emerald-400" />
              <p className="text-xs font-black uppercase tracking-wider text-emerald-300">Live ops</p>
            </div>
            <p className="mt-2 text-sm text-white/80 leading-relaxed">
              Public site stays fast for the 1.9M community. Content and orders are controlled here.
            </p>
          </div>
          <div className="rounded-2xl glass p-4">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Recent orders</p>
            {orders.slice(0, 5).length === 0 && <p className="text-sm text-slate-500">No orders yet.</p>}
            {orders.slice(0, 5).map((o) => (
              <div key={o.id} className="flex justify-between py-2 border-b border-slate-100 last:border-0 text-sm">
                <span className="font-semibold text-slate-800 truncate">{o.customer.name}</span>
                <span className="font-bold text-slate-900">{formatNaira(o.totalNaira)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'news' && (
        <NewsAdmin list={news} onSave={(list) => { saveNews(list); setNews(list); flash('News saved'); }} />
      )}

      {tab === 'products' && (
        <ProductsAdmin list={products} onSave={(list) => { saveProducts(list); setProducts(list); flash('Products saved'); }} />
      )}

      {tab === 'orders' && (
        <div className="space-y-3">
          {orders.length === 0 && <p className="text-sm text-slate-500">No orders yet. Complete a checkout to see one.</p>}
          {orders.map((o) => (
            <div key={o.id} className="rounded-2xl glass p-4 space-y-2">
              <div className="flex justify-between gap-2">
                <div>
                  <p className="text-sm font-black text-slate-900">{o.customer.name}</p>
                  <p className="text-[11px] text-slate-500">{o.reference}</p>
                </div>
                <p className="text-sm font-black text-brand-600">{formatNaira(o.totalNaira)}</p>
              </div>
              <p className="text-[11px] text-slate-600">{o.customer.phone} · {o.customer.email}</p>
              <p className="text-[11px] text-slate-500">{o.customer.address}, {o.customer.city}</p>
              <ul className="text-[11px] text-slate-600 space-y-0.5">
                {o.lines.map((l, i) => (
                  <li key={i}>{l.name} · {l.size} ×{l.qty}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(['pending', 'paid', 'shipped', 'cancelled'] as OrderStatus[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => { updateOrderStatus(o.id, s); setOrders(getOrders()); flash(`Order → ${s}`); }}
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold capitalize ${
                      o.status === s ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'subs' && (
        <div className="rounded-2xl glass overflow-hidden">
          {subs.length === 0 && <p className="p-4 text-sm text-slate-500">No subscribers yet.</p>}
          {subs.map((s) => (
            <div key={s.email} className="flex justify-between px-4 py-3 border-b border-slate-100 last:border-0 text-sm">
              <span className="font-semibold text-slate-800">{s.email}</span>
              <span className="text-[11px] text-slate-400">{new Date(s.joinedAt).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      )}

      {tab === 'settings' && (
        <div className="rounded-2xl glass p-4 space-y-3">
          {([['siteName', 'Site name'], ['supportEmail', 'Support email'], ['supportPhone', 'Support phone']] as const).map(([k, label]) => (
            <label key={k} className="block">
              <span className="text-[11px] font-bold text-slate-500">{label}</span>
              <input
                value={settings[k]}
                onChange={(e) => setSettings({ ...settings, [k]: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold outline-none focus:border-brand-500"
              />
            </label>
          ))}
          <p className="text-[11px] text-slate-500 rounded-xl bg-slate-50 px-3 py-2">
            Paystack: set VITE_PAYSTACK_PUBLIC_KEY in Netlify / .env.
            Status: {import.meta.env.VITE_PAYSTACK_PUBLIC_KEY ? 'Key detected' : 'Demo mode (no key)'}
          </p>
          <button type="button" onClick={() => { saveSettings(settings); flash('Settings saved'); }} className="w-full rounded-xl bg-slate-900 py-3 text-xs font-black uppercase text-white flex items-center justify-center gap-2">
            <Save className="h-4 w-4" /> Save settings
          </button>
        </div>
      )}
    </div>
  );
}

function NewsAdmin({ list, onSave }: { list: NewsArticle[]; onSave: (l: NewsArticle[]) => void }) {
  const [draft, setDraft] = useState(list);
  useEffect(() => setDraft(list), [list]);
  const add = () => {
    setDraft([
      {
        id: `n-${Date.now()}`,
        title: 'New story title',
        summary: 'Short summary for the feed',
        body: 'Full article body goes here.',
        category: 'Feature',
        author: 'Fans Tribe Desk',
        authorRole: 'Editor',
        time: 'Just now',
        readMins: 3,
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=60',
        featured: false,
      },
      ...draft,
    ]);
  };
  return (
    <div className="space-y-3">
      <button type="button" onClick={add} className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-3 py-2 text-[11px] font-black text-white">
        <Plus className="h-3.5 w-3.5" /> Add story
      </button>
      {draft.map((a, idx) => (
        <div key={a.id} className="rounded-2xl glass p-3 space-y-2">
          <input value={a.title} onChange={(e) => { const next = [...draft]; next[idx] = { ...a, title: e.target.value }; setDraft(next); }} className="w-full rounded-lg border border-slate-200 px-2.5 py-2 text-sm font-bold outline-none" />
          <textarea value={a.summary} onChange={(e) => { const next = [...draft]; next[idx] = { ...a, summary: e.target.value }; setDraft(next); }} rows={2} className="w-full rounded-lg border border-slate-200 px-2.5 py-2 text-xs outline-none resize-none" />
          <div className="flex gap-2">
            <input value={a.category} onChange={(e) => { const next = [...draft]; next[idx] = { ...a, category: e.target.value as NewsArticle['category'] }; setDraft(next); }} className="flex-1 rounded-lg border border-slate-200 px-2 py-1.5 text-[11px] font-semibold" />
            <label className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600">
              <input type="checkbox" checked={!!a.featured} onChange={(e) => { const next = [...draft]; next[idx] = { ...a, featured: e.target.checked }; setDraft(next); }} /> Featured
            </label>
            <button type="button" onClick={() => setDraft(draft.filter((_, i) => i !== idx))} className="p-1.5 text-red-500"><Trash2 className="h-4 w-4" /></button>
          </div>
        </div>
      ))}
      <button type="button" onClick={() => onSave(draft)} className="w-full rounded-xl bg-slate-900 py-3 text-xs font-black uppercase text-white flex items-center justify-center gap-2">
        <Save className="h-4 w-4" /> Save all news
      </button>
    </div>
  );
}

function ProductsAdmin({ list, onSave }: { list: Product[]; onSave: (l: Product[]) => void }) {
  const [draft, setDraft] = useState(list);
  useEffect(() => setDraft(list), [list]);
  const add = () => {
    setDraft([
      {
        id: `p-${Date.now()}`,
        name: 'New product',
        price: 45,
        category: 'jersey',
        club: 'Tribe',
        colors: ['Green'],
        image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=600&q=60',
        gallery: [],
        description: 'Official tribe gear.',
        sizes: ['S', 'M', 'L', 'XL'],
      },
      ...draft,
    ]);
  };
  return (
    <div className="space-y-3">
      <button type="button" onClick={add} className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-3 py-2 text-[11px] font-black text-white">
        <Plus className="h-3.5 w-3.5" /> Add product
      </button>
      {draft.map((p, idx) => (
        <div key={p.id} className="rounded-2xl glass p-3 space-y-2">
          <div className="flex gap-2">
            <input value={p.name} onChange={(e) => { const next = [...draft]; next[idx] = { ...p, name: e.target.value }; setDraft(next); }} className="flex-1 rounded-lg border border-slate-200 px-2.5 py-2 text-sm font-bold outline-none" />
            <input type="number" value={p.price} onChange={(e) => { const next = [...draft]; next[idx] = { ...p, price: Number(e.target.value) || 0 }; setDraft(next); }} className="w-20 rounded-lg border border-slate-200 px-2 py-2 text-sm font-bold outline-none" />
          </div>
          <input value={p.image} onChange={(e) => { const next = [...draft]; next[idx] = { ...p, image: e.target.value }; setDraft(next); }} placeholder="Image URL" className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] outline-none" />
          <div className="flex justify-between">
            <span className="text-[10px] font-bold uppercase text-slate-400">{p.category}</span>
            <button type="button" onClick={() => setDraft(draft.filter((_, i) => i !== idx))} className="text-red-500"><Trash2 className="h-4 w-4" /></button>
          </div>
        </div>
      ))}
      <button type="button" onClick={() => onSave(draft)} className="w-full rounded-xl bg-slate-900 py-3 text-xs font-black uppercase text-white flex items-center justify-center gap-2">
        <Save className="h-4 w-4" /> Save all products
      </button>
    </div>
  );
}

export { AdminPage };
