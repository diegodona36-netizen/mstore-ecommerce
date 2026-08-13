import React, { useState } from 'react';
import { Star, Eye, Plus, Check } from 'lucide-react';

export const ProductCard = ({ product, onAddToCart, onQuickView, isLightBg = true }) => {
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div 
      onClick={() => onQuickView(product)}
      className={`rounded-3xl p-5 relative flex flex-col justify-between group cursor-pointer transition-all duration-300 h-full ${
        isLightBg 
          ? 'bg-white border-2 border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md text-slate-900' 
          : 'glass-card border border-white/10 hover:border-slate-600 text-white'
      }`}
    >
      
      {/* 1. TOP ROW: BADGES & QUICK VIEW (OUTSIDE IMAGE) */}
      <div className="flex items-center justify-between gap-2 min-h-[28px] mb-2.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          {product.hasCashea !== false && (
            <span className="bg-[#FFE600] text-black px-2 py-0.5 rounded-md font-black text-[9px] uppercase tracking-wider border border-amber-400 shadow-2xs shrink-0">
              CASHEA
            </span>
          )}
          {product.tag && (
            <span className="bg-blue-50 border border-blue-200 text-blue-700 font-extrabold text-[9px] uppercase px-2 py-0.5 rounded-md truncate max-w-[120px]">
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
          className={`p-1.5 rounded-xl transition-all opacity-0 group-hover:opacity-100 shrink-0 ${
            isLightBg 
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900' 
              : 'bg-white/5 hover:bg-slate-700 text-slate-300 hover:text-white'
          }`}
          title="Vista Rápida"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* 2. PRODUCT IMAGE CONTAINER (100% UNOBSTRUCTED) */}
      <div className="relative h-48 md:h-52 w-full flex items-center justify-center mb-3 overflow-hidden rounded-2xl bg-[#F8FAFC] p-4 border border-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-500 filter drop-shadow-sm"
        />
      </div>

      {/* 3. PRODUCT DETAILS */}
      <div className="flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Rating & Reviews */}
          <div className="flex items-center gap-1.5">
            <div className="flex text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className={`text-xs font-bold font-space ${isLightBg ? 'text-slate-900' : 'text-slate-200'}`}>
              {product.rating || '5.0'}
            </span>
            <span className={`text-[11px] font-inter ${isLightBg ? 'text-slate-500' : 'text-slate-400'}`}>
              ({product.reviewsCount || 128})
            </span>
          </div>

          {/* Title */}
          <h3 className={`text-sm font-extrabold font-space line-clamp-2 min-h-[40px] group-hover:text-blue-600 transition-colors ${
            isLightBg ? 'text-slate-900' : 'text-white'
          }`}>
            {product.name}
          </h3>
        </div>

        {/* Price & Add to Cart Button */}
        <div className="pt-2.5 border-t border-slate-200 flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="text-[10px] text-slate-500 font-inter uppercase tracking-wider font-bold">Precio</div>
            <div className="flex items-baseline gap-1">
              <span className={`text-lg font-black font-inter tracking-tight ${isLightBg ? 'text-slate-900' : 'text-white'}`}>
                ${product.price ? (product.price.toFixed ? product.price.toFixed(2) : product.price) : '0.00'}
              </span>
              <span className="text-xs font-extrabold text-slate-700 font-inter">USD</span>
            </div>
            {product.oldPrice && (
              <span className="text-xs text-slate-400 line-through font-inter">
                ${product.oldPrice}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`p-3 rounded-2xl font-bold transition-all transform active:scale-95 flex items-center justify-center min-h-[44px] min-w-[44px] ${
              added 
                ? 'bg-emerald-600 text-white shadow-sm' 
                : 'bg-black hover:bg-neutral-900 text-white shadow-sm'
            }`}
            title="Agregar al Carrito"
          >
            {added ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          </button>
        </div>
      </div>

    </div>
  );
};
