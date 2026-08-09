import React from 'react';

export const Logo = ({ className = '', size = 'medium' }) => {
  const isSmall = size === 'small';
  const isLarge = size === 'large';

  // Crisp dimensions for the dark background logo
  const heightClass = isSmall ? 'h-9 md:h-10' : isLarge ? 'h-16 md:h-18' : 'h-11 md:h-13';

  return (
    <div className={`flex items-center select-none group cursor-pointer ${className}`}>
      
      {/* 
        Ultra-High Resolution Dark Background Official Logo Image (media__1786219486544.jpg)
      */}
      <div className="relative flex items-center justify-center shrink-0">
        {/* Glow halo behind logo */}
        <div className="absolute inset-0 bg-[#00E5FF] opacity-25 blur-lg rounded-xl group-hover:opacity-60 transition-opacity duration-300"></div>

        <img
          src="/logo-dark-perfect.jpg"
          alt="M Store - Tienda de Telefonía, Línea Blanca y Tecnología"
          className={`${heightClass} w-auto object-contain relative z-10 rounded-lg filter drop-shadow-[0_0_12px_rgba(0,229,255,0.4)] transition-transform duration-300 group-hover:scale-[1.03]`}
          onError={(e) => {
            e.currentTarget.src = "/logo-dark-perfect.png";
          }}
        />
      </div>

    </div>
  );
};
