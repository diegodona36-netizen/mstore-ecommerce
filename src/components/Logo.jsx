import React from 'react';

export const Logo = ({ className = '', size = 'medium', variant = 'light' }) => {
  const isSmall = size === 'small';
  const isLarge = size === 'large';

  const heightClass = isSmall ? 'h-9 md:h-10' : isLarge ? 'h-14 md:h-16' : 'h-11 md:h-13';
  const logoSrc = variant === 'dark' ? '/logo-dark.jpg' : '/logo-white-bg.png';
  const fallbackSrc = variant === 'dark' ? '/logo-white.png' : '/logo-light.jpg';

  return (
    <div className={`flex items-center select-none group cursor-pointer ${className}`}>
      <div className="relative flex items-center justify-center shrink-0">
        <img
          src={logoSrc}
          alt="M Store - Tienda de Telefonía y Accesorios"
          className={`${heightClass} w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]`}
          onError={(e) => {
            e.currentTarget.src = fallbackSrc;
          }}
        />
      </div>
    </div>
  );
};
