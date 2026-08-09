import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Product3DViewer } from '../canvas/Product3DViewer';
import { ProductCard } from '../components/ProductCard';
import { 
  ShoppingBag, Heart, Star, Check, Sparkles, 
  ShieldCheck, Truck, RotateCcw, Box, ArrowLeft, MessageSquare 
} from 'lucide-react';

export const ProductDetailPage = () => {
  const { PRODUCTS, selectedProductId, addToCart, wishlist, toggleWishlist, navigateTo } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'reviews'

  const product = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];
  const isWishlisted = wishlist.includes(product.id);

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="container-custom py-8 space-y-12">
      
      {/* Back Button */}
      <button
        onClick={() => navigateTo('shop')}
        className="btn-secondary py-2 px-3 text-xs inline-flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </button>

      {/* Main Product Section: 3D Inspector + Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Interactive 3D 360 Viewer (7 cols) */}
        <div className="lg:col-span-7 h-[450px] sm:h-[550px] w-full sticky top-24">
          <Product3DViewer product={product} autoRotate={true} />
        </div>

        {/* Right Column: Details & Order Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="badge badge-cyan text-xs uppercase">{product.category}</span>
              {product.isNew && <span className="badge badge-purple text-xs">New Release</span>}
              {product.discount > 0 && <span className="badge badge-rose text-xs">-{product.discount}% OFF</span>}
            </div>

            <h1 className="text-3xl font-extrabold text-white font-heading">{product.name}</h1>

            <div className="flex items-center gap-3 text-sm text-slate-300">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating}</span>
              </div>
              <span>•</span>
              <span className="text-slate-400">{product.reviewCount} customer reviews</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> In Stock
              </span>
            </div>

            <div className="flex items-baseline gap-4 pt-2">
              <span className="text-4xl font-black text-cyan-400 font-mono">${product.price.toFixed(2)}</span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-slate-500 line-through font-mono">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>15-min Drone Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Quantum 2-Yr Warranty</span>
            </div>
          </div>

          {/* Add To Cart Controls */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">Select Quantity:</span>
              <div className="flex items-center gap-3 bg-slate-900 border border-white/10 rounded-xl p-1.5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold hover:bg-slate-700"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-bold text-white font-mono">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold hover:bg-slate-700"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => addToCart(product, quantity)}
                className="btn-primary flex-1 justify-center py-3.5 text-sm"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart (${(product.price * quantity).toFixed(2)})
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`btn-icon w-12 h-12 rounded-xl border border-white/10 ${
                  isWishlisted ? 'text-rose-500 fill-rose-500 border-rose-500/50' : 'text-slate-300 hover:text-rose-400'
                }`}
              >
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tabs: Specs & Reviews */}
          <div className="pt-6">
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab('specs')}
                className={`px-4 py-2.5 text-xs font-bold font-tech border-b-2 transition-all ${
                  activeTab === 'specs' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Technical Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-4 py-2.5 text-xs font-bold font-tech border-b-2 transition-all ${
                  activeTab === 'reviews' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Customer Reviews ({product.reviewCount})
              </button>
            </div>

            <div className="py-4">
              {activeTab === 'specs' ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    {Object.entries(product.specs).map(([key, val]) => (
                      <div key={key} className="flex justify-between py-2 px-3 rounded-lg bg-slate-900/50 border border-white/5">
                        <span className="text-slate-400 font-semibold">{key}</span>
                        <span className="text-white font-mono">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">Cyber Specialist</span>
                      <span className="text-amber-400 font-bold">★★★★★ 5.0</span>
                    </div>
                    <p className="text-slate-300">"Phenomenal build quality! Inspecting the 3D model beforehand was super accurate."</p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Related Products Showcase */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-10 border-t border-white/10">
          <h2 className="text-2xl font-extrabold text-white font-heading flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" /> Related 3D Items In Department
          </h2>

          <div className="grid-products">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
