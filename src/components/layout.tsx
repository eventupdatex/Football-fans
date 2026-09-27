import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Home, Trophy, Newspaper, ShoppingBag, Info, Megaphone, Mail,
  X, ShoppingCart, Menu, Mic, Radio, Check,
} from 'lucide-react';
import { PageId, FOOTER_LINKS, Product } from '../data';
import { Img } from './ui';

export type CartLine = { product: Product; size: string; qty: number };

function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  return (
    <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 p-6 sm:p-8 text-white overflow-hidden relative">
      <div className="absolute right-0 top-0 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl" />
      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-300 relative">Newsletter</p>
      <h2 className="mt-2 text-xl font-black relative">Match analysis in your inbox</h2>
      <p className="mt-1.5 text-sm text-white/75 relative max-w-md">
        Interviews, previews and Naija fan stories — once a week. No spam.
      </p>
      {done ? (
        <p className="mt-4 text-sm font-bold text-emerald-300 relative">You are on the list. Welcome to the Tribe.</p>
      ) : (
        <form
          className="mt-4 flex flex-col sm:flex-row gap-2 relative"
          onSubmit={(e) => {
            e.preventDefault();
            if (email.trim()) setDone(true);
          }}
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="flex-1 rounded-xl border-0 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
          />
          <button
            type="submit"
            className="rounded-xl bg-emerald-400 px-5 py-3 text-xs font-black uppercase text-slate-900 shrink-0"
          >
            Subscribe
          </button>
        </form>
      )}
    </section>
  );
}

function Footer({ onGo }: { onGo: (p: PageId) => void }) {
  return (
    <footer className="mt-10 mb-2 rounded-3xl glass-strong overflow-hidden">
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900 px-5 py-6 text-white">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center border-2 border-brand-400 overflow-hidden">
            <span className="text-[8px] font-black text-slate-900 text-center leading-tight">
              FANS
              <br />
              TRIBE
            </span>
          </div>
          <div>
            <p className="text-sm font-black">Football Fans Tribe</p>
            <p className="text-[11px] text-white/70">Naija football fans live here</p>
          </div>
        </div>
        <p className="mt-3 text-xs text-white/75">
          Match interviews · Previews & reviews · Podcasts · Live shows · Vlogs · Shop
        </p>
      </div>
      <div className="grid grid-cols-2 gap-6 p-5">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Explore</p>
          {FOOTER_LINKS.explore.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => onGo(l.id)}
              className="block text-sm font-semibold text-slate-700 hover:text-brand-600 mb-1.5"
            >
              {l.label}
            </button>
          ))}
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Company</p>
          {FOOTER_LINKS.company.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => onGo(l.id)}
              className="block text-sm font-semibold text-slate-700 hover:text-brand-600 mb-1.5"
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
      <div className="px-5 pb-5 border-t border-slate-100 pt-4">
        <p className="text-[11px] text-slate-500">FansTribeinfo@gmail.com</p>
        <p className="text-[10px] text-slate-400 mt-1">
          © {new Date().getFullYear()} Football Fans Tribe. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function Shell({
  page,
  setPage,
  cartCount,
  onOpenCart,
  showCart,
  children,
}: {
  page: PageId;
  setPage: (p: PageId) => void;
  cartCount: number;
  onOpenCart: () => void;
  showCart: boolean;
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const primary: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="h-5 w-5" /> },
    { id: 'news', label: 'News', icon: <Newspaper className="h-5 w-5" /> },
    { id: 'scores', label: 'Scores', icon: <Trophy className="h-5 w-5" /> },
    { id: 'shop', label: 'Shop', icon: <ShoppingBag className="h-5 w-5" /> },
  ];
  const more: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'podcasts', label: 'Podcasts', icon: <Mic className="h-4 w-4" /> },
    { id: 'about', label: 'About us', icon: <Info className="h-4 w-4" /> },
    { id: 'advertise', label: 'Advertise', icon: <Megaphone className="h-4 w-4" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="h-4 w-4" /> },
  ];

  return (
    <>
      <header className="hidden md:flex fixed top-0 inset-x-0 z-40 h-16 items-center justify-between px-6 glass-strong">
        <div className="flex items-center gap-2.5">
          <div className="h-10 w-10 rounded-full bg-slate-900 border-2 border-brand-500 flex items-center justify-center">
            <span className="text-[7px] font-black text-white">FFT</span>
          </div>
          <div>
            <p className="text-sm font-black text-slate-900 leading-none">Football Fans Tribe</p>
            <p className="text-[10px] font-semibold text-slate-500 mt-0.5">Interviews · Podcasts · Shop</p>
          </div>
        </div>
        <nav className="flex items-center gap-0.5">
          {[...primary, ...more].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setPage(t.id)}
              className={`rounded-xl px-2.5 py-2 text-[11px] font-bold ${
                page === t.id ? 'bg-brand-50 text-brand-700' : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
        {showCart ? (
          <button
            type="button"
            onClick={onOpenCart}
            className="relative rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] rounded-full bg-brand-600 text-[10px] font-black text-white flex items-center justify-center px-1">
                {cartCount}
              </span>
            )}
          </button>
        ) : (
          <div className="w-11" />
        )}
      </header>

      <header className="md:hidden fixed top-0 inset-x-0 z-40 glass-strong px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-slate-900 border-2 border-brand-500 flex items-center justify-center">
            <span className="text-[6px] font-black text-white">FFT</span>
          </div>
          <span className="text-sm font-black text-slate-900">Fans Tribe</span>
        </div>
        <div className="flex items-center gap-1">
          {showCart && (
            <button type="button" onClick={onOpenCart} className="relative p-2 text-slate-600">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 h-4 min-w-4 rounded-full bg-brand-600 text-[9px] font-black text-white flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          )}
          <button type="button" onClick={() => setMenuOpen(true)} className="p-2 text-slate-600">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              className="md:hidden fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="md:hidden fixed top-0 right-0 bottom-0 z-50 w-[82%] max-w-xs glass-strong p-5"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              <div className="flex justify-between items-center mb-5">
                <p className="text-sm font-black text-slate-900">Menu</p>
                <button type="button" onClick={() => setMenuOpen(false)}>
                  <X className="h-5 w-5 text-slate-500" />
                </button>
              </div>
              {[...primary, ...more].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setPage(t.id);
                    setMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold mb-1 w-full ${
                    page === t.id ? 'bg-brand-50 text-brand-700' : 'text-slate-600'
                  }`}
                >
                  {t.icon}
                  {t.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 nav-safe">
        <div className="mx-3 mb-2 rounded-2xl glass-strong shadow-lg shadow-slate-200/60">
          <div className="flex h-[62px]">
            {primary.map((t) => {
              const active = page === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setPage(t.id)}
                  className="flex-1 flex flex-col items-center justify-center gap-0.5 active:scale-95"
                >
                  <span
                    className={`relative flex h-8 w-10 items-center justify-center rounded-xl ${
                      active ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30' : 'text-slate-400'
                    }`}
                  >
                    {t.icon}
                    {t.id === 'shop' && cartCount > 0 && (
                      <span className="absolute -top-1 -right-0.5 h-4 min-w-4 rounded-full bg-emerald-500 text-[9px] font-black text-white flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </span>
                  <span className={`text-[9px] font-bold ${active ? 'text-brand-600' : 'text-slate-400'}`}>
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-4 pt-[4.25rem] md:pt-24 pb-safe">{children}</main>
    </>
  );
}

export { Newsletter, Footer, Shell };
