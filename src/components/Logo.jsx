import React from 'react';

export const Logo = ({ className = '', size = 'medium' }) => {
  const heightClass = size === 'small' 
    ? 'h-8 sm:h-9' 
    : size === 'large' 
      ? 'h-14 sm:h-16' 
      : 'h-10 sm:h-11 md:h-12';

  return (
    <div className={`inline-flex items-center select-none cursor-pointer ${className}`}>
      <img
        src="/mstore_official_logo.jpg"
        alt="M Store - Tienda de Telefonía y Accesorios"
        className={`${heightClass} w-auto object-contain rounded-lg`}
      />
    </div>
  );
};
