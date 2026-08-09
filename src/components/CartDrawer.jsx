import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  ShoppingBag, X, Trash2, Plus, Minus, ArrowRight, 
  Tag, ShieldCheck, Truck, Sparkles 
} from 'lucide-react';

export const CartDrawer = () => {
  const { 
    isCartOpen, setIsCartOpen, cart, removeFromCart, 
    updateQuantity, cartSubtotal, discountAmount, cartTotal, 
    freeShippingThreshold, isFreeShipping, promoCode, applyPromoCode, 
    navigateTo 
  } = useShop();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCode = (e) => {
    e.preventDefault();
    if (!inputCode) return;
    applyPromoCode(inputCode);
    setInputCode('');
  };

  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
      />

      {/* Slide-out Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900/95 border-l border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                  Shopping Cart
                  <span className="badge badge-cyan text-[10px]">{cart.length} items</span>
                </h3>
                <p className="text-xs text-slate-400">Review your 3D selected items</p>
              </div>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="btn-icon text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="px-6 py-3 bg-slate-950/60 border-b border-white/5">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-300 flex items-center gap-1.5 font-semibold">
                <Truck className="w-3.5 h-3.5 text-cyan-400" />
                {isFreeShipping ? '🎉 Free Drone Delivery Unlocked!' : `Add $${(freeShippingThreshold - cartSubtotal).toFixed(2)} more for Free Shipping`}
              </span>
              <span className="font-bold text-cyan-400">{progressPercent.toFixed(0)}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-slate-400 my-10">
                <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center border border-white/10">
                  <ShoppingBag className="w-10 h-10 text-slate-500" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Your Cart is Empty</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs">Explore our 3D aisles and add futuristic items to your shopping cart.</p>
                </div>
                <button 
                  onClick={() => { setIsCartOpen(false); navigateTo('shop'); }}
                  className="btn-primary py-2.5 px-5 text-xs mt-2"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              cart.map(({ product, quantity }) => (
                <div 
                  key={product.id}
                  className="glass-card p-3.5 flex gap-3 items-center group relative border border-white/10 hover:border-cyan-400/40"
                >
                  {/* Product 3D Badge Box */}
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0 border border-white/10 relative overflow-hidden"
                    style={{ backgroundColor: `${product.color}20` }}
                  >
                    <span className="text-xs font-bold font-mono uppercase" style={{ color: product.color }}>3D</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">{product.name}</h4>
                    <p className="text-xs text-cyan-400 font-semibold mt-0.5">${product.price.toFixed(2)}</p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(product.id, -1)}
                        className="w-6 h-6 rounded-md bg-slate-800 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white px-2">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, 1)}
                        className="w-6 h-6 rounded-md bg-slate-800 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Item Total & Remove */}
                  <div className="flex flex-col items-end justify-between self-stretch">
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-extrabold text-white font-mono">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-slate-950/80 space-y-4">
              
              {/* Promo Code Form */}
              <form onSubmit={handleApplyCode} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Promo (e.g. FUTURE15)"
                    value={inputCode}
                    onChange={e => setInputCode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-xs text-white uppercase placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <button type="submit" className="btn-secondary py-2 px-3 text-xs">
                  Apply
                </button>
              </form>

              {promoCode.message && (
                <p className={`text-xs ${promoCode.isValid ? 'text-emerald-400' : 'text-rose-400'} font-semibold flex items-center gap-1`}>
                  <Sparkles className="w-3 h-3" /> {promoCode.message}
                </p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">${cartSubtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Cyber Discount ({promoCode.discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="font-semibold text-white">{isFreeShipping ? 'FREE' : '$9.99'}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-white/10">
                  <span>Total Amount</span>
                  <span className="text-cyan-400 font-mono">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => { setIsCartOpen(false); navigateTo('cart'); }}
                  className="btn-secondary flex-1 justify-center text-xs py-3"
                >
                  View Cart
                </button>
                <button
                  onClick={() => { setIsCartOpen(false); navigateTo('checkout'); }}
                  className="btn-primary flex-1 justify-center text-xs py-3"
                >
                  Checkout <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
