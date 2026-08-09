import React, { useState } from 'react';
import { Star, Eye, Plus, Check } from 'lucide-react';

export const ProductCard = ({ product, onAddToCart, onQuickView }) => {
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
      className="glass-card rounded-3xl p-5 relative flex flex-col justify-between group cursor-pointer border border-white/10 hover:border-[#00E5FF]/50 transition-all duration-300 h-full"
    >
      
      {/* Top Tag Badge & Quick View Eye Icon */}
      <div className="flex items-center justify-between z-10 mb-3">
        {product.tag ? (
          <span className="text-[10px] font-bold tracking-wider uppercase bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 px-3 py-1 rounded-full font-space">
            {product.tag}
          </span>
        ) : <div></div>}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="p-2 rounded-full bg-white/5 hover:bg-[#00E5FF]/20 text-slate-300 hover:text-[#00E5FF] transition-all opacity-0 group-hover:opacity-100"
          title="Vista Rápida"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Product Image Container (IVOO High Contrast Light Frame) */}
      <div className="relative h-48 md:h-56 w-full flex items-center justify-center my-2 overflow-hidden rounded-2xl bg-[#F4F5F7] p-4 shadow-inner">
        <img
          src={product.image}
          alt={product.name}
          className="h-full object-contain transform group-hover:scale-110 transition-transform duration-500 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)]"
        />
      </div>

      {/* Rating & Reviews */}
      <div className="flex items-center gap-1.5 mt-3 mb-1">
        <div className="flex text-[#00E5FF]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-[#00E5FF]" />
          ))}
        </div>
        <span className="text-xs font-bold text-white font-space">{product.rating}</span>
        <span className="text-[11px] text-slate-400">({product.reviewsCount})</span>
      </div>

      {/* Product Name */}
      <h3 className="text-base font-bold font-space text-white group-hover:text-[#00E5FF] transition-colors line-clamp-1">
        {product.name}
      </h3>

      {/* Description Snippet */}
      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
        {product.description}
      </p>

      {/* Pricing & Add Button Footer */}
      <div className="flex items-center justify-between mt-5 pt-3 border-t border-white/10">
        <div>
          <div className="text-lg font-extrabold font-space text-white tracking-tight">
            ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          {product.originalPrice && (
            <div className="text-xs text-slate-400 line-through">
              ${product.originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={handleAdd}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
            added 
              ? 'bg-emerald-500 text-black shadow-[0_0_15px_#10B981]' 
              : 'bg-[#00E5FF]/15 border border-[#00E5FF]/40 text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black hover:shadow-[0_0_20px_#00E5FF]'
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              <span>Añadido</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Agregar</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};
