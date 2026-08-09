import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import confetti from 'canvas-confetti';
import { 
  CreditCard, Truck, ShieldCheck, CheckCircle2, 
  MapPin, Lock, Sparkles, ArrowRight, Zap, Coins 
} from 'lucide-react';

export const CheckoutPage = () => {
  const { cart, cartSubtotal, cartTotal, placeOrder, user, navigateTo } = useShop();

  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user.name || 'Cyber Voyager',
    email: user.email || 'voyager@cybermart3d.io',
    street: '777 Quantum Avenue, Sector 9',
    city: 'Neo Cyberia',
    zip: '90210'
  });
  const [paymentMethod, setPaymentMethod] = useState('cyberpay');

  if (cart.length === 0 && step < 3) {
    return (
      <div className="container-custom py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400">Add items before proceeding to checkout.</p>
        <button onClick={() => navigateTo('shop')} className="btn-primary py-2.5 px-6 text-xs">
          Return to Catalog
        </button>
      </div>
    );
  }

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      // Confetti celebration trigger!
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
      placeOrder(shippingInfo, paymentMethod);
    }
  };

  return (
    <div className="container-custom py-8 max-w-4xl space-y-8">
      
      {/* Step Progress Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <span className="badge badge-cyan text-xs font-mono uppercase">Multi-Step Checkout</span>
          <h1 className="text-3xl font-extrabold text-white font-heading mt-1">Complete Your Cyber Order</h1>
        </div>

        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= 1 ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-500'}`}>1</div>
          <div className="w-8 h-0.5 bg-slate-800" />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= 2 ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-500'}`}>2</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Checkout Form (8 cols) */}
        <div className="lg:col-span-8">
          <form onSubmit={handleNextStep} className="glass-panel p-6 sm:p-8 space-y-6 border border-cyan-500/30">
            
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-cyan-400" /> Step 1: Autonomous Delivery Address
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Full Recipient Name</label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.fullName}
                      onChange={e => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                      className="input-glass text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Quantum Email</label>
                    <input
                      type="email"
                      required
                      value={shippingInfo.email}
                      onChange={e => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                      className="input-glass text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.street}
                    onChange={e => setShippingInfo({ ...shippingInfo, street: e.target.value })}
                    className="input-glass text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">City / Sector</label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.city}
                      onChange={e => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      className="input-glass text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Zip Code</label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.zip}
                      onChange={e => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                      className="input-glass text-xs"
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full justify-center py-3 text-xs mt-4">
                  Continue to Payment <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-cyan-400" /> Step 2: Quantum Payment Protocol
                </h3>

                <div className="space-y-3">
                  <div
                    onClick={() => setPaymentMethod('cyberpay')}
                    className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                      paymentMethod === 'cyberpay' ? 'bg-cyan-500/20 border-cyan-400 text-white' : 'bg-slate-900/60 border-white/10 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-cyan-400" />
                      <div>
                        <div className="font-bold text-sm">CyberPay Instant Neural Wallet</div>
                        <div className="text-xs text-slate-400">Zero fee instant biometric authorization</div>
                      </div>
                    </div>
                    <span className="badge badge-cyan text-[10px]">Instant</span>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('crypto')}
                    className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                      paymentMethod === 'crypto' ? 'bg-purple-500/20 border-purple-400 text-white' : 'bg-slate-900/60 border-white/10 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Coins className="w-5 h-5 text-purple-400" />
                      <div>
                        <div className="font-bold text-sm">Crypto / Web3 Wallet</div>
                        <div className="text-xs text-slate-400">Pay with ETH, SOL, or USDT</div>
                      </div>
                    </div>
                    <span className="badge badge-purple text-[10px]">Web3</span>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                      paymentMethod === 'card' ? 'bg-emerald-500/20 border-emerald-400 text-white' : 'bg-slate-900/60 border-white/10 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-emerald-400" />
                      <div>
                        <div className="font-bold text-sm">Credit / Debit Card</div>
                        <div className="text-xs text-slate-400">Encrypted 256-bit SSL transaction</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setStep(1)} className="btn-secondary flex-1 justify-center py-3 text-xs">
                    Back
                  </button>
                  <button type="submit" className="btn-primary flex-1 justify-center py-3 text-xs">
                    Place Order (${cartTotal.toFixed(2)})
                  </button>
                </div>
              </div>
            )}

          </form>
        </div>

        {/* Order Summary Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel p-6 space-y-4 border border-white/10">
            <h4 className="text-sm font-bold text-white font-heading border-b border-white/10 pb-2">Items Summary</h4>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between items-center text-xs">
                  <div className="truncate max-w-[180px]">
                    <span className="font-semibold text-white">{product.name}</span>
                    <span className="text-slate-500 ml-1">x{quantity}</span>
                  </div>
                  <span className="font-mono text-cyan-400">${(product.price * quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-between text-base font-bold text-white">
              <span>Final Total</span>
              <span className="text-cyan-400 font-mono">${cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
