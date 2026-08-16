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
import { ProductDetailPage } from './components/ProductDetailPage';
import { ArrowLeft, ChevronRight, Home } from 'lucide-react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from './lib/firebase';

export function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [customCategories, setCustomCategories] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);
  const [toastProduct, setToastProduct] = useState(null);
  const [viewMode, setViewMode] = useState('home'); // 'home', 'catalog', or 'product'

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

  // Listen to URL search params for deep linking (?producto=ID)
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const prodId = params.get('producto');
      if (prodId && products.length > 0) {
        const found = products.find(p => String(p.id) === String(prodId));
        if (found) {
          setSelectedProductDetail(found);
          setViewMode('product');
          return;
        }
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    handleUrlChange();
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, [products]);
  
  // Cart state persisted in localStorage
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('mstore_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('mstore_cart', JSON.stringify(cart));
  }, [cart]);

  // Open Dedicated Product Detail Page
  const openProductDetail = (product) => {
    setSelectedProductDetail(product);
    setViewMode('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('producto', product.id);
      window.history.pushState({ view: 'product', productId: product.id }, '', url.toString());
    } catch(e) {}
  };

  // Navigate to catalog
  const navigateToCatalog = (categoryId = 'todos') => {
    setActiveCategory(categoryId);
    setSelectedProductDetail(null);
    setViewMode('catalog');
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('producto');
      window.history.pushState({}, '', url.toString());
    } catch(e) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to home
  const navigateToHome = () => {
    setSelectedProductDetail(null);
    setViewMode('home');
    setSearchQuery('');
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('producto');
      window.history.pushState({}, '', url.toString());
    } catch(e) {}
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
          onSearchChange={(q) => setSearchQuery(q)}
          onSearchSubmit={() => {
            if (searchQuery.trim()) {
              setViewMode('catalog');
            }
          }}
          products={products}
          onQuickView={(p) => openProductDetail(p)}
          onNavigateHome={navigateToHome}
          onSelectCategory={(catId) => navigateToCatalog(catId)}
          hideCategoryRibbon={viewMode === 'product'}
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
            {/* 1. BARRA DE CONFIANZA, CASHEA, ENVÍOS Y MARCAS OFICIALES (ARRIBA DEL HERO) */}
            <TrustBar />

            {/* 2. HERO BANNER PRINCIPAL */}
            <Hero 
              onCategorySelect={(catId) => navigateToCatalog(catId)}
              onExploreClick={() => navigateToCatalog('todos')}
              onQuickViewHero={(p) => openProductDetail(p)}
            />

            {/* 3. CONTENEDOR PRINCIPAL DE MÓDULOS PERFECTAMENTE SEGMENTADOS */}
            <main className="bg-[#F1F5F9] py-8 sm:py-12 border-t border-slate-200/80">
              
              <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-8 sm:space-y-10">
                
                {/* Módulo 1: OFERTAS RELÁMPAGO (DARK TECH LUXURY CARD) */}
                <FlashDealsSection 
                  products={products}
                  onAddToCart={handleAddToCart}
                  onQuickView={(p) => openProductDetail(p)}
                />

                {/* Módulo 2: Categoría Smartphones */}
                <CategoryShowcaseSection 
                  title="Smartphones & Telefonía Insignia"
                  subtitle="Última tecnología de Apple, Samsung, Google y Xiaomi con garantía oficial de 1 año"
                  categoryFilterId="smartphones"
                  products={products}
                  onSelectCategory={(catId) => navigateToCatalog(catId)}
                  onAddToCart={handleAddToCart}
                  onQuickView={(p) => openProductDetail(p)}
                />

                {/* Módulo 3: Categoría Laptops & Computación */}
                <CategoryShowcaseSection 
                  title="Laptops & Computación Pro"
                  subtitle="Equipos de alto rendimiento para trabajo profesional, desarrollo y creatividad"
                  categoryFilterId="computacion"
                  products={products}
                  onSelectCategory={(catId) => navigateToCatalog(catId)}
                  onAddToCart={handleAddToCart}
                  onQuickView={(p) => openProductDetail(p)}
                />

                {/* Módulo 4: BANNERS PROMOCIONALES DIVIDIDOS (FLAGSHIPS & GAMING) */}
                <PromoBanners onSelectCategory={(catId) => navigateToCatalog(catId)} />

                {/* Módulo 5: Categoría Audio Hi-Fi */}
                <CategoryShowcaseSection 
                  title="Audio Hi-Fi & Auriculares Premium"
                  subtitle="Cancelación de ruido líder, audio espacial y potencia acústica profesional"
                  categoryFilterId="audio"
                  products={products}
                  onSelectCategory={(catId) => navigateToCatalog(catId)}
                  onAddToCart={handleAddToCart}
                  onQuickView={(p) => openProductDetail(p)}
                />

                {/* Módulo 6: Categoría Gaming & Consolas */}
                <CategoryShowcaseSection 
                  title="Zona Gaming & Consolas"
                  subtitle="PlayStation 5 Pro, Nintendo Switch OLED, consolas portátiles y controles pro"
                  categoryFilterId="gaming"
                  products={products}
                  onSelectCategory={(catId) => navigateToCatalog(catId)}
                  onAddToCart={handleAddToCart}
                  onQuickView={(p) => openProductDetail(p)}
                />

                {/* Módulo 7: Categoría Smart TVs 4K & Cine */}
                <CategoryShowcaseSection 
                  title="Smart TVs 4K & Cine en Casa"
                  subtitle="Pantallas OLED, Mini LED 144Hz y sistemas de sonido envolvente"
                  categoryFilterId="linea-blanca"
                  products={products}
                  onSelectCategory={(catId) => navigateToCatalog(catId)}
                  onAddToCart={handleAddToCart}
                  onQuickView={(p) => openProductDetail(p)}
                />

                {/* Módulo 8: Categoría Wearables & Smartwatches */}
                <CategoryShowcaseSection 
                  title="Smartwatches & Wearables"
                  subtitle="Monitoreo de salud avanzado, GPS satelital y conectividad total en tu muñeca"
                  categoryFilterId="wearables"
                  products={products}
                  onSelectCategory={(catId) => navigateToCatalog(catId)}
                  onAddToCart={handleAddToCart}
                  onQuickView={(p) => openProductDetail(p)}
                />

                {/* Módulo 9: TIENDA FÍSICA & UBICACIÓN ENMARCADA */}
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
                onQuickView={(product) => openProductDetail(product)}
                searchQuery={searchQuery}
                customCategories={customCategories}
                isLightBg={true}
              />
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VISTA 3: DEDICATED PRODUCT DETAIL VIEW (AMAZON / MERCADOLIBRE STYLE)     */}
        {/* ========================================================================= */}
        {viewMode === 'product' && selectedProductDetail && (
          <ProductDetailPage
            product={selectedProductDetail}
            allProducts={products}
            onBack={navigateToHome}
            onAddToCart={handleAddToCart}
            onSelectProduct={(product) => openProductDetail(product)}
          />
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
