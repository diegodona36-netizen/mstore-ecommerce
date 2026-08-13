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
      className="group relative bg-white rounded-2xl p-3 border border-slate-200 hover:border-slate-400 transition-all duration-300 hover:shadow-lg flex flex-col justify-between h-full cursor-pointer select-none"
    >
      
      {/* Top Badges & Wishlist Heart */}
      <div className="relative w-full rounded-xl bg-slate-50 p-2 overflow-hidden flex items-center justify-center h-36 sm:h-40 border border-slate-100">
        
        {/* Wishlist Heart Top-Left */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist && onToggleWishlist(product.id);
          }}
          className={`absolute top-2 left-2 z-10 p-2 rounded-full backdrop-blur-md transition-all ${
            isWishlisted 
              ? 'bg-rose-500 text-white shadow-md' 
              : 'bg-white/80 text-slate-500 hover:text-slate-900 hover:bg-white border border-slate-200'
          }`}
          title="Guardar en Favoritos"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Tag / Discount Badge */}
        {(product.tag || product.discountBadge) && (
          <span className="absolute bottom-2 left-2 z-10 px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-700 font-extrabold text-[9px] uppercase tracking-wider">
            {product.tag || product.discountBadge}
          </span>
        )}

        {/* Quick Add Cart Top-Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart && onAddToCart(product);
          }}
          className="absolute top-2 right-2 z-10 p-2 rounded-full bg-slate-900 text-white font-extrabold hover:bg-slate-800 hover:scale-110 transition-all shadow-md"
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
          <div className="flex items-center gap-1 text-amber-500 text-[11px] font-sans font-extrabold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating || '5.0'}</span>
            <span className="text-slate-400 font-sans">({product.reviewsCount || 48})</span>
          </div>

          {/* Title */}
          <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 font-sans leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Price & Action Button */}
        <div className="space-y-2 pt-2 border-t border-slate-100 mt-auto">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-base sm:text-lg font-black text-slate-900 font-sans tracking-tight">
                ${formattedPrice}
              </span>
              <span className="text-[10px] font-extrabold text-slate-700 font-sans">USD</span>
            </div>

            {formattedOriginalPrice && (
              <span className="text-xs text-slate-400 line-through font-sans">
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
            className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-sans font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Eye className="w-3.5 h-3.5 text-white" />
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
    <section className="space-y-4 font-sans">
      
      {/* Cabecera de Categoría */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
        <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {title}
        </h2>

        <button
          onClick={() => onSelectCategory && onSelectCategory(categoryFilterId)}
          className="text-xs sm:text-sm font-extrabold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 font-sans group"
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
