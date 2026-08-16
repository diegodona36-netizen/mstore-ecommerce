import React, { useState, useEffect } from 'react';
import { Clock, ShoppingCart, Eye, Star, Zap, Check } from 'lucide-react';

export const FlashDealsSection = ({ products = [], onAddToCart, onQuickView }) => {
  // Countdown timer initialized to 80 hours
  const [timeLeft, setTimeLeft] = useState({ hours: 79, minutes: 58, seconds: 45 });
  const [addedIds, setAddedIds] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 80, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAdd = (e, product) => {
    e.stopPropagation();
    onAddToCart && onAddToCart(product);
    setAddedIds(prev => [...prev, product.id]);
    setTimeout(() => {
      setAddedIds(prev => prev.filter(id => id !== product.id));
    }, 1500);
  };

  // Filter products explicitly flagged for flash sale or with promotional tag, fallback to first 4
  const flaggedProducts = products.filter(p => p.isFlashDeal === true || p.inFlashSale === true || p.tag?.toLowerCase().includes('oferta'));
  const flashProducts = flaggedProducts.length > 0 ? flaggedProducts.slice(0, 4) : products.slice(0, 4);

  if (flashProducts.length === 0) return null;

  return (
    <section className="w-full font-sans">
      {/* Luxury Corporate Container */}
      <div className="bg-[#0B0F17] rounded-3xl p-5 sm:p-7 md:p-8 border border-slate-800 shadow-xl text-white">
          
          {/* Header with Title & 80h Countdown */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
            
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                    Ofertas Relámpago
                  </h2>
                  <span className="bg-emerald-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-md uppercase tracking-wider">
                    Tiempo Limitado
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Precios especiales por lote y unidades en stock</p>
              </div>
            </div>

            {/* Countdown Clock Box (80 Hours) */}
            <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl backdrop-blur-sm self-stretch md:self-auto justify-center">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-slate-300">Termina en:</span>
              <div className="flex items-center gap-1 font-mono text-sm font-black text-white">
                <span className="bg-white/10 px-2 py-1 rounded-lg">
                  {String(timeLeft.hours).padStart(2, '0')}h
                </span>
                <span className="text-slate-400">:</span>
                <span className="bg-white/10 px-2 py-1 rounded-lg">
                  {String(timeLeft.minutes).padStart(2, '0')}m
                </span>
                <span className="text-slate-400">:</span>
                <span className="bg-emerald-500 px-2 py-1 rounded-lg text-slate-950">
                  {String(timeLeft.seconds).padStart(2, '0')}s
                </span>
              </div>
            </div>

          </div>

          {/* Flash Deals Grid: 2 Columns on Mobile, 2 on Tablet, 4 on Desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {flashProducts.map((p, idx) => {
              const isAdded = addedIds.includes(p.id);
              const discountPct = p.discountPct || (idx % 2 === 0 ? 15 : 20);
              const basePrice = parseFloat(p.price || 0) || 800;
              const originalPrice = p.oldPrice ? parseFloat(p.oldPrice) : (basePrice * (1 + discountPct / 100));
              const unitsLeft = 3 + (idx * 2);

              return (
                <div
                  key={p.id || idx}
                  onClick={() => onQuickView && onQuickView(p)}
                  className="group relative bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 flex flex-col justify-between text-slate-900 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer select-none"
                >
                  {/* 1. DEDICATED TOP BADGES & ACTIONS ROW */}
                  <div className="flex items-center justify-between gap-1 min-h-[24px] mb-2">
                    <div className="flex items-center gap-1 flex-wrap">
                      <span className="bg-slate-900 text-white font-black text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 rounded-md">
                        -{discountPct}%
                      </span>
                      {p.hasCashea !== false && (
                        <span className="bg-[#FFE600] text-black font-black text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded border border-amber-400 shadow-2xs">
                          CASHEA
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickView && onQuickView(p);
                      }}
                      className="p-1 sm:p-1.5 rounded-lg sm:rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all opacity-0 group-hover:opacity-100 shrink-0"
                      title="Vista Rápida"
                    >
                      <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>

                  {/* 2. DEDICATED IMAGE CONTAINER */}
                  <div className="w-full h-32 sm:h-44 rounded-xl sm:rounded-2xl bg-[#F8FAFC] flex items-center justify-center p-2.5 sm:p-4 mb-2.5 overflow-hidden border border-slate-100">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* 3. CONTENT */}
                  <div className="space-y-2 sm:space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-amber-500 text-[10px] sm:text-[11px] font-bold mb-0.5">
                        <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400" />
                        <span>{p.rating || '5.0'}</span>
                        <span className="text-slate-400">({p.reviewsCount || 64})</span>
                      </div>

                      <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug line-clamp-2 min-h-[32px] sm:min-h-[36px] group-hover:text-blue-600 transition-colors">
                        {p.name}
                      </h3>
                    </div>

                    {/* Stock Progress Bar */}
                    <div className="space-y-1 bg-slate-50 p-1.5 sm:p-2 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-bold text-slate-600">
                        <span className="flex items-center gap-1 text-slate-900 truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                          ¡Quedan {unitsLeft}!
                        </span>
                        <span className="text-emerald-700 font-bold hidden sm:inline">En oferta</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full" 
                          style={{ width: `${Math.max(25, 100 - (unitsLeft * 8))}%` }}
                        />
                      </div>
                    </div>

                    {/* Price & Action */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5">
                      <div>
                        <div className="flex items-baseline gap-0.5 sm:gap-1">
                          <span className="text-sm sm:text-lg font-black text-slate-900">
                            ${basePrice.toFixed(0)}
                          </span>
                          <span className="text-[9px] sm:text-[10px] font-extrabold text-slate-600">USD</span>
                        </div>
                        <span className="text-[10px] sm:text-[11px] text-slate-400 line-through">
                          ${originalPrice.toFixed(0)}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleAdd(e, p)}
                        className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-black flex items-center gap-1 transition-all shadow-sm active:scale-95 shrink-0 ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            <span>Listo</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            <span>Comprar</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

        </div>
    </section>
  );
};
