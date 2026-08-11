import React from 'react';

export const Logo = ({ className = '', size = 'medium', variant = 'light' }) => {
  const isSmall = size === 'small';
  const isLarge = size === 'large';

  const iconSize = isSmall ? 'w-8 h-8 text-base' : isLarge ? 'w-12 h-12 text-2xl' : 'w-10 h-10 text-xl';
  const titleSize = isSmall ? 'text-base' : isLarge ? 'text-2xl' : 'text-xl';
  const subtitleSize = isSmall ? 'text-[9px]' : 'text-[10px]';

  const isDarkBg = variant === 'dark' || variant === 'transparent-dark';

  return (
    <div className={`flex items-center gap-3 select-none group cursor-pointer ${className}`}>
      {/* Emblem Icon with Gradient and Soft Neon Glow */}
      <div className={`${iconSize} rounded-xl bg-gradient-to-tr from-[#00F2FE] to-[#4FACFE] flex items-center justify-center font-black text-slate-950 shadow-[0_0_15px_rgba(0,242,254,0.4)] group-hover:scale-105 transition-transform shrink-0`}>
        M
      </div>

      {/* Typography */}
      <div className="flex flex-col text-left">
        <div className={`font-black ${titleSize} tracking-wider ${isDarkBg ? 'text-white' : 'text-slate-900'} flex items-center gap-1.5 font-sans leading-none`}>
          <span>M STORE</span>
          <span className="text-[9px] bg-[#00F2FE]/15 text-[#00F2FE] px-1.5 py-0.5 rounded border border-[#00F2FE]/30 font-mono tracking-normal">
            VIP
          </span>
        </div>
        <span className={`${subtitleSize} ${isDarkBg ? 'text-slate-400' : 'text-slate-500'} font-bold tracking-widest uppercase mt-1`}>
          Telefonía & Tecnología
        </span>
      </div>
    </div>
  );
};
