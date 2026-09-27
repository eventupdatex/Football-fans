import React, { useEffect, useState, Component, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PageId, Product, NewsArticle, NEWS } from './data';
import { PageLoader } from './components/ui';
import { Shell, type CartLine } from './components/layout';
import { HomePage, NewsPage, ArticleView } from './components/pages-home';
import { ScoresPage, ShopPage, ProductDetail } from './components/pages-scores-shop';
import { PodcastsPage, AboutPage, AdvertisePage, ContactPage, CartDrawer } from './components/pages-more';
import { CheckoutPage, OrderSuccess } from './components/pages-checkout';
import { AdminPage } from './components/pages-admin';
import type { StoreOrder } from './lib/store';
import { BRAND } from './brand';

const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.2 },
};

class ErrorBoundary extends Component<{ children: ReactNode }, { err: Error | null }> {
  state = { err: null as Error | null };
  static getDerivedStateFromError(err: Error) {
    return { err };
  }
  render() {
    if (this.state.err) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-mesh">
          <div className="max-w-sm text-center space-y-3">
            <p className="text-lg font-black text-slate-900">Something went wrong</p>
            <p className="text-sm text-slate-500">The page recovered. Try going home.</p>
            <button type="button" onClick={() => { this.setState({ err: null }); window.location.reload(); }} className="rounded-xl bg-brand-600 px-4 py-2.5 text-xs font-black text-white">Reload</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [booting, setBooting] = useState(true);
  const [welcome, setWelcome] = useState(true);
  const [page, setPage] = useState<PageId>('home');
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [lastOrder, setLastOrder] = useState<StoreOrder | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 850);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (booting) return;
    const t = setTimeout(() => setWelcome(false), 3200);
    return () => clearTimeout(t);
  }, [booting]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page, article?.id, product?.id, lastOrder?.id]);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const storyId = params.get('story');
      if (storyId) {
        const found = NEWS.find((n) => n.id === storyId);
        if (found) {
          setArticle(found);
          setPage('news');
          setWelcome(false);
        }
      }
    } catch { /* ignore */ }
  }, []);

  const go = (p: PageId) => {
    setArticle(null);
    setProduct(null);
    setLastOrder(null);
    setPage(p);
    window.scrollTo(0, 0);
  };

  const addToCart = (p: Product, size: string) => {
    setCart((prev) => {
      const i = prev.findIndex((l) => l.product.id === p.id && l.size === size);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + 1 };
        return next;
      }
      return [...prev, { product: p, size, qty: 1 }];
    });
  };

  const cartCount = cart.reduce((s, l) => s + l.qty, 0);
  const showCart = page === 'shop' || page === 'checkout' || Boolean(product);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-mesh text-slate-900 font-sans">
        <PageLoader show={booting} />
        <AnimatePresence>
          {!booting && welcome && (
            <motion.div
              className="fixed inset-0 z-[90] flex items-center justify-center px-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="absolute inset-0 bg-slate-900/45 backdrop-blur-[2px]" onClick={() => setWelcome(false)} />
              <motion.div
                className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl shadow-slate-900/20 text-center"
                initial={{ opacity: 0, scale: 0.92, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <button type="button" onClick={() => setWelcome(false)} className="absolute right-3 top-3 h-8 w-8 rounded-full text-slate-400 text-lg leading-none" aria-label="Close">×</button>
                <div className="mx-auto h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-2xl">⚽</div>
                <h1 className="mt-4 text-xl font-black text-slate-900 tracking-tight">Welcome to {BRAND.name}</h1>
                <p className="mt-1.5 text-sm font-semibold text-emerald-600">Football news, scores & more</p>
                <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                  Quality updates you can trust — headlines, match talk and the stories that matter to fans.
                </p>
                <button type="button" onClick={() => setWelcome(false)} className="mt-6 w-full rounded-full bg-emerald-500 py-3.5 text-sm font-black text-white shadow-lg shadow-emerald-500/25 active:scale-[0.98]">
                  Let’s go
                </button>
                <button type="button" onClick={() => setWelcome(false)} className="mt-3 text-xs font-semibold text-emerald-600">
                  Continue to stories
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {!booting && !welcome && (
          <Shell page={page} setPage={go} cartCount={cartCount} onOpenCart={() => setCartOpen(true)} showCart={showCart}>
            <AnimatePresence mode="wait">
              <motion.div key={lastOrder ? `order-${lastOrder.id}` : article ? `a-${article.id}` : product ? `p-${product.id}` : page} {...fade}>
                {lastOrder ? (
                  <OrderSuccess order={lastOrder} onShop={() => go('shop')} onHome={() => go('home')} />
                ) : article ? (
                  <ArticleView article={article} onBack={() => setArticle(null)} />
                ) : product ? (
                  <ProductDetail product={product} onBack={() => setProduct(null)} onAdd={addToCart} />
                ) : page === 'checkout' ? (
                  <CheckoutPage lines={cart} onBack={() => { setCartOpen(true); go('shop'); }} onClearCart={() => setCart([])} onPaid={(order) => setLastOrder(order)} />
                ) : page === 'admin' ? (
                  <AdminPage onExit={() => go('home')} />
                ) : (
                  <>
                    {page === 'home' && <HomePage onRead={setArticle} onGo={go} />}
                    {page === 'news' && <NewsPage onRead={setArticle} />}
                    {page === 'scores' && <ScoresPage />}
                    {page === 'shop' && <ShopPage cart={cart} onOpenCart={() => setCartOpen(true)} onOpenProduct={setProduct} />}
                    {page === 'podcasts' && <PodcastsPage />}
                    {page === 'about' && <AboutPage />}
                    {page === 'advertise' && <AdvertisePage onContact={() => go('contact')} />}
                    {page === 'contact' && <ContactPage />}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} lines={cart} onQty={(i, q) => setCart((c) => c.map((l, idx) => (idx === i ? { ...l, qty: q } : l)))} onRemove={(i) => setCart((c) => c.filter((_, idx) => idx !== i))} onCheckout={() => go('checkout')} />
          </Shell>
        )}
      </div>
    </ErrorBoundary>
  );
}
