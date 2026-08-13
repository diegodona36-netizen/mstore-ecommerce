import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { SoyTechnoFilterSidebar } from './SoyTechnoFilterSidebar';
import { Sparkles, SlidersHorizontal, Filter, X } from 'lucide-react';

export const ProductCarousel = ({
  products = [],
  activeCategory = 'todos',
  onCategoryChange,
  onAddToCart,
  onQuickView,
  searchQuery = '',
  customCategories = [],
  isLightBg = false
}) => {
  const [selectedBrand, setSelectedBrand] = useState('todas');
  const [selectedColor, setSelectedColor] = useState('todos');
  const [selectedType, setSelectedType] = useState('todos');
  const [sortBy, setSortBy] = useState('destacados');
  const [priceRange, setPriceRange] = useState([1, 2500]);
  const [showMobileFilterModal, setShowMobileFilterModal] = useState(false);

  // Available Brand Tabs
  const brandTabs = [
    { id: 'todas', label: 'Ver Todo el Catálogo' },
    { id: 'apple', label: ' Apple' },
    { id: 'samsung', label: 'Samsung' },
    { id: 'xiaomi', label: 'Xiaomi' },
    { id: 'siragon', label: 'Síragon' }
  ];

  // Category Tabs
  const categoryTabs = [
    { id: 'todos', label: 'Todos los Productos' },
    { id: 'smartphones', label: 'Smartphones' },
    { id: 'linea-blanca', label: 'Línea Blanca' },
    { id: 'audio', label: 'Audio' },
    { id: 'wearables', label: 'Wearables' },
    { id: 'accesorios', label: 'Accesorios' },
    ...customCategories.map(c => ({ id: c.id, label: c.name }))
  ];

  // Filter products by category, brand tab, price range, and search query
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

    // 3. Brand Filter
    if (selectedBrand !== 'todas') {
      if (selectedBrand === 'apple' && !p.name.toLowerCase().includes('apple') && !p.name.toLowerCase().includes('iphone') && !p.name.toLowerCase().includes('airpods') && !p.name.toLowerCase().includes('watch')) return false;
      if (selectedBrand === 'samsung' && !p.name.toLowerCase().includes('samsung') && !p.name.toLowerCase().includes('galaxy')) return false;
      if (selectedBrand === 'xiaomi' && !p.name.toLowerCase().includes('xiaomi') && !p.name.toLowerCase().includes('redmi')) return false;
      if (selectedBrand === 'siragon' && !p.name.toLowerCase().includes('síragon') && !p.name.toLowerCase().includes('siragon')) return false;
    }

    // 4. Price Range Filter
    if (p.price < priceRange[0] || p.price > priceRange[1]) {
      return false;
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
    <section id="catalogo" className="py-6 px-4 md:px-8 max-w-7xl mx-auto space-y-8 scroll-mt-24 font-space">
      
      {/* Header Title */}
      <div className={`flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b ${
        isLightBg ? 'border-slate-200' : 'border-white/10'
      }`}>
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase mb-2 bg-blue-50 text-blue-700 border border-blue-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Catálogo Oficial M Store</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Tecnología & Electrodomésticos
          </h2>
          <p className="text-xs sm:text-sm mt-1 text-slate-600">
            Explora la más alta calidad importada con garantía oficial de 1 año y envío exprés a todo el país.
          </p>
        </div>

        {/* Sort & Mobile Filter Trigger */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowMobileFilterModal(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-sm active:scale-95 transition-all"
          >
            <Filter className="w-4 h-4 text-white" />
            <span>Filtros de Catálogo</span>
          </button>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-700" />
            <span className="text-xs font-extrabold hidden sm:inline text-slate-800">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs rounded-xl px-3 py-2 outline-none font-extrabold transition-all bg-white border-2 border-slate-300 text-slate-900 shadow-sm focus:border-slate-900"
            >
              <option value="destacados">Destacados M Store</option>
              <option value="precio-menor">Precio: Menor a Mayor</option>
              <option value="precio-mayor">Precio: Mayor a Menor</option>
              <option value="valorados">Mejor Valorados ⭐</option>
            </select>
          </div>
        </div>
      </div>

      {/* Brand Selector Tabs */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        {brandTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedBrand(tab.id)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all duration-300 border ${
              selectedBrand === tab.id
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm scale-105'
                : 'bg-white border-2 border-slate-200 text-slate-800 hover:border-slate-400 shadow-sm'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Grid: 2 Columns on Desktop (SoyTechno Sidebar + Product Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* DESKTOP/TABLET SIDEBAR DE FILTROS & MINI SIDEBAR (Lg: col-span-4, Xl: col-span-3) */}
        <div className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-28">
          <SoyTechnoFilterSidebar 
            activeCategory={activeCategory}
            onSelectCategory={onCategoryChange}
            selectedBrand={selectedBrand}
            onSelectBrand={setSelectedBrand}
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
            selectedType={selectedType}
            onSelectType={setSelectedType}
            priceRange={priceRange}
            onPriceChange={(newRange) => setPriceRange(newRange)}
            onApplyFilter={(filters) => {
              if (filters.minPrice !== undefined) setPriceRange([filters.minPrice, filters.maxPrice]);
            }}
            isLightBg={isLightBg}
          />
        </div>

        {/* PRODUCT GRID CONTAINER (Lg: col-span-8, Xl: col-span-9) */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
          
          {filtered.length === 0 ? (
            <div className="rounded-3xl p-12 text-center space-y-3 bg-white border-2 border-slate-200 shadow-sm text-slate-700">
              <p className="text-base font-extrabold text-slate-900">No se encontraron productos con estos criterios de filtro.</p>
              <p className="text-xs font-medium text-slate-500">Prueba ajustando el rango de precio o seleccionando otra marca.</p>
              <button
                onClick={() => {
                  setSelectedBrand('todas');
                  onCategoryChange('todos');
                  setPriceRange([1, 2500]);
                }}
                className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl text-xs font-extrabold inline-block mt-2 shadow-sm uppercase tracking-wider transition-all"
              >
                Restablecer Filtros &rarr;
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onQuickView={onQuickView}
                  isLightBg={isLightBg}
                />
              ))}
            </div>
          )}

        </div>

      </div>

      {/* MOBILE FILTERS MODAL DRAWER */}
      {showMobileFilterModal && (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4 font-space">
          <div onClick={() => setShowMobileFilterModal(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md" />
          <div className="relative z-10 w-full max-w-lg bg-white border border-slate-200 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
              <h3 className="text-base font-extrabold text-slate-900">Filtros de Catálogo M Store</h3>
              <button onClick={() => setShowMobileFilterModal(false)} className="p-2 text-slate-500 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <SoyTechnoFilterSidebar 
              activeCategory={activeCategory}
              onSelectCategory={(catId) => {
                onCategoryChange(catId);
                setShowMobileFilterModal(false);
              }}
              selectedBrand={selectedBrand}
              onSelectBrand={setSelectedBrand}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
              selectedType={selectedType}
              onSelectType={setSelectedType}
              priceRange={priceRange}
              onPriceChange={(newRange) => setPriceRange(newRange)}
              onApplyFilter={() => setShowMobileFilterModal(false)}
              isLightBg={true}
            />
          </div>
        </div>
      )}

    </section>
  );
};
