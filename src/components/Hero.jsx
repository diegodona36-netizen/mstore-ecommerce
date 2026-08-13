import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ShieldCheck, Truck, CreditCard, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const Hero = ({ onCategorySelect, onExploreClick, onQuickViewHero }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [firebaseBanners, setFirebaseBanners] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  // High quality default promotional banners
  const fallbackBanners = [
    { 
      id: 1, 
      imageUrl: '/banners/banner_smartphone.jpg', 
      title: 'Flagship Store 2026',
      subtitle: 'Samsung Galaxy S24 Ultra & iPhone 15 Pro Max',
      alt: 'Oferta Especial Galaxy S24 Ultra y Flagships' 
    },
    { 
      id: 2, 
      imageUrl: '/banners/banner_smarttv.jpg', 
      title: 'Experiencia Cine en Casa',
      subtitle: 'Smart TVs 4K OLED & Sistemas de Audio Hi-Fi',
      alt: 'Cine en Casa Smart TV OLED' 
    },
    { 
      id: 3, 
      imageUrl: '/banners/banner_laptop.jpg', 
      title: 'Máximo Rendimiento Pro',
      subtitle: 'MacBook Pro M3 & Laptops Gaming de Alta Gama',
      alt: 'Poder Creativo MacBook Pro M3' 
    }
  ];

  useEffect(() => {
    // Listen to Firebase banners in real-time
    const q = query(collection(db, 'banners'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFirebaseBanners(fetched);
    });

    return () => unsubscribe();
  }, []);

  const banners = firebaseBanners.length > 0 ? firebaseBanners : fallbackBanners;

  // Auto-slide every 5.5s (pauses when user hovers)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % banners.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [banners.length, isPaused]);

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % banners.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <section className="relative w-full bg-white pt-3 pb-8 md:pt-4 font-sans select-none border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 space-y-4">
        
        {/* Main Banner Carousel Container */}
        <div 
          className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden bg-[#0A0D14] shadow-xl group cursor-pointer border border-slate-800" 
          onClick={() => onExploreClick && onExploreClick()}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* Banner Slides */}
          {banners.map((banner, index) => (
            <div 
              key={banner.id || index}
              className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                index === currentSlideIndex 
                  ? 'opacity-100 scale-100 z-10' 
                  : 'opacity-0 scale-105 z-0 pointer-events-none'
              }`}
            >
              <img 
                src={banner.imageUrl} 
                alt={banner.alt || 'Banner M Store'} 
                className="w-full h-full object-cover md:object-contain bg-[#0A0D14]"
              />
              {/* Subtle dark gradient overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handlePrevSlide(); }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center shadow-lg border border-white/10 active:scale-95"
            aria-label="Anterior Banner"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleNextSlide(); }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center shadow-lg border border-white/10 active:scale-95"
            aria-label="Siguiente Banner"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Slide Indicator Bars */}
          <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
            {banners.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => { e.stopPropagation(); setCurrentSlideIndex(idx); }}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer shadow-md ${
                  idx === currentSlideIndex 
                    ? 'w-7 sm:w-10 bg-blue-600' 
                    : 'w-2 sm:w-2.5 bg-white/40 hover:bg-white/80'
                }`}
                aria-label={`Ir al banner ${idx + 1}`}
              />
            ))}
          </div>

          {/* Quick Floating CTA Tag (Bottom Left) */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 hidden sm:flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-white text-xs font-black shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Haz clic para ver las promociones de hoy</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 text-blue-400 group-hover:translate-x-1 transition-transform" />
          </div>

        </div>

        {/* 3 HIGH-IMPACT PROMOTIONAL FEATURE CARDS (UNDER HERO) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-1">
          
          {/* Card 1: Cashea */}
          <div 
            onClick={() => onCategorySelect && onCategorySelect('todos')}
            className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-amber-100/50 border border-amber-200/80 flex items-center gap-3.5 cursor-pointer hover:shadow-md transition-all group"
          >
            <div className="w-11 h-11 rounded-xl bg-[#FFE600] text-black font-black text-xs flex items-center justify-center shrink-0 border border-amber-400 shadow-2xs group-hover:scale-105 transition-transform">
              CASHEA
            </div>
            <div>
              <span className="text-xs font-black text-slate-900 block group-hover:text-amber-900">
                Paga en Cuotas sin Interés
              </span>
              <span className="text-[11px] text-slate-600 font-medium leading-tight block">
                Llévate tu smartphone o Smart TV hoy
              </span>
            </div>
          </div>

          {/* Card 2: Envíos Nacionales */}
          <div 
            onClick={() => onCategorySelect && onCategorySelect('todos')}
            className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-200/80 flex items-center gap-3.5 cursor-pointer hover:shadow-md transition-all group"
          >
            <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-black text-slate-900 block group-hover:text-emerald-900">
                Envío Gratis Asegurado
              </span>
              <span className="text-[11px] text-slate-600 font-medium leading-tight block">
                Entregas rápidas a toda Venezuela
              </span>
            </div>
          </div>

          {/* Card 3: Garantía Oficial */}
          <div 
            onClick={() => onCategorySelect && onCategorySelect('todos')}
            className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200/80 flex items-center gap-3.5 cursor-pointer hover:shadow-md transition-all group"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-black text-slate-900 block group-hover:text-blue-900">
                1 Año de Garantía Total
              </span>
              <span className="text-[11px] text-slate-600 font-medium leading-tight block">
                Equipos 100% nuevos en caja sellada
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
