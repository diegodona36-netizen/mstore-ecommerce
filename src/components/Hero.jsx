import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ShieldCheck, Truck, CreditCard, MessageCircle } from 'lucide-react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const Hero = ({ onCategorySelect, onExploreClick }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [firebaseBanners, setFirebaseBanners] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  // High quality default promotional banners
  const fallbackBanners = [
    { 
      id: 1, 
      imageUrl: '/banners/banner_smartphone.jpg', 
      alt: 'Oferta Especial Galaxy S24 Ultra y Flagships' 
    },
    { 
      id: 2, 
      imageUrl: '/banners/banner_smarttv.jpg', 
      alt: 'Cine en Casa Smart TV OLED' 
    },
    { 
      id: 3, 
      imageUrl: '/banners/banner_laptop.jpg', 
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

  // Auto-slide every 6s
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length, isPaused]);

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % banners.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      handleNextSlide();
    } else if (distance < -minSwipeDistance) {
      handlePrevSlide();
    }
  };

  return (
    <section className="relative w-full bg-white pt-3 pb-6 md:pt-4 font-sans select-none border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 space-y-4">
        
        {/* Main Banner Carousel Container */}
        <div 
          className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden bg-[#0A0D14] shadow-lg group cursor-pointer border border-slate-800" 
          onClick={() => onExploreClick && onExploreClick()}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
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
            </div>
          ))}

          {/* Navigation Arrows (DESKTOP ONLY - HIDDEN ON MOBILE) */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handlePrevSlide(); }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 hidden sm:flex items-center justify-center shadow-md border border-white/10 active:scale-95"
            aria-label="Anterior Banner"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleNextSlide(); }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 hidden sm:flex items-center justify-center shadow-md border border-white/10 active:scale-95"
            aria-label="Siguiente Banner"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slide Indicator Dots */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5">
            {banners.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => { e.stopPropagation(); setCurrentSlideIndex(idx); }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer shadow-xs ${
                  idx === currentSlideIndex 
                    ? 'w-6 sm:w-8 bg-blue-600' 
                    : 'w-1.5 sm:w-2 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Ir al banner ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
