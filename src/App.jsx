import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BentoGrid } from './components/BentoGrid';
import { ProductCarousel } from './components/ProductCarousel';
import { BenefitsBanner } from './components/BenefitsBanner';
import { LocationSection } from './components/LocationSection';
import { QuickViewModal } from './components/QuickViewModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { CategoryMegaMenu } from './components/CategoryMegaMenu';
import { CartDrawer } from './components/CartDrawer';
import { WhatsappButton } from './components/WhatsappButton';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { PRODUCTS as INITIAL_PRODUCTS } from './data/products';

export function App() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('mstore_custom_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return [...parsed, ...INITIAL_PRODUCTS];
      } catch (e) {
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  });

  const [customCategories, setCustomCategories] = useState(() => {
    const savedCats = localStorage.getItem('mstore_custom_categories');
    if (savedCats) {
      try { return JSON.parse(savedCats); } catch(e){}
    }
    return [];
  });

  const [activeCategory, setActiveCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastData, setToastData] = useState(null);

  useEffect(() => {
    const handleHashCheck = () => {
      if (window.location.hash === '#admin' || window.location.pathname.endsWith('/admin')) {
        setIsAdminOpen(true);
      }
    };
    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);

    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAdminOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleHashCheck);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleAddProductFromAdmin = (newProd) => {
    setProducts(prev => [newProd, ...prev]);

    const savedCustoms = localStorage.getItem('mstore_custom_products');
    let customs = [];
    if (savedCustoms) {
      try { customs = JSON.parse(savedCustoms); } catch(e){}
    }
    localStorage.setItem('mstore_custom_products', JSON.stringify([newProd, ...customs]));

    setToastData({
      product: newProd,
      message: `¡Producto "${newProd.name}" cargado con éxito!`
    });
  };

  const handleUpdateProductFromAdmin = (updatedProd) => {
    setProducts(prev => {
      const exists = prev.some(p => p.id === updatedProd.id);
      if (exists) {
        return prev.map(p => p.id === updatedProd.id ? updatedProd : p);
      }
      return [updatedProd, ...prev];
    });

    const savedCustoms = localStorage.getItem('mstore_custom_products');
    let customs = [];
    if (savedCustoms) {
      try { customs = JSON.parse(savedCustoms); } catch(e){}
    }
    const filteredCustoms = customs.filter(c => c.id !== updatedProd.id);
    localStorage.setItem('mstore_custom_products', JSON.stringify([updatedProd, ...filteredCustoms]));

    setToastData({
      product: updatedProd,
      message: `¡Producto "${updatedProd.name}" actualizado!`
    });
  };

  const handleRemoveProductFromAdmin = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    const savedCustoms = localStorage.getItem('mstore_custom_products');
    if (savedCustoms) {
      try {
        const customs = JSON.parse(savedCustoms);
        const filtered = customs.filter(c => c.id !== productId);
        localStorage.setItem('mstore_custom_products', JSON.stringify(filtered));
      } catch(e){}
    }
  };

  const handleAddCategory = (newCat) => {
    setCustomCategories(prev => [...prev, newCat]);
    const savedCats = localStorage.getItem('mstore_custom_categories');
    let cats = [];
    if (savedCats) {
      try { cats = JSON.parse(savedCats); } catch(e){}
    }
    localStorage.setItem('mstore_custom_categories', JSON.stringify([...cats, newCat]));
  };

  const handleRemoveCategory = (catId) => {
    setCustomCategories(prev => prev.filter(c => c.id !== catId));
    const savedCats = localStorage.getItem('mstore_custom_categories');
    if (savedCats) {
      try {
        const cats = JSON.parse(savedCats);
        const filtered = cats.filter(c => c.id !== catId);
        localStorage.setItem('mstore_custom_categories', JSON.stringify(filtered));
      } catch(e){}
    }
  };

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    setToastData({
      product,
      message: `¡${product.name} añadido al Carrito VIP!`
    });
  };

  const handleUpdateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleToggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]);
  };

  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // DEFAULT MAIN PRODUCTION PAGE (EXACT ORIGINAL WEB M STORE REPLICA)
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

      {/* 3. CONTENEDOR CENTRAL BLANCO (LO BLANCO EN EL MEDIO) */}
      <div className="bg-white text-slate-900 border-t border-b border-slate-200 font-inter">
        
        {/* Bento Grid Categorías Vanguardia */}
        <BentoGrid 
          isLightBg={true}
          onSelectCategory={(catId) => {
            setActiveCategory(catId);
            const catalogEl = document.getElementById('catalogo');
            if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
          }} 
        />

        {/* Carrusel & Catálogo de Productos en Fondo Blanco */}
        <div id="catalogo" className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <ProductCarousel
            products={products}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            onAddToCart={handleAddToCart}
            onQuickView={(product) => setQuickViewProduct(product)}
            searchQuery={searchQuery}
            customCategories={customCategories}
          />
        </div>

        {/* Módulo de Beneficios & Garantía M Store */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
          <BenefitsBanner />
        </div>

        {/* Sección Tienda Física & Mapa Google Maps */}
        <LocationSection isLightBg={true} />

      </div>

      {/* 4. FOOTER (DARK CYBER) */}
      <Footer />

      {/* MODALES Y ELEMENTOS FLOTANTES */}
      {quickViewProduct && (
        <QuickViewModal 
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={favorites.includes(quickViewProduct.id)}
        />
      )}

      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => {
          setIsAdminOpen(false);
          if (window.location.hash === '#admin') {
            window.history.pushState('', document.title, window.location.pathname);
          }
        }}
        products={products}
        onAddProduct={handleAddProductFromAdmin}
        onUpdateProduct={handleUpdateProductFromAdmin}
        onRemoveProduct={handleRemoveProductFromAdmin}
        categories={customCategories}
        onAddCategory={handleAddCategory}
        onRemoveCategory={handleRemoveCategory}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
      />

      {toastData && (
        <Toast product={toastData.product} message={toastData.message} onClose={() => setToastData(null)} />
      )}

      <MobileBottomNav
        cartCount={cartTotalCount}
        onOpenMegaMenu={() => setIsMegaMenuOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onScrollToLocation={() => {
          const el = document.getElementById('ubicacion');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <WhatsappButton />

    </div>
  );
}

export default App;
