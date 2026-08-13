import React, { useState, useEffect } from 'react';
import { Flame, Clock, ShoppingCart, Eye, Star, Zap, Check } from 'lucide-react';

export const FlashDealsSection = ({ products = [], onAddToCart, onQuickView }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 42, seconds: 19 });
  const [addedIds, setAddedIds] = useState([]);

  // Live countdown timer
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
        return { hours: 12, minutes: 0, seconds: 0 };
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

  // Select 4 discounted / flagship products
  const flashProducts = products.slice(0, 4);

  if (flashProducts.length === 0) return null;

  return (
    <section className="py-10 sm:py-14 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white font-sans relative overflow-hidden">
      
      {/* Subtle background energy glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header with Title & Countdown */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                  Ofertas Relámpago
                </h2>
                <span className="bg-rose-600 text-white font-black text-[10px] px-2 py-0.5 rounded-md uppercase tracking-wider">
                  Solo por hoy
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Precios especiales por tiempo y unidades limitadas</p>
            </div>
          </div>

          {/* Countdown Clock Box */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm self-stretch md:self-auto justify-center">
            <Clock className="w-4 h-4 text-rose-400" />
            <span className="text-xs font-bold text-slate-300">Termina en:</span>
            <div className="flex items-center gap-1 font-mono text-sm font-black text-white">
              <span className="bg-white/10 px-2 py-1 rounded-lg">
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
              <span className="text-rose-400">:</span>
              <span className="bg-white/10 px-2 py-1 rounded-lg">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              <span className="text-rose-400">:</span>
              <span className="bg-rose-600/80 px-2 py-1 rounded-lg text-white">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>

        </div>

        {/* Flash Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {flashProducts.map((p, idx) => {
            const isAdded = addedIds.includes(p.id);
            const discountPct = idx % 2 === 0 ? 15 : 22;
            const originalPrice = (parseFloat(p.price) || 800) * (1 + discountPct / 100);
            const unitsLeft = 3 + (idx * 2);

            return (
              <div
                key={p.id || idx}
                onClick={() => onQuickView && onQuickView(p)}
                className="group relative bg-white rounded-3xl p-4 flex flex-col justify-between text-slate-900 border border-slate-200/20 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer select-none"
              >
                {/* Discount Badge */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                  <span className="bg-rose-600 text-white font-black text-[10px] px-2 py-0.5 rounded-lg shadow-sm">
                    -{discountPct}% OFF
                  </span>
                  {p.hasCashea !== false && (
                    <span className="bg-[#FFE600] text-black font-black text-[9px] px-1.5 py-0.5 rounded border border-amber-400 shadow-xs">
                      CASHEA
                    </span>
                  )}
                </div>

                {/* Quick View Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickView && onQuickView(p);
                  }}
                  className="absolute top-3 right-3 z-10 p-2 rounded-xl bg-slate-100/90 text-slate-700 hover:bg-blue-600 hover:text-white transition-all shadow-sm opacity-0 group-hover:opacity-100"
                  title="Vista Rápida"
                >
                  <Eye className="w-4 h-4" />
                </button>

                {/* Product Image */}
                <div className="relative w-full h-44 rounded-2xl bg-slate-50 flex items-center justify-center p-3 mb-3 overflow-hidden border border-slate-100">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 text-[11px] font-bold mb-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{p.rating || '5.0'}</span>
                      <span className="text-slate-400">({p.reviewsCount || 64})</span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug line-clamp-2 min-h-[36px] group-hover:text-blue-600 transition-colors">
                      {p.name}
                    </h3>
                  </div>

                  {/* Stock Progress Bar */}
                  <div className="space-y-1 bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-600">
                      <span className="flex items-center gap-1 text-rose-600">
                        <Zap className="w-3 h-3 fill-rose-500" />
                        ¡Quedan {unitsLeft} unid.!
                      </span>
                      <span>En oferta</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full" 
                        style={{ width: `${Math.max(25, 100 - (unitsLeft * 8))}%` }}
                      />
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-black text-slate-900">
                          ${parseFloat(p.price || 0).toFixed(2)}
                        </span>
                        <span className="text-[10px] font-extrabold text-slate-600">USD</span>
                      </div>
                      <span className="text-[11px] text-slate-400 line-through">
                        ${originalPrice.toFixed(2)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleAdd(e, p)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-sm active:scale-95 ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Listo</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3.5 h-3.5" />
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
