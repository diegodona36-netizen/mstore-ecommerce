import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { Sparkles, SlidersHorizontal, Layers, Check } from 'lucide-react';

export const ProductCarousel = ({
  products = [],
  activeCategory = 'todos',
  onCategoryChange,
  onAddToCart,
  onQuickView,
  searchQuery = '',
  customCategories = []
}) => {
  const [selectedBrand, setSelectedBrand] = useState('todas');
  const [sortBy, setSortBy] = useState('destacados');

  // Available Brand Tabs (as requested by user: Apple, Samsung, Xiaomi, Línea Blanca)
  const brandTabs = [
    { id: 'todas', label: 'Ver Todo el Catálogo' },
    { id: 'apple', label: ' Apple' },
    { id: 'samsung', label: 'Samsung' },
    { id: 'xiaomi', label: 'Xiaomi' },
    { id: 'linea-blanca', label: 'Línea Blanca & Smart TV' }
  ];

  // Category Tabs
  const categoryTabs = [
    { id: 'todos', label: 'Todos' },
    { id: 'smartphones', label: 'Smartphones' },
    { id: 'linea-blanca', label: 'Línea Blanca' },
    { id: 'audio', label: 'Audio' },
    { id: 'wearables', label: 'Wearables' },
    { id: 'accesorios', label: 'Accesorios' },
    ...customCategories.map(c => ({ id: c.id, label: c.name }))
  ];

  // Filter products by category, brand tab, and search query
  let filtered = products.filter(p => {
    // 1. Search Query Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      const matchSub = p.subcategory && p.subcategory.toLowerCase().includes(q);
      if (!matchName && !matchCat && !matchSub) return false;
    }

    // 2. Main Category Filter
    if (activeCategory !== 'todos' && p.category !== activeCategory) {
      return false;
    }

    // 3. Brand / Special Tab Filter
    if (selectedBrand !== 'todas') {
      if (selectedBrand === 'apple') {
        return p.name.toLowerCase().includes('apple') || p.name.toLowerCase().includes('iphone') || p.name.toLowerCase().includes('airpods') || p.name.toLowerCase().includes('watch');
      }
      if (selectedBrand === 'samsung') {
        return p.name.toLowerCase().includes('samsung') || p.name.toLowerCase().includes('galaxy');
      }
      if (selectedBrand === 'xiaomi') {
        return p.name.toLowerCase().includes('xiaomi') || p.name.toLowerCase().includes('redmi');
      }
      if (selectedBrand === 'linea-blanca') {
        return p.category === 'linea-blanca' || p.name.toLowerCase().includes('tv') || p.name.toLowerCase().includes('neveras') || p.name.toLowerCase().includes('lavadoras');
      }
    }

    return true;
  });

  // Sort logic
  if (sortBy === 'precio-menor') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'precio-mayor') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'valorados') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return (
    <section id="catalogo" className="py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-8 scroll-mt-24">
      
      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] text-xs font-bold font-space uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Catálogo Oficial IVOO Style</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-space text-white tracking-tight">
            Catálogo de <span className="text-[#00E5FF]">Tecnología & Electrodomésticos</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-inter mt-1">
            Explora la más alta calidad importada con garantía oficial de 1 año y envío exprés.
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <SlidersHorizontal className="w-4 h-4 text-[#00E5FF]" />
          <span className="text-xs text-slate-400 font-space font-bold">Ordenar por:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#141824] border border-white/15 focus:border-[#00E5FF] text-white text-xs rounded-xl px-3 py-2 outline-none font-space font-semibold"
          >
            <option value="destacados">Destacados IVOO</option>
            <option value="precio-menor">Precio: Menor a Mayor</option>
            <option value="precio-mayor">Precio: Mayor a Menor</option>
            <option value="valorados">Mejor Valorados ⭐</option>
          </select>
        </div>
      </div>

      {/* Brand Selector Tabs (As requested by user: Apple, Samsung, Xiaomi, Línea Blanca) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {brandTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedBrand(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold font-space whitespace-nowrap transition-all duration-300 border ${
              selectedBrand === tab.id
                ? 'bg-[#00E5FF] text-black border-[#00E5FF] shadow-[0_0_20px_#00E5FF]'
                : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categoryTabs.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold font-space whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/50'
                : 'bg-white/[0.02] border border-white/5 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center text-slate-400 space-y-3">
          <p className="text-base font-space font-bold text-white">No se encontraron productos con estos criterios.</p>
          <p className="text-xs">Prueba seleccionando otra marca o limpiando la búsqueda.</p>
          <button
            onClick={() => {
              setSelectedBrand('todas');
              onCategoryChange('todos');
            }}
            className="btn-cyan-glow px-4 py-2 rounded-xl text-xs font-bold font-space text-black inline-block mt-2"
          >
            Ver Todo el Catálogo &rarr;
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      )}

    </section>
  );
};
