import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';

export const WishlistPage = () => {
  const { PRODUCTS, wishlist, toggleWishlist, addToCart, navigateTo } = useShop();

  const savedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  const handleAddAllToCart = () => {
    savedProducts.forEach(p => addToCart(p, 1));
  };

  return (
    <div className="container-custom py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="badge badge-purple text-xs font-mono uppercase">Saved Items</span>
          <h1 className="text-3xl font-extrabold text-white font-heading mt-1 flex items-center gap-2">
            My Cyber Wishlist <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
          </h1>
          <p className="text-xs text-slate-400 mt-1">{savedProducts.length} items saved in your personal wishlist</p>
        </div>

        {savedProducts.length > 0 && (
          <button
            onClick={handleAddAllToCart}
            className="btn-primary py-2.5 px-5 text-xs"
          >
            <ShoppingBag className="w-4 h-4" /> Move All to Cart
          </button>
        )}
      </div>

      {savedProducts.length === 0 ? (
        <div className="glass-panel p-16 text-center space-y-4 max-w-md mx-auto my-10 border border-white/10">
          <div className="w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
            <Heart className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-heading">Your Wishlist is Empty</h3>
            <p className="text-xs text-slate-400 mt-1">Click the heart icon on any product to save it to your personal wishlist.</p>
          </div>
          <button onClick={() => navigateTo('shop')} className="btn-primary py-2.5 px-6 text-xs">
            Explore 3D Inventory <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid-products">
          {savedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
};
