import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useSound } from '../context/SoundContext';
import { 
  ShoppingBag, Heart, Search, Sun, Moon, Volume2, VolumeX, 
  User, Box, Compass, Sparkles, Navigation, Menu, X, Check 
} from 'lucide-react';

export const Navbar = () => {
  const { 
    activePage, navigateTo, totalItemCount, wishlist, 
    theme, toggleTheme, setIsCartOpen, setIsAuthOpen, 
    user, PRODUCTS 
  } = useShop();

  const { soundEnabled, toggleSound, playClick } = useSound();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Search Results preview
  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  const handleSearchSelect = (product) => {
    setSearchQuery('');
    setIsSearchFocused(false);
    navigateTo('product-detail', product.id);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 border-b border-white/10 transition-all duration-300">
      <div className="container-custom h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => navigateTo('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
            <Box className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-white font-heading">CYBER<span className="text-cyan-400">MART</span></span>
              <span className="badge badge-cyan text-[10px] py-0.5 px-1.5">3D</span>
            </div>
            <p className="text-[10px] text-cyan-300/80 font-mono tracking-widest uppercase">Next-Gen Supermarket</p>
          </div>
        </div>

        {/* Live Search Bar with Dropdown */}
        <div className="hidden md:block flex-1 max-w-md relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search 3D items, electronics, fresh produce..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-slate-400 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Autocomplete Search Dropdown */}
          {isSearchFocused && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 glass-panel p-2 z-50 shadow-2xl rounded-xl border border-cyan-500/30 overflow-hidden">
              <div className="text-[11px] font-mono text-cyan-400 px-3 py-1 uppercase tracking-wider">Matching 3D Inventory</div>
              {searchResults.map(item => (
                <div
                  key={item.id}
                  onClick={() => handleSearchSelect(item)}
                  className="flex items-center justify-between p-2.5 hover:bg-cyan-500/10 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: `${item.color}25`, color: item.color, border: `1px solid ${item.color}50` }}
                    >
                      3D
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.name}</p>
                      <p className="text-xs text-slate-400 capitalize">{item.category}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-cyan-400">${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-xl border border-white/5">
          <button
            onClick={() => navigateTo('home')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activePage === 'home' ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20' : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Home
          </button>

          <button
            onClick={() => navigateTo('shop')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activePage === 'shop' ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20' : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Catalog
          </button>

          <button
            onClick={() => navigateTo('categories')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activePage === 'categories' ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20' : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            3D Aisles
          </button>

          <button
            onClick={() => navigateTo('tracking')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activePage === 'tracking' ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20' : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Drone Track
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? "Audio Effects Active" : "Muted"}
            className="btn-icon text-slate-300 hover:text-cyan-400"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title="Toggle Light/Dark Theme"
            className="btn-icon text-slate-300 hover:text-amber-400"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-400" />}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => navigateTo('wishlist')}
            className="btn-icon relative text-slate-300 hover:text-rose-400"
          >
            <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Drawer Trigger Button */}
          <button
            onClick={() => { playClick(); setIsCartOpen(true); }}
            className="btn-primary py-2 px-3.5 text-xs relative"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            <span className="w-5 h-5 rounded-full bg-slate-950 text-cyan-400 text-xs font-bold flex items-center justify-center border border-cyan-400/50">
              {totalItemCount}
            </span>
          </button>

          {/* Profile / Auth Button */}
          <button
            onClick={() => { playClick(); navigateTo('profile'); }}
            className="flex items-center gap-2 p-1.5 rounded-xl border border-white/10 hover:border-cyan-400/50 transition-all bg-slate-900/50 ml-1"
          >
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-7 h-7 rounded-lg object-cover border border-cyan-400/30"
            />
            <span className="hidden xl:inline text-xs font-semibold text-slate-200">{user.name}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden btn-icon text-slate-300"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass-panel p-4 m-3 border border-cyan-500/30 animate-fadeIn">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => { setIsMobileMenuOpen(false); navigateTo('home'); }}
              className="p-3 rounded-lg text-left text-sm font-semibold text-slate-200 hover:bg-cyan-500/10 flex items-center gap-3"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              Home Page
            </button>
            <button
              onClick={() => { setIsMobileMenuOpen(false); navigateTo('shop'); }}
              className="p-3 rounded-lg text-left text-sm font-semibold text-slate-200 hover:bg-cyan-500/10 flex items-center gap-3"
            >
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
              Product Catalog
            </button>
            <button
              onClick={() => { setIsMobileMenuOpen(false); navigateTo('categories'); }}
              className="p-3 rounded-lg text-left text-sm font-semibold text-slate-200 hover:bg-cyan-500/10 flex items-center gap-3"
            >
              <Navigation className="w-4 h-4 text-cyan-400" />
              3D Aisles & Departments
            </button>
            <button
              onClick={() => { setIsMobileMenuOpen(false); navigateTo('tracking'); }}
              className="p-3 rounded-lg text-left text-sm font-semibold text-slate-200 hover:bg-cyan-500/10 flex items-center gap-3"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Live Drone Tracking
            </button>
            <button
              onClick={() => { setIsMobileMenuOpen(false); navigateTo('wishlist'); }}
              className="p-3 rounded-lg text-left text-sm font-semibold text-slate-200 hover:bg-cyan-500/10 flex items-center gap-3"
            >
              <Heart className="w-4 h-4 text-rose-400" />
              Saved Wishlist ({wishlist.length})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
