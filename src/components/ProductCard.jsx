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
      
      {/* Top Tag Badge & Quick View Eye Icon */}
      <div className="flex items-center justify-between z-10 mb-3">
        {product.tag ? (
          <span className={`text-[10px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full font-space ${
            isLightBg 
              ? 'bg-slate-100 text-slate-800' 
              : 'bg-neutral-900 text-slate-200'
          }`}>
            {product.tag}
          </span>
        ) : <div></div>}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className={`p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 ${
            isLightBg 
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900' 
              : 'bg-white/5 hover:bg-slate-700 text-slate-300 hover:text-white'
          }`}
          title="Vista Rápida"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Product Image Container */}
      <div className="relative h-48 md:h-56 w-full flex items-center justify-center my-2 overflow-hidden rounded-2xl bg-[#F8FAFC] p-4 shadow-inner border border-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full object-contain transform group-hover:scale-110 transition-transform duration-500 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.1)]"
        />
      </div>

      {/* Rating & Reviews */}
      <div className="flex items-center gap-1.5 mt-3 mb-1">
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
      <h3 className={`text-sm font-extrabold font-space line-clamp-2 min-h-[40px] group-hover:text-slate-600 transition-colors ${
        isLightBg ? 'text-slate-900' : 'text-white'
      }`}>
        {product.name}
      </h3>

      {/* Price & Add to Cart Button */}
      <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
        <div>
          <div className="text-[10px] text-slate-500 font-inter uppercase tracking-wider font-bold">Precio M Store</div>
          <div className="flex items-baseline gap-1">
            <span className={`text-lg font-black font-inter tracking-tight ${isLightBg ? 'text-slate-900' : 'text-white'}`}>
              ${product.price ? (product.price.toFixed ? product.price.toFixed(2) : product.price) : '0.00'}
            </span>
            <span className="text-xs font-extrabold text-slate-900 font-inter">USD</span>
          </div>
          {product.oldPrice && (
            <span className="text-xs text-slate-400 line-through font-inter">
              ${product.oldPrice}
            </span>
          )}
        </div>

        <button
          onClick={handleAdd}
          className={`p-3 rounded-2xl font-bold transition-all transform active:scale-95 flex items-center justify-center ${
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
  );
};
