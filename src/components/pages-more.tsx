import React, { useState } from 'react';
import {
  Mic, Play, Trash2, Minus, Plus, X, ShoppingCart, ShoppingBag, MessageCircle, Users, Mail,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { PODCASTS, AD_PACKAGES, IMAGES, PageId } from '../data';
import { Img, AdSlot } from './ui';
import type { CartLine } from './layout';

function PodcastsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-black text-slate-900">Podcasts & shows</h1>
        <p className="text-sm text-slate-500 mt-0.5">Fans Tribe Live · Matchday Podcast · Vlogs</p>
      </div>
      {PODCASTS.map((ep) => (
        <div key={ep.id} className="rounded-2xl glass overflow-hidden flex">
          <div className="w-28 sm:w-36 shrink-0 relative">
            <Img src={ep.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                <Play className="h-5 w-5 text-slate-900 fill-slate-900" />
              </div>
            </div>
          </div>
          <div className="p-4 min-w-0 flex-1">
            <p className="text-[10px] font-black uppercase text-brand-600">{ep.show}</p>
            <p className="text-sm font-bold text-slate-900 mt-0.5">{ep.title}</p>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{ep.description}</p>
            <p className="text-[10px] text-slate-400 mt-2 font-semibold">
              {ep.duration} · {ep.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function AboutPage() {
  return (
    <div className="space-y-5">
      <div className="rounded-3xl overflow-hidden h-44 relative">
        <Img src={IMAGES.about} alt="Fans Tribe" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-slate-900/50 flex items-end p-5">
          <h1 className="text-xl font-black text-white">About Football Fans Tribe</h1>
        </div>
      </div>
      <p className="text-sm text-slate-500">Naija football fans live here — 1.9M strong.</p>
      <div className="rounded-3xl glass p-5">
        <p className="text-sm text-slate-700 leading-relaxed">
          We are the home of match interviews, previews and reviews, podcasts, live shows, vlogs and Naija fan culture.
          Read stories, check scores powered by API-Football, listen to shows, and shop Tribe gear.
        </p>
      </div>
      <div className="grid gap-3">
        {(
          [
            { icon: <Users className="h-5 w-5 text-brand-600" />, t: 'Fan-first', d: 'Interviews with players and fans in the stands.' },
            { icon: <Mic className="h-5 w-5 text-brand-600" />, t: 'Shows & podcasts', d: 'Live panels, matchday debriefs and vlogs.' },
            { icon: <MessageCircle className="h-5 w-5 text-brand-600" />, t: 'Real support', d: 'Reply within one business day.' },
          ] as const
        ).map((x) => (
          <div key={x.t} className="rounded-2xl glass p-4 flex gap-3">
            <div className="h-10 w-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">{x.icon}</div>
            <div>
              <p className="text-sm font-bold text-slate-900">{x.t}</p>
              <p className="text-xs text-slate-500 mt-0.5">{x.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdvertisePage({ onContact }: { onContact: () => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-black text-slate-900">Advertise with Fans Tribe</h1>
        <p className="text-sm text-slate-500 mt-1">Reach Nigeria's most engaged football community.</p>
      </div>
      <AdSlot label="Example placement" />
      {AD_PACKAGES.map((p) => (
        <div key={p.id} className="rounded-2xl glass p-4">
          <div className="flex justify-between gap-3">
            <p className="text-sm font-bold text-slate-900">{p.name}</p>
            <p className="text-sm font-black text-brand-600 shrink-0">{p.price}</p>
          </div>
          <p className="text-xs text-slate-500 mt-1">{p.desc}</p>
          <button
            type="button"
            onClick={onContact}
            className="mt-3 rounded-xl bg-brand-600 px-3 py-2 text-[11px] font-black text-white"
          >
            Request rate card
          </button>
        </div>
      ))}
    </div>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-black text-slate-900">Contact & support</h1>
        <p className="text-sm text-slate-500 mt-1">We reply within one business day.</p>
      </div>
      <div className="rounded-2xl glass p-4 text-sm">
        <p className="flex items-center gap-2 text-slate-700">
          <Mail className="h-4 w-4 text-brand-600" /> FansTribeinfo@gmail.com
        </p>
      </div>
      {sent ? (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-5 text-center">
          <p className="text-sm font-bold text-emerald-800">Message received</p>
        </div>
      ) : (
        <form
          className="rounded-2xl glass p-4 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <input required placeholder="Your name" className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm" />
          <input required type="email" placeholder="Email" className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm" />
          <select className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm">
            <option>General support</option>
            <option>Advertising</option>
            <option>Shop order</option>
            <option>Newsletter help</option>
          </select>
          <textarea required rows={4} placeholder="How can we help?" className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm" />
          <button type="submit" className="w-full rounded-xl bg-brand-600 py-3 text-xs font-black uppercase text-white">
            Send message
          </button>
        </form>
      )}
    </div>
  );
}

function CartDrawer({
  open,
  onClose,
  lines,
  onQty,
  onRemove,
}: {
  open: boolean;
  onClose: () => void;
  lines: CartLine[];
  onQty: (i: number, q: number) => void;
  onRemove: (i: number) => void;
}) {
  const total = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-white border-l border-slate-100 flex flex-col shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          >
            <div className="flex items-center justify-between px-4 py-4 border-b border-slate-100">
              <h2 className="text-sm font-black text-slate-900">Your cart</h2>
              <button type="button" onClick={onClose} className="p-2">
                <X className="h-5 w-5 text-slate-400" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {lines.length === 0 ? (
                <div className="py-16 text-center">
                  <ShoppingBag className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-400">Cart is empty</p>
                </div>
              ) : (
                lines.map((line, idx) => (
                  <div key={`${line.product.id}-${line.size}-${idx}`} className="flex gap-3 rounded-xl border border-slate-100 p-3">
                    <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                      <Img src={line.product.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate">{line.product.name}</p>
                      <p className="text-[10px] text-slate-500">Size {line.size}</p>
                      <p className="text-xs font-bold text-brand-600 mt-0.5">${line.product.price.toFixed(2)}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button type="button" onClick={() => onQty(idx, Math.max(1, line.qty - 1))} className="h-7 w-7 rounded-lg border border-slate-200 flex items-center justify-center">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{line.qty}</span>
                        <button type="button" onClick={() => onQty(idx, line.qty + 1)} className="h-7 w-7 rounded-lg border border-slate-200 flex items-center justify-center">
                          <Plus className="h-3 w-3" />
                        </button>
                        <button type="button" onClick={() => onRemove(idx)} className="ml-auto p-1.5 text-slate-400">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {lines.length > 0 && (
              <div className="p-4 border-t border-slate-100 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-semibold">Total</span>
                  <span className="font-black text-slate-900">${total.toFixed(2)}</span>
                </div>
                <button type="button" className="w-full rounded-xl bg-brand-600 py-3.5 text-xs font-black uppercase text-white">
                  Checkout
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export { PodcastsPage, AboutPage, AdvertisePage, ContactPage, CartDrawer };
