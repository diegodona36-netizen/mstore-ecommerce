/**
 * ====================================================================
 * BASE DE DATOS DE PRODUCTOS DE M STORE
 * ====================================================================
 * 
 * GUÍA DE FORMATO PARA AGREGAR NUEVOS PRODUCTOS:
 * 
 * Copia y pega un bloque de objeto dentro del arreglo PRODUCTS con los siguientes campos:
 * 
 * {
 *   id: 'm-cat-01',                       // ID único (ej: m-phone-04, m-acc-03)
 *   name: 'Nombre del Producto',           // Nombre visible en catálogo y carrito
 *   category: 'smartphones',              // Categoría: 'smartphones', 'audio', 'wearables', 'accesorios'
 *   tag: 'Flagship 2026',                 // Etiqueta destacada (ej: 'Oferta', 'Nuevo', 'Top Ruido Cero')
 *   price: 1599,                          // Precio numérico en USD o tu moneda local
 *   originalPrice: 1749,                  // (Opcional) Precio original para mostrar descuento
 *   rating: 4.9,                          // Puntuación de 1.0 a 5.0
 *   reviewsCount: 128,                    // Cantidad de valoraciones de clientes
 *   description: 'Descripción breve...',  // Resumen explicativo de 1 a 2 líneas
 *   image: 'https://...',                 // URL de imagen (de preferencia con fondo oscuro o transparente)
 *   colors: ['#0A0A0A', '#00E5FF'],       // (Opcional) Códigos hex para selector de colores
 *   specs: {                              // (Opcional) Especificaciones técnicas clave para Quick View
 *     pantalla: '6.9" OLED 120Hz',
 *     procesador: 'Chip A18 Pro',
 *     camara: '48MP Triple Lens',
 *     bateria: '4685 mAh | Fast Charge'
 *   },
 *   inStock: true                         // Estado de disponibilidad
 * }
 */

export const PRODUCTS = [
  {
    id: 'm-phone-01',
    name: 'iPhone 16 Pro Max 1TB',
    category: 'smartphones',
    tag: 'Flagship 2026',
    price: 1599,
    originalPrice: 1749,
    rating: 4.9,
    reviewsCount: 128,
    description: 'Titanio Grado 5, Chip A18 Pro con Ray Tracing por hardware, cámara de 48MP y botón de Acción.',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    colors: ['#3A3B3C', '#E3E4E5', '#2B3844', '#C5A059'],
    specs: {
      pantalla: '6.9" Super Retina XDR OLED 120Hz',
      procesador: 'Apple A18 Pro (3nm)',
      camara: '48MP + 48MP Ultrawide + 12MP Telephoto 5x',
      bateria: '4685 mAh | Carga 45W'
    },
    inStock: true
  },
  {
    id: 'm-phone-02',
    name: 'Samsung Galaxy S24 Ultra 512GB',
    category: 'smartphones',
    tag: 'IA Avanzada',
    price: 1399,
    originalPrice: 1499,
    rating: 4.9,
    reviewsCount: 94,
    description: 'Marco de titanio, pantalla Dynamic AMOLED 2X brillante de 2600 nits, S Pen y Galaxy AI.',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    colors: ['#1D1E22', '#F1F0EA', '#4A5061', '#94806A'],
    specs: {
      pantalla: '6.8" Quad HD+ Dynamic AMOLED 2X',
      procesador: 'Snapdragon 8 Gen 3 for Galaxy',
      camara: '200MP + 50MP + 12MP + 10MP',
      bateria: '5000 mAh | Carga 45W'
    },
    inStock: true
  },
  {
    id: 'm-audio-01',
    name: 'AirPods Max Titanium Cyan',
    category: 'audio',
    tag: 'Audio Hi-Fi',
    price: 549,
    originalPrice: 599,
    rating: 4.8,
    reviewsCount: 76,
    description: 'Cancelación Activa de Ruido profesional, Audio Espacial personalizado y ecualización adaptativa.',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    colors: ['#0A0A0A', '#00E5FF', '#E5E5E5'],
    specs: {
      driver: 'Driver dinámico diseñado por Apple',
      cancelacion: 'Cancelación Activa de Ruido + Modo Ambiente',
      autonomia: 'Hasta 20 horas continuas con ANC',
      chip: 'Apple H1 en cada auricular'
    },
    inStock: true
  },
  {
    id: 'm-audio-02',
    name: 'Sony WH-1000XM5 Dark Cyber',
    category: 'audio',
    tag: 'Top Ruido Cero',
    price: 399,
    originalPrice: 449,
    rating: 4.9,
    reviewsCount: 142,
    description: 'Procesador V1 HD, 8 micrófonos dedicados y llamadas ultra nítidas con inteligencia artificial.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    colors: ['#121212', '#C0C0C0'],
    specs: {
      driver: '30mm de cúpula blanda de fibra de carbono',
      cancelacion: 'Dual Noise Sensor V1 + QN1',
      autonomia: 'Hasta 30 horas continuas',
      peso: '250 gramos de ultra confort'
    },
    inStock: true
  },
  {
    id: 'm-watch-01',
    name: 'Apple Watch Ultra 2 Titanium',
    category: 'wearables',
    tag: 'Ultra Resistente',
    price: 799,
    originalPrice: 849,
    rating: 5.0,
    reviewsCount: 65,
    description: 'Caja de titanio de 49mm resistente al agua hasta 100m, pantalla de 3000 nits y GPS dual.',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80',
    colors: ['#3A3B3C'],
    specs: {
      pantalla: '49mm Sapphire Crystal 3000 nits',
      resistencia: '100m ISO 22810 + Buceo EN13319',
      bateria: 'Hasta 36 horas / 72 horas ahorro',
      sensores: 'ECG, Oxígeno en Sangre, Temperatura'
    },
    inStock: true
  },
  {
    id: 'm-acc-01',
    name: 'MagSafe CyberPower 10,000mAh',
    category: 'accesorios',
    tag: 'Carga Ultra-Rápida',
    price: 89,
    originalPrice: 110,
    rating: 4.7,
    reviewsCount: 88,
    description: 'Batería magnética translúcida de cristal templado con pantalla LED digital y USB-C PD 30W.',
    image: 'https://images.unsplash.com/photo-1609592424082-70b16827376c?auto=format&fit=crop&w=800&q=80',
    colors: ['#0A0A0A', '#00E5FF'],
    specs: {
      capacidad: '10,000 mAh Li-Po alta densidad',
      inalambrico: '15W Qi2 MagSafe Certified',
      cable: 'PD 3.0 30W Fast Charge',
      material: 'Cristal templado y aleación de zinc'
    },
    inStock: true
  },
  {
    id: 'm-phone-03',
    name: 'Google Pixel 9 Pro Fold',
    category: 'smartphones',
    tag: 'Plegable Insignia',
    price: 1799,
    originalPrice: 1899,
    rating: 4.8,
    reviewsCount: 42,
    description: 'El teléfono plegable más delgado con chip Tensor G4, pantalla de 8" y Gemini Nano.',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    colors: ['#1A1A1A', '#E8E5DF'],
    specs: {
      pantalla: '8.0" LTPO OLED 120Hz desplegable',
      procesador: 'Google Tensor G4 + Titan M2',
      camara: '48MP + 10.5MP Ultra + 10.8MP Telephoto 5x',
      bateria: '4650 mAh | Carga inalámbrica'
    },
    inStock: true
  },
  {
    id: 'm-acc-02',
    name: 'Cyber-Case Titanium ShockGuard',
    category: 'accesorios',
    tag: 'Protección Premium',
    price: 49,
    originalPrice: 65,
    rating: 4.9,
    reviewsCount: 210,
    description: 'Funda militar de policarbonato con parachoques de titanio y soporte magnético giratorio 360°.',
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
    colors: ['#111111', '#00E5FF'],
    specs: {
      proteccion: 'Prueba de caída 4.5m (MIL-STD-810G)',
      magsafe: 'Matriz N52 imanes neodimio',
      soporte: 'Anillo giratorio de titanio 360°',
      peso: '42 gramos'
    },
    inStock: true
  },
  {
    id: 'm-home-01',
    name: 'Samsung Neo QLED 4K 65" Cyber Smart TV',
    category: 'linea-blanca',
    tag: 'Smart Home AI',
    price: 1899,
    originalPrice: 2199,
    rating: 4.9,
    reviewsCount: 38,
    description: 'Procesador NQ4 AI Gen2, tasa de refresco 144Hz, sonido Dolby Atmos 60W y hubs Matter para domótica.',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
    colors: ['#0A0A0A'],
    specs: {
      pantalla: '65" Neo QLED 4K 144Hz Quantum Matrix',
      procesador: 'NQ4 AI Gen2 (20 redes neuronales)',
      sonido: '60W 4.2.2CH Dolby Atmos & OTS+',
      domotica: 'Hub SmartThings & Matter integrado'
    },
    inStock: true
  }
];

export const INITIAL_PRODUCTS = PRODUCTS;

export const CATEGORIES = [
  { id: 'todos', label: 'Todos los Productos' },
  { id: 'smartphones', label: 'Smartphones Insignia' },
  { id: 'linea-blanca', label: 'Línea Blanca & Smart TV' },
  { id: 'audio', label: 'Audio High-End' },
  { id: 'wearables', label: 'Wearables & Relojes' },
  { id: 'accesorios', label: 'Accesorios Cyber' }
];

export const BENEFITS = [
  {
    id: 'shipping',
    title: 'Envío VIP Exprés',
    description: 'Entrega prioritaria asegurada a todo el país en 24h a 48h con rastreo en vivo.',
    icon: 'Truck'
  },
  {
    id: 'warranty',
    title: 'Garantía Oficial M Store',
    description: '1 a 2 años de garantía directa de fábrica con reemplazo inmediato.',
    icon: 'ShieldCheck'
  },
  {
    id: 'support',
    title: 'Asesoría Técnica 24/7',
    description: 'Especialistas tech listos para ayudarte a elegir el dispositivo perfecto por WhatsApp.',
    icon: 'Headphones'
  },
  {
    id: 'payment',
    title: 'Pagos Seguros & Cuotas',
    description: 'Aceptamos transferencias, tarjetas de crédito y cuotas sin interés.',
    icon: 'CreditCard'
  }
];
