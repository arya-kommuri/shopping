import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Product3DViewer } from '../canvas/Product3DViewer';
import { X, ShoppingBag, Heart, Star, Check, Sparkles, ShieldCheck } from 'lucide-react';

export const QuickViewModal = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, wishlist, toggleWishlist, navigateTo } = useShop();
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const isWishlisted = wishlist.includes(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="modal-backdrop">
      <div className="glass-panel w-full max-w-4xl p-6 sm:p-8 relative border border-cyan-500/40 shadow-2xl animate-fadeIn max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 btn-icon text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left Column: 3D 360 Viewer */}
          <div className="h-80 sm:h-96 w-full">
            <Product3DViewer product={quickViewProduct} autoRotate={true} />
          </div>

          {/* Right Column: Product Metadata & Controls */}
          <div className="flex flex-col justify-between space-y-4">
            
            <div className="space-y-3">
              {/* Badges */}
              <div className="flex items-center gap-2">
                <span className="badge badge-cyan text-xs uppercase">{quickViewProduct.category}</span>
                <span className="badge badge-purple text-xs">3D Inspected</span>
                {quickViewProduct.inStock && (
                  <span className="badge badge-emerald text-xs flex items-center gap-1">
                    <Check className="w-3 h-3" /> In Stock
                  </span>
                )}
              </div>

              <h2 className="text-2xl font-extrabold text-white font-heading">{quickViewProduct.name}</h2>

              {/* Rating */}
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{quickViewProduct.rating}</span>
                </div>
                <span>•</span>
                <span className="text-slate-400">{quickViewProduct.reviewCount} customer reviews</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-cyan-400 font-mono">${quickViewProduct.price.toFixed(2)}</span>
                {quickViewProduct.originalPrice > quickViewProduct.price && (
                  <span className="text-base text-slate-500 line-through font-mono">${quickViewProduct.originalPrice.toFixed(2)}</span>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Highlights */}
              <div className="space-y-1.5 pt-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-tech flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Key Features
                </h4>
                <ul className="grid grid-cols-2 gap-1.5 text-xs text-slate-300">
                  {quickViewProduct.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions & Quantity */}
            <div className="pt-4 border-t border-white/10 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-slate-300">Quantity:</span>
                <div className="flex items-center gap-2 bg-slate-900 border border-white/10 rounded-xl p-1">
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
                  onClick={handleAddToCart}
                  className="btn-primary flex-1 justify-center py-3 text-xs"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Cart (${(quickViewProduct.price * quantity).toFixed(2)})
                </button>

                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`btn-icon w-12 h-12 rounded-xl border border-white/10 ${
                    isWishlisted ? 'text-rose-500 fill-rose-500 border-rose-500/50' : 'text-slate-300 hover:text-rose-400'
                  }`}
                >
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={() => {
                  const id = quickViewProduct.id;
                  setQuickViewProduct(null);
                  navigateTo('product-detail', id);
                }}
                className="w-full text-center text-xs font-bold text-cyan-400 hover:underline"
              >
                View Full Specifications & Reviews →
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
