import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BentoGrid } from './components/BentoGrid';
import { ProductCarousel } from './components/ProductCarousel';
import { BenefitsBanner } from './components/BenefitsBanner';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CategoryMegaMenu } from './components/CategoryMegaMenu';
import { QuickViewModal } from './components/QuickViewModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { INITIAL_PRODUCTS } from './data/products';

export function App() {
  const [products] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [customCategories] = useState([]);

  // Add to cart logic
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  // Update quantity
  const handleUpdateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== productId));
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === productId ? { ...item, quantity: newQty } : item))
      );
    }
  };

  // Remove item
  const handleRemoveItem = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // Cart total count
  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0A0908] text-white selection:bg-[#00E5FF] selection:text-black font-inter">
      
      {/* 1. TOP HEADER & NAVIGATION (DARK CYBER) */}
      <Navbar 
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMegaMenu={() => setIsMegaMenuOpen(true)}
        cartCount={cartTotalCount}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        products={products}
        onQuickView={(p) => setQuickViewProduct(p)}
      />

      <CategoryMegaMenu 
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
        onSelectCategory={(catId) => {
          setActiveCategory(catId);
          setIsMegaMenuOpen(false);
          const catalogEl = document.getElementById('bento') || document.getElementById('catalogo');
          if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
        }}
        customCategories={customCategories}
      />

      {/* 2. HERO BANNER PRINCIPAL (DARK CYBER) */}
      <Hero 
        onExploreClick={() => {
          const el = document.getElementById('bento');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onQuickView={(p) => setQuickViewProduct(p)}
      />

      {/* 3. SECCIONES CENTRALES ELEGANTES CYBER MATTE (ENMARCADAS SIN BLANCO EXCESIVO) */}
      <main className="space-y-12 py-10 bg-[#0A0908]">
        
        {/* 3.1 Bento Grid Categorías */}
        <div id="bento" className="max-w-7xl mx-auto px-4 md:px-8">
          <BentoGrid 
            isLightBg={false}
            onSelectCategory={(catId) => {
              setActiveCategory(catId);
              const catalogEl = document.getElementById('catalogo');
              if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
            }} 
          />
        </div>

        {/* 3.2 Carrusel & Catálogo de Productos */}
        <div id="catalogo" className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="glass-card rounded-3xl p-4 sm:p-8 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <ProductCarousel
              products={products}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              onAddToCart={handleAddToCart}
              onQuickView={(product) => setQuickViewProduct(product)}
              searchQuery={searchQuery}
              customCategories={customCategories}
              isLightBg={false}
            />
          </div>
        </div>

        {/* 3.3 Módulo de Beneficios & Garantía M Store */}
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <BenefitsBanner isLightBg={false} />
        </div>

        {/* 3.4 Sección Tienda Física & Mapa Google Maps */}
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <LocationSection isLightBg={false} />
        </div>

      </main>

      {/* 4. FOOTER (DARK CYBER) */}
      <Footer />

      {/* MODALES Y ELEMENTOS FLOTANTES */}
      {quickViewProduct && (
        <QuickViewModal 
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <FloatingWhatsApp />

    </div>
  );
}

export default App;
