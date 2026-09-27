import React, { useState } from 'react';
import { ChevronRight, Clock, ArrowLeft, Share2, Facebook, Twitter, Link2, Radio } from 'lucide-react';
import { PageId, NEWS, NewsArticle, IMAGES } from '../data';
import { Img, AdSlot } from './ui';
import { Newsletter, Footer } from './layout';

function HomePage({ onRead, onGo }: { onRead: (a: NewsArticle) => void; onGo: (p: PageId) => void }) {
  const featured = NEWS.filter((n) => n.featured);
  const more = NEWS.filter((n) => !n.featured);
  return (
    <div className="space-y-8">
      <section className="relative rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 min-h-[280px] sm:min-h-[340px]">
        <Img src={IMAGES.heroStudio} alt="Fans Tribe studio" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-slate-900/30" />
        <div className="relative p-6 sm:p-10 flex flex-col justify-end min-h-[280px] sm:min-h-[340px]">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-400/20 border border-emerald-400/40 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-300">
            <Radio className="h-3 w-3" /> On air · Naija football
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-black text-white tracking-tight leading-[1.15] max-w-lg">
            Welcome to Football Fans Tribe
          </h1>
          <p className="mt-2 text-sm sm:text-base text-white/80 max-w-md leading-relaxed">
            Interviews from the studio. Match analysis. Podcasts. Live scores. Official merch. Built for the 1.9M family.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <button type="button" onClick={() => onGo('news')} className="rounded-xl bg-white px-4 py-2.5 text-xs font-black text-slate-900">Read stories</button>
            <button type="button" onClick={() => onGo('podcasts')} className="rounded-xl bg-white/15 border border-white/30 px-4 py-2.5 text-xs font-black text-white">Watch & listen</button>
          </div>
        </div>
      </section>
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {(
          [
            { p: 'news' as PageId, label: 'Interviews', icon: '🎤' },
            { p: 'scores' as PageId, label: 'Live scores', icon: '⚽' },
            { p: 'podcasts' as PageId, label: 'Podcasts', icon: '🎙️' },
            { p: 'shop' as PageId, label: 'Jerseys', icon: '👕' },
          ] as const
        ).map((x) => (
          <button key={x.p} type="button" onClick={() => onGo(x.p)} className="shrink-0 rounded-full glass px-3.5 py-2 text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
            <span>{x.icon}</span>{x.label}
          </button>
        ))}
      </div>
      <AdSlot label="Sponsored" />
      <section className="space-y-4">
        <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Featured stories</h2>
        {featured.map((a) => (
          <button key={a.id} type="button" onClick={() => onRead(a)} className="w-full text-left rounded-3xl glass overflow-hidden active:scale-[0.99] transition">
            <div className="relative h-44 sm:h-52">
              <Img src={a.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <span className="absolute bottom-3 left-3 rounded-full bg-white px-2.5 py-1 text-[10px] font-black uppercase text-slate-800">{a.category}</span>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-slate-900 leading-snug">{a.title}</h3>
              <p className="mt-2 text-sm text-slate-500 line-clamp-2">{a.summary}</p>
              <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400 font-semibold">
                <span>{a.author}</span><span>·</span><Clock className="h-3 w-3" /><span>{a.readMins} min</span><span>·</span><span>{a.time}</span>
              </div>
            </div>
          </button>
        ))}
      </section>
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">More to read</h2>
          <button type="button" onClick={() => onGo('news')} className="text-[11px] font-bold text-brand-600 flex items-center gap-0.5">All <ChevronRight className="h-3.5 w-3.5" /></button>
        </div>
        <div className="space-y-2.5">
          {more.map((a) => (
            <button key={a.id} type="button" onClick={() => onRead(a)} className="w-full flex gap-3 text-left rounded-2xl glass p-3 active:scale-[0.99]">
              <div className="h-20 w-20 rounded-xl overflow-hidden shrink-0">
                <Img src={a.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-black uppercase text-brand-600">{a.category}</p>
                <p className="text-sm font-bold text-slate-900 leading-snug line-clamp-2 mt-0.5">{a.title}</p>
                <p className="text-[10px] text-slate-400 mt-1">{a.author} · {a.time}</p>
              </div>
            </button>
          ))}
        </div>
      </section>
      <Newsletter />
      <Footer onGo={onGo} />
    </div>
  );
}

function NewsPage({ onRead }: { onRead: (a: NewsArticle) => void }) {
  const [filter, setFilter] = useState('All');
  const cats = ['All', 'Interview', 'Match Analysis', 'Preview', 'Review', 'Naija Fans', 'Feature'];
  const list = filter === 'All' ? NEWS : NEWS.filter((n) => n.category === filter);
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-black text-slate-900">News & stories</h1>
        <p className="text-sm text-slate-500 mt-0.5">Arranged for easy reading</p>
      </div>
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {cats.map((c) => (
          <button key={c} type="button" onClick={() => setFilter(c)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-bold ${
              filter === c ? 'bg-brand-600 text-white' : 'glass text-slate-600'
            }`}>{c}</button>
        ))}
      </div>
      <AdSlot />
      <div className="space-y-3">
        {list.map((a) => (
          <button key={a.id} type="button" onClick={() => onRead(a)} className="w-full flex gap-3 text-left rounded-2xl glass p-3.5 active:scale-[0.99]">
            <div className="h-20 w-20 rounded-2xl overflow-hidden shrink-0">
              <Img src={a.image} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-black uppercase text-brand-600">{a.category}</p>
              <p className="text-sm font-bold text-slate-900 leading-snug mt-0.5 line-clamp-2">{a.title}</p>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{a.summary}</p>
              <p className="text-[10px] text-slate-400 mt-1.5 flex items-center gap-1"><Clock className="h-3 w-3" /> {a.readMins} min · {a.author}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ArticleView({ article, onBack }: { article: NewsArticle; onBack: () => void }) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://fanstribe.example';
  const shareText = `${article.title} — Football Fans Tribe`;
  const share = async (kind: 'x' | 'fb' | 'copy' | 'native') => {
    if (kind === 'native' && navigator.share) {
      try { await navigator.share({ title: article.title, text: article.summary, url: shareUrl }); } catch { /* cancelled */ }
      return;
    }
    if (kind === 'x') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
      return;
    }
    if (kind === 'fb') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
      return;
    }
    try { await navigator.clipboard.writeText(shareUrl); } catch { /* ignore */ }
  };
  return (
    <div className="space-y-4">
      <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>
      <article className="rounded-3xl glass overflow-hidden">
        <div className="relative h-52 sm:h-64">
          <Img src={article.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
          <span className="absolute bottom-4 left-4 rounded-full bg-white px-2.5 py-1 text-[10px] font-black uppercase text-slate-800">{article.category}</span>
        </div>
        <div className="p-5 sm:p-6 space-y-4">
          <h1 className="text-2xl font-black text-slate-900 leading-snug">{article.title}</h1>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center text-xs font-black text-brand-700">{article.author.slice(0, 2).toUpperCase()}</div>
            <div>
              <p className="text-sm font-bold text-slate-900">{article.author}</p>
              <p className="text-[11px] text-slate-400">{article.authorRole} · {article.readMins} min read · {article.time}</p>
            </div>
          </div>
          <p className="text-sm font-semibold text-slate-600 leading-relaxed">{article.summary}</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => share('native')} className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-3 py-2 text-[11px] font-black text-white">
              <Share2 className="h-3.5 w-3.5" /> Share
            </button>
            <button type="button" onClick={() => share('x')} className="rounded-xl glass p-2 text-slate-600" aria-label="Share on X"><Twitter className="h-4 w-4" /></button>
            <button type="button" onClick={() => share('fb')} className="rounded-xl glass p-2 text-slate-600" aria-label="Share on Facebook"><Facebook className="h-4 w-4" /></button>
            <button type="button" onClick={() => share('copy')} className="rounded-xl glass p-2 text-slate-600" aria-label="Copy link"><Link2 className="h-4 w-4" /></button>
          </div>
          <AdSlot label="In-article" />
          <div className="text-sm text-slate-700 leading-relaxed space-y-3">
            {article.body.split(/(?<=\.)\s+/).reduce<string[]>((acc, s, i) => {
              if (i % 3 === 0) acc.push(s);
              else acc[acc.length - 1] += ' ' + s;
              return acc;
            }, []).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </article>
      <Newsletter />
    </div>
  );
}

export { HomePage, NewsPage, ArticleView };
