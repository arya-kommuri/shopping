import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Cart3DAnimation } from '../canvas/Cart3DAnimation';
import { 
  ShoppingBag, Trash2, Plus, Minus, ArrowRight, 
  Tag, Truck, Sparkles, ShieldCheck 
} from 'lucide-react';

export const CartPage = () => {
  const { 
    cart, removeFromCart, updateQuantity, clearCart, 
    cartSubtotal, discountAmount, cartTotal, freeShippingThreshold, 
    isFreeShipping, promoCode, applyPromoCode, navigateTo 
  } = useShop();

  const [inputCode, setInputCode] = useState('');

  const handleApplyCode = (e) => {
    e.preventDefault();
    if (!inputCode) return;
    applyPromoCode(inputCode);
    setInputCode('');
  };

  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  return (
    <div className="container-custom py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="badge badge-cyan text-xs font-mono uppercase">Checkout Preparation</span>
          <h1 className="text-3xl font-extrabold text-white font-heading mt-1">Shopping Cart Overview</h1>
          <p className="text-xs text-slate-400 mt-1">{cart.length} unique items selected</p>
        </div>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="btn-secondary py-2 px-3 text-xs text-rose-400 border-rose-500/30 hover:bg-rose-500/10"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear Cart
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="glass-panel p-16 text-center space-y-4 max-w-md mx-auto my-10 border border-white/10">
          <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto text-slate-500 border border-white/10">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-heading">Your Cart is Empty</h3>
            <p className="text-xs text-slate-400 mt-1">Visit our 3D supermarket catalog to add products.</p>
          </div>
          <button onClick={() => navigateTo('shop')} className="btn-primary py-2.5 px-6 text-xs">
            Start Shopping <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Cart Table List (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Free Shipping Progress */}
            <div className="glass-panel p-4 border border-cyan-500/30">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-200 font-semibold flex items-center gap-2">
                  <Truck className="w-4 h-4 text-cyan-400" />
                  {isFreeShipping ? '🎉 Free Autonomous Drone Delivery Unlocked!' : `Add $${(freeShippingThreshold - cartSubtotal).toFixed(2)} more for Free Shipping`}
                </span>
                <span className="font-bold text-cyan-400 font-mono">{progressPercent.toFixed(0)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Cart Items */}
            <div className="space-y-3">
              {cart.map(({ product, quantity }) => (
                <div 
                  key={product.id}
                  className="glass-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center font-bold font-mono text-xs border border-white/10 shrink-0"
                      style={{ backgroundColor: `${product.color}25`, color: product.color }}
                    >
                      3D
                    </div>
                    <div>
                      <h4 
                        onClick={() => navigateTo('product-detail', product.id)}
                        className="text-base font-bold text-white hover:text-cyan-400 cursor-pointer transition-colors"
                      >
                        {product.name}
                      </h4>
                      <p className="text-xs text-cyan-400 font-mono">${product.price.toFixed(2)} each</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                    {/* Quantity Modifier */}
                    <div className="flex items-center gap-2 bg-slate-900 border border-white/10 rounded-xl p-1">
                      <button
                        onClick={() => updateQuantity(product.id, -1)}
                        className="w-7 h-7 rounded-lg bg-slate-800 text-white font-bold hover:bg-slate-700"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-white font-mono">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, 1)}
                        className="w-7 h-7 rounded-lg bg-slate-800 text-white font-bold hover:bg-slate-700"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-lg font-black text-white font-mono">
                      ${(product.price * quantity).toFixed(2)}
                    </span>

                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: 3D Cart Animation + Order Summary (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 3D Cart Visualizer */}
            <div className="h-56 w-full">
              <Cart3DAnimation />
            </div>

            {/* Order Summary Box */}
            <div className="glass-panel p-6 space-y-6 border border-cyan-500/30">
              <h3 className="text-lg font-bold text-white font-heading border-b border-white/10 pb-3">Order Summary</h3>

              {/* Promo Form */}
              <form onSubmit={handleApplyCode} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Code (e.g. FUTURE15)"
                    value={inputCode}
                    onChange={e => setInputCode(e.target.value)}
                    className="input-glass uppercase text-xs py-2"
                  />
                  <button type="submit" className="btn-secondary py-2 px-3 text-xs">
                    Apply
                  </button>
                </div>
                {promoCode.message && (
                  <p className={`text-xs ${promoCode.isValid ? 'text-emerald-400' : 'text-rose-400'} font-semibold`}>
                    {promoCode.message}
                  </p>
                )}
              </form>

              {/* Calculation */}
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="font-semibold text-white font-mono">${cartSubtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount ({promoCode.discountPercent}%)</span>
                    <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Drone Shipping</span>
                  <span className="font-semibold text-white font-mono">{isFreeShipping ? 'FREE' : '$9.99'}</span>
                </div>

                <div className="flex justify-between text-lg font-black text-white pt-3 border-t border-white/10">
                  <span>Total Due</span>
                  <span className="text-cyan-400 font-mono">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigateTo('checkout')}
                className="btn-primary w-full justify-center py-3.5 text-sm"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
