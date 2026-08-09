import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/categories';
import { REVIEWS } from '../data/reviews';
import { ProductCard } from '../components/ProductCard';
import { Supermarket3D } from '../canvas/Supermarket3D';
import { 
  Box, Sparkles, ArrowRight, Zap, ShieldCheck, Clock, 
  Truck, Star, Flame, Award, ChevronRight, CheckCircle2 
} from 'lucide-react';

export const HomePage = () => {
  const { PRODUCTS, navigateTo, activeCategory, setActiveCategory } = useShop();

  // Flash Sale Countdown timer
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashSaleProducts = PRODUCTS.filter(p => p.isFlashSale).slice(0, 4);
  const featuredProducts = PRODUCTS.filter(p => p.rating >= 4.8).slice(0, 8);

  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section with Interactive 3D Supermarket Canvas */}
      <section className="relative pt-6">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold font-tech tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Next-Gen Shopping Platform
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading leading-tight">
              Step Into The <span className="gradient-text">3D Virtual</span> Shopping Mart
            </h1>

            <p className="text-base text-slate-300 leading-relaxed">
              Explore 8 interactive 3D department aisles, inspect products in 360° PBR detail, and enjoy real-time 15-minute autonomous drone delivery.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigateTo('categories')}
                className="btn-primary py-3.5 px-6 text-sm"
              >
                <Box className="w-4 h-4" /> Enter 3D Store Aisle
              </button>

              <button
                onClick={() => navigateTo('shop')}
                className="btn-secondary py-3.5 px-6 text-sm"
              >
                Browse Catalog <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-center">
              <div>
                <div className="text-2xl font-black text-cyan-400 font-mono">24+</div>
                <div className="text-xs text-slate-400">3D Products</div>
              </div>
              <div>
                <div className="text-2xl font-black text-purple-400 font-mono">8</div>
                <div className="text-xs text-slate-400">Virtual Aisles</div>
              </div>
              <div>
                <div className="text-2xl font-black text-emerald-400 font-mono">15m</div>
                <div className="text-xs text-slate-400">Drone ETA</div>
              </div>
            </div>
          </div>

          {/* Hero Right: 3D Supermarket Viewport */}
          <div className="lg:col-span-7 h-[420px] sm:h-[500px] w-full relative">
            <Supermarket3D
              selectedCategory={activeCategory}
              onSelectCategory={(id) => {
                setActiveCategory(id);
                navigateTo('categories');
              }}
            />
          </div>

        </div>
      </section>

      {/* Flash Sale Banner with Countdown */}
      <section className="container-custom">
        <div className="glass-panel p-8 border border-rose-500/40 relative overflow-hidden bg-gradient-to-r from-rose-950/40 via-slate-900 to-purple-950/40">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                <Flame className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-white font-heading">Quantum Flash Deals</h2>
                <p className="text-xs text-slate-300">Limited-time 3D inventory discounts up to 25% OFF</p>
              </div>
            </div>

            {/* Countdown Box */}
            <div className="flex items-center gap-3 bg-slate-950/80 px-5 py-3 rounded-2xl border border-rose-500/30">
              <Clock className="w-4 h-4 text-rose-400" />
              <span className="text-xs text-slate-400 font-semibold uppercase font-tech">Ends In:</span>
              <div className="flex items-center gap-1.5 font-mono font-bold text-white text-base">
                <span className="bg-rose-500/20 text-rose-400 px-2 py-1 rounded-md">{String(timeLeft.hours).padStart(2, '0')}h</span> :
                <span className="bg-rose-500/20 text-rose-400 px-2 py-1 rounded-md">{String(timeLeft.minutes).padStart(2, '0')}m</span> :
                <span className="bg-rose-500/20 text-rose-400 px-2 py-1 rounded-md">{String(timeLeft.seconds).padStart(2, '0')}s</span>
              </div>
            </div>
          </div>

          {/* Flash Sale Products Grid */}
          <div className="grid-products">
            {flashSaleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* 8 Department Categories Grid */}
      <section className="container-custom space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="badge badge-purple text-xs font-mono uppercase">Virtual Supermarket Aisles</span>
          <h2 className="text-3xl font-extrabold text-white font-heading">Explore By Department</h2>
          <p className="text-sm text-slate-400">Click any department to glide the 3D camera straight to that aisle.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map(category => (
            <div
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                navigateTo('categories');
              }}
              className="glass-card p-6 cursor-pointer group hover:border-cyan-400/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: `${category.color}25`, border: `1px solid ${category.color}40` }}
                  >
                    <Box className="w-6 h-6" style={{ color: category.color }} />
                  </div>
                  <span className="badge badge-cyan text-[10px]">{category.badge}</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors font-heading">
                    {category.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
                <span>Enter Aisle →</span>
                <span className="text-slate-500 font-mono text-[11px]">{category.itemCount} items</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="container-custom space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="badge badge-cyan text-xs font-mono uppercase">Top Rated Cyber Products</span>
            <h2 className="text-3xl font-extrabold text-white font-heading mt-1">Trending In Store</h2>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="btn-secondary py-2.5 px-4 text-xs"
          >
            View Entire Catalog ({PRODUCTS.length}) <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid-products">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="container-custom">
        <div className="glass-panel p-8 md:p-12 border border-cyan-500/30">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
            <span className="badge badge-emerald text-xs font-mono uppercase">Verified Testimonials</span>
            <h2 className="text-3xl font-extrabold text-white font-heading">Customer Experiences</h2>
            <p className="text-sm text-slate-400">See what shoppers say about our 3D store and drone delivery.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map(rev => (
              <div key={rev.id} className="glass-card p-6 space-y-4 border border-white/10">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>

                <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                  <img src={rev.avatar} alt={rev.name} className="w-10 h-10 rounded-full object-cover border border-cyan-400/40" />
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      {rev.name}
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    </h4>
                    <p className="text-[11px] text-slate-400">{rev.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
