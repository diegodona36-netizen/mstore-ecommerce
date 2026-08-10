import React, { useState } from 'react';
import { X, Star, ShoppingBag, ShieldCheck, Check, Heart, Minus, Plus, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';

export const QuickViewModal = ({ product, onClose, onAddToCart, onToggleFavorite, isFavorite }) => {
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeThumbIdx, setActiveThumbIdx] = useState(0);

  if (!product) return null;

  // Mock multi-angle thumbnails if product has single image
  const thumbnails = [
    product.image,
    product.image,
    product.image
  ];

  const handleAdd = () => {
    onAddToCart({ ...product, selectedColor, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWhatsAppCheckout = () => {
    const subtotal = product.price * quantity;
    let message = `*PEDIDO DIRECTO M STORE*\n\n`;
    message += `*Producto:* ${product.name}\n`;
    message += `*Cantidad:* ${quantity}\n`;
    message += `*Precio Unitario:* $${product.price.toLocaleString()}\n`;
    message += `*TOTAL:* $${subtotal.toLocaleString()}\n\n`;
    message += `Hola, quiero comprar este producto directamente. ¿Cómo prosigo con el pago?`;

    window.open(`https://wa.me/5215555555555?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Backdrop overlay */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Main IVOO Style Modal Container */}
      <div className="relative z-10 glass-modal w-full max-w-4xl rounded-3xl overflow-hidden border border-[#00E5FF]/40 p-6 md:p-8 my-auto">
        
        {/* MODAL TOP HEADER BAR (Garantiza 0 solapamiento en móviles) */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-[10px] font-extrabold tracking-wider uppercase bg-[#00E5FF] text-black px-3 py-1 rounded-full font-space shadow-[0_0_12px_#00E5FF] truncate">
              {product.tag || 'Insignia M Store'}
            </span>
            <span className="text-xs font-bold text-[#00E5FF] uppercase tracking-wider font-space truncate hidden sm:inline">
              • {product.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 hover:bg-[#00E5FF] text-slate-300 hover:text-black border border-white/20 hover:border-[#00E5FF] transition-all duration-300 shadow-lg group shrink-0 min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5 transition-transform group-hover:rotate-90" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
          
          {/* Left Column: Gallery Thumbnails + Main Photo Frame (Dark Glassmorphic Style) */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row gap-4 items-center sm:items-start">
            
            {/* Thumbnails list (Horizontal on mobile, vertical on sm+) */}
            <div className="flex sm:flex-col gap-3 shrink-0 order-2 sm:order-1 overflow-x-auto max-w-full pb-1 sm:pb-0">
              {thumbnails.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveThumbIdx(idx)}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden p-2 border-2 transition-all bg-[#050A14] flex items-center justify-center shrink-0 ${
                    activeThumbIdx === idx
                      ? 'border-[#00E5FF] scale-105 shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                      : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="" className="h-full w-full object-contain" />
                </button>
              ))}
            </div>

            {/* Main Image Frame (Dark Glassmorphic Cyan Container) */}
            <div className="relative flex-1 w-full h-64 sm:h-80 md:h-96 rounded-3xl bg-[#050A14]/90 p-5 flex items-center justify-center border border-[#00E5FF]/30 overflow-hidden shadow-[0_0_30px_rgba(0,229,255,0.15)] order-1 sm:order-2">
              
              {/* Prev / Next Navigation Arrows */}
              <button
                onClick={() => setActiveThumbIdx(prev => (prev === 0 ? thumbnails.length - 1 : prev - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-[#00E5FF] text-[#00E5FF] hover:text-black border border-white/20 shadow-lg transition-all z-10 active:scale-95"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Main Photo Display */}
              <img
                src={thumbnails[activeThumbIdx]}
                alt={product.name}
                className="h-full max-h-[90%] object-contain filter drop-shadow-[0_15px_30px_rgba(0,229,255,0.25)] transition-transform duration-300 hover:scale-105"
              />

              <button
                onClick={() => setActiveThumbIdx(prev => (prev === thumbnails.length - 1 ? 0 : prev + 1))}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-[#00E5FF] text-[#00E5FF] hover:text-black border border-white/20 shadow-lg transition-all z-10 active:scale-95"
                aria-label="Foto siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>

          {/* Right Column: Title, Price, Quantity (- 1 +), Favorites, Add & Checkout (pr-12 prevents overlap with 'X') */}
          <div className="lg:col-span-5 flex flex-col text-left space-y-5 lg:pr-12">
            
            {/* Category & Rating */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-[#00E5FF] uppercase tracking-wider font-space">
                {product.category}
              </span>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-[#00E5FF] fill-[#00E5FF]" />
                <span className="text-xs font-bold text-white">{product.rating}</span>
                <span className="text-xs text-slate-400">({product.reviewsCount} reseñas)</span>
              </div>
            </div>

            {/* Product Title (IVOO Large Bold Title) */}
            <h2 className="text-2xl md:text-3xl font-extrabold font-space text-white leading-snug">
              {product.name}
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl md:text-4xl font-extrabold font-space text-white">
                ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
              </span>
              {product.originalPrice && (
                <span className="text-base text-slate-400 line-through font-space">
                  ${product.originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-1">
              <div className="flex items-center bg-slate-200 text-slate-900 rounded-xl px-3 py-1.5 font-bold text-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 hover:bg-slate-300 rounded-lg text-slate-700"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-space text-base">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 hover:bg-slate-300 rounded-lg text-slate-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons (IVOO Emerald Green & Cyan Glow Buttons) */}
            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={handleAdd}
                className={`w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                  added
                    ? 'bg-emerald-500 text-black shadow-[0_0_20px_#10B981]'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>¡Agregado al Carrito!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Agregar al carrito</span>
                  </>
                )}
              </button>

              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 bg-[#00E5FF] hover:bg-[#00F2FE] text-black shadow-[0_0_20px_rgba(0,229,255,0.6)] transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-black" />
                <span>Checkout WhatsApp Directo</span>
              </button>
            </div>

            {/* Trust footer */}
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2 border-t border-white/10">
              <ShieldCheck className="w-4 h-4 text-[#00E5FF]" />
              <span>Garantía Oficial M Store + Envío Exprés Asegurado</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
