import React from 'react';
import { Star, ShoppingBag, Eye, Heart, ChevronRight } from 'lucide-react';

export const CategoryShowcaseCard = ({ 
  product, 
  onAddToCart, 
  onQuickView, 
  isWishlisted = false, 
  onToggleWishlist,
  isLightBg = true
}) => {
  if (!product) return null;

  const formattedPrice = Number(product.price || 0).toLocaleString('en-US');
  const formattedOriginalPrice = product.originalPrice 
    ? Number(product.originalPrice).toLocaleString('en-US') 
    : null;

  const handleCardClick = () => {
    if (onQuickView) onQuickView(product);
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`group relative rounded-2xl p-3.5 border transition-all duration-300 flex flex-col justify-between h-full cursor-pointer select-none ${
        isLightBg 
          ? 'bg-white border-slate-200/90 shadow-sm hover:border-[#00E5FF] hover:shadow-[0_8px_25px_rgba(0,229,255,0.18)] text-slate-900' 
          : 'bg-[#0D131F] border-white/10 hover:border-[#00E5FF]/60 hover:shadow-[0_0_30px_rgba(0,229,255,0.2)] text-white'
      }`}
    >
      
      {/* Top Badges & Wishlist Heart */}
      <div className={`relative w-full rounded-xl p-2 overflow-hidden flex items-center justify-center h-36 sm:h-40 border ${
        isLightBg ? 'bg-slate-50 border-slate-100' : 'bg-[#0A0908] border-white/5'
      }`}>
        
        {/* Wishlist Heart Top-Left */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist && onToggleWishlist(product.id);
          }}
          className={`absolute top-2 left-2 z-10 p-2 rounded-full backdrop-blur-md transition-all ${
            isWishlisted 
              ? 'bg-rose-500 text-white shadow-[0_0_12px_#f43f5e]' 
              : isLightBg 
                ? 'bg-white/80 text-slate-400 hover:text-slate-900 hover:bg-white shadow-sm border border-slate-200' 
                : 'bg-black/50 text-slate-300 hover:text-white hover:bg-black/80'
          }`}
          title="Guardar en Favoritos"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Tag / Discount Badge */}
        {(product.tag || product.discountBadge) && (
          <span className={`absolute bottom-2 left-2 z-10 px-2.5 py-0.5 rounded-md font-extrabold text-[9px] uppercase tracking-wider ${
            isLightBg 
              ? 'bg-[#00E5FF]/20 border border-[#00E5FF]/50 text-[#0066FF]' 
              : 'bg-[#00E5FF]/20 border border-[#00E5FF]/40 text-[#00E5FF]'
          }`}>
            {product.tag || product.discountBadge}
          </span>
        )}

        {/* Quick Add Cart Top-Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart && onAddToCart(product);
          }}
          className="absolute top-2 right-2 z-10 p-2 rounded-full bg-[#00E5FF] text-black font-extrabold hover:bg-cyan-300 hover:scale-110 transition-all shadow-[0_0_15px_#00E5FF]"
          title="Agregar al Carrito"
        >
          <ShoppingBag className="w-4 h-4" />
        </button>

        {/* Product Image */}
        <img
          src={product.image || product.img}
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 filter drop-shadow-sm"
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-2.5 text-left pt-3 flex flex-col justify-between flex-grow">
        <div className="space-y-1.5">
          {/* Rating */}
          <div className="flex items-center gap-1 text-amber-500 text-[11px] font-space font-extrabold">
            <Star className="w-3.5 h-3.5 fill-amber-500" />
            <span className={isLightBg ? 'text-slate-900' : 'text-amber-400'}>
              {product.rating || '5.0'}
            </span>
            <span className={isLightBg ? 'text-slate-500 font-inter' : 'text-slate-400 font-inter'}>
              ({product.reviewsCount || 48})
            </span>
          </div>

          {/* Title */}
          <h3 className={`text-xs sm:text-sm font-extrabold font-space leading-snug line-clamp-2 transition-colors ${
            isLightBg ? 'text-slate-900 group-hover:text-[#0066FF]' : 'text-white group-hover:text-[#00E5FF]'
          }`}>
            {product.name}
          </h3>
        </div>

        {/* Price & Action Button */}
        <div className={`space-y-2.5 pt-2 mt-auto border-t ${isLightBg ? 'border-slate-200' : 'border-white/10'}`}>
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1">
              <span className={`text-base sm:text-lg font-black font-inter tracking-tight ${
                isLightBg ? 'text-slate-900' : 'text-white'
              }`}>
                ${formattedPrice}
              </span>
              <span className={`text-[10px] font-extrabold font-inter ${
                isLightBg ? 'text-[#0066FF]' : 'text-[#00E5FF]'
              }`}>
                USD
              </span>
            </div>

            {formattedOriginalPrice && (
              <span className={`text-xs line-through font-inter ${
                isLightBg ? 'text-slate-400' : 'text-slate-400'
              }`}>
                ${formattedOriginalPrice}
              </span>
            )}
          </div>

          {/* Action CTA Button in Signature Cyan */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView && onQuickView(product);
            }}
            className="w-full py-2.5 rounded-xl btn-cyan-glow bg-[#00E5FF] hover:bg-cyan-300 text-black font-space font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(0,229,255,0.3)] group-hover:shadow-[0_0_20px_#00E5FF]"
          >
            <Eye className="w-4 h-4 text-black" />
            <span>Ver Detalle del Producto</span>
          </button>
        </div>
      </div>

    </div>
  );
};

export const CategoryShowcaseSection = ({ 
  title = 'Categoría', 
  categoryFilterId = 'smartphones', 
  products = [], 
  onSelectCategory, 
  onAddToCart, 
  onQuickView, 
  wishlist = [], 
  onToggleWishlist,
  isLightBg = true
}) => {
  const safeProducts = Array.isArray(products) ? products : [];
  const safeWishlist = Array.isArray(wishlist) ? wishlist : [];

  const categoryProducts = safeProducts.filter(p => {
    if (categoryFilterId === 'todos') return true;
    return p.category === categoryFilterId || (p.category && p.category.includes(categoryFilterId));
  }).slice(0, 4);

  if (categoryProducts.length === 0) return null;

  return (
    <section className="space-y-4 font-space">
      
      {/* Cabecera de Categoría */}
      <div className={`flex items-center justify-between pb-2 border-b ${
        isLightBg ? 'border-slate-200' : 'border-white/10'
      }`}>
        <h2 className={`text-xl sm:text-3xl font-extrabold tracking-tight ${
          isLightBg ? 'text-slate-900' : 'text-white'
        }`}>
          {title}
        </h2>

        <button
          onClick={() => onSelectCategory && onSelectCategory(categoryFilterId)}
          className={`text-xs sm:text-sm font-extrabold transition-colors flex items-center gap-1 font-space group ${
            isLightBg ? 'text-[#0066FF] hover:text-blue-800' : 'text-[#00E5FF] hover:text-cyan-300'
          }`}
        >
          <span>Ver todo</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Grid: 4 cols desktop, 3 tablet, 2 mobile */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {categoryProducts.map((product) => (
          <CategoryShowcaseCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
            isWishlisted={safeWishlist.includes(product.id)}
            onToggleWishlist={onToggleWishlist}
            isLightBg={isLightBg}
          />
        ))}
      </div>

    </section>
  );
};
