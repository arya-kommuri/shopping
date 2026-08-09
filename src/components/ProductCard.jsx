import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, ShoppingBag, Eye, Star, Sparkles, Check } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist, setQuickViewProduct, navigateTo } = useShop();
  const isWishlisted = wishlist.includes(product.id);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glass-card p-4 flex flex-col justify-between group relative transition-all duration-300 border border-white/10 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/10"
    >
      
      {/* Top Badges */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-1.5">
          {product.discount > 0 && (
            <span className="badge badge-rose text-[10px]">-{product.discount}% OFF</span>
          )}
          {product.isNew && (
            <span className="badge badge-cyan text-[10px]">NEW</span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          className="btn-icon w-8 h-8 rounded-full bg-slate-900/80 border border-white/10 text-slate-300 hover:text-rose-400"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'text-rose-500 fill-rose-500' : ''}`} />
        </button>
      </div>

      {/* Product Interactive 3D Visual Box */}
      <div 
        onClick={() => navigateTo('product-detail', product.id)}
        className="my-4 h-44 rounded-xl flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group-hover:scale-105 transition-transform duration-500"
        style={{ 
          background: `radial-gradient(circle, ${product.color}25 0%, rgba(10,12,22,0.8) 80%)`,
          border: `1px solid ${product.color}30`
        }}
      >
        {/* Animated 3D Floating Icon Box */}
        <div 
          className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center shadow-2xl transition-all duration-500 group-hover:rotate-6"
          style={{ 
            backgroundColor: `${product.color}30`, 
            border: `2px solid ${product.color}`,
            boxShadow: `0 0 25px ${product.color}40`
          }}
        >
          <span className="text-xl font-bold font-heading text-white">3D</span>
          <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest mt-1">{product.shape}</span>
        </div>

        {/* Floating Raycast Indicator */}
        <div className="absolute bottom-2 left-2 right-2 text-center text-[10px] font-mono text-cyan-300/80 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/80 py-1 rounded-md border border-cyan-500/30">
          ✨ Inspect 3D Model
        </div>
      </div>

      {/* Product Metadata */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400 capitalize">
          <span>{product.category}</span>
          <div className="flex items-center gap-1 text-amber-400 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
            <span className="text-slate-500 text-[10px]">({product.reviewCount})</span>
          </div>
        </div>

        <h3 
          onClick={() => navigateTo('product-detail', product.id)}
          className="text-base font-bold text-white hover:text-cyan-400 cursor-pointer transition-colors line-clamp-1 font-heading"
        >
          {product.name}
        </h3>

        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Pricing & Actions */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
          <div>
            <span className="text-lg font-black text-cyan-400 font-mono">${product.price.toFixed(2)}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-slate-500 line-through ml-2 font-mono">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Quick View Button */}
            <button
              onClick={() => setQuickViewProduct(product)}
              title="Quick 3D View"
              className="btn-icon w-9 h-9 rounded-xl bg-slate-800 border border-white/10 text-slate-300 hover:text-cyan-400"
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* Quick Add to Cart Button */}
            <button
              onClick={() => addToCart(product, 1)}
              className="btn-primary py-2 px-3 text-xs rounded-xl"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
