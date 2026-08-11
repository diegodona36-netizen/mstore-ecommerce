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
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { LandingPageTest } from './components/LandingPageTest';
import { SoyTechnoExperiment } from './components/SoyTechnoExperiment';
import { SoyTechnoHomePage } from './components/SoyTechnoHomePage';
import { PRODUCTS as INITIAL_PRODUCTS } from './data/products';

export function App() {
  const [isOldMode, setIsOldMode] = useState(() => window.location.hash === '#vieja' || window.location.hash === '#old');
  const [isSoyTechnoMode, setIsSoyTechnoMode] = useState(() => window.location.hash === '#soytechno');
  const [isSoyTechnoHomeMode, setIsSoyTechnoHomeMode] = useState(() => window.location.hash === '#soytechno-home' || window.location.hash === '#soytechno-main');

  useEffect(() => {
    const handleHashChange = () => {
      setIsOldMode(window.location.hash === '#vieja' || window.location.hash === '#old');
      setIsSoyTechnoMode(window.location.hash === '#soytechno');
      setIsSoyTechnoHomeMode(window.location.hash === '#soytechno-home' || window.location.hash === '#soytechno-main');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (isSoyTechnoHomeMode) {
    return (
      <SoyTechnoHomePage 
        onBackToMain={() => { window.location.hash = ''; setIsSoyTechnoHomeMode(false); }} 
        onOpenCelularesCategory={() => { window.location.hash = '#soytechno'; }}
      />
    );
  }

  if (isSoyTechnoMode) {
    return <SoyTechnoExperiment onBackToMain={() => { window.location.hash = ''; setIsSoyTechnoMode(false); }} />;
  }

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
      setIsOldMode(window.location.hash === '#vieja' || window.location.hash === '#old');
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
      message: `¡Producto "${newProd.name}" cargado por el trabajador!`
    });
  };

  const handleUpdateProductFromAdmin = (updatedProd) => {
    setProducts(prev => {
      const exists = prev.some(p => p.id === updatedProd.id);
      if (exists) {
        return prev.map(p => p.id === updatedProd.id ? { ...p, ...updatedProd } : p);
      }
      return [updatedProd, ...prev];
    });

    const savedCustoms = localStorage.getItem('mstore_custom_products');
    let customs = [];
    if (savedCustoms) {
      try { customs = JSON.parse(savedCustoms); } catch(e){}
    }
    const updatedCustoms = customs.some(c => c.id === updatedProd.id)
      ? customs.map(c => c.id === updatedProd.id ? { ...c, ...updatedProd } : c)
      : [updatedProd, ...customs];

    localStorage.setItem('mstore_custom_products', JSON.stringify(updatedCustoms));

    setToastData({
      product: updatedProd,
      message: `¡Producto "${updatedProd.name}" actualizado!`
    });
  };

  const handleRemoveProductFromAdmin = (productId) => {
    setProducts(prev => {
      const updated = prev.filter(p => p.id !== productId);
      const savedCustoms = localStorage.getItem('mstore_custom_products');
      if (savedCustoms) {
        try {
          const customs = JSON.parse(savedCustoms);
          const filteredCustoms = customs.filter(c => c.id !== productId);
          localStorage.setItem('mstore_custom_products', JSON.stringify(filteredCustoms));
        } catch(e){}
      }
      return updated;
    });

    setToastData({
      product: { name: 'Producto' },
      message: 'Producto eliminado del catálogo.'
    });
  };

  const handleAddCategory = (newCat) => {
    setCustomCategories(prev => {
      const updated = [...prev, newCat];
      localStorage.setItem('mstore_custom_categories', JSON.stringify(updated));
      return updated;
    });
  };

  const handleRemoveCategory = (catId) => {
    setCustomCategories(prev => {
      const updated = prev.filter(c => c.id !== catId);
      localStorage.setItem('mstore_custom_categories', JSON.stringify(updated));
      return updated;
    });
  };

  const handleToggleFavorite = (productId) => {
    setFavorites(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const handleAddToCart = (product) => {
    const qty = product.quantity || 1;
    setCartItems(prevItems => {
      const existing = prevItems.find(item => item.id === product.id);
      if (existing) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: qty }];
    });

    setToastData({
      product,
      message: `${product.name} (x${qty}) se añadió a tu Carrito VIP.`
    });
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleExploreClick = () => {
    const catalogElement = document.getElementById('catalogo');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategoryFromBento = (catId) => {
    setActiveCategory(catId);
    handleExploreClick();
  };

  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // If in #vieja or #old route, render old legacy page
  if (isOldMode) {
    return (
      <div className="min-h-screen bg-[#0A0908] text-white font-inter selection:bg-[#00E5FF] selection:text-black">
        {/* Old page layout */}
        <Navbar
          cartCount={cartTotalCount}
          onOpenCart={() => setIsCartOpen(true)}
          onToggleMegaMenu={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
          isMegaMenuOpen={isMegaMenuOpen}
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q);
            if (q) handleExploreClick();
          }}
          onSearchSubmit={handleExploreClick}
        />
        <main>
          <Hero onExploreClick={handleExploreClick} onQuickViewHero={() => setQuickViewProduct(products[0])} />
          <BentoGrid onSelectCategory={handleSelectCategoryFromBento} />
          <ProductCarousel
            products={products}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            onAddToCart={handleAddToCart}
            onQuickView={setQuickViewProduct}
            searchQuery={searchQuery}
            customCategories={customCategories}
          />
          <LocationSection />
          <BenefitsBanner />
        </main>
        <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
        <CategoryMegaMenu
          isOpen={isMegaMenuOpen}
          onClose={() => setIsMegaMenuOpen(false)}
          onSelectCategory={handleSelectCategoryFromBento}
          customCategories={customCategories}
        />
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
        <WhatsappButton />
      </div>
    );
  }

  // DEFAULT MAIN PRODUCTION PAGE (NEW IMPROVED M STORE)
  return (
    <LandingPageTest 
      customCategories={customCategories}
      adminProducts={products}
      onAddProduct={handleAddProductFromAdmin}
      onUpdateProduct={handleUpdateProductFromAdmin}
      onRemoveProduct={handleRemoveProductFromAdmin}
      onAddCategory={handleAddCategory}
      onRemoveCategory={handleRemoveCategory}
    />
  );
}

export default App;
