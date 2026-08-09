import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from '../components/ProductCard';
import { 
  Filter, Search, SlidersHorizontal, Grid, List, 
  Box, Star, RotateCcw, Sparkles 
} from 'lucide-react';

export const ShopPage = () => {
  const { PRODUCTS, activeCategory, setActiveCategory, navigateTo } = useShop();

  const [selectedCat, setSelectedCat] = useState(activeCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(1500);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Filtering logic
  const filteredProducts = PRODUCTS.filter(p => {
    if (selectedCat !== 'all' && p.category !== selectedCat) return false;
    if (p.price > maxPrice) return false;
    if (p.rating < minRating) return false;
    if (searchQuery.trim() && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'discount') return b.discount - a.discount;
    return 0;
  });

  const resetFilters = () => {
    setSelectedCat('all');
    setSearchQuery('');
    setMaxPrice(1500);
    setMinRating(0);
    setSortBy('featured');
  };

  return (
    <div className="container-custom py-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="badge badge-cyan text-xs font-mono uppercase">Full Cyber Catalog</span>
          <h1 className="text-3xl font-extrabold text-white font-heading mt-1">3D Product Supermarket</h1>
          <p className="text-xs text-slate-400 mt-1">Showing {sortedProducts.length} of {PRODUCTS.length} 3D items</p>
        </div>

        {/* View Mode & Reset Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={resetFilters}
            className="btn-secondary py-2 px-3 text-xs flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
          </button>

          <div className="flex items-center bg-slate-900 border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg text-xs ${viewMode === 'grid' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg text-xs ${viewMode === 'list' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar Filters */}
        <div className="lg:col-span-3 space-y-6">
          <div className="glass-panel p-5 space-y-6 border border-white/10 sticky top-24">
            
            <div className="flex items-center justify-between font-bold text-white border-b border-white/10 pb-3">
              <span className="flex items-center gap-2 text-sm font-heading">
                <Filter className="w-4 h-4 text-cyan-400" /> Filter Inventory
              </span>
            </div>

            {/* Search Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Keyword Search</label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter name..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="input-glass pl-9 text-xs py-2"
                />
              </div>
            </div>

            {/* Categories Selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Department</label>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCat('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    selectedCat === 'all' ? 'bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/40' : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  All Departments ({PRODUCTS.length})
                </button>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCat(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${
                      selectedCat === cat.id ? 'bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/40' : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {PRODUCTS.filter(p => p.category === cat.id).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Max Price:</span>
                <span className="font-bold text-cyan-400 font-mono">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="10"
                max="1500"
                step="10"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Rating Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Minimum Rating</label>
              <div className="grid grid-cols-3 gap-2">
                {[0, 4.5, 4.8].map(stars => (
                  <button
                    key={stars}
                    onClick={() => setMinRating(stars)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all flex items-center justify-center gap-1 ${
                      minRating === stars
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/50'
                        : 'bg-slate-900 text-slate-400 border-white/10 hover:text-white'
                    }`}
                  >
                    {stars === 0 ? 'All' : `${stars}+ ★`}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right Catalog Viewport */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Sorting Bar */}
          <div className="glass-panel p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10 text-xs">
            <div className="flex items-center gap-2 text-slate-300 font-semibold">
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
              <span>Sort Products By:</span>
            </div>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-slate-900 border border-white/10 text-white text-xs px-4 py-2 rounded-xl focus:outline-none focus:border-cyan-400"
            >
              <option value="featured">Featured Inventory</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>

          {/* Product Grid / List Display */}
          {sortedProducts.length === 0 ? (
            <div className="glass-panel p-12 text-center space-y-4 text-slate-400">
              <Box className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">No Matching Products Found</h3>
              <p className="text-xs text-slate-400">Try adjusting your category filter, price slider, or search keywords.</p>
              <button onClick={resetFilters} className="btn-primary py-2 px-4 text-xs">
                Clear Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid-products">
              {sortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedProducts.map(product => (
                <div 
                  key={product.id}
                  onClick={() => navigateTo('product-detail', product.id)}
                  className="glass-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-cyan-400/50 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center font-bold font-mono text-xs border border-white/10"
                      style={{ backgroundColor: `${product.color}25`, color: product.color }}
                    >
                      3D
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">{product.name}</h4>
                      <p className="text-xs text-slate-400 line-clamp-1">{product.description}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="font-bold">{product.rating}</span>
                        <span className="text-slate-500">({product.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <div className="text-lg font-extrabold text-cyan-400 font-mono">${product.price.toFixed(2)}</div>
                      {product.originalPrice > product.price && (
                        <div className="text-xs text-slate-500 line-through font-mono">${product.originalPrice.toFixed(2)}</div>
                      )}
                    </div>
                    <button className="btn-primary py-2 px-4 text-xs">View 3D</button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
