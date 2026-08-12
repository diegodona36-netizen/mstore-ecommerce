import React, { useState } from 'react';
import { SoyTechnoHomePage } from './components/SoyTechnoHomePage';
import { QuickViewModal } from './components/QuickViewModal';

export function App() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const handleAddToCart = (_product) => {
    // Add to cart handler
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
