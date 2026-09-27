import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CREST_COLORS } from '../data';

function Crest({ name }: { name: string }) {
  const color = CREST_COLORS[name.charCodeAt(0) % CREST_COLORS.length];
  return (
    <div className={`h-7 w-7 ${color} rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0`}>
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

function LiveDot() {
  return <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-live" />;
}

function Img({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={(e) => {
        (e.target as HTMLImageElement).src =
          'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=60';
      }}
    />
  );
}

function AdSlot({ label = 'Advertisement' }: { label?: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-white/80 px-4 py-5 text-center">
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
      <p className="mt-1 text-xs text-slate-500">Partner with Football Fans Tribe</p>
    </div>
  );
}

function PageLoader({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-mesh overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-emerald-100/80 to-transparent pointer-events-none" />
          <div className="relative w-64 h-40 flex items-end justify-center">
            <motion.div
              className="absolute left-6 bottom-2 z-10"
              animate={{ rotate: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
              style={{ transformOrigin: '70% 90%' }}
            >
              <svg width="72" height="96" viewBox="0 0 72 96" fill="none" aria-hidden>
                <circle cx="38" cy="14" r="10" fill="#0f172a" />
                <path d="M38 24 L38 52 L28 52 L28 24 Z" fill="#0f172a" />
                <path d="M38 52 L52 78 L44 80 L32 56 Z" fill="#0f172a" />
                <path d="M32 52 L24 82 L16 80 L28 50 Z" fill="#1e293b" />
                <path d="M38 30 L58 42 L54 48 L38 38 Z" fill="#0f172a" />
                <path d="M38 32 L22 44 L26 48 L38 38 Z" fill="#1e293b" />
              </svg>
            </motion.div>
            <motion.div
              className="absolute bottom-8 left-20 z-20"
              animate={{ x: [0, 90, 140], y: [0, -70, -20], rotate: [0, 180, 360] }}
              transition={{ repeat: Infinity, duration: 0.95, ease: 'easeOut' }}
            >
              <div className="h-9 w-9 rounded-full bg-white border-2 border-slate-800 shadow-lg relative overflow-hidden">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <circle cx="18" cy="18" r="16" fill="#f8fafc" stroke="#0f172a" strokeWidth="1.5" />
                  <path d="M18 4 L22 12 L18 14 L14 12 Z" fill="#0f172a" />
                  <path d="M8 14 L14 12 L12 20 L6 18 Z" fill="#0f172a" />
                  <path d="M28 14 L30 18 L24 20 L22 12 Z" fill="#0f172a" />
                  <path d="M12 24 L14 28 L18 26 L16 22 Z" fill="#0f172a" />
                  <path d="M24 24 L22 28 L18 26 L20 22 Z" fill="#0f172a" />
                </svg>
              </div>
            </motion.div>
            <div className="absolute right-2 bottom-2 w-10 h-14 border-2 border-slate-300 border-b-0 rounded-t-sm opacity-60" />
          </div>
          <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-slate-800">Football Fans Tribe</p>
          <p className="mt-1 text-[11px] font-semibold text-slate-500">Loading the pitch…</p>
          <div className="mt-4 h-1 w-28 rounded-full bg-slate-200 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-emerald-500"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.95 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { Crest, LiveDot, Img, AdSlot, PageLoader };
