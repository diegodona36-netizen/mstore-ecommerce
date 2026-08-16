import React, { useState } from 'react';
import { Star, Eye, ShoppingCart, Check, MessageCircle } from 'lucide-react';

export const ProductCard = ({ product, onAddToCart, onQuickView, isLightBg = true }) => {
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWhatsAppQuickBuy = (e) => {
    e.stopPropagation();
    const currentPrice = product.price || 0;
    const msg = `Hola M Store 👋, me interesa comprar el producto: *${product.name}* ($${parseFloat(currentPrice).toFixed(2)} USD). ¿Tienen disponibilidad y delivery?`;
    const whatsappUrl = `https://wa.me/584120000000?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
  };

  const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
  const variantPrices = hasVariants 
    ? product.variants.map(v => parseFloat(v.price) || 0).filter(p => p > 0)
    : [];
  const minPrice = variantPrices.length > 0 ? Math.min(...variantPrices) : (parseFloat(product.price) || 0);
  const maxPrice = variantPrices.length > 0 ? Math.max(...variantPrices) : (parseFloat(product.price) || 0);
  const hasPriceRange = minPrice !== maxPrice && minPrice > 0;

  return (
    <div 
      onClick={() => onQuickView(product)}
      className={`rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-5 relative flex flex-col justify-between group cursor-pointer transition-all duration-300 h-full ${
        isLightBg 
          ? 'bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg text-slate-900' 
          : 'glass-card border border-white/10 hover:border-slate-600 text-white'
      }`}
    >
      
      {/* 1. TOP ROW: BADGES & QUICK VIEW */}
      <div className="flex items-center justify-between gap-1.5 min-h-[24px] mb-2">
        <div className="flex items-center gap-1 flex-wrap">
          {product.hasCashea !== false && (
            <span className="bg-[#FFE600] text-black px-1.5 sm:px-2 py-0.5 rounded-md font-black text-[8px] sm:text-[9px] uppercase tracking-wider border border-amber-400 shadow-2xs shrink-0">
              CASHEA
            </span>
          )}
          {product.tag && (
            <span className="bg-blue-50 border border-blue-200 text-blue-700 font-extrabold text-[8px] sm:text-[9px] uppercase px-1.5 sm:px-2 py-0.5 rounded-md truncate max-w-[90px] sm:max-w-[120px]">
              {product.tag}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className={`p-1 sm:p-1.5 rounded-xl transition-all opacity-0 group-hover:opacity-100 shrink-0 ${
            isLightBg 
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900' 
              : 'bg-white/5 hover:bg-slate-700 text-slate-300 hover:white'
          }`}
          title="Vista Rápida"
        >
          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>

      {/* 2. DEDICATED IMAGE CONTAINER */}
      <div className="w-full rounded-xl sm:rounded-2xl bg-[#F8FAFC] p-3 sm:p-4 flex items-center justify-center h-32 sm:h-44 md:h-48 border border-slate-100 mb-3 overflow-hidden">
        <img
          src={product.image || product.img}
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 filter drop-shadow-sm"
          loading="lazy"
        />
      </div>

      {/* 3. PRODUCT INFO */}
      <div className="flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
        <div className="space-y-1">
          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
            <span className={`text-[10px] sm:text-xs font-bold font-inter ${isLightBg ? 'text-slate-900' : 'text-white'}`}>
              {product.rating || '5.0'}
            </span>
            <span className={`text-[10px] sm:text-[11px] font-inter ${isLightBg ? 'text-slate-500' : 'text-slate-400'}`}>
              ({product.reviewsCount || 128})
            </span>
          </div>

          {/* Title */}
          <h3 className={`text-xs sm:text-sm font-extrabold font-space line-clamp-2 min-h-[32px] sm:min-h-[38px] group-hover:text-blue-600 transition-colors ${
            isLightBg ? 'text-slate-900' : 'text-white'
          }`}>
            {product.name}
          </h3>
        </div>

        {/* Price & Dual Actions */}
        <div className="pt-2 border-t border-slate-200 flex flex-col space-y-2 mt-auto">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-[9px] sm:text-[10px] text-slate-500 font-inter uppercase tracking-wider font-bold">Precio</div>
              <div className="flex items-baseline gap-1">
                <span className={`text-sm sm:text-lg font-black font-inter tracking-tight ${isLightBg ? 'text-slate-900' : 'text-white'}`}>
                  {hasPriceRange 
                    ? `$${minPrice.toFixed(0)} - $${maxPrice.toFixed(0)}`
                    : `$${minPrice.toFixed(2)}`
                  }
                </span>
                <span className="text-[9px] sm:text-xs font-extrabold text-slate-700 font-inter">USD</span>
              </div>
            </div>

            {product.oldPrice && (
              <span className="text-[10px] sm:text-xs text-slate-400 line-through font-inter">
                ${product.oldPrice}
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={handleWhatsAppQuickBuy}
              className="p-2 sm:px-3 sm:py-2 rounded-xl font-extrabold text-[11px] sm:text-xs transition-all flex items-center justify-center gap-1 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 hover:border-emerald-600 shadow-2xs active:scale-95 shrink-0"
              title="Comprar por WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={handleAdd}
              className={`flex-1 py-2 sm:py-2 px-2.5 rounded-xl font-bold text-[11px] sm:text-xs transition-all transform active:scale-95 flex items-center justify-center gap-1 min-h-[36px] ${
                added 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
              }`}
              title="Agregar al Carrito"
            >
              {added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              <span>{added ? 'Agregado' : 'Agregar'}</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
