import React, { useEffect } from 'react';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';

export const Toast = ({ message, product, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-20 right-6 z-50 flex items-center gap-3 bg-[#0F0E14]/95 border border-[#00E5FF]/40 text-white px-5 py-3.5 rounded-2xl shadow-[0_10px_30px_rgba(0,229,255,0.3)] backdrop-blur-xl animate-slideInRight max-w-sm">
      <div className="p-2 rounded-xl bg-[#00E5FF]/15 text-[#00E5FF] shrink-0">
        <CheckCircle2 className="w-5 h-5" />
      </div>
      
      {product?.image && (
        <img src={product.image} alt="" className="w-10 h-10 object-contain rounded-lg bg-black/40 p-1 border border-white/10" />
      )}

      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold font-space text-[#00E5FF]">¡Añadido al Carrito!</p>
        <p className="text-xs text-slate-200 font-medium truncate">{message || product?.name}</p>
      </div>

      <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
