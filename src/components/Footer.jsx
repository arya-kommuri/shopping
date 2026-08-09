import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Box, Send, ShieldCheck, Zap, Globe, Sparkles, Award } from 'lucide-react';

export const Footer = () => {
  const { navigateTo, showToast } = useShop();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    showToast('Subscribed to Cyber Alerts!', 'You will receive 3D flash sale updates & VIP discounts.', 'emerald');
    setEmail('');
  };

  return (
    <footer className="w-full bg-slate-950 border-t border-white/10 text-slate-400 mt-20 relative overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('home')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Box className="w-5 h-5 text-white" />
              </div>
              <span className="font-black text-2xl tracking-tight text-white font-heading">CYBER<span className="text-cyan-400">MART</span> 3D</span>
            </div>
            
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Step into the future of e-commerce. Experience virtual 3D supermarket aisles, 360° product rotators, and autonomous drone delivery tracking.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold border border-cyan-500/30">
                <Zap className="w-3.5 h-3.5" /> 60 FPS WebGL
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold border border-purple-500/30">
                <ShieldCheck className="w-3.5 h-3.5" /> Quantum Secure
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
                <Globe className="w-3.5 h-3.5" /> Autonomous Drone Delivery
              </span>
            </div>
          </div>

          {/* Department Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-tech flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Departments
            </h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => navigateTo('shop')} className="hover:text-cyan-400 transition-colors">Quantum Electronics</button></li>
              <li><button onClick={() => navigateTo('shop')} className="hover:text-cyan-400 transition-colors">Cyber Apparel</button></li>
              <li><button onClick={() => navigateTo('shop')} className="hover:text-cyan-400 transition-colors">Hydroponic Fresh</button></li>
              <li><button onClick={() => navigateTo('shop')} className="hover:text-cyan-400 transition-colors">Smart Home Bots</button></li>
              <li><button onClick={() => navigateTo('shop')} className="hover:text-cyan-400 transition-colors">AI Toys & Gaming</button></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-tech flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-purple-400" /> Experience
            </h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => navigateTo('categories')} className="hover:text-purple-400 transition-colors">3D Store Teleport</button></li>
              <li><button onClick={() => navigateTo('tracking')} className="hover:text-purple-400 transition-colors">Drone Delivery Radar</button></li>
              <li><button onClick={() => navigateTo('cart')} className="hover:text-purple-400 transition-colors">Interactive 3D Cart</button></li>
              <li><button onClick={() => navigateTo('profile')} className="hover:text-purple-400 transition-colors">VIP Rewards Dashboard</button></li>
              <li><button onClick={() => navigateTo('wishlist')} className="hover:text-purple-400 transition-colors">Saved Cyber Items</button></li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-tech">Cyber Dispatch</h4>
            <p className="text-xs text-slate-400">Subscribe for secret promo codes (e.g. <code className="text-cyan-400 bg-cyan-950 px-1 py-0.5 rounded">FUTURE15</code>) & 3D releases.</p>
            
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter quantum email..."
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>3D Engine Online - 99.99% Uptime</span>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 CYBERMART 3D Inc. Powered by Three.js & React.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" onClick={e => e.preventDefault()} className="hover:text-slate-300">Privacy Protocol</a>
            <a href="#terms" onClick={e => e.preventDefault()} className="hover:text-slate-300">Terms of Service</a>
            <a href="#security" onClick={e => e.preventDefault()} className="hover:text-slate-300">Neural Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
