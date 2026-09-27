import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PageId, Product, NewsArticle } from './data';
import { PageLoader } from './components/ui';
import { Shell, type CartLine } from './components/layout';
import { HomePage, NewsPage, ArticleView } from './components/pages-home';
import { ScoresPage, ShopPage, ProductDetail } from './components/pages-scores-shop';
import { PodcastsPage, AboutPage, AdvertisePage, ContactPage, CartDrawer } from './components/pages-more';

const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.2 },
};

export default function App() {
  const [booting, setBooting] = useState(true);
  const [page, setPage] = useState<PageId>('home');
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page, article?.id, product?.id]);

  const go = (p: PageId) => {
    setArticle(null);
    setProduct(null);
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
  const showCart = page === 'shop' || Boolean(product);

  return (
    <div className="min-h-screen bg-mesh text-slate-900 font-sans">
      <PageLoader show={booting} />
      {!booting && (
        <Shell
          page={page}
          setPage={go}
          cartCount={cartCount}
          onOpenCart={() => setCartOpen(true)}
          showCart={showCart}
        >
          <AnimatePresence mode="wait">
            <motion.div key={article ? `a-${article.id}` : product ? `p-${product.id}` : page} {...fade}>
              {article ? (
                <ArticleView article={article} onBack={() => setArticle(null)} />
              ) : product ? (
                <ProductDetail product={product} onBack={() => setProduct(null)} onAdd={addToCart} />
              ) : (
                <>
                  {page === 'home' && <HomePage onRead={setArticle} onGo={go} />}
                  {page === 'news' && <NewsPage onRead={setArticle} />}
                  {page === 'scores' && <ScoresPage />}
                  {page === 'shop' && (
                    <ShopPage cart={cart} onOpenCart={() => setCartOpen(true)} onOpenProduct={setProduct} />
                  )}
                  {page === 'podcasts' && <PodcastsPage />}
                  {page === 'about' && <AboutPage />}
                  {page === 'advertise' && <AdvertisePage onContact={() => go('contact')} />}
                  {page === 'contact' && <ContactPage />}
                </>
              )}
            </motion.div>
          </AnimatePresence>
          <CartDrawer
            open={cartOpen}
            onClose={() => setCartOpen(false)}
            lines={cart}
            onQty={(i, q) => setCart((c) => c.map((l, idx) => (idx === i ? { ...l, qty: q } : l)))}
            onRemove={(i) => setCart((c) => c.filter((_, idx) => idx !== i))}
          />
        </Shell>
      )}
    </div>
  );
}
