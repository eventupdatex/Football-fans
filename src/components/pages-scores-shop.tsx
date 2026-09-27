import React, { useEffect, useState } from 'react';
import { ShoppingCart, Plus, Check, ArrowLeft } from 'lucide-react';
import { Product, PRODUCTS, ScheduledMatch, LiveMatch, ALL_MATCHES, LIVE_TICKER } from '../data';
import { fetchScoresBundle, hasApiKey } from '../api/football';
import { Img, Crest, LiveDot } from './ui';
import type { CartLine } from './layout';

function ScoresPage() {
  const [tab, setTab] = useState<'live' | 'fixture' | 'result'>('live');
  const [matches, setMatches] = useState<ScheduledMatch[]>(ALL_MATCHES);
  const [ticker, setTicker] = useState<LiveMatch[]>(LIVE_TICKER);
  const [source, setSource] = useState<'api' | 'demo'>('demo');
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | undefined>();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const res = await fetchScoresBundle();
      if (cancelled) return;
      setMatches(res.matches);
      setTicker(res.ticker);
      setSource(res.source);
      setErr(res.error);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  const filtered = matches.filter((m) => m.status === tab);
  const leagues = [...new Set(filtered.map((m) => m.league))];

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-slate-900">Live scores</h1>
          <p className="text-sm text-slate-500 mt-0.5">EPL · La Liga · UCL · NPFL · more</p>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-[9px] font-black uppercase ${
          source === 'api' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'
        }`}>
          {loading ? 'Loading…' : source === 'api' ? 'Live API' : 'Demo data'}
        </span>
      </div>
      {!hasApiKey() && (
        <p className="text-xs text-slate-500 rounded-xl glass p-3">
          Add <code className="text-[11px] bg-slate-100 px-1 rounded">VITE_API_FOOTBALL_KEY</code> in{' '}
          <code className="text-[11px] bg-slate-100 px-1 rounded">.env</code> for real API-Football scores.
        </p>
      )}
      {err && <p className="text-xs text-amber-700 bg-amber-50 rounded-xl p-3">{err}</p>}
      <div className="flex gap-1.5 p-1 rounded-2xl glass">
        {(['live', 'fixture', 'result'] as const).map((t) => (
          <button key={t} type="button" onClick={() => setTab(t)}
            className={`flex-1 rounded-xl py-2.5 text-[11px] font-black uppercase ${
              tab === t ? 'bg-brand-600 text-white' : 'text-slate-500'
            }`}>{t}</button>
        ))}
      </div>
      {tab === 'live' && ticker.length > 0 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {ticker.map((m) => (
            <div key={m.id} className="shrink-0 w-[132px] rounded-2xl glass p-3">
              <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase text-live">
                <LiveDot /> Live
              </span>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5"><Crest name={m.home} /><span className="text-xs font-bold">{m.home}</span></div>
                <span className="text-sm font-black text-brand-600">{m.homeScore}</span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <div className="flex items-center gap-1.5"><Crest name={m.away} /><span className="text-xs font-bold">{m.away}</span></div>
                <span className="text-sm font-black">{m.awayScore}</span>
              </div>
              <p className="mt-1.5 text-[10px] text-slate-400 text-right">{m.minute}</p>
            </div>
          ))}
        </div>
      )}
      {filtered.length === 0 ? (
        <div className="rounded-2xl glass py-12 text-center text-sm font-bold text-slate-400">No matches</div>
      ) : (
        leagues.map((league) => (
          <div key={league} className="space-y-2">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">{league}</h2>
            <div className="rounded-2xl glass divide-y divide-slate-100">
              {filtered.filter((m) => m.league === league).map((m) => (
                <div key={m.id} className="flex items-center gap-3 p-3.5">
                  <div className="flex-1 space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <Crest name={m.home} />
                      <span className="text-sm font-bold truncate">{m.home}</span>
                      {m.homeScore != null && <span className="ml-auto text-sm font-black">{m.homeScore}</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <Crest name={m.away} />
                      <span className="text-sm font-bold truncate">{m.away}</span>
                      {m.awayScore != null && <span className="ml-auto text-sm font-black">{m.awayScore}</span>}
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 shrink-0">
                    {m.status === 'live' ? <span className="text-live inline-flex items-center gap-1"><LiveDot />{m.minute || m.time}</span> : m.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function ShopPage({ cart, onOpenCart, onOpenProduct }: { cart: CartLine[]; onOpenCart: () => void; onOpenProduct: (p: Product) => void }) {
  const [cat, setCat] = useState<'all' | Product['category']>('all');
  const cats = [
    { id: 'all' as const, label: 'All' },
    { id: 'jersey' as const, label: 'Jerseys' },
    { id: 'hoodie' as const, label: 'Hoodies' },
    { id: 'cap' as const, label: 'Caps' },
    { id: 'accessories' as const, label: 'More' },
  ];
  const list = cat === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);
  const count = cart.reduce((s, l) => s + l.qty, 0);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-slate-900">Tribe Shop</h1>
          <p className="text-sm text-slate-500">Club jerseys & official gear</p>
        </div>
        <button type="button" onClick={onOpenCart} className="relative flex items-center gap-2 rounded-xl bg-brand-600 px-3.5 py-2.5 text-white shadow-md shadow-brand-500/25">
          <ShoppingCart className="h-4 w-4" />
          <span className="text-xs font-black">Cart{count > 0 ? ` (${count})` : ''}</span>
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {cats.map((c) => (
          <button key={c.id} type="button" onClick={() => setCat(c.id)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-bold ${
              cat === c.id ? 'bg-brand-600 text-white' : 'glass text-slate-600'
            }`}>{c.label}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {list.map((p) => (
          <button key={p.id} type="button" onClick={() => onOpenProduct(p)} className="text-left rounded-2xl glass overflow-hidden active:scale-[0.98] flex flex-col">
            <div className="aspect-[4/5] relative bg-slate-100">
              <Img src={p.image} alt={p.name} className="absolute inset-0 w-full h-full object-cover" />
              {p.tag && <span className="absolute top-2 left-2 rounded-md bg-white px-2 py-0.5 text-[9px] font-black uppercase text-slate-900 shadow">{p.tag}</span>}
            </div>
            <div className="p-3 flex flex-col flex-1">
              <p className="text-[10px] font-bold uppercase text-slate-400">{p.club}</p>
              <p className="text-sm font-bold text-slate-900 leading-snug mt-0.5 line-clamp-2">{p.name}</p>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-brand-600 font-black text-sm">${p.price.toFixed(2)}</span>
                {p.compareAt && <span className="text-[11px] text-slate-400 line-through">${p.compareAt.toFixed(2)}</span>}
              </div>
              <span className="mt-3 text-[10px] font-bold text-brand-600">View details →</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductDetail({ product, onBack, onAdd }: { product: Product; onBack: () => void; onAdd: (p: Product, size: string) => void }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);
  const [photo, setPhoto] = useState(product.image);
  return (
    <div className="space-y-4">
      <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500">
        <ArrowLeft className="h-4 w-4" /> Back to shop
      </button>
      <div className="rounded-3xl glass overflow-hidden">
        <div className="relative h-64 sm:h-80 bg-slate-100">
          <Img src={photo} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
        </div>
        {product.gallery.length > 1 && (
          <div className="flex gap-2 p-3 overflow-x-auto">
            {product.gallery.map((g) => (
              <button key={g} type="button" onClick={() => setPhoto(g)}
                className={`h-14 w-14 rounded-xl overflow-hidden shrink-0 border-2 ${
                  photo === g ? 'border-brand-600' : 'border-transparent'
                }`}>
                <Img src={g} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
        <div className="p-5 space-y-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-brand-600">{product.club} · {product.category}</p>
            <h1 className="mt-1 text-xl font-black text-slate-900">{product.name}</h1>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">${product.price.toFixed(2)}</span>
              {product.compareAt && <span className="text-sm text-slate-400 line-through">${product.compareAt.toFixed(2)}</span>}
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{product.description}</p>
          <div>
            <p className="text-[11px] font-bold uppercase text-slate-500 mb-2">Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button key={s} type="button" onClick={() => setSize(s)}
                  className={`min-w-[3rem] rounded-xl px-3 py-2 text-xs font-bold border ${
                    size === s ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-slate-200 text-slate-600'
                  }`}>{s}</button>
              ))}
            </div>
          </div>
          <button type="button" onClick={() => { onAdd(product, size); setAdded(true); setTimeout(() => setAdded(false), 1600); }}
            className="w-full rounded-xl bg-brand-600 py-3.5 text-xs font-black uppercase text-white shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2">
            {added ? (<><Check className="h-4 w-4" /> Added to cart</>) : (<><Plus className="h-4 w-4" /> Add to cart</>)}
          </button>
        </div>
      </div>
    </div>
  );
}

export { ScoresPage, ShopPage, ProductDetail };
