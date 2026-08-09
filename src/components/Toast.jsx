import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, AlertCircle, ShoppingBag, Heart, Sparkles } from 'lucide-react';

export const Toast = () => {
  const { toasts } = useShop();

  if (!toasts || toasts.length === 0) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'emerald': return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'rose': return <AlertCircle className="w-5 h-5 text-rose-400" />;
      case 'purple': return <Heart className="w-5 h-5 text-purple-400" />;
      case 'cyan': default: return <ShoppingBag className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="glass-panel pointer-events-auto p-4 flex items-start gap-3 shadow-2xl border border-white/20 animate-fadeIn transition-all duration-300"
          style={{
            borderColor: toast.type === 'emerald' ? 'rgba(0,245,160,0.4)' : toast.type === 'rose' ? 'rgba(255,75,92,0.4)' : 'rgba(0,242,254,0.4)'
          }}
        >
          <div className="mt-0.5 shrink-0">{getIcon(toast.type)}</div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              {toast.title}
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            </h4>
            <p className="text-xs text-slate-300 mt-1 leading-snug">{toast.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
