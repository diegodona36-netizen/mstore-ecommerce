import React, { useEffect } from 'react';
import { CheckCircle2, ShoppingCart, X } from 'lucide-react';

export const Toast = ({ message, product, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-20 right-6 z-50 flex items-center gap-3 bg-black text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-neutral-800 animate-slideInRight max-w-sm font-sans">
      <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
        <ShoppingCart className="w-5 h-5" />
      </div>
      
      {product?.image && (
        <img src={product.image} alt="" className="w-10 h-10 object-contain rounded-lg bg-white p-1 border border-neutral-800" />
      )}

      <div className="flex-1 min-w-0 text-left">
        <p className="text-xs font-black text-white">¡Añadido al Carrito!</p>
        <p className="text-xs text-slate-300 font-medium truncate">{message || product?.name || 'Producto añadido al carrito'}</p>
      </div>

      <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
