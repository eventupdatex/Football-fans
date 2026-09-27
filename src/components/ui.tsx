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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-mesh"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="h-16 w-16 rounded-full bg-slate-900 border-4 border-brand-500 flex items-center justify-center"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ repeat: Infinity, duration: 1.1 }}
          >
            <span className="text-[9px] font-black text-white text-center leading-tight">FFT</span>
          </motion.div>
          <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-slate-800">
            Football Fans Tribe
          </p>
          <div className="mt-5 h-1 w-28 rounded-full bg-slate-200 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-emerald-500"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.9 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { Crest, LiveDot, Img, AdSlot, PageLoader };
