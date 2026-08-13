import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Zap, Sparkles, ChevronRight, Star, ChevronLeft, Eye } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export const Hero = ({ onExploreClick, onQuickViewHero }) => {
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
    <section className="relative pt-6 pb-14 md:pt-10 md:pb-16 overflow-hidden bg-[#F4F6F9] flex items-center select-none font-sans">
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-5">
            
            {/* Top Micro Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 font-sans flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Colección Oficial Flagship 2026
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black font-sans text-slate-900 leading-[1.08] tracking-tight">
              Transforma tu <br />
              <span className="text-blue-600">
                tecnología
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-sm md:text-lg font-medium max-w-xl leading-relaxed">
              Smartphones insignia, pantallas Smart TV 4K, audio Hi-Fi y electrodomésticos inteligentes con envío directo a todo el país y garantía oficial M Store.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full">
              <button
                onClick={() => onExploreClick && onExploreClick()}
                className="px-8 py-3.5 rounded-xl text-sm font-extrabold font-sans bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-2 w-full sm:w-auto group shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                <span>Explorar Catálogo Completo</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={handleDetailClick}
                className="px-6 py-3.5 rounded-xl text-sm font-extrabold font-sans bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 shadow-sm transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Eye className="w-4 h-4 text-blue-600" />
                <span>Ver Detalle de {currentProduct?.name?.split(' ')?.[0] || 'Producto'}</span>
              </button>
            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-slate-200 w-full">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-900 font-sans">Envío 24H</p>
                  <p className="text-[10px] text-slate-500 font-medium">Garantizado</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-900 font-sans">Garantía 1 Año</p>
                  <p className="text-[10px] text-slate-500 font-medium">Oficial M Store</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-500 border border-amber-200">
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-900 font-sans">4.9/5 Estrellas</p>
                  <p className="text-[10px] text-slate-500 font-medium">+2,500 Clientes</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Hero Showcase Carousel Mockup */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div 
              onClick={handleDetailClick}
              className="relative bg-white rounded-3xl p-5 border border-slate-200 shadow-xl w-full max-w-md cursor-pointer group hover:border-slate-400 transition-all"
            >
              
              {/* Product Badge Tag */}
              <div className="absolute top-8 left-8 z-20 bg-slate-900/90 backdrop-blur-md border border-slate-700 px-3 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] font-bold text-white uppercase tracking-wider font-sans">
                  {currentProduct.tag || 'Destacado Flagship'}
                </span>
              </div>

              {/* Slide Navigation Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevSlide();
                }}
                className="absolute top-1/2 left-3 -translate-y-1/2 z-30 p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white transition-all border border-slate-700 shadow-md"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextSlide();
                }}
                className="absolute top-1/2 right-3 -translate-y-1/2 z-30 p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white transition-all border border-slate-700 shadow-md"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Product Showcase Image */}
              <div className="relative h-64 md:h-72 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 p-4 flex items-center justify-center">
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  className="h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating Specs Card */}
              <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-extrabold text-slate-900 font-sans group-hover:text-blue-600 transition-colors">
                    {currentProduct.name}
                  </h3>
                  <p className="text-[11px] text-blue-600 font-bold">
                    {currentProduct.tag || 'Garantía Oficial'}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-black text-slate-900">
                      ${currentProduct.price?.toLocaleString('en-US')}
                    </span>
                    {currentProduct.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">
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
                  className="bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all shadow-sm flex items-center gap-1.5 font-sans shrink-0"
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
                        ? 'w-6 bg-slate-900' 
                        : 'w-1.5 bg-slate-300 hover:bg-slate-400'
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
