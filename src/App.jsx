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
import { WhatsappButton } from './components/WhatsappButton';
import { CategoryShowcaseSection } from './components/CategoryShowcaseSection';
import { INITIAL_PRODUCTS } from './data/products';
import { ArrowLeft, ChevronRight, Home } from 'lucide-react';

export function App() {
  const [products] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  
  // VIEW MODE ROUTING: 'home' | 'catalog'
  const [viewMode, setViewMode] = useState('home');
  const [activeCategory, setActiveCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [customCategories] = useState([]);

  const handleToggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  // Handler to open catalog view cleanly with specific category
  const navigateToCatalog = (categoryFilterId = 'todos') => {
    setActiveCategory(categoryFilterId);
    setViewMode('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler to return home
  const navigateToHome = () => {
    setViewMode('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 selection:bg-[#00E5FF] selection:text-black font-inter flex flex-col justify-between">
      
      <div>
        {/* 1. TOP HEADER & NAVIGATION (STRICT DARK CYBER) */}
        <Navbar 
          onOpenCart={() => setIsCartOpen(true)}
          onOpenMegaMenu={() => setIsMegaMenuOpen(true)}
          cartCount={cartTotalCount}
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q);
            if (q && viewMode !== 'catalog') setViewMode('catalog');
          }}
          products={products}
          onQuickView={(p) => setQuickViewProduct(p)}
          onNavigateHome={navigateToHome}
        />

        <CategoryMegaMenu 
          isOpen={isMegaMenuOpen}
          onClose={() => setIsMegaMenuOpen(false)}
          onSelectCategory={(catId) => {
            navigateToCatalog(catId);
            setIsMegaMenuOpen(false);
          }}
          customCategories={customCategories}
        />

        {/* ========================================================================= */}
        {/* VISTA 1: HOMEPAGE VIEW (DISEÑO HÍBRIDO: HERO OSCURO + MAIN CLARO ELEGANTE) */}
        {/* ========================================================================= */}
        {viewMode === 'home' && (
          <div className="animate-fadeIn">
            {/* 2. HERO BANNER PRINCIPAL (DESPLIEGUE VISUAL IMPACTANTE) */}
            <Hero 
              onCategorySelect={(catId) => navigateToCatalog(catId)}
              onExploreClick={() => navigateToCatalog('todos')}
              onQuickViewHero={(p) => setQuickViewProduct(p)}
            />

            {/* 3. SECCIONES CENTRALES HOMEPAGE (FONDO GRIS CLARO bg-slate-50 / bg-[#F8FAFC]) */}
            <main className="space-y-14 py-10 bg-[#F8FAFC]">
              
              {/* 3.1 Bento Grid Categorías Innovadoras */}
              <div id="bento" className="max-w-7xl mx-auto px-4 md:px-8">
                <BentoGrid 
                  isLightBg={true}
                  onSelectCategory={(catId) => navigateToCatalog(catId)} 
                />
              </div>

              {/* 3.2 SECCIONES DE EXHIBICIÓN DE PRODUCTOS (FONDO CLARO CON BOTONES CIAN) */}
              <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-14">
                
                {/* Categoría 1: Smartphones Insignia */}
                <CategoryShowcaseSection 
                  title="Smartphones Insignia 2026"
                  categoryFilterId="smartphones"
                  products={products}
                  onSelectCategory={(catId) => navigateToCatalog(catId)}
                  onAddToCart={handleAddToCart}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  wishlist={wishlist}
                  onToggleWishlist={handleToggleWishlist}
                  isLightBg={true}
                />

                {/* Categoría 2: Televisores & Smart TVs */}
                <CategoryShowcaseSection 
                  title="Televisores & Smart TVs 4K"
                  categoryFilterId="linea-blanca"
                  products={products}
                  onSelectCategory={(catId) => navigateToCatalog(catId)}
                  onAddToCart={handleAddToCart}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  wishlist={wishlist}
                  onToggleWishlist={handleToggleWishlist}
                  isLightBg={true}
                />

                {/* Categoría 3: Audio High-End */}
                <CategoryShowcaseSection 
                  title="Audio High-End & Cancelling"
                  categoryFilterId="audio"
                  products={products}
                  onSelectCategory={(catId) => navigateToCatalog(catId)}
                  onAddToCart={handleAddToCart}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  wishlist={wishlist}
                  onToggleWishlist={handleToggleWishlist}
                  isLightBg={true}
                />

              </div>

              {/* 3.3 Módulo de Beneficios & Garantía M Store */}
              <div className="max-w-7xl mx-auto px-4 md:px-8 pt-4">
                <BenefitsBanner isLightBg={true} />
              </div>

              {/* 3.4 Sección Tienda Física & Mapa */}
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                <LocationSection isLightBg={true} />
              </div>

            </main>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VISTA 2: CATALOG VIEW (CATÁLOGO EN VISTA CLARA CON SIDEBAR Y GRID COMPACTO) */}
        {/* ========================================================================= */}
        {viewMode === 'catalog' && (
          <div className="animate-fadeIn py-8 bg-[#F8FAFC] min-h-screen font-space">
            
            {/* Breadcrumb Header Nav Bar */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 pb-4 mb-6 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-600 font-bold">
                <button 
                  onClick={navigateToHome} 
                  className="flex items-center gap-1 hover:text-[#0066FF] transition-colors"
                >
                  <Home className="w-3.5 h-3.5 text-[#0066FF]" />
                  <span>Inicio</span>
                </button>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-slate-900 font-extrabold uppercase tracking-wider">Catálogo M Store</span>
              </div>

              <button
                onClick={navigateToHome}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-extrabold text-xs transition-all border border-slate-200 shadow-sm active:scale-95"
              >
                <ArrowLeft className="w-4 h-4 text-[#0066FF]" />
                <span>Volver a Inicio</span>
              </button>
            </div>

            {/* Componente Catálogo Completo 3 Columnas en Vista Clara */}
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <div className="bg-white rounded-3xl p-4 sm:p-8 border border-slate-200/90 shadow-md">
                <ProductCarousel
                  products={products}
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                  onAddToCart={handleAddToCart}
                  onQuickView={(product) => setQuickViewProduct(product)}
                  searchQuery={searchQuery}
                  customCategories={customCategories}
                  isLightBg={true}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. FOOTER (STRICT DARK CYBER) */}
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

      <WhatsappButton />
    </div>
  );
}

export default App;
