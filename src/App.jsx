import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { PromoBanners } from './components/PromoBanners';
import { ProductCarousel } from './components/ProductCarousel';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CategoryMegaMenu } from './components/CategoryMegaMenu';
import { QuickViewModal } from './components/QuickViewModal';
import { WhatsappButton } from './components/WhatsappButton';
import { CategoryShowcaseSection } from './components/CategoryShowcaseSection';
import { FlashDealsSection } from './components/FlashDealsSection';
import { INITIAL_PRODUCTS } from './data/products';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Toast } from './components/Toast';
import { ArrowLeft, ChevronRight, Home } from 'lucide-react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from './lib/firebase';

export function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  useEffect(() => {
    // Listen to Firebase products in real-time
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const fetchedProducts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(fetchedProducts);
      } else {
        setProducts(INITIAL_PRODUCTS);
      }
    });

    return () => unsubscribe();
  }, []);

  const [activeCategory, setActiveCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [customCategories, setCustomCategories] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastProduct, setToastProduct] = useState(null);
  const [viewMode, setViewMode] = useState('home'); // 'home' or 'catalog'
  
  // Cart state persisted in localStorage
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('mstore_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('mstore_cart', JSON.stringify(cart));
  }, [cart]);

  // Navigate to catalog
  const navigateToCatalog = (categoryId = 'todos') => {
    setActiveCategory(categoryId);
    setViewMode('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to home
  const navigateToHome = () => {
    setViewMode('home');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add to Cart
  const handleAddToCart = (product, selectedVariant = null) => {
    setCart((prev) => {
      const itemKey = selectedVariant 
        ? `${product.id}-${selectedVariant.capacity || ''}-${selectedVariant.color || ''}`
        : product.id;
      
      const existing = prev.find((item) => item.cartKey === itemKey || item.id === product.id);
      
      if (existing) {
        return prev.map((item) =>
          (item.cartKey === itemKey || item.id === product.id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      const itemPrice = selectedVariant?.price ? parseFloat(selectedVariant.price) : parseFloat(product.price || 0);

      return [
        ...prev,
        {
          ...product,
          cartKey: itemKey,
          price: itemPrice,
          selectedStorage: selectedVariant?.capacity || selectedVariant?.storage || null,
          selectedColor: selectedVariant?.color || null,
          quantity: 1
        }
      ];
    });

    // Disparar Toast flotante en lugar de forzar la apertura del Drawer
    setToastProduct(product);
  };

  // Update quantity
  const handleUpdateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
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
          onSelectCategory={(catId) => navigateToCatalog(catId)}
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
            {/* 1. HERO BANNER PRINCIPAL */}
            <Hero 
              onCategorySelect={(catId) => navigateToCatalog(catId)}
              onExploreClick={() => navigateToCatalog('todos')}
              onQuickViewHero={(p) => setQuickViewProduct(p)}
            />

            {/* 2. BARRA DE CONFIANZA, GARANTÍAS Y MARCAS OFICIALES */}
            <TrustBar />

            {/* 3. OFERTAS RELÁMPAGO CON CRONÓMETRO EN VIVO */}
            <FlashDealsSection 
              products={products}
              onAddToCart={handleAddToCart}
              onQuickView={(p) => setQuickViewProduct(p)}
            />

            {/* 4. SECCIONES CENTRALES DE PRODUCTOS DESTACADOS */}
            <main className="bg-slate-50 pb-16">
              
              <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 sm:py-12 space-y-14 sm:space-y-16">
                
                {/* Bloque 1: Smartphones */}
                <CategoryShowcaseSection 
                  title="Flagships & Smartphones Más Vendidos"
                  subtitle="Última tecnología de Apple, Samsung y Xiaomi con garantía oficial de 1 año"
                  categoryFilterId="smartphones"
                  products={products}
                  onSelectCategory={(catId) => navigateToCatalog(catId)}
                  onAddToCart={handleAddToCart}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />

                {/* BANNERS PROMOCIONALES DIVIDIDOS (FLAGSHIPS & GAMING) */}
                <PromoBanners onSelectCategory={(catId) => navigateToCatalog(catId)} />

                {/* Bloque 2: Smart TVs y Audio */}
                <CategoryShowcaseSection 
                  title="Smart TVs 4K & Entretenimiento"
                  subtitle="Pantallas OLED, QLED y barras de sonido de alta fidelidad"
                  categoryFilterId="linea-blanca"
                  products={products}
                  onSelectCategory={(catId) => navigateToCatalog(catId)}
                  onAddToCart={handleAddToCart}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />

                {/* Bloque 3: Computación */}
                <CategoryShowcaseSection 
                  title="Laptops & Computación Pro"
                  subtitle="Equipos de alto rendimiento para trabajo profesional, oficina y gaming"
                  categoryFilterId="computacion"
                  products={products}
                  onSelectCategory={(catId) => navigateToCatalog(catId)}
                  onAddToCart={handleAddToCart}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              </div>

              {/* 5. TIENDA FÍSICA & UBICACIÓN */}
              <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
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
