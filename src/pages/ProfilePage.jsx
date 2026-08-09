import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  User, Award, MapPin, Package, Heart, 
  Sparkles, CheckCircle2, ChevronRight, ShieldCheck, Zap 
} from 'lucide-react';

export const ProfilePage = () => {
  const { user, orders, wishlist, navigateTo, setIsAuthOpen } = useShop();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'addresses' | 'rewards'

  return (
    <div className="container-custom py-8 space-y-8 max-w-5xl">
      
      {/* User Header Profile Card */}
      <div className="glass-panel p-6 sm:p-8 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-20 h-20 rounded-2xl object-cover border-2 border-cyan-400 shadow-xl shadow-cyan-500/20"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white font-heading">{user.name}</h1>
              <span className="badge badge-purple text-xs">{user.vipLevel}</span>
            </div>
            <p className="text-xs text-slate-400">{user.email}</p>
            <div className="flex items-center gap-3 pt-1 text-xs text-cyan-400 font-mono">
              <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> {user.rewardPoints} Cyber Points</span>
              <span>•</span>
              <span className="text-slate-400">{orders.length} Active Orders</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsAuthOpen(true)}
          className="btn-secondary py-2.5 px-4 text-xs"
        >
          Edit Profile
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-white/10 text-sm">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-3 font-bold font-tech border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'orders' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" /> Order History ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`px-5 py-3 font-bold font-tech border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'addresses' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <MapPin className="w-4 h-4" /> Drone Delivery Addresses
        </button>

        <button
          onClick={() => setActiveTab('rewards')}
          className={`px-5 py-3 font-bold font-tech border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'rewards' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" /> VIP Cyber Rewards
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="glass-panel p-12 text-center text-slate-400 text-xs">
                No active orders found. Start shopping in our 3D supermarket!
              </div>
            ) : (
              orders.map(ord => (
                <div key={ord.id} className="glass-card p-5 border border-white/10 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="text-base font-extrabold text-white font-mono">{ord.id}</span>
                      <span className="text-slate-500 ml-2">Placed on {ord.date}</span>
                    </div>
                    <span className="badge badge-emerald text-xs">{ord.status}</span>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/5 text-xs text-slate-300">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="font-semibold text-white">{it.product.name} (x{it.quantity})</span>
                        <span className="font-mono text-cyan-400">${(it.product.price * it.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-sm font-bold text-white">Total: <span className="text-cyan-400 font-mono">${ord.total.toFixed(2)}</span></span>
                    
                    <button
                      onClick={() => navigateTo('tracking')}
                      className="btn-primary py-2 px-3 text-xs"
                    >
                      Track Drone Flight <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.addresses.map(addr => (
              <div key={addr.id} className="glass-card p-5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm font-heading">{addr.label}</span>
                  <span className="badge badge-cyan text-[10px]">Primary</span>
                </div>
                <p className="text-xs text-slate-300">{addr.street}</p>
                <p className="text-xs text-slate-400">{addr.city}, {addr.zip}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="glass-panel p-8 border border-purple-500/30 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center mx-auto text-purple-400">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-heading">VIP Gold Tier Member</h3>
              <p className="text-xs text-slate-300 mt-1">You have <strong className="text-cyan-400 font-mono">{user.rewardPoints} Cyber Points</strong> available for instant discounts.</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
