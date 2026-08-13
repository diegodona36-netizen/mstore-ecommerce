import React, { useState } from 'react';
import { Star, ShoppingCart, Eye, ChevronRight, Check, Sparkles, Flame, Zap } from 'lucide-react';

export const CategoryShowcaseCard = ({ 
  product, 
  onAddToCart, 
  onQuickView 
}) => {
  const [added, setAdded] = useState(false);

  if (!product) return null;

  // Handle variants and dynamic prices
  const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
  const variantPrices = hasVariants 
    ? product.variants.map(v => parseFloat(v.price) || 0).filter(p => p > 0)
    : [];
  
  const minPrice = variantPrices.length > 0 ? Math.min(...variantPrices) : (parseFloat(product.price) || 0);
  const maxPrice = variantPrices.length > 0 ? Math.max(...variantPrices) : (parseFloat(product.price) || 0);
  const hasPriceRange = minPrice !== maxPrice && minPrice > 0;

  const handleCardClick = () => {
    if (onQuickView) onQuickView(product);
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart && onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative bg-white rounded-3xl p-4 border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl flex flex-col justify-between h-full cursor-pointer select-none"
    >
      {/* Top Image Container */}
      <div className="relative w-full rounded-2xl bg-[#F8FAFC] p-3 overflow-hidden flex items-center justify-center h-44 sm:h-48 border border-slate-100 mb-3">
        
        {/* Badges: Cashea & Tag */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
          {product.hasCashea !== false && (
            <span className="bg-[#FFE600] text-black font-black text-[9px] uppercase px-2 py-0.5 rounded-md border border-amber-400 shadow-2xs">
              CASHEA
            </span>
          )}
          {product.tag && (
            <span className="bg-blue-50 border border-blue-200 text-blue-700 font-extrabold text-[9px] uppercase px-2 py-0.5 rounded-md">
              {product.tag}
            </span>
          )}
        </div>

        {/* Quick View Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onQuickView && onQuickView(product);
          }}
          className="absolute top-2.5 right-2.5 z-10 p-2 rounded-xl bg-white text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm border border-slate-200 opacity-0 group-hover:opacity-100"
          title="Vista Rápida"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Product Image */}
        <img
          src={product.image || product.img}
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 filter drop-shadow-sm"
          loading="lazy"
        />
      </div>

      {/* Product Information */}
      <div className="space-y-3 flex flex-col justify-between flex-grow">
        <div className="space-y-1.5">
          {/* Rating */}
          <div className="flex items-center gap-1 text-amber-500 text-[11px] font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{product.rating || '5.0'}</span>
            <span className="text-slate-400 font-normal">({product.reviewsCount || 52})</span>
          </div>

          {/* Product Name */}
          <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug line-clamp-2 min-h-[38px] group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Price & Action Button */}
        <div className="pt-2.5 border-t border-slate-100 mt-auto space-y-2.5">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Precio</div>
              <div className="flex items-baseline gap-1">
                <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  {hasPriceRange 
                    ? `$${minPrice.toFixed(0)} - $${maxPrice.toFixed(0)}`
                    : `$${minPrice.toFixed(2)}`
                  }
                </span>
                <span className="text-[10px] font-extrabold text-slate-600">USD</span>
              </div>
            </div>

            {product.oldPrice && (
              <span className="text-xs text-slate-400 line-through">
                ${product.oldPrice}
              </span>
            )}
          </div>

          {/* Add to cart CTA */}
          <button
            type="button"
            onClick={handleAdd}
            className={`w-full py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm min-h-[42px] active:scale-95 ${
              added 
                ? 'bg-emerald-600 text-white' 
                : 'bg-slate-900 hover:bg-black text-white'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Agregado</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Añadir al Carrito</span>
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
};

export const CategoryShowcaseSection = ({ 
  title = 'Categoría', 
  subtitle = 'Los mejores modelos seleccionados con entrega inmediata',
  categoryFilterId = 'smartphones', 
  products = [], 
  onSelectCategory, 
  onAddToCart, 
  onQuickView 
}) => {
  const safeProducts = Array.isArray(products) ? products : [];

  const categoryProducts = safeProducts.filter(p => {
    if (categoryFilterId === 'todos') return true;
    return p.category === categoryFilterId || (p.category && p.category.includes(categoryFilterId));
  }).slice(0, 4);

  if (categoryProducts.length === 0) return null;

  return (
    <section className="space-y-5 font-sans">
      
      {/* Category Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {title}
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onSelectCategory && onSelectCategory(categoryFilterId)}
          className="inline-flex items-center gap-1 text-xs font-black text-blue-600 hover:text-blue-700 transition-colors group self-start sm:self-auto"
        >
          <span>Ver todos los modelos</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {categoryProducts.map((product) => (
          <CategoryShowcaseCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
          />
        ))}
      </div>

    </section>
  );
};
