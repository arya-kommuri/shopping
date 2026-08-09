import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Lock, Mail, User, ShieldCheck, Sparkles, Key } from 'lucide-react';

export const AuthModal = () => {
  const { isAuthOpen, setIsAuthOpen, user, setUser, showToast } = useShop();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  if (!isAuthOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      isLoggedIn: true,
      name: name || prev.name,
      email: email || prev.email
    }));
    showToast('Welcome to CyberMart 3D!', `Signed in as ${name || 'Cyber Voyager'}`, 'emerald');
    setIsAuthOpen(false);
  };

  return (
    <div className="modal-backdrop">
      <div className="glass-panel w-full max-w-md p-8 relative border border-cyan-500/40 shadow-2xl animate-fadeIn">
        
        <button 
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-4 right-4 btn-icon text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center mx-auto text-cyan-400">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white font-heading">
            {isSignUp ? 'Create Cyber Identity' : 'Cyber Pass Authentication'}
          </h3>
          <p className="text-xs text-slate-400">Access virtual 3D supermarket features & VIP rewards</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Cyber Voyager"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="input-glass pl-10 text-xs"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Quantum Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="email"
                required
                placeholder="voyager@cybermart3d.io"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input-glass pl-10 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Neural Password</label>
            <div className="relative">
              <Key className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                className="input-glass pl-10 text-xs"
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full justify-center py-3 text-xs mt-2">
            {isSignUp ? 'Initialize Account' : 'Authenticate Cyber Pass'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs text-slate-400">
          {isSignUp ? (
            <p>Already have a Cyber Pass? <button onClick={() => setIsSignUp(false)} className="text-cyan-400 font-bold hover:underline">Sign In</button></p>
          ) : (
            <p>New to CyberMart 3D? <button onClick={() => setIsSignUp(true)} className="text-cyan-400 font-bold hover:underline">Create Account</button></p>
          )}
        </div>

      </div>
    </div>
  );
};
