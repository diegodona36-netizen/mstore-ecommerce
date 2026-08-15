/**
 * ====================================================================
 * BASE DE DATOS DE PRODUCTOS DE M STORE
 * ====================================================================
 */

export const PRODUCTS = [
  // --- 1. SMARTPHONES ---
  {
    id: 'm-phone-01',
    name: 'iPhone 16 Pro Max 1TB',
    category: 'smartphones',
    tag: 'Flagship 2026',
    price: 1599,
    oldPrice: 1749,
    rating: 4.9,
    reviewsCount: 128,
    hasCashea: true,
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
    tag: 'Galaxy AI',
    price: 1399,
    oldPrice: 1499,
    rating: 4.9,
    reviewsCount: 94,
    hasCashea: true,
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
    id: 'm-phone-03',
    name: 'Google Pixel 9 Pro Fold',
    category: 'smartphones',
    tag: 'Plegable Insignia',
    price: 1799,
    oldPrice: 1899,
    rating: 4.8,
    reviewsCount: 42,
    hasCashea: true,
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
    id: 'm-phone-04',
    name: 'Xiaomi 14 Ultra Leica Pro',
    category: 'smartphones',
    tag: 'Óptica Leica',
    price: 1199,
    oldPrice: 1299,
    rating: 4.9,
    reviewsCount: 63,
    hasCashea: true,
    description: 'Cuádruple cámara Leica de 50MP con sensor de 1 pulgada, Snapdragon 8 Gen 3 y carga de 90W.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    colors: ['#0A0A0A', '#FFFFFF'],
    specs: {
      pantalla: '6.73" AMOLED WQHD+ 120Hz',
      procesador: 'Snapdragon 8 Gen 3',
      camara: '50MP 1" + 50MP + 50MP + 50MP Leica',
      bateria: '5000 mAh | Carga 90W'
    },
    inStock: true
  },

  // --- 2. LAPTOPS & COMPUTACIÓN PRO ---
  {
    id: 'm-pc-01',
    name: 'MacBook Pro 16" M3 Max 36GB / 1TB',
    category: 'computacion',
    tag: 'Poder Pro M3',
    price: 3499,
    oldPrice: 3799,
    rating: 5.0,
    reviewsCount: 47,
    hasCashea: true,
    description: 'Chip M3 Max de 14 núcleos CPU y 30 núcleos GPU, pantalla Liquid Retina XDR de 120Hz y 22h de batería.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    colors: ['#1E1E1E', '#E3E4E5'],
    specs: {
      pantalla: '16.2" Liquid Retina XDR 120Hz ProMotion',
      procesador: 'Apple M3 Max 14-core CPU',
      ram: '36GB Memoria Unificada',
      almacenamiento: '1TB SSD Ultra-Fast'
    },
    inStock: true
  },
  {
    id: 'm-pc-02',
    name: 'ASUS ROG Zephyrus G16 OLED RTX 4080',
    category: 'computacion',
    tag: 'Gaming & AI',
    price: 2699,
    oldPrice: 2899,
    rating: 4.9,
    reviewsCount: 35,
    hasCashea: true,
    description: 'Intel Core Ultra 9, NVIDIA RTX 4080 12GB, pantalla ROG Nebula OLED 2.5K 240Hz en chasis de aluminio CNC.',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
    colors: ['#1A1A1A', '#F0F0F0'],
    specs: {
      pantalla: '16" 2.5K OLED 240Hz 0.2ms',
      procesador: 'Intel Core Ultra 9 185H',
      grafica: 'NVIDIA GeForce RTX 4080 12GB GDDR6',
      ram: '32GB LPDDR5X + 1TB PCIe 4.0 SSD'
    },
    inStock: true
  },
  {
    id: 'm-pc-03',
    name: 'Dell XPS 14 OLED Intel Core Ultra 7',
    category: 'computacion',
    tag: 'Ultra Portable',
    price: 1899,
    oldPrice: 2099,
    rating: 4.8,
    reviewsCount: 28,
    hasCashea: true,
    description: 'Pantalla InfinityEdge táctil 3.2K OLED, chasis de aluminio mecanizado y touchpad de cristal continuo.',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    colors: ['#C0C0C0', '#1C1C1C'],
    specs: {
      pantalla: '14.5" 3.2K OLED Touch 120Hz',
      procesador: 'Intel Core Ultra 7 155H',
      ram: '16GB LPDDR5X + 1TB SSD'
    },
    inStock: true
  },
  {
    id: 'm-pc-04',
    name: 'MacBook Air 13" M3 16GB / 512GB',
    category: 'computacion',
    tag: 'Más Vendida',
    price: 1299,
    oldPrice: 1399,
    rating: 4.9,
    reviewsCount: 89,
    hasCashea: true,
    description: 'Increíblemente delgada y rápida con chip M3, pantalla Liquid Retina y hasta 18 horas de batería.',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
    colors: ['#2E333D', '#E2E4E1', '#E7D7C1'],
    specs: {
      pantalla: '13.6" Liquid Retina 500 nits',
      procesador: 'Apple M3 8-core CPU / 10-core GPU',
      ram: '16GB Memoria Unificada',
      almacenamiento: '512GB SSD'
    },
    inStock: true
  },

  // --- 3. AUDIO HI-FI & AURICULARES ---
  {
    id: 'm-audio-01',
    name: 'AirPods Max Titanium Deep Obsidian',
    category: 'audio',
    tag: 'Audio Hi-Fi',
    price: 549,
    oldPrice: 599,
    rating: 4.8,
    reviewsCount: 76,
    hasCashea: true,
    description: 'Cancelación Activa de Ruido profesional, Audio Espacial personalizado y ecualización adaptativa.',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    colors: ['#0A0A0A', '#00E5FF', '#E5E5E5'],
    specs: {
      driver: 'Driver dinámico diseñado por Apple',
      cancelacion: 'Cancelación Activa de Ruido + Modo Ambiente',
      autonomia: 'Hasta 20 horas continuas con ANC'
    },
    inStock: true
  },
  {
    id: 'm-audio-02',
    name: 'Sony WH-1000XM5 Dark Cyber',
    category: 'audio',
    tag: 'Top Ruido Cero',
    price: 399,
    oldPrice: 449,
    rating: 4.9,
    reviewsCount: 142,
    hasCashea: true,
    description: 'Procesador V1 HD, 8 micrófonos dedicados y llamadas ultra nítidas con inteligencia artificial.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    colors: ['#121212', '#C0C0C0'],
    specs: {
      driver: '30mm de cúpula blanda de fibra de carbono',
      cancelacion: 'Dual Noise Sensor V1 + QN1',
      autonomia: 'Hasta 30 horas continuas'
    },
    inStock: true
  },
  {
    id: 'm-audio-03',
    name: 'AirPods Pro 2da Generación USB-C',
    category: 'audio',
    tag: 'Chip H2 Apple',
    price: 249,
    oldPrice: 279,
    rating: 4.9,
    reviewsCount: 210,
    hasCashea: true,
    description: 'Cancelación Activa de Ruido 2x más potente, Audio Adaptativo, detección de conversación y estuche MagSafe USB-C.',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
    colors: ['#FFFFFF'],
    specs: {
      procesador: 'Chip Apple H2 + U1 en estuche',
      cancelacion: 'Cancelación Activa 2x + Modo Ambiente',
      autonomia: 'Hasta 30h de audio con estuche'
    },
    inStock: true
  },
  {
    id: 'm-audio-04',
    name: 'Bose QuietComfort Ultra Headphones',
    category: 'audio',
    tag: 'Audio Inmersivo',
    price: 429,
    oldPrice: 479,
    rating: 4.8,
    reviewsCount: 59,
    hasCashea: true,
    description: 'Tecnología Bose Immersive Audio, tecnología CustomTune que calibra el sonido según tus oídos y máxima comodidad.',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
    colors: ['#1A1A1A', '#F0EDE6'],
    specs: {
      cancelacion: 'Quiet Mode, Aware Mode e Inmersión',
      autonomia: 'Hasta 24 horas continuas',
      materiales: 'Cuero sintético suave y aluminio fundido'
    },
    inStock: true
  },

  // --- 4. ZONA GAMING & CONSOLAS ---
  {
    id: 'm-game-01',
    name: 'Sony PlayStation 5 Pro 2TB Digital Edition',
    category: 'gaming',
    tag: 'PS5 Pro 2026',
    price: 799,
    oldPrice: 899,
    rating: 5.0,
    reviewsCount: 88,
    hasCashea: true,
    description: 'GPU con 67% más Compute Units, Ray Tracing avanzado, PlayStation Spectral Super Resolution (PSSR) y SSD de 2TB.',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
    colors: ['#FFFFFF', '#121212'],
    specs: {
      almacenamiento: '2TB SSD NVMe de ultra alta velocidad',
      resolucion: 'Soporte 4K 120Hz & 8K HDR con PSSR',
      audio: 'Tempest 3D AudioTech'
    },
    inStock: true
  },
  {
    id: 'm-game-02',
    name: 'Nintendo Switch OLED Mario Red Edition',
    category: 'gaming',
    tag: 'Pantalla OLED 7"',
    price: 349,
    oldPrice: 389,
    rating: 4.9,
    reviewsCount: 115,
    hasCashea: true,
    description: 'Pantalla OLED de 7 pulgadas con colores intensos y alto contraste, soporte ajustable amplio y 64GB de almacenamiento.',
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80',
    colors: ['#E60012', '#FFFFFF'],
    specs: {
      pantalla: '7.0" OLED Multitáctil capacitiva',
      audio: 'Altavoces integrados con audio optimizado',
      almacenamiento: '64GB expandible con MicroSD hasta 2TB'
    },
    inStock: true
  },
  {
    id: 'm-game-03',
    name: 'ASUS ROG Ally X 1TB Consola Portátil',
    category: 'gaming',
    tag: 'AMD Ryzen Z1 Extreme',
    price: 799,
    oldPrice: 849,
    rating: 4.9,
    reviewsCount: 47,
    hasCashea: true,
    description: 'Windows 11 nativo, procesador AMD Ryzen Z1 Extreme, 24GB LPDDR5X a 7500MHz y batería de 80Wh para jugar sin límites.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    colors: ['#121212'],
    specs: {
      pantalla: '7" FHD 120Hz 500 nits FreeSync Premium',
      procesador: 'AMD Ryzen Z1 Extreme (8 núcleos / 16 hilos)',
      ram: '24GB LPDDR5X + 1TB PCIe 4.0 SSD'
    },
    inStock: true
  },
  {
    id: 'm-game-04',
    name: 'Control Inalámbrico DualSense Edge PS5',
    category: 'gaming',
    tag: 'Control Pro',
    price: 199,
    oldPrice: 229,
    rating: 4.8,
    reviewsCount: 62,
    hasCashea: true,
    description: 'Tapas de joystick intercambiables, botones traseros remapeables, topes de gatillo ajustables y retroalimentación háptica.',
    image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=800&q=80',
    colors: ['#FFFFFF'],
    specs: {
      compatibilidad: 'PS5, PC, Mac, iOS y Android',
      gatillos: 'Gatillos adaptativos con ajuste de recorrido',
      conectividad: 'Inalámbrico Bluetooth + USB-C trenzado'
    },
    inStock: true
  },

  // --- 5. SMART TVS & AUDIO (LINEA BLANCA) ---
  {
    id: 'm-home-01',
    name: 'Samsung Neo QLED 4K 65" Cyber Smart TV',
    category: 'linea-blanca',
    tag: 'Smart Home AI',
    price: 1899,
    oldPrice: 2199,
    rating: 4.9,
    reviewsCount: 38,
    hasCashea: true,
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
  },
  {
    id: 'm-home-02',
    name: 'LG OLED evo C4 55" 4K Cinema Gaming',
    category: 'linea-blanca',
    tag: 'OLED Puro 144Hz',
    price: 1499,
    oldPrice: 1699,
    rating: 4.9,
    reviewsCount: 52,
    hasCashea: true,
    description: 'Píxeles autoiluminados perfectos, procesador α9 AI 4K Gen7, 4 puertos HDMI 2.1 y G-Sync.',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80',
    colors: ['#1A1A1A'],
    specs: {
      pantalla: '55" OLED 4K UHD 144Hz 0.1ms',
      procesador: 'Alpha 9 AI Gen 7',
      sonido: 'Dolby Atmos & Vision IQ',
      puertos: '4x HDMI 2.1 VRR 4K@144Hz'
    },
    inStock: true
  },
  {
    id: 'm-home-03',
    name: 'Sony BRAVIA XR 75" Mini LED 4K',
    category: 'linea-blanca',
    tag: 'Cine en Casa',
    price: 2499,
    oldPrice: 2799,
    rating: 5.0,
    reviewsCount: 29,
    hasCashea: true,
    description: 'Cognitive Processor XR, Acoustic Multi-Audio y control preciso de retroiluminación Mini LED.',
    image: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=800&q=80',
    colors: ['#0B0F17'],
    specs: {
      pantalla: '75" XR Triluminos Pro Mini-LED',
      procesador: 'Cognitive Processor XR',
      gaming: 'Optimizado para PlayStation 5'
    },
    inStock: true
  },
  {
    id: 'm-home-04',
    name: 'Barra de Sonido JBL Bar 1000 7.1.4 Dolby Atmos',
    category: 'linea-blanca',
    tag: 'Audio Envolvente',
    price: 899,
    oldPrice: 1050,
    rating: 4.9,
    reviewsCount: 41,
    hasCashea: true,
    description: '880W de potencia total, altavoces traseros desmontables inalámbricos y subwoofer de 10 pulgadas.',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    colors: ['#0A0A0A'],
    specs: {
      canales: '7.1.4 canales con altavoces desmontables',
      potencia: '880 Watts RMS',
      conectividad: 'HDMI eARC, Wi-Fi 6, AirPlay 2'
    },
    inStock: true
  },

  // --- 6. WEARABLES & SMARTWATCHES ---
  {
    id: 'm-wear-01',
    name: 'Apple Watch Ultra 2 Titanium 49mm',
    category: 'wearables',
    tag: 'Titanio Aeroespacial',
    price: 799,
    oldPrice: 849,
    rating: 4.9,
    reviewsCount: 92,
    hasCashea: true,
    description: 'Caja de titanio de 49mm resistente a 100m, pantalla de 3000 nits, chip S9 SiP y GPS de doble frecuencia.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    colors: ['#948B7D', '#1A1A1A'],
    specs: {
      pantalla: '49mm Retina OLED 3000 nits',
      procesador: 'Apple S9 SiP con gesto de doble toque',
      bateria: 'Hasta 36 horas de uso normal / 72h bajo consumo'
    },
    inStock: true
  },
  {
    id: 'm-wear-02',
    name: 'Samsung Galaxy Watch Ultra 47mm LTE',
    category: 'wearables',
    tag: 'Titanio Grado 4',
    price: 649,
    oldPrice: 699,
    rating: 4.8,
    reviewsCount: 54,
    hasCashea: true,
    description: 'Diseño ultra resistente con cristal de zafiro, procesador 3nm, sensor BioActive y Galaxy AI para métricas de salud.',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    colors: ['#1C1C1C', '#C4C4C4'],
    specs: {
      pantalla: '1.5" Super AMOLED 3000 nits',
      procesador: 'Exynos W1000 (3nm)',
      resistencia: '10ATM + IP68 + MIL-STD-810H'
    },
    inStock: true
  }
];

export const INITIAL_PRODUCTS = PRODUCTS;

export const CATEGORIES = [
  { id: 'todos', label: 'Todos los Productos' },
  { id: 'smartphones', label: 'Smartphones Insignia' },
  { id: 'computacion', label: 'Laptops & Computación Pro' },
  { id: 'audio', label: 'Audio Hi-Fi & Auriculares' },
  { id: 'gaming', label: 'Zona Gaming & Consolas' },
  { id: 'linea-blanca', label: 'Smart TVs 4K & Cine' },
  { id: 'wearables', label: 'Smartwatches & Wearables' }
];
