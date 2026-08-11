/* ==========================================================================
   M STORE — LÓGICA DE CATÁLOGO Y COMPRA EN JAVASCRIPT (main.js)
   ========================================================================== */

// 1. CONFIGURACIÓN E INVENTARIO COMPLETO DE PRODUCTOS
const WHATSAPP_PHONE = '584120000000'; // Reemplazar con el número oficial de M Store

const PRODUCTS_DATA = [
  {
    id: 'm1',
    brand: 'Apple',
    name: 'iPhone 15 Pro Max 256GB Titanio Natural',
    price: 1199.00,
    rating: 5.0,
    reviews: 142,
    badges: ['Paga con Cashea', 'Aceptamos Krece'],
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'm2',
    brand: 'Samsung',
    name: 'Samsung Galaxy S25 Ultra 512GB / 12GB RAM',
    price: 910.00,
    rating: 4.9,
    reviews: 98,
    badges: ['Paga con Cashea', 'Aceptamos Krece'],
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'm3',
    brand: 'Honor',
    name: 'Honor 600e 256GB / 8GB RAM (MediaTek Dimensity 7100)',
    price: 451.00,
    rating: 4.9,
    reviews: 74,
    badges: ['Paga con Cashea', 'Aceptamos Krece'],
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'm4',
    brand: 'Xiaomi',
    name: 'Xiaomi Redmi Note 13 Pro+ 5G 512GB / 12GB RAM',
    price: 389.00,
    rating: 4.8,
    reviews: 115,
    badges: ['Paga con Cashea', 'Aceptamos Krece'],
    image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'm5',
    brand: 'Tecno',
    name: 'Tecno Spark 30 Pro 256GB / 8GB RAM – Negro',
    price: 149.00,
    rating: 4.7,
    reviews: 210,
    badges: ['Paga con Cashea', 'Aceptamos Krece'],
    image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'm6',
    brand: 'Infinix',
    name: 'Infinix Note 40 Pro 256GB / 12GB RAM Carga 70W',
    price: 229.00,
    rating: 4.9,
    reviews: 86,
    badges: ['Paga con Cashea', 'Aceptamos Krece'],
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'm7',
    brand: 'Apple',
    name: 'Apple AirPods Pro (2da Generación) USB-C',
    price: 249.00,
    rating: 5.0,
    reviews: 310,
    badges: ['Paga con Cashea', 'Aceptamos Krece'],
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'm8',
    brand: 'Samsung',
    name: 'Samsung Galaxy Watch 6 Classic 47mm Bluetooth',
    price: 299.00,
    rating: 4.8,
    reviews: 64,
    badges: ['Paga con Cashea', 'Aceptamos Krece'],
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop'
  }
];

// Estado global de la aplicación
let currentBrandFilter = 'todos';
let searchQuery = '';

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupEventListeners();
});

// 2. RENDERIZADO DINÁMICO DE TARJETAS DE PRODUCTO
function renderProducts() {
  const gridContainer = document.getElementById('productsGrid');
  if (!gridContainer) return;

  const filtered = PRODUCTS_DATA.filter(product => {
    const matchesBrand = currentBrandFilter === 'todos' || product.brand.toLowerCase() === currentBrandFilter.toLowerCase();
    const matchesSearch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesSearch;
  });

  if (filtered.length === 0) {
    gridContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: #FFFFFF; border-radius: 24px; border: 1px solid #E2E8F0;">
        <i class="fa-solid fa-box-open" style="font-size: 2.5rem; color: #64748B; margin-bottom: 1rem;"></i>
        <h3 style="font-weight: 800; color: #0F172A;">No se encontraron productos</h3>
        <p style="font-size: 0.85rem; color: #64748B;">Intenta seleccionar otra marca o limpiar el filtro de búsqueda.</p>
      </div>
    `;
    return;
  }

  gridContainer.innerHTML = filtered.map(product => `
    <div class="product-card">
      <div>
        <div class="product-badges">
          ${product.badges.map(b => `
            <span class="p-badge ${b.includes('Cashea') ? 'cashea' : 'krece'}">${b}</span>
          `).join('')}
        </div>

        <div class="product-img-wrapper">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
        </div>

        <div class="product-rating">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <span>(${product.rating} / ${product.reviews} reseñas)</span>
        </div>

        <h3 class="product-title">${product.name}</h3>

        <div class="product-price-row">
          <span class="product-price">$${product.price.toFixed(2)}</span>
          <span class="product-currency">USD</span>
        </div>
      </div>

      <button class="btn-add-cart" onclick="sendWhatsAppOrder('${product.name}', ${product.price})">
        <i class="fa-brands fa-whatsapp"></i>
        <span>Agregar al pedido</span>
      </button>
    </div>
  `).join('');
}

// 3. LÓGICA DE NAVEGACIÓN Y PESTAÑAS DE MARCA
function setupEventListeners() {
  // Pestañas de Marcas
  const tabButtons = document.querySelectorAll('#brandTabs .tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      tabButtons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentBrandFilter = e.target.getAttribute('data-brand');
      renderProducts();
    });
  });

  // Buscador en tiempo real
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderProducts();
    });
  }

  // Tarjetas de categorías
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.getAttribute('data-category');
      const catalogEl = document.getElementById('catalogo');
      if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// 4. INTEGRACIÓN WHATSAPP API PARA BOTONES "AGREGAR AL PEDIDO"
function sendWhatsAppOrder(productName, productPrice) {
  const formattedPrice = `$${parseFloat(productPrice).toFixed(2)} USD`;
  const message = `Hola M Store, me interesa adquirir el producto ${productName} por ${formattedPrice}. ¿Está disponible?`;
  
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  
  // Incrementar contador de carrito visual para UX
  const cartBadge = document.getElementById('cartCount');
  if (cartBadge) {
    const current = parseInt(cartBadge.textContent || '0');
    cartBadge.textContent = current + 1;
  }

  // Abrir WhatsApp en nueva pestaña
  window.open(whatsappUrl, '_blank');
}
