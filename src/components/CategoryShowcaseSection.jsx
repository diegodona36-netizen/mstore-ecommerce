import React from 'react';
import { Star, ShoppingBag, Eye, Heart, ChevronRight } from 'lucide-react';

export const CategoryShowcaseCard = ({ 
  product, 
  onAddToCart, 
  onQuickView, 
  isWishlisted = false, 
  onToggleWishlist 
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
      className="group relative bg-[#0D131F] rounded-2xl p-3 border border-white/10 hover:border-[#00E5FF]/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,255,0.2)] flex flex-col justify-between h-full cursor-pointer select-none"
    >
      
      {/* Top Badges & Wishlist Heart */}
      <div className="relative w-full rounded-xl bg-[#0A0908] p-2 overflow-hidden flex items-center justify-center h-36 sm:h-40">
        
        {/* Wishlist Heart Top-Left */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist && onToggleWishlist(product.id);
          }}
          className={`absolute top-2 left-2 z-10 p-2 rounded-full backdrop-blur-md transition-all ${
            isWishlisted 
              ? 'bg-rose-500 text-white shadow-[0_0_12px_#f43f5e]' 
              : 'bg-black/50 text-slate-300 hover:text-white hover:bg-black/80'
          }`}
          title="Guardar en Favoritos"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Tag / Discount Badge */}
        {(product.tag || product.discountBadge) && (
          <span className="absolute bottom-2 left-2 z-10 px-2.5 py-0.5 rounded-md bg-[#00E5FF]/20 border border-[#00E5FF]/40 text-[#00E5FF] font-extrabold text-[9px] uppercase tracking-wider">
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
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-2.5 text-left pt-3 flex flex-col justify-between flex-grow">
        <div className="space-y-1.5">
          {/* Rating */}
          <div className="flex items-center gap-1 text-amber-400 text-[11px] font-space font-extrabold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{product.rating || '5.0'}</span>
            <span className="text-slate-400 font-inter">({product.reviewsCount || 48})</span>
          </div>

          {/* Title */}
          <h3 className="text-xs sm:text-sm font-extrabold text-white font-space leading-snug line-clamp-2 group-hover:text-[#00E5FF] transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Price & Action Button */}
        <div className="space-y-2 pt-2 border-t border-white/10 mt-auto">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-base sm:text-lg font-black text-white font-inter tracking-tight">
                ${formattedPrice}
              </span>
              <span className="text-[10px] font-extrabold text-[#00E5FF] font-inter">USD</span>
            </div>

            {formattedOriginalPrice && (
              <span className="text-xs text-slate-400 line-through font-inter">
                ${formattedOriginalPrice}
              </span>
            )}
          </div>

          {/* Action CTA Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView && onQuickView(product);
            }}
            className="w-full py-2 rounded-xl bg-white/5 hover:bg-[#00E5FF]/20 border border-white/10 hover:border-[#00E5FF]/50 text-white hover:text-[#00E5FF] font-space font-extrabold text-xs transition-all flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-[#00E5FF]" />
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
  onToggleWishlist 
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
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
          {title}
        </h2>

        <button
          onClick={() => onSelectCategory && onSelectCategory(categoryFilterId)}
          className="text-xs sm:text-sm font-extrabold text-[#00E5FF] hover:text-cyan-300 transition-colors flex items-center gap-1 font-space group"
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
          />
        ))}
      </div>

    </section>
  );
};
