import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const Hero = ({ onExploreClick }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [firebaseBanners, setFirebaseBanners] = useState([]);

  // Static fallback banners
  const fallbackBanners = [
    { id: 1, imageUrl: '/banners/banner_smartphone.jpg', alt: 'Oferta Especial Galaxy S24 Ultra' },
    { id: 2, imageUrl: '/banners/banner_smarttv.jpg', alt: 'Cine en Casa Smart TV OLED' },
    { id: 3, imageUrl: '/banners/banner_laptop.jpg', alt: 'Poder Creativo MacBook Pro M3' }
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

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % banners.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <section className="relative w-full bg-white pt-4 pb-12 md:pt-6 font-sans select-none border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8">
        
        {/* Banner Carousel */}
        <div 
          className="relative w-full aspect-[16/10] sm:aspect-video rounded-2xl md:rounded-3xl overflow-hidden bg-[#111111] shadow-2xl group cursor-pointer" 
          onClick={() => onExploreClick && onExploreClick()}
        >
          
          {/* Slides */}
          {banners.map((banner, index) => (
            <div 
              key={banner.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                index === currentSlideIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img 
                src={banner.imageUrl} 
                alt={banner.alt || 'Banner M Store'} 
                className="w-full h-full object-cover md:object-contain bg-[#111111]"
              />
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); handlePrevSlide(); }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 min-h-[40px] min-w-[40px] sm:min-h-[48px] sm:min-w-[48px] flex items-center justify-center shadow-lg"
            aria-label="Anterior Banner"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); handleNextSlide(); }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 min-h-[40px] min-w-[40px] sm:min-h-[48px] sm:min-w-[48px] flex items-center justify-center shadow-lg"
            aria-label="Siguiente Banner"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Slide Indicators Dots */}
          <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setCurrentSlideIndex(idx); }}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 min-h-[6px] sm:min-h-[8px] cursor-pointer shadow-md ${
                  idx === currentSlideIndex 
                    ? 'w-6 sm:w-8 bg-blue-600' 
                    : 'w-1.5 sm:w-2 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Ir al banner ${idx + 1}`}
              ></button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

