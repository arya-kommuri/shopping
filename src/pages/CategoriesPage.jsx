import React from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from '../components/ProductCard';
import { Supermarket3D } from '../canvas/Supermarket3D';
import { Navigation, Box, Sparkles, Compass } from 'lucide-react';

export const CategoriesPage = () => {
  const { PRODUCTS, activeCategory, setActiveCategory } = useShop();

  const currentCategory = CATEGORIES.find(c => c.id === activeCategory) || CATEGORIES[0];
  const departmentProducts = PRODUCTS.filter(p => p.category === currentCategory.id);

  return (
    <div className="container-custom py-8 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="badge badge-cyan text-xs font-mono uppercase">Virtual Supermarket Floor Map</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">3D Aisle & Department Tour</h1>
        <p className="text-sm text-slate-400">Click any department teleport button to glide the camera to that aisle.</p>
      </div>

      {/* 3D Viewport & Teleport Control Bar */}
      <div className="space-y-4">
        
        {/* Department Teleport Quick Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold font-tech whitespace-nowrap transition-all flex items-center gap-2 border ${
                activeCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/80 text-slate-300 border-white/10 hover:border-cyan-400/50 hover:text-white'
              }`}
            >
              <Box className="w-4 h-4" style={{ color: activeCategory === cat.id ? '#040814' : cat.color }} />
              {cat.name}
            </button>
          ))}
        </div>

        {/* 3D Canvas Floor Viewport */}
        <div className="h-[450px] w-full relative">
          <Supermarket3D
            selectedCategory={activeCategory}
            onSelectCategory={(id) => setActiveCategory(id)}
          />
        </div>

      </div>

      {/* Selected Department Overview & Items */}
      <div className="space-y-6">
        <div className="glass-panel p-6 border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center border shadow-xl"
              style={{ backgroundColor: `${currentCategory.color}25`, borderColor: currentCategory.color }}
            >
              <Box className="w-7 h-7" style={{ color: currentCategory.color }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-white font-heading">{currentCategory.name} Aisle</h2>
                <span className="badge badge-cyan text-xs">{currentCategory.badge}</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">{currentCategory.description}</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono text-cyan-400 font-bold">Aisle Coordinates: [{currentCategory.coordinates.x}, {currentCategory.coordinates.z}]</span>
          </div>
        </div>

        {/* Aisle Inventory Products */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" /> Aisle Inventory ({departmentProducts.length} items)
          </h3>

          <div className="grid-products">
            {departmentProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
