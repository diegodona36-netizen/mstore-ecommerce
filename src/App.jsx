import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { TopAnnouncementBar } from './components/TopAnnouncementBar';
import { Hero } from './components/Hero';
import { SocialProofBar } from './components/SocialProofBar';
import { ValuePropositionSection } from './components/ValuePropositionSection';
import { TestimonialsSection } from './components/TestimonialsSection';
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
import { MobileBottomNav } from './components/MobileBottomNav';
import { Toast } from './components/Toast';
import { ArrowLeft, ChevronRight, Home } from 'lucide-react';

export function App() {
  const [products] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [toastProduct, setToastProduct] = useState(null);
  
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

  // Add to cart logic SILENT (Does NOT open cart drawer, shows Toast notification)
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

    // Show floating Toast notification silently without opening side drawer
    setToastProduct(product);
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
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white font-sans flex flex-col justify-between pb-24 md:pb-0">
      
      <div>
        {/* 1. TOP HEADER & NAVIGATION */}
        <TopAnnouncementBar />
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
        {/* VISTA 1: HOMEPAGE VIEW (MODO CLARO M STORE) */}
        {/* ========================================================================= */}
        {viewMode === 'home' && (
          <div className="animate-fadeIn">
            {/* 2. HERO BANNER PRINCIPAL E-COMMERCE */}
            <Hero 
              onCategorySelect={(catId) => navigateToCatalog(catId)}
              onExploreClick={() => navigateToCatalog('todos')}
              onQuickViewHero={(p) => setQuickViewProduct(p)}
            />

            {/* 3. SECCIONES CENTRALES HOMEPAGE DE ALTA CONVERSIÓN */}
            <main className="bg-slate-50 pb-16">
              
              {/* 3.1 SOCIAL PROOF / MARCAS */}
              <SocialProofBar />

              {/* 3.2 PROBLEMA / SOLUCIÓN */}
              <ValuePropositionSection onNavigateCatalog={() => navigateToCatalog('todos')} />

              {/* 3.3 PRODUCTOS DESTACADOS */}
              <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 space-y-24">
                
                {/* Bloque 1: Smartphones */}
                <CategoryShowcaseSection 
                  title="Flagships Más Vendidos"
                  categoryFilterId="smartphones"
                  products={products}
                  onSelectCategory={(catId) => navigateToCatalog(catId)}
                  onAddToCart={handleAddToCart}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  wishlist={wishlist}
                  onToggleWishlist={handleToggleWishlist}
                  isLightBg={true}
                />

                {/* Bloque 2: Smart TVs y Audio */}
                <CategoryShowcaseSection 
                  title="Smart TVs & Entretenimiento"
                  categoryFilterId="linea-blanca"
                  products={products}
                  onSelectCategory={(catId) => navigateToCatalog(catId)}
                  onAddToCart={handleAddToCart}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  wishlist={wishlist}
                  onToggleWishlist={handleToggleWishlist}
                  isLightBg={true}
                />

                {/* Bloque 3: Computación */}
                <CategoryShowcaseSection 
                  title="Laptops & Productividad"
                  categoryFilterId="computacion"
                  products={products}
                  onSelectCategory={(catId) => navigateToCatalog(catId)}
                  onAddToCart={handleAddToCart}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  wishlist={wishlist}
                  onToggleWishlist={handleToggleWishlist}
                  isLightBg={true}
                />
              </div>

              {/* 3.4 TESTIMONIOS */}
              <TestimonialsSection />

              {/* 3.5 TIENDA FÍSICA & UBICACIÓN */}
              <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16">
                <LocationSection isLightBg={true} />
              </div>

            </main>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VISTA 2: CATALOG VIEW (DISEÑO 3 COLUMNAS MODO CLARO) */}
        {/* ========================================================================= */}
        {viewMode === 'catalog' && (
          <div className="animate-fadeIn py-6 font-sans">
            
            {/* Breadcrumb Header Nav Bar */}
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 pb-4 mb-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <button 
                  onClick={navigateToHome} 
                  className="flex items-center gap-1 hover:text-blue-600 transition-colors font-bold text-slate-800"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Inicio</span>
                </button>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-slate-900 font-extrabold uppercase tracking-wider">Catálogo M Store</span>
              </div>

              <button
                onClick={navigateToHome}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs transition-all border border-slate-300 shadow-sm active:scale-95"
              >
                <ArrowLeft className="w-4 h-4 text-slate-700" />
                <span>Volver a Inicio</span>
              </button>
            </div>

            {/* Componente Catálogo Completo 3 Columnas */}
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 w-full">
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
        )}
      </div>

      {/* 4. FOOTER */}
      <Footer />

      {/* MODALES Y ELEMENTOS FLOTANTES */}
      {quickViewProduct && (
        <QuickViewModal 
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* NOTIFICACIÓN FLOTANTE (TOAST) DE PRODUCTO AÑADIDO AL CARRITO */}
      {toastProduct && (
        <Toast
          product={toastProduct}
          onClose={() => setToastProduct(null)}
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

      {/* 5. NAVEGACIÓN BOTTOM MÓVIL (NATIVA ESTILO APP - SOLO MÓVIL flex md:hidden) */}
      <MobileBottomNav 
        cartCount={cartTotalCount}
        onOpenMegaMenu={() => setIsMegaMenuOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToHome={navigateToHome}
        onScrollToLocation={() => {
          navigateToHome();
          setTimeout(() => {
            const locEl = document.getElementById('ubicacion');
            if (locEl) locEl.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
      />
    </div>
  );
}

export default App;
