import React, { useState } from 'react';
import { SoyTechnoHomePage } from './components/SoyTechnoHomePage';
import { QuickViewModal } from './components/QuickViewModal';
import { INITIAL_PRODUCTS } from './data/products';

export function App() {
  const [products] = useState(INITIAL_PRODUCTS);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + (product.quantity || 1) } : item
        );
      }
      return [...prevCart, { ...product, quantity: product.quantity || 1 }];
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-800 font-sans selection:bg-[#0055FF] selection:text-white">
      <SoyTechnoHomePage 
        onBackToMain={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onOpenCelularesCategory={() => {
          const catalogEl = document.getElementById('catalogo') || document.querySelector('section');
          if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {quickViewProduct && (
        <QuickViewModal 
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}

export default App;
