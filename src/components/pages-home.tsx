import React, { useState, useEffect } from 'react';
import {
  ChevronRight, Clock, ArrowLeft, Share2, Facebook, Twitter, Link2, Radio,
} from 'lucide-react';
import { PageId, NEWS, NewsArticle, IMAGES } from '../data';
import { Img, AdSlot } from './ui';
import { Newsletter, Footer } from './layout';
import { BRAND } from '../brand';

function HomePage({ onRead, onGo }: { onRead: (a: NewsArticle) => void; onGo: (p: PageId) => void }) {
  const featured = NEWS.filter((n) => n.featured);
  const lead = featured[0] || NEWS[0];
  const rest = NEWS.filter((n) => n.id !== lead?.id);

  const cats: { id: PageId | 'all'; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'news', label: 'News' },
    { id: 'scores', label: 'Scores' },
    { id: 'podcasts', label: 'Shows' },
    { id: 'shop', label: 'Shop' },
  ];

  return (
    <div className="space-y-4">
      <div className="pt-1">
        <p className="text-[11px] text-slate-400 font-medium">Updates you can trust · Sources credited</p>
        <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {cats.map((c) => (
            <button
              key={c.label}
              type="button"
              onClick={() => {
                if (c.id === 'all') return;
                onGo(c.id as PageId);
              }}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-bold ${
                c.id === 'all' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-slate-400">{NEWS.length} stories · desk</p>
      </div>

      {lead && (
        <button type="button" onClick={() => onRead(lead)} className="w-full text-left active:opacity-95">
          <div className="relative -mx-4 sm:mx-0 aspect-[16/10] sm:aspect-[2/1] sm:rounded-2xl overflow-hidden bg-slate-100">
            <Img src={lead.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <p className="mt-3 text-[10px] font-black uppercase tracking-wider text-amber-700">
            {lead.category} · {lead.time}
          </p>
          <h1 className="mt-1 text-xl sm:text-2xl font-black text-slate-900 leading-snug tracking-tight">{lead.title}</h1>
        </button>
      )}

      <div className="min-h-[90px]">
        <AdSlot label="Advertisement" />
      </div>

      <div className="divide-y divide-slate-100">
        {rest.map((a) => (
          <button key={a.id} type="button" onClick={() => onRead(a)} className="w-full flex gap-3 text-left py-3.5 active:bg-slate-50">
            <div className="h-[72px] w-[96px] sm:h-20 sm:w-28 rounded-lg overflow-hidden shrink-0 bg-slate-100">
              <Img src={a.image} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-black uppercase tracking-wide text-amber-700">{a.category}</p>
              <p className="text-[15px] font-bold text-slate-900 leading-snug mt-0.5 line-clamp-2">{a.title}</p>
              <p className="text-[11px] text-slate-400 mt-1">{a.time} · {a.readMins} min</p>
            </div>
          </button>
        ))}
      </div>

      <button type="button" onClick={() => onGo('news')} className="w-full rounded-xl border border-slate-200 bg-white py-3 text-xs font-black text-slate-700">
        All stories
      </button>

      <Newsletter />
      <Footer onGo={onGo} />
    </div>
  );
}

function NewsPage({ onRead }: { onRead: (a: NewsArticle) => void }) {
  const [filter, setFilter] = useState('All');
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);
  const cats = ['All', 'Interview', 'Match Analysis', 'Preview', 'Review', 'Naija Fans', 'Feature'];
  const list = filter === 'All' ? NEWS : NEWS.filter((n) => n.category === filter);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-black text-slate-900">News & stories</h1>
        <p className="text-sm text-slate-500 mt-0.5">Professional reads for serious fans</p>
      </div>
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {cats.map((c) => (
          <button key={c} type="button" onClick={() => setFilter(c)} className={`shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-bold ${filter === c ? 'bg-brand-600 text-white' : 'glass text-slate-600'}`}>
            {c}
          </button>
        ))}
      </div>
      <div className="min-h-[90px]"><AdSlot /></div>
      <div className="space-y-3">
        {list.map((a) => (
          <button key={a.id} type="button" onClick={() => onRead(a)} className="w-full flex gap-3 text-left rounded-2xl glass p-3 active:scale-[0.99]">
            <div className="h-[88px] w-[112px] sm:h-28 sm:w-36 rounded-xl overflow-hidden shrink-0 bg-slate-100">
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
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [article.id]);
  const [copied, setCopied] = useState(false);
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://fans.news';
  const shareUrl = `${origin}/?story=${encodeURIComponent(article.id)}`;
  const shareHeadline = article.title;
  const shareByline = `${article.author} · ${BRAND.name}`;
  const shareBlurb = article.summary.slice(0, 160) + (article.summary.length > 160 ? '…' : '');
  const shareText = `${shareHeadline}\n\n${shareBlurb}\n\n${shareByline}\n${shareUrl}`;

  const share = async (kind: 'x' | 'fb' | 'wa' | 'copy' | 'native') => {
    if (kind === 'native' && typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: shareHeadline, text: `${shareBlurb}\n\n${shareByline}`, url: shareUrl });
      } catch { /* cancelled */ }
      return;
    }
    if (kind === 'x') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${shareHeadline}\n\n${shareByline}`)}&url=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener,noreferrer');
      return;
    }
    if (kind === 'fb') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareHeadline)}`, '_blank', 'noopener,noreferrer');
      return;
    }
    if (kind === 'wa') {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank', 'noopener,noreferrer');
      return;
    }
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500">
        <ArrowLeft className="h-4 w-4" /> Back to stories
      </button>

      <header className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-brand-600">{article.category}</p>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">{article.title}</h1>
        <p className="text-base sm:text-lg text-slate-600 font-medium leading-snug">{article.summary}</p>
        <div className="flex flex-wrap items-center gap-3 pt-1 border-b border-slate-100 pb-4">
          <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center text-xs font-black text-brand-700">
            {article.author.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-slate-900">{article.author}</p>
            <p className="text-[11px] text-slate-400">{article.authorRole} · {article.readMins} min read · {article.time}</p>
          </div>
        </div>
      </header>

      <figure className="-mx-4 sm:mx-0">
        <div className="relative aspect-[16/10] sm:aspect-[2/1] sm:rounded-2xl overflow-hidden bg-slate-100">
          <Img src={article.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <figcaption className="px-4 sm:px-0 mt-2 text-[11px] text-slate-400">{article.category} · {BRAND.name}</figcaption>
      </figure>

      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => share('native')} className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-3 py-2 text-[11px] font-black text-white">
          <Share2 className="h-3.5 w-3.5" /> Share
        </button>
        <button type="button" onClick={() => share('x')} className="rounded-xl glass p-2 text-slate-600" aria-label="Share on X"><Twitter className="h-4 w-4" /></button>
        <button type="button" onClick={() => share('fb')} className="rounded-xl glass p-2 text-slate-600" aria-label="Share on Facebook"><Facebook className="h-4 w-4" /></button>
        <button type="button" onClick={() => share('wa')} className="rounded-xl glass px-2.5 py-2 text-[11px] font-black text-emerald-600" aria-label="WhatsApp">WA</button>
        {copied && <span className="text-[10px] font-bold text-emerald-600">Copied</span>}
        <button type="button" onClick={() => share('copy')} className="rounded-xl glass p-2 text-slate-600" aria-label="Copy link"><Link2 className="h-4 w-4" /></button>
      </div>

      <div className="min-h-[90px] flex items-center"><AdSlot label="Advertisement" /></div>

      <div
        className="text-[15px] sm:text-base text-slate-700 leading-[1.85] space-y-4 [&_h1]:text-xl [&_h1]:font-black [&_h1]:text-slate-900 [&_h2]:text-lg [&_h2]:font-bold [&_img]:rounded-xl [&_img]:my-4 [&_img]:w-full [&_figure]:my-6"
        dangerouslySetInnerHTML={{
          __html: article.body.includes('<') ? article.body : `<p>${article.body}</p>`,
        }}
      />

      <div className="min-h-[90px] flex items-center"><AdSlot label="Sponsored" /></div>
      <Newsletter />
    </div>
  );
}

export { HomePage, NewsPage, ArticleView };
