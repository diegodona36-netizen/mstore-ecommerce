import React, { useState } from 'react';
import { 
  Star, 
  ShoppingCart, 
  Eye, 
  ChevronRight, 
  Check, 
  MessageCircle,
  Smartphone,
  Laptop,
  Headphones,
  Gamepad2,
  Tv,
  Watch,
  Layers
} from 'lucide-react';

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

  const handleWhatsAppQuickBuy = (e) => {
    e.stopPropagation();
    const currentPrice = minPrice || product.price || 0;
    const msg = `Hola M Store 👋, me interesa comprar el producto: *${product.name}* ($${currentPrice.toFixed(2)} USD). ¿Tienen disponibilidad y delivery?`;
    const whatsappUrl = `https://wa.me/584120000000?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl flex flex-col justify-between h-full cursor-pointer select-none"
    >
      {/* 1. TOP DEDICATED BADGES & ACTIONS ROW */}
      <div className="flex items-center justify-between gap-1.5 min-h-[24px] mb-2">
        <div className="flex items-center gap-1 flex-wrap">
          {product.hasCashea !== false && (
            <span className="bg-[#FFE600] text-black font-black text-[8px] sm:text-[9px] uppercase px-1.5 sm:px-2 py-0.5 rounded-md border border-amber-400 shadow-2xs shrink-0">
              CASHEA
            </span>
          )}
          {product.tag && (
            <span className="bg-blue-50 border border-blue-200 text-blue-700 font-extrabold text-[8px] sm:text-[9px] uppercase px-1.5 sm:px-2 py-0.5 rounded-md truncate max-w-[90px] sm:max-w-[120px]">
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
          className="p-1 sm:p-1.5 rounded-lg sm:rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all opacity-0 group-hover:opacity-100 shrink-0"
          title="Vista Rápida"
        >
          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>

      {/* 2. DEDICATED CLEAN IMAGE CONTAINER */}
      <div className="w-full rounded-xl sm:rounded-2xl bg-[#F8FAFC] p-2.5 sm:p-4 flex items-center justify-center h-32 sm:h-44 md:h-48 border border-slate-100 mb-2.5 sm:mb-3 overflow-hidden">
        <img
          src={product.image || product.img}
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 filter drop-shadow-sm"
          loading="lazy"
        />
      </div>

      {/* 3. PRODUCT INFORMATION */}
      <div className="space-y-2 sm:space-y-3 flex flex-col justify-between flex-grow">
        <div className="space-y-1">
          {/* Rating */}
          <div className="flex items-center gap-1 text-amber-500 text-[10px] sm:text-[11px] font-bold">
            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400" />
            <span>{product.rating || '5.0'}</span>
            <span className="text-slate-400 font-normal">({product.reviewsCount || 52})</span>
          </div>

          {/* Product Name */}
          <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug line-clamp-2 min-h-[32px] sm:min-h-[38px] group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Price & Dual Action Buttons */}
        <div className="pt-2 border-t border-slate-100 mt-auto space-y-2">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-bold tracking-wider">Precio</div>
              <div className="flex items-baseline gap-1">
                <span className="text-sm sm:text-lg font-black text-slate-900 tracking-tight">
                  {hasPriceRange 
                    ? `$${minPrice.toFixed(0)} - $${maxPrice.toFixed(0)}`
                    : `$${minPrice.toFixed(2)}`
                  }
                </span>
                <span className="text-[9px] sm:text-[10px] font-extrabold text-slate-600">USD</span>
              </div>
            </div>

            {product.oldPrice && (
              <span className="text-[10px] sm:text-xs text-slate-400 line-through">
                ${product.oldPrice}
              </span>
            )}
          </div>

          {/* Dual CTAs: WhatsApp + Add to Cart */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={handleWhatsAppQuickBuy}
              className="p-2 sm:px-3 sm:py-2 rounded-xl font-extrabold text-[11px] sm:text-xs transition-all flex items-center justify-center gap-1 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 hover:border-emerald-600 shadow-2xs active:scale-95 shrink-0"
              title="Comprar rápido por WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={handleAdd}
              className={`flex-1 py-2 sm:py-2.5 px-2.5 rounded-xl font-extrabold text-[11px] sm:text-xs transition-all flex items-center justify-center gap-1 shadow-sm min-h-[36px] sm:min-h-[40px] active:scale-95 ${
                added 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>¡Listo!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Agregar</span>
                </>
              )}
            </button>
          </div>
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
  }).slice(0, 8);

  if (categoryProducts.length === 0) return null;

  const categoryIcons = {
    'smartphones': Smartphone,
    'computacion': Laptop,
    'audio': Headphones,
    'gaming': Gamepad2,
    'linea-blanca': Tv,
    'wearables': Watch
  };

  const CategoryIcon = categoryIcons[categoryFilterId] || Layers;

  return (
    <section className="bg-white rounded-3xl p-5 sm:p-7 md:p-8 border border-slate-200/90 shadow-sm space-y-5 sm:space-y-6 font-sans">
      
      {/* Category Section Header with Iconic Identification */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 sm:p-3 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100/80 shrink-0">
            <CategoryIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
              {title}
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
              {subtitle}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSelectCategory && onSelectCategory(categoryFilterId)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-black text-blue-600 hover:text-blue-700 border border-slate-200/80 hover:border-blue-200 transition-all group self-start sm:self-auto shrink-0 shadow-2xs"
        >
          <span>Ver catálogo completo</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Products Grid: 2 Columns on Mobile, 3 on Tablet, 4 on Desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
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
