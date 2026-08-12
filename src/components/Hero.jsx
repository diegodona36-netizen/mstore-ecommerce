import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Zap, Sparkles, ChevronRight, Star, ChevronLeft, Eye, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export const Hero = ({ onExploreClick, onQuickViewHero, onCategorySelect }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Featured flagship products from catalog database
  const featuredProducts = [
    PRODUCTS.find(p => p.id === 'm-phone-01') || PRODUCTS[0],
    PRODUCTS.find(p => p.id === 'm-phone-02') || PRODUCTS[1],
    PRODUCTS.find(p => p.id === 'm-audio-01') || PRODUCTS[2],
  ].filter(Boolean);

  const currentProduct = featuredProducts[currentSlideIndex] || PRODUCTS[0];

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredProducts.length]);

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % featuredProducts.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  const handleDetailClick = () => {
    if (onQuickViewHero) {
      onQuickViewHero(currentProduct);
    }
  };

  return (
    <section className="relative pt-6 pb-14 md:pt-10 md:pb-20 overflow-hidden bg-[#0A0908] flex items-center select-none">
      
      {/* Ambient Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00E5FF]/10 blur-[130px] pointer-events-none rounded-full"></div>
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan-600/10 blur-[100px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-5">
            
            {/* Top Micro Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-[#00E5FF]/40 backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5FF]"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#00E5FF] font-space flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Colección Oficial Flagship 2026
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold font-space text-white leading-[1.08] tracking-tight">
              Transforma tu <br />
              <span className="gradient-text-cyan drop-shadow-[0_0_25px_rgba(0,229,255,0.4)]">
                tecnología
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-sm md:text-lg font-normal max-w-xl leading-relaxed">
              Smartphones insignia, pantallas Smart TV 4K, audio Hi-Fi y electrodomésticos inteligentes con envío directo a todo el país y garantía oficial M Store.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full">
              <button
                onClick={() => onExploreClick && onExploreClick()}
                className="btn-cyan-glow px-8 py-3.5 rounded-xl text-sm font-extrabold font-space text-black flex items-center justify-center gap-2 w-full sm:w-auto group shadow-[0_0_25px_#00E5FF] hover:scale-105 active:scale-95 transition-all"
              >
                <span>Explorar Catálogo Completo</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={handleDetailClick}
                className="px-6 py-3.5 rounded-xl text-sm font-extrabold font-space bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-[#00E5FF]/50 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Eye className="w-4 h-4 text-[#00E5FF]" />
                <span>Ver Detalle de {currentProduct?.name?.split(' ')?.[0] || 'Producto'}</span>
              </button>
            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-white/10 w-full">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white font-space">Envío 24H</p>
                  <p className="text-[10px] text-slate-400">Garantizado</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white font-space">Garantía 1 Año</p>
                  <p className="text-[10px] text-slate-400">Oficial M Store</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
                  <Star className="w-4 h-4 fill-[#00E5FF]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white font-space">4.9/5 Estrellas</p>
                  <p className="text-[10px] text-slate-400">+2,500 Clientes</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Hero Showcase Carousel Mockup */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div 
              onClick={handleDetailClick}
              className="relative glass-card rounded-3xl p-5 border border-[#00E5FF]/40 shadow-[0_0_35px_rgba(0,229,255,0.25)] w-full max-w-md cursor-pointer group hover:border-[#00E5FF] transition-all"
            >
              
              {/* Product Badge Tag */}
              <div className="absolute top-8 left-8 z-20 bg-black/80 backdrop-blur-md border border-[#00E5FF]/40 px-3 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse"></span>
                <span className="text-[10px] font-bold text-white uppercase tracking-wider font-space">
                  {currentProduct.tag || 'Destacado Flagship'}
                </span>
              </div>

              {/* Slide Navigation Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevSlide();
                }}
                className="absolute top-1/2 left-3 -translate-y-1/2 z-30 p-2 rounded-full bg-black/60 hover:bg-[#00E5FF] text-slate-300 hover:text-black transition-all border border-white/10"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextSlide();
                }}
                className="absolute top-1/2 right-3 -translate-y-1/2 z-30 p-2 rounded-full bg-black/60 hover:bg-[#00E5FF] text-slate-300 hover:text-black transition-all border border-white/10"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Product Showcase Image */}
              <div className="relative h-64 md:h-72 rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900/90 to-black p-4 flex items-center justify-center">
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  className="h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,229,255,0.3)] group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating Specs Card */}
              <div className="mt-4 p-4 rounded-2xl bg-black/80 backdrop-blur-lg border border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-extrabold text-white font-space group-hover:text-[#00E5FF] transition-colors">
                    {currentProduct.name}
                  </h3>
                  <p className="text-[11px] text-[#00E5FF] font-semibold">
                    {currentProduct.tag || 'Garantía Oficial'}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-extrabold text-white">
                      ${currentProduct.price?.toLocaleString('en-US')}
                    </span>
                    {currentProduct.originalPrice && (
                      <span className="text-xs text-slate-500 line-through">
                        ${currentProduct.originalPrice?.toLocaleString('en-US')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Ver Detalle Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDetailClick();
                  }}
                  className="bg-[#00E5FF] hover:bg-cyan-300 text-black px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all shadow-[0_0_15px_#00E5FF] flex items-center gap-1.5 font-space shrink-0"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver Detalle</span>
                </button>
              </div>

              {/* Slide Indicators Dots */}
              <div className="flex items-center justify-center gap-1.5 mt-3">
                {featuredProducts.map((_, idx) => (
                  <span
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentSlideIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === currentSlideIndex 
                        ? 'w-6 bg-[#00E5FF]' 
                        : 'w-1.5 bg-white/20 hover:bg-white/50'
                    }`}
                  ></span>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
