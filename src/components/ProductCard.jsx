import React, { useState } from 'react';
import { Star, Eye, ShoppingCart, Check } from 'lucide-react';

export const ProductCard = ({ product, onAddToCart, onQuickView, isLightBg = true }) => {
  const [added, setAdded] = useState(false);
  const [imgSrc, setImgSrc] = useState(product?.image || product?.img || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80');

  if (!product) return null;

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  // Calculate discount percentage if old price exists
  const oldPriceVal = Number(product.originalPrice || product.oldPrice || 0);
  const currentPriceVal = Number(product.price || 0);
  const discountPercent = oldPriceVal > currentPriceVal 
    ? Math.round(((oldPriceVal - currentPriceVal) / oldPriceVal) * 100)
    : null;

  const stockCount = product.stock || (product.inStock !== false ? 3 : 0);

  return (
    <div 
      onClick={() => onQuickView(product)}
      className={`rounded-3xl p-4 sm:p-5 relative flex flex-col justify-between group cursor-pointer transition-all duration-300 h-full ${
        isLightBg 
          ? 'bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xl text-slate-900 shadow-sm' 
          : 'glass-card border border-white/10 hover:border-slate-600 text-white'
      }`}
    >
      
      {/* 1. TOP BADGES & QUICK VIEW BUTTON */}
      <div className="flex items-center justify-between gap-2 mb-3 min-h-[28px]">
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Discount Badge */}
          {discountPercent ? (
            <span className="bg-black text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
              -{discountPercent}% OFF
            </span>
          ) : product.tag ? (
            <span className="bg-black text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
              {product.tag}
            </span>
          ) : null}

          {/* Cashea Badge */}
          {product.hasCashea !== false && (
            <span className="bg-[#FFE600] text-black text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-300 shadow-xs uppercase tracking-wider">
              CASHEA
            </span>
          )}
        </div>

        {/* Quick View Eye Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className={`p-1.5 rounded-full transition-all opacity-0 group-hover:opacity-100 ${
            isLightBg 
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900' 
              : 'bg-white/10 hover:bg-slate-700 text-slate-300 hover:text-white'
          }`}
          title="Vista Rápida"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* 2. PRODUCT IMAGE CONTAINER */}
      <div className="relative h-44 sm:h-52 w-full flex items-center justify-center my-1 overflow-hidden rounded-2xl bg-[#F8FAFC] p-3 shadow-inner border border-slate-100">
        <img
          src={imgSrc}
          alt={product.name}
          onError={() => setImgSrc('https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80')}
          className="h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-500 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
          loading="lazy"
        />
      </div>

      {/* 3. RATING & REVIEWS */}
      <div className="flex items-center gap-1.5 mt-3 mb-1">
        <div className="flex text-amber-500">
          <Star className="w-3.5 h-3.5 fill-current" />
        </div>
        <span className={`text-xs font-bold font-sans ${isLightBg ? 'text-slate-900' : 'text-slate-200'}`}>
          {product.rating || '5.0'}
        </span>
        <span className={`text-[11px] font-sans ${isLightBg ? 'text-slate-500' : 'text-slate-400'}`}>
          ({product.reviewsCount || 38})
        </span>
      </div>

      {/* 4. TITLE */}
      <h3 className={`text-sm font-extrabold font-sans line-clamp-2 min-h-[40px] group-hover:text-blue-600 transition-colors leading-snug ${
        isLightBg ? 'text-slate-900' : 'text-white'
      }`}>
        {product.name}
      </h3>

      {/* 5. STOCK & URGENCY PROGRESS BAR */}
      <div className="mt-2.5 space-y-1">
        <div className="flex items-center justify-between text-[10px] font-bold">
          <span className="text-emerald-700 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            ¡Quedan {stockCount} unid.!
          </span>
          <span className="text-slate-500 font-medium">En oferta</span>
        </div>
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-600 via-sky-400 to-emerald-400 h-full rounded-full transition-all duration-500" 
            style={{ width: `${Math.min(100, Math.max(25, (stockCount / 10) * 100))}%` }}
          ></div>
        </div>
      </div>

      {/* 6. PRICE & ACTION BUTTON */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <div>
          <div className="flex items-baseline gap-1">
            <span className={`text-base sm:text-lg font-black font-sans tracking-tight ${isLightBg ? 'text-slate-900' : 'text-white'}`}>
              ${currentPriceVal.toFixed ? currentPriceVal.toFixed(2) : currentPriceVal}
            </span>
            <span className="text-[10px] font-extrabold text-slate-600 font-sans">USD</span>
          </div>
          {oldPriceVal > 0 && (
            <span className="text-xs text-slate-400 line-through font-sans block -mt-0.5">
              ${oldPriceVal.toFixed ? oldPriceVal.toFixed(2) : oldPriceVal}
            </span>
          )}
        </div>

        <button
          onClick={handleAdd}
          className={`py-2 px-3.5 rounded-xl font-bold font-sans text-xs transition-all transform active:scale-95 flex items-center justify-center gap-1.5 min-h-[38px] shadow-sm ${
            added 
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
          title="Comprar Producto"
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              <span>Listo</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>Comprar</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};

