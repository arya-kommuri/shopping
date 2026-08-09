import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Delivery3DViewer } from '../canvas/Delivery3DViewer';
import { 
  Sparkles, Clock, MapPin, CheckCircle2, 
  Truck, ShieldCheck, Box, ChevronRight, Zap 
} from 'lucide-react';

export const OrderTrackingPage = () => {
  const { orders, navigateTo } = useShop();

  const activeOrder = orders[0] || {
    id: 'ORD-9842-CYBER',
    date: 'Today',
    status: 'In Transit by Autonomous Drone',
    step: 3,
    trackingNumber: 'CYBER-DRONE-88',
    estimatedDelivery: '18 minutes',
    address: '777 Quantum Avenue, Sector 9',
    total: 1306.98,
    items: []
  };

  const steps = [
    { title: 'Order Verified', desc: 'Payment authorized', icon: CheckCircle2 },
    { title: '3D Item Packaged', desc: 'PBR inspection passed', icon: Box },
    { title: 'Drone Dispatched', desc: 'Navigating air corridor', icon: Truck },
    { title: 'Delivered', desc: 'Precision landing complete', icon: Sparkles }
  ];

  return (
    <div className="container-custom py-8 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="badge badge-emerald text-xs font-mono uppercase">Live Telemetry Radar</span>
        <h1 className="text-3xl font-extrabold text-white font-heading">Drone Delivery Tracker</h1>
        <p className="text-xs text-slate-400">Track your order status and autonomous flight in real-time 3D.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: 3D Drone Visualizer (7 cols) */}
        <div className="lg:col-span-7 h-[420px] sm:h-[480px] w-full">
          <Delivery3DViewer />
        </div>

        {/* Right Column: Live Status & Timeline (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="glass-panel p-6 border border-cyan-500/30 space-y-4">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs text-slate-400 font-mono">Order ID</span>
                <h3 className="text-lg font-bold text-white font-mono">{activeOrder.id}</h3>
              </div>
              <span className="badge badge-cyan text-xs">{activeOrder.status}</span>
            </div>

            {/* Estimated Delivery Timer */}
            <div className="flex items-center gap-4 bg-slate-900/80 p-4 rounded-xl border border-cyan-500/20">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase font-mono">Estimated Arrival</div>
                <div className="text-lg font-extrabold text-white font-heading">{activeOrder.estimatedDelivery}</div>
              </div>
            </div>

            {/* Drone Telemetry Stats */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-950/60 border border-white/5">
                <span className="text-slate-500">Tracking Code:</span>
                <p className="text-cyan-400 font-mono font-bold mt-0.5">{activeOrder.trackingNumber}</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/60 border border-white/5">
                <span className="text-slate-500">Delivery Vector:</span>
                <p className="text-white font-mono font-bold mt-0.5 truncate">{activeOrder.address}</p>
              </div>
            </div>

            {/* Timeline Steps */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-tech">Flight Milestones</h4>
              
              <div className="space-y-3 relative">
                {steps.map((st, idx) => {
                  const isCompleted = idx + 1 <= activeOrder.step;
                  const Icon = st.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${isCompleted ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-500'}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h5 className={`text-xs font-bold ${isCompleted ? 'text-white' : 'text-slate-500'}`}>{st.title}</h5>
                        <p className="text-[11px] text-slate-400">{st.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* All Orders Table */}
      {orders.length > 0 && (
        <div className="glass-panel p-6 space-y-4 border border-white/10">
          <h3 className="text-lg font-bold text-white font-heading">Recent Cyber Orders</h3>
          
          <div className="space-y-2">
            {orders.map(ord => (
              <div key={ord.id} className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                <div>
                  <span className="font-mono font-bold text-white text-sm">{ord.id}</span>
                  <span className="text-slate-500 ml-2">({ord.date})</span>
                  <p className="text-slate-400 mt-0.5">{ord.items.length} items • Delivery to {ord.address}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-extrabold text-cyan-400 font-mono text-sm">${ord.total.toFixed(2)}</span>
                  <span className="badge badge-emerald text-[10px]">{ord.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
