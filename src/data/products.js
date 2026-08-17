/**
 * ====================================================================
 * BASE DE DATOS DE PRODUCTOS DE M STORE
 * ====================================================================
 * Catálogo completo y enriquecido con 12 productos de alta gama por categoría.
 */

export const PRODUCTS = [
  // ==========================================
  // --- 1. SMARTPHONES (12 Productos) ---
  // ==========================================
  {
    id: 'm-phone-01',
    name: 'iPhone 16 Pro Max 1TB',
    category: 'smartphones',
    tag: 'Flagship 2026',
    price: 1599,
    oldPrice: 1749,
    rating: 4.9,
    reviewsCount: 142,
    hasCashea: true,
    description: 'Titanio Grado 5, Chip A18 Pro con Ray Tracing por hardware, cámara de 48MP y botón de Control de Cámara.',
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
    price: 1349,
    oldPrice: 1499,
    rating: 4.9,
    reviewsCount: 115,
    hasCashea: true,
    description: 'Marco de titanio, pantalla Dynamic AMOLED 2X brillante de 2600 nits, S Pen integrado y funciones Galaxy AI avanzadas.',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    colors: ['#1D1E22', '#F1F0EA', '#4A5061', '#94806A'],
    specs: {
      pantalla: '6.8" Quad HD+ Dynamic AMOLED 2X 120Hz',
      procesador: 'Snapdragon 8 Gen 3 for Galaxy',
      camara: '200MP + 50MP 5x + 12MP + 10MP 3x',
      bateria: '5000 mAh | Carga 45W'
    },
    inStock: true
  },
  {
    id: 'm-phone-03',
    name: 'Samsung Galaxy Z Fold 6 512GB',
    category: 'smartphones',
    tag: 'Plegable Pro',
    price: 1899,
    oldPrice: 2099,
    rating: 4.8,
    reviewsCount: 68,
    hasCashea: true,
    description: 'Diseño ultrafino y ligero con doble pantalla Dynamic AMOLED 2X, bisagra FlexHinge reforzada y multitarea de escritorio.',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
    colors: ['#2F3542', '#C8D6E5', '#FF9FF3'],
    specs: {
      pantalla: '7.6" Principal + 6.3" Externa 120Hz',
      procesador: 'Snapdragon 8 Gen 3 (4nm)',
      camara: '50MP OIS + 12MP + 10MP 3x',
      bateria: '4400 mAh | Carga Rápida'
    },
    inStock: true
  },
  {
    id: 'm-phone-04',
    name: 'iPhone 16 256GB',
    category: 'smartphones',
    tag: 'Nuevo Ingreso',
    price: 899,
    oldPrice: 999,
    rating: 4.8,
    reviewsCount: 89,
    hasCashea: true,
    description: 'Chip A18 ultrarrápido, botón de Acción, Control de Cámara y nuevo sistema de cámara Fusion de 48MP.',
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80',
    colors: ['#1C1C1E', '#E1E4EB', '#A0C4E2', '#E8C5D8'],
    specs: {
      pantalla: '6.1" Super Retina XDR OLED 2000 nits',
      procesador: 'Apple A18',
      camara: '48MP Fusion + 12MP Ultra Gran Angular',
      bateria: '3561 mAh | Carga MagSafe'
    },
    inStock: true
  },
  {
    id: 'm-phone-05',
    name: 'Xiaomi 14 Ultra 512GB Leica',
    category: 'smartphones',
    tag: 'Fotografía Leica',
    price: 1199,
    oldPrice: 1349,
    rating: 4.9,
    reviewsCount: 76,
    hasCashea: true,
    description: 'Sensor de 1 pulgada LYT-900, óptica Leica de apertura variable, pantalla WQHD+ AMOLED y carga HyperCharge 90W.',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    colors: ['#1A1A1A', '#F8F9FA'],
    specs: {
      pantalla: '6.73" AMOLED WQHD+ 120Hz 3000 nits',
      procesador: 'Snapdragon 8 Gen 3',
      camara: 'Cuádruple 50MP Leica Vario-Summilux',
      bateria: '5000 mAh | Carga 90W + 80W Wireless'
    },
    inStock: true
  },
  {
    id: 'm-phone-06',
    name: 'Google Pixel 9 Pro XL 256GB',
    category: 'smartphones',
    tag: 'Google Tensor G4',
    price: 1099,
    oldPrice: 1199,
    rating: 4.8,
    reviewsCount: 58,
    hasCashea: true,
    description: 'Procesador Google Tensor G4 con Gemini Nano integrado, cámara profesional con Magic Editor y 7 años de actualizaciones garantizadas.',
    image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80',
    colors: ['#2F3640', '#F5F6FA', '#CAD3C8', '#ED4C67'],
    specs: {
      pantalla: '6.8" Super Actua OLED 1-120Hz 3000 nits',
      procesador: 'Google Tensor G4 + Coprocesador Titan M2',
      camara: '50MP + 48MP Ultrawide + 48MP Telephoto 5x',
      bateria: '5060 mAh | Carga 37W'
    },
    inStock: true
  },
  {
    id: 'm-phone-07',
    name: 'Samsung Galaxy Z Flip 6 256GB',
    category: 'smartphones',
    tag: 'Compacto & Plegable',
    price: 999,
    oldPrice: 1099,
    rating: 4.7,
    reviewsCount: 64,
    hasCashea: true,
    description: 'Pantalla externa FlexWindow de 3.4", cámara de 50MP, cámara de vapor para máxima refrigeración y diseño plegable de bolsillo.',
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
    colors: ['#70A1FF', '#7BED9F', '#2F3542', '#ECCC68'],
    specs: {
      pantalla: '6.7" Dynamic AMOLED 2X 120Hz + 3.4" Externa',
      procesador: 'Snapdragon 8 Gen 3 for Galaxy',
      camara: '50MP OIS + 12MP Ultra Gran Angular',
      bateria: '4000 mAh | Carga Rápida'
    },
    inStock: true
  },
  {
    id: 'm-phone-08',
    name: 'Honor Magic 6 Pro 512GB',
    category: 'smartphones',
    tag: 'Batería Silicio-Carbono',
    price: 1049,
    oldPrice: 1199,
    rating: 4.8,
    reviewsCount: 47,
    hasCashea: true,
    description: 'Cámara periscopio de 180MP, batería de silicio-carbono de 5600 mAh resistente a temperaturas extremas y pantalla con protección ocular PWM.',
    image: 'https://images.unsplash.com/photo-1575695342320-d2d2d2f9b73f?auto=format&fit=crop&w=800&q=80',
    colors: ['#1E272E', '#00D2D3'],
    specs: {
      pantalla: '6.8" LTPO OLED 120Hz 5000 nits peak',
      procesador: 'Snapdragon 8 Gen 3 (4nm)',
      camara: '50MP + 180MP Periscopio + 50MP Gran Angular',
      bateria: '5600 mAh | Carga 80W + 66W Wireless'
    },
    inStock: true
  },
  {
    id: 'm-phone-09',
    name: 'POCO F6 Pro 512GB / 12GB RAM',
    category: 'smartphones',
    tag: 'Calidad / Precio Top',
    price: 499,
    oldPrice: 579,
    rating: 4.9,
    reviewsCount: 189,
    hasCashea: true,
    description: 'Pantalla WQHD+ Flow AMOLED 120Hz, procesador Snapdragon 8 Gen 2, cámara triple de 50MP con OIS y carga descomunal de 120W.',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
    colors: ['#1E272E', '#F5F6FA'],
    specs: {
      pantalla: '6.67" WQHD+ AMOLED 120Hz 4000 nits',
      procesador: 'Snapdragon 8 Gen 2 (4nm)',
      camara: '50MP Light Fusion 800 + 8MP + 2MP',
      bateria: '5000 mAh | Carga 120W HyperCharge'
    },
    inStock: true
  },
  {
    id: 'm-phone-10',
    name: 'Tecno Camon 30 Premier 512GB',
    category: 'smartphones',
    tag: 'PolarAce Imaging',
    price: 429,
    oldPrice: 489,
    rating: 4.7,
    reviewsCount: 52,
    hasCashea: true,
    description: 'Chip de procesamiento de imagen dual Sony PolarAce, sensor Sony IMX890, pantalla AMOLED 1.5K y diseño en cuero vegano.',
    image: 'https://images.unsplash.com/photo-1533228892095-2c8a0026e6ef?auto=format&fit=crop&w=800&q=80',
    colors: ['#2F3542', '#DCDDE1'],
    specs: {
      pantalla: '6.77" 1.5K LTPO AMOLED 120Hz',
      procesador: 'MediaTek Dimensity 8200 Ultimate 5G',
      camara: 'Triple 50MP (Principal + Periscopio 3x + Ultrawide)',
      bateria: '5000 mAh | Carga 70W Ultra'
    },
    inStock: true
  },
  {
    id: 'm-phone-11',
    name: 'Infinix GT 20 Pro 256GB Gaming',
    category: 'smartphones',
    tag: 'Cyber Mecha LED',
    price: 339,
    oldPrice: 389,
    rating: 4.8,
    reviewsCount: 83,
    hasCashea: true,
    description: 'Interfaz Cyber Mecha con iluminación RGB interactiva, chip gaming Pixelworks dedicado, altavoces JBL y pantalla sin bordes a 144Hz.',
    image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=80',
    colors: ['#2F3640', '#718093', '#F5CD79'],
    specs: {
      pantalla: '6.78" FHD+ AMOLED 144Hz',
      procesador: 'MediaTek Dimensity 8200 Ultimate (4nm)',
      camara: '108MP OIS + 2MP + 2MP',
      bateria: '5000 mAh | Carga 45W'
    },
    inStock: true
  },
  {
    id: 'm-phone-12',
    name: 'Xiaomi Redmi Note 13 Pro+ 5G 512GB',
    category: 'smartphones',
    tag: 'Bestseller',
    price: 389,
    oldPrice: 449,
    rating: 4.9,
    reviewsCount: 240,
    hasCashea: true,
    description: 'Cámara icónica de 200MP con OIS, pantalla curva CrystalRes AMOLED 1.5K de 120Hz, resistencia al agua IP68 y carga de 120W.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    colors: ['#1E272E', '#F5F6FA', '#A29BFE'],
    specs: {
      pantalla: '6.67" Curva 1.5K AMOLED 120Hz IP68',
      procesador: 'MediaTek Dimensity 7200 Ultra (4nm)',
      camara: '200MP OIS + 8MP + 2MP',
      bateria: '5000 mAh | Carga 120W (19 min)'
    },
    inStock: true
  },

  // ==========================================
  // --- 2. COMPUTACIÓN & LAPTOPS (12 Productos) ---
  // ==========================================
  {
    id: 'm-comp-01',
    name: 'MacBook Pro 16" M3 Max 1TB',
    category: 'computacion',
    tag: 'Rendimiento Extremo',
    price: 3499,
    oldPrice: 3699,
    rating: 5.0,
    reviewsCount: 64,
    hasCashea: true,
    description: 'La estación de trabajo portátil definitiva para desarrollo y renderizado 3D con pantalla Liquid Retina XDR de 120Hz y chip M3 Max.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    colors: ['#1E1E1E', '#E1E1E1'],
    specs: {
      procesador: 'Apple M3 Max (16 núcleos CPU / 40 GPU)',
      ram: '48GB Memoria Unificada',
      almacenamiento: '1TB SSD NVMe ultrarrápido',
      bateria: 'Hasta 22 horas de autonomía'
    },
    inStock: true
  },
  {
    id: 'm-comp-02',
    name: 'MacBook Air 15" M3 512GB',
    category: 'computacion',
    tag: 'Diseño Ultraligero',
    price: 1499,
    oldPrice: 1599,
    rating: 4.9,
    reviewsCount: 92,
    hasCashea: true,
    description: 'Chasis unibody ultrafino de aluminio reciclado, pantalla Liquid Retina de 15.3 pulgadas, audio espacial de 6 altavoces y chip M3.',
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80',
    colors: ['#2F3640', '#F5F6FA', '#ECCC68', '#70A1FF'],
    specs: {
      procesador: 'Apple M3 (8 CPU / 10 GPU)',
      ram: '16GB Memoria Unificada',
      almacenamiento: '512GB SSD',
      pantalla: '15.3" Liquid Retina 500 nits'
    },
    inStock: true
  },
  {
    id: 'm-comp-03',
    name: 'ASUS ROG Zephyrus G16 OLED RTX 4080',
    category: 'computacion',
    tag: 'Gaming & Creadores',
    price: 2499,
    oldPrice: 2699,
    rating: 4.9,
    reviewsCount: 45,
    hasCashea: true,
    description: 'Pantalla ROG Nebula OLED 2.5K 240Hz, procesador Intel Core Ultra 9 con NPU para IA, tarjeta gráfica NVIDIA RTX 4080 y chasis de aluminio CNC.',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
    colors: ['#2C3E50', '#ECF0F1'],
    specs: {
      procesador: 'Intel Core Ultra 9 185H (16 núcleos)',
      grafica: 'NVIDIA GeForce RTX 4080 12GB GDDR6',
      ram: '32GB LPDDR5X 7467MHz',
      almacenamiento: '1TB PCIe 4.0 NVMe SSD'
    },
    inStock: true
  },
  {
    id: 'm-comp-04',
    name: 'Dell XPS 16 OLED Core Ultra 7',
    category: 'computacion',
    tag: 'Premium Ejecutivo',
    price: 2199,
    oldPrice: 2399,
    rating: 4.8,
    reviewsCount: 38,
    hasCashea: true,
    description: 'Panel táctil 4K+ OLED InfinityEdge, touchpad háptico de cristal continuo, barra de funciones táctil y gráficos dedicados RTX 4060.',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
    colors: ['#2F3542', '#F1F2F6'],
    specs: {
      procesador: 'Intel Core Ultra 7 155H',
      grafica: 'NVIDIA RTX 4060 8GB GDDR6',
      ram: '32GB LPDDR5X',
      pantalla: '16.3" 4K+ OLED Touch 100% DCI-P3'
    },
    inStock: true
  },
  {
    id: 'm-comp-05',
    name: 'Lenovo Legion Pro 7i Gen 9 RTX 4090',
    category: 'computacion',
    tag: 'Máxima Potencia',
    price: 2999,
    oldPrice: 3299,
    rating: 4.9,
    reviewsCount: 31,
    hasCashea: true,
    description: 'El portátil gamer definitivo con la todopoderosa NVIDIA RTX 4090 de 175W, refrigeración Legion ColdFront por cámara de vapor y pantalla WQXGA 240Hz.',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    colors: ['#1E272E'],
    specs: {
      procesador: 'Intel Core i9-14900HX (24 núcleos)',
      grafica: 'NVIDIA GeForce RTX 4090 16GB GDDR6',
      ram: '32GB DDR5 5600MHz',
      almacenamiento: '2TB (2x 1TB NVMe PCIe 4.0)'
    },
    inStock: true
  },
  {
    id: 'm-comp-06',
    name: 'Apple iPad Pro 13" M4 OLED 512GB',
    category: 'computacion',
    tag: 'Pantalla Ultra Retina XDR',
    price: 1399,
    oldPrice: 1499,
    rating: 4.9,
    reviewsCount: 88,
    hasCashea: true,
    description: 'El producto más delgado jamás creado por Apple (5.1mm). Pantalla OLED tándem revolucionaria, chip M4 de nueva generación y soporte para Apple Pencil Pro.',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    colors: ['#2F3640', '#F5F6FA'],
    specs: {
      pantalla: '13" Ultra Retina XDR OLED Tándem 120Hz',
      procesador: 'Apple M4 (CPU 9 núcleos / GPU 10 núcleos)',
      almacenamiento: '512GB SSD',
      peso: '579 gramos | 5.1 mm grosor'
    },
    inStock: true
  },
  {
    id: 'm-comp-07',
    name: 'Samsung Galaxy Tab S9 Ultra 5G 512GB',
    category: 'computacion',
    tag: 'Tablet Gigante 14.6"',
    price: 1199,
    oldPrice: 1349,
    rating: 4.8,
    reviewsCount: 44,
    hasCashea: true,
    description: 'Enorme pantalla Dynamic AMOLED 2X de 14.6 pulgadas con resistencia al agua IP68 en tablet y S Pen, modo Samsung DeX y procesador Snapdragon 8 Gen 2.',
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=800&q=80',
    colors: ['#2C3E50', '#BDC3C7'],
    specs: {
      pantalla: '14.6" Dynamic AMOLED 2X 120Hz IP68',
      procesador: 'Snapdragon 8 Gen 2 for Galaxy',
      ram: '12GB RAM | 512GB Exp. MicroSD',
      bateria: '11200 mAh | Carga 45W'
    },
    inStock: true
  },
  {
    id: 'm-comp-08',
    name: 'HP Omen Transcend 14 OLED RTX 4070',
    category: 'computacion',
    tag: 'Ultraportátil Gamer',
    price: 1799,
    oldPrice: 1999,
    rating: 4.8,
    reviewsCount: 39,
    hasCashea: true,
    description: 'Portátil gaming de solo 1.6kg con pantalla 2.8K OLED de 120Hz, teclado RGB pudding sin rejilla, audio HyperX y procesador Intel Core Ultra 9.',
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80',
    colors: ['#1E272E', '#F5F6FA'],
    specs: {
      procesador: 'Intel Core Ultra 9 185H',
      grafica: 'NVIDIA GeForce RTX 4070 8GB',
      ram: '32GB LPDDR5X 7467MHz',
      peso: '1.63 kg | Chasis magnesio'
    },
    inStock: true
  },
  {
    id: 'm-comp-09',
    name: 'iMac 24" 4.5K Retina M3 512GB',
    category: 'computacion',
    tag: 'Todo en Uno',
    price: 1699,
    oldPrice: 1799,
    rating: 4.9,
    reviewsCount: 56,
    hasCashea: true,
    description: 'Diseño icónico todo en uno ultradelgado de 11.5mm, impresionante pantalla 4.5K Retina de 24 pulgadas, cámara FaceTime 1080p y sistema de 6 altavoces.',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    colors: ['#3867D6', '#20BF6B', '#EB3B5A', '#FA8231'],
    specs: {
      pantalla: '24" 4.5K Retina (4480x2520) 500 nits',
      procesador: 'Apple M3 (8 CPU / 10 GPU)',
      ram: '16GB Memoria Unificada',
      almacenamiento: '512GB SSD'
    },
    inStock: true
  },
  {
    id: 'm-comp-10',
    name: 'Microsoft Surface Pro 11 Copilot+ PC',
    category: 'computacion',
    tag: 'IA Snapdragon X Elite',
    price: 1399,
    oldPrice: 1499,
    rating: 4.8,
    reviewsCount: 42,
    hasCashea: true,
    description: 'La nueva era Copilot+ con procesador Snapdragon X Elite con 45 TOPS de NPU, pantalla OLED táctil de 13" a 120Hz y hasta 14 horas de batería.',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
    colors: ['#2F3640', '#DCDDE1', '#74B9FF'],
    specs: {
      procesador: 'Snapdragon X Elite (12 núcleos, 45 TOPS NPU)',
      pantalla: '13" PixelSense Flow OLED 120Hz HDR',
      ram: '16GB LPDDR5X | 512GB SSD',
      bateria: 'Hasta 14 horas reproducción video'
    },
    inStock: true
  },
  {
    id: 'm-comp-11',
    name: 'Acer Predator Helios 16 RTX 4080',
    category: 'computacion',
    tag: 'Refrigeración Metal Líquido',
    price: 2299,
    oldPrice: 2499,
    rating: 4.8,
    reviewsCount: 35,
    hasCashea: true,
    description: 'Rendimiento sin concesiones con Intel Core i9 de 14va gen, pantalla Mini LED WQXGA de 250Hz con 1000 nits y ventiladores AeroBlade 3D de 5ta gen.',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    colors: ['#1E272E'],
    specs: {
      procesador: 'Intel Core i9-14900HX',
      grafica: 'NVIDIA RTX 4080 12GB GDDR6 (175W)',
      pantalla: '16" WQXGA Mini LED 250Hz 1000 nits',
      ram: '32GB DDR5 5600MHz | 1TB NVMe SSD'
    },
    inStock: true
  },
  {
    id: 'm-comp-12',
    name: 'ASUS Zenbook Duo OLED Doble Pantalla',
    category: 'computacion',
    tag: 'Innovación Dual Screen',
    price: 1699,
    oldPrice: 1899,
    rating: 4.9,
    reviewsCount: 29,
    hasCashea: true,
    description: 'Revolucionario portátil con doble pantalla táctil ASUS Lumina OLED de 14" a 120Hz, teclado Bluetooth desmontable y procesador Intel Core Ultra 9.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    colors: ['#2C3E50'],
    specs: {
      pantallas: 'Doble 14" 3K (2880x1800) OLED 120Hz',
      procesador: 'Intel Core Ultra 9 185H',
      ram: '32GB LPDDR5X | 1TB SSD',
      bateria: '75Wh con soporte carga rápida USB-C'
    },
    inStock: true
  },

  // ==========================================
  // --- 3. AUDIO HI-FI & AURICULARES (12 Productos) ---
  // ==========================================
  {
    id: 'm-aud-01',
    name: 'Apple AirPods Max (USB-C 2026)',
    category: 'audio',
    tag: 'Audio Espacial',
    price: 549,
    oldPrice: 599,
    rating: 4.9,
    reviewsCount: 160,
    hasCashea: true,
    description: 'Cancelación activa de ruido de nivel profesional, modo de sonido ambiente, audio espacial personalizado con seguimiento dinámico de la cabeza y conector USB-C.',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    colors: ['#1C1C1E', '#F2F2F2', '#3A506B', '#D4AF37'],
    specs: {
      driver: 'Transductor dinámico de 40mm diseñado por Apple',
      chip: 'Apple H1 en cada auricular',
      bateria: 'Hasta 20 horas con ANC y Audio Espacial',
      conexion: 'Bluetooth 5.3 + Puerto USB-C'
    },
    inStock: true
  },
  {
    id: 'm-aud-02',
    name: 'Sony WH-1000XM5 Hi-Res Noise Cancelling',
    category: 'audio',
    tag: 'Líder en Cancelación',
    price: 379,
    oldPrice: 429,
    rating: 4.9,
    reviewsCount: 220,
    hasCashea: true,
    description: 'Procesador integrado V1 + procesador QN1 HD, 8 micrófonos para cancelación de ruido insuperable, soporte LDAC Hi-Res Audio y 30 horas de batería.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    colors: ['#0A0A0A', '#E6E2DD', '#1E3A5F'],
    specs: {
      driver: 'Unidad de 30mm de fibra de carbono',
      codecs: 'LDAC, AAC, SBC | DSEE Extreme',
      bateria: '30 horas (3 min de carga = 3 horas)',
      peso: '250 gramos ultraligero'
    },
    inStock: true
  },
  {
    id: 'm-aud-03',
    name: 'Bose QuietComfort Ultra Headphones',
    category: 'audio',
    tag: 'Bose Immersive Audio',
    price: 429,
    oldPrice: 479,
    rating: 4.8,
    reviewsCount: 95,
    hasCashea: true,
    description: 'Audio espacial inmersivo Bose Immersive Audio, tecnología CustomTune que calibra el sonido a la forma de tus oídos y cancelación de ruido legendaria.',
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
    colors: ['#1C1C1E', '#DFDED9'],
    specs: {
      tecnologia: 'Bose CustomTune + Immersive Audio',
      modos: 'Silencio, Consciente e Inmersión',
      bateria: 'Hasta 24 horas (18h en modo inmersivo)'
    },
    inStock: true
  },
  {
    id: 'm-aud-04',
    name: 'AirPods Pro 2 (USB-C) con Chip H2',
    category: 'audio',
    tag: 'Cancelación 2X',
    price: 239,
    oldPrice: 269,
    rating: 4.9,
    reviewsCount: 310,
    hasCashea: true,
    description: 'Chip H2, cancelación activa de ruido 2 veces superior, audio adaptativo, detección de conversación y estuche MagSafe con altavoz y enganche.',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
    colors: ['#FFFFFF'],
    specs: {
      chip: 'Apple H2 en auriculares + U1 en estuche',
      resistencia: 'IP54 resistente al polvo, sudor y agua',
      bateria: '6h auricular / 30h con estuche'
    },
    inStock: true
  },
  {
    id: 'm-aud-05',
    name: 'Sony WF-1000XM5 True Wireless',
    category: 'audio',
    tag: 'Hi-Res In-Ear',
    price: 279,
    oldPrice: 319,
    rating: 4.8,
    reviewsCount: 112,
    hasCashea: true,
    description: 'Los mejores auriculares inalámbricos in-ear de Sony con procesador V2 y QN2e, transductor Dynamic Driver X y almohadillas de poliuretano viscoelástico.',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    colors: ['#1A1A1A', '#F5F5F0'],
    specs: {
      driver: 'Dynamic Driver X de 8.4mm',
      codecs: 'LDAC, LC3, AAC, SBC',
      bateria: '8h + 16h estuche (24h total con ANC)'
    },
    inStock: true
  },
  {
    id: 'm-aud-06',
    name: 'JBL Boombox 3 Wi-Fi & Bluetooth',
    category: 'audio',
    tag: 'Graves Monstruosos',
    price: 529,
    oldPrice: 599,
    rating: 4.9,
    reviewsCount: 78,
    hasCashea: true,
    description: 'Altavoz portátil de gran potencia con subwoofer central dedicado, sonido JBL Original Pro masivo con Dolby Atmos 3D sobre Wi-Fi y 24 horas de fiesta.',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    colors: ['#1E272E', '#57606F'],
    specs: {
      potencia: '180W RMS (Modo CA) / 136W (Batería)',
      resistencia: 'IP67 resistente al agua y polvo',
      bateria: 'Hasta 24 horas + Powerbank integrado'
    },
    inStock: true
  },
  {
    id: 'm-aud-07',
    name: 'JBL PartyBox Stage 320 Bluetooth',
    category: 'audio',
    tag: 'Show de Luces & 240W',
    price: 599,
    oldPrice: 679,
    rating: 4.9,
    reviewsCount: 65,
    hasCashea: true,
    description: '240W de sonido JBL Pro explosivo, show de luces dinámico sincronizado al ritmo, ruedas telescópicas y entradas dobles para micrófono y guitarra.',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    colors: ['#1C1C1E'],
    specs: {
      potencia: '240W RMS',
      bateria: 'Hasta 18 horas (Batería extraíble)',
      entradas: '2x Jack 6.3mm para Mic/Guitarra + USB'
    },
    inStock: true
  },
  {
    id: 'm-aud-08',
    name: 'Marshall Stanmore III Bluetooth',
    category: 'audio',
    tag: 'Estilo Vintage Icónico',
    price: 379,
    oldPrice: 419,
    rating: 4.9,
    reviewsCount: 84,
    hasCashea: true,
    description: 'Diseño clásico de amplificador con vinilo texturizado, controles analógicos de latón y un escenario sonoro envolvente rediseñado con tweeters en ángulo.',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    colors: ['#1E272E', '#F5F6FA', '#8B4513'],
    specs: {
      potencia: '80W RMS Clase D (1x 50W Sub + 2x 15W Tweeters)',
      conexion: 'Bluetooth 5.2 + Entrada RCA + 3.5mm Aux',
      peso: '4.25 kg'
    },
    inStock: true
  },
  {
    id: 'm-aud-09',
    name: 'Sennheiser Momentum 4 Wireless',
    category: 'audio',
    tag: '60 Horas de Batería',
    price: 299,
    oldPrice: 379,
    rating: 4.8,
    reviewsCount: 104,
    hasCashea: true,
    description: 'Increíble récord de 60 horas de duración de batería, transductores audiófilos de 42mm para claridad acústica suprema y ecualizador integrado con Sound Personalization.',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
    colors: ['#1A1A1A', '#F5F5F0', '#2C3E50'],
    specs: {
      driver: 'Transductor dinámico de 42mm',
      bateria: '60 horas continuas con ANC encendido',
      codecs: 'aptX Adaptive, AAC, SBC'
    },
    inStock: true
  },
  {
    id: 'm-aud-10',
    name: 'Sonos Move 2 Portátil Smart Speaker',
    category: 'audio',
    tag: 'Sonido Estéreo Espacioso',
    price: 449,
    oldPrice: 499,
    rating: 4.8,
    reviewsCount: 52,
    hasCashea: true,
    description: 'Sonido estéreo de doble tweeter en un cuerpo resistente IP56, calibración automática Trueplay, conexión Wi-Fi + Bluetooth y 24 horas de batería.',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    colors: ['#1C1C1E', '#F5F6FA', '#747D8C'],
    specs: {
      audio: '3 amplificadores digitales Clase D + 2 Tweeters + 1 Mid-woofer',
      resistencia: 'IP56 resistente al clima y caídas',
      bateria: '24 horas de reproducción continua'
    },
    inStock: true
  },
  {
    id: 'm-aud-11',
    name: 'Bose SoundLink Max Bluetooth Speaker',
    category: 'audio',
    tag: 'Graves Profundos Portátiles',
    price: 399,
    oldPrice: 449,
    rating: 4.8,
    reviewsCount: 41,
    hasCashea: true,
    description: 'Gran potencia sonora con graves que hacen vibrar el pecho, correa de transporte suave tipo cuerda náutica, resistencia al agua y polvo IP67 y 20 horas de autonomía.',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    colors: ['#1C1C1E', '#70A1FF'],
    specs: {
      resistencia: 'IP67 a prueba de agua y polvo (Flotante)',
      bateria: 'Hasta 20 horas + Carga USB-C para tu móvil',
      conectividad: 'Bluetooth 5.3 + Entrada 3.5mm'
    },
    inStock: true
  },
  {
    id: 'm-aud-12',
    name: 'Bang & Olufsen Beoplay EX ANC Earbuds',
    category: 'audio',
    tag: 'Lujo & Diseño Escandinavo',
    price: 399,
    oldPrice: 449,
    rating: 4.9,
    reviewsCount: 36,
    hasCashea: true,
    description: 'Superficie de cristal templado táctil con anillo de aluminio pulido, transductores de neodimio de 9.2mm y resistencia al agua IP57 con cancelación de ruido adaptativa.',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    colors: ['#2F3640', '#D4AF37', '#747D8C'],
    specs: {
      driver: 'Electrodinámico de neodimio de 9.2mm',
      materiales: 'Aluminio anodizado, cristal templado y polímero',
      resistencia: 'IP57 sumergible hasta 1 metro'
    },
    inStock: true
  },

  // ==========================================
  // --- 4. GAMING & CONSOLAS (12 Productos) ---
  // ==========================================
  {
    id: 'm-game-01',
    name: 'Sony PlayStation 5 Pro 2TB SSD',
    category: 'gaming',
    tag: 'PS5 Pro Enhanced 2026',
    price: 799,
    oldPrice: 899,
    rating: 4.9,
    reviewsCount: 110,
    hasCashea: true,
    description: 'La consola más potente del mundo con GPU 67% más rápida, PlayStation Spectral Super Resolution (PSSR) con escalado por IA y Ray Tracing avanzado a 4K 60/120fps.',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
    colors: ['#F5F6FA', '#1E272E'],
    specs: {
      grafica: 'GPU RDNA 3 personalizada 16.7 TFLOPs + PSSR AI',
      almacenamiento: '2TB SSD NVMe de alta velocidad (5.5 GB/s)',
      conectividad: 'Wi-Fi 7 + HDMI 2.1 VRR hasta 120Hz/8K'
    },
    inStock: true
  },
  {
    id: 'm-game-02',
    name: 'Sony PlayStation 5 Slim Digital 1TB',
    category: 'gaming',
    tag: 'Diseño Compacto',
    price: 499,
    oldPrice: 549,
    rating: 4.9,
    reviewsCount: 230,
    hasCashea: true,
    description: 'Chasis 30% más compacto, almacenamiento ampliado a 1TB SSD de fábrica, soporte para audio 3D Tempest y retroalimentación háptica en mando DualSense.',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    colors: ['#F5F6FA'],
    specs: {
      almacenamiento: '1TB SSD ultrarrápido',
      resolucion: 'Hasta 4K 120Hz con Ray Tracing',
      mando: 'Incluye 1x Control DualSense Wireless'
    },
    inStock: true
  },
  {
    id: 'm-game-03',
    name: 'Microsoft Xbox Series X 1TB Black',
    category: 'gaming',
    tag: '12 Teraflops 4K Real',
    price: 549,
    oldPrice: 599,
    rating: 4.8,
    reviewsCount: 145,
    hasCashea: true,
    description: '12 TFLOPs de procesamiento gráfico, Quick Resume para alternar entre 5 juegos al instante, Xbox Game Pass Ultimate y retrocompatibilidad con 4 generaciones.',
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=800&q=80',
    colors: ['#1C1C1E'],
    specs: {
      potencia: '12 TFLOPs RDNA 2 personalizada',
      almacenamiento: '1TB Custom NVMe SSD (Xbox Velocity)',
      tasa_refresco: 'Hasta 4K 120 FPS con Dolby Vision Gaming'
    },
    inStock: true
  },
  {
    id: 'm-game-04',
    name: 'Nintendo Switch OLED Mario Red Edition',
    category: 'gaming',
    tag: 'Edición Especial',
    price: 349,
    oldPrice: 399,
    rating: 4.9,
    reviewsCount: 175,
    hasCashea: true,
    description: 'Vibrante pantalla OLED de 7 pulgadas con colores intensos y alto contraste, soporte ajustable ancho, base con puerto LAN por cable y 64GB de almacenamiento.',
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80',
    colors: ['#EA2027', '#F5F6FA', '#3742FA'],
    specs: {
      pantalla: '7.0" OLED Multi-Touch 720p (1080p en TV)',
      almacenamiento: '64GB Interno ampliable con MicroSD hasta 2TB',
      bateria: 'Hasta 9 horas de juego portátil'
    },
    inStock: true
  },
  {
    id: 'm-game-05',
    name: 'Valve Steam Deck OLED 1TB',
    category: 'gaming',
    tag: 'PC Gaming Portátil',
    price: 749,
    oldPrice: 829,
    rating: 4.9,
    reviewsCount: 98,
    hasCashea: true,
    description: 'Pantalla HDR OLED de 7.4 pulgadas a 90Hz con negros puros y brillo de 1000 nits, APU AMD de 6nm más eficiente, Wi-Fi 6E y batería de 50Wh.',
    image: 'https://images.unsplash.com/photo-1612287233207-69be6c31969a?auto=format&fit=crop&w=800&q=80',
    colors: ['#1E272E'],
    specs: {
      pantalla: '7.4" HDR OLED 90Hz 1000 nits peak',
      procesador: 'APU AMD 6nm (Zen 2 4c/8t + RDNA 2 8 CUs)',
      almacenamiento: '1TB NVMe SSD de alta velocidad',
      bateria: '50Wh (3 a 12 horas de juego)'
    },
    inStock: true
  },
  {
    id: 'm-game-06',
    name: 'ASUS ROG Ally X 1TB / 24GB RAM',
    category: 'gaming',
    tag: 'Windows 11 Gaming',
    price: 849,
    oldPrice: 949,
    rating: 4.8,
    reviewsCount: 67,
    hasCashea: true,
    description: 'La consola portátil definitiva con procesador AMD Ryzen Z1 Extreme, descomunal batería de 80Wh (el doble de autonomía), 24GB de RAM LPDDR5X y puertos duales USB-C.',
    image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=800&q=80',
    colors: ['#1A1A1A'],
    specs: {
      procesador: 'AMD Ryzen Z1 Extreme (8c/16t hasta 5.1GHz)',
      pantalla: '7" FHD (1080p) 120Hz 500 nits FreeSync Premium',
      ram: '24GB LPDDR5X 7500MHz | 1TB M.2 2280 SSD',
      bateria: '80Wh de capacidad masiva'
    },
    inStock: true
  },
  {
    id: 'm-game-07',
    name: 'Meta Quest 3 512GB Realidad Mixta',
    category: 'gaming',
    tag: 'VR / AR Avanzado',
    price: 649,
    oldPrice: 729,
    rating: 4.8,
    reviewsCount: 79,
    hasCashea: true,
    description: 'Realidad mixta de alta resolución con sensores RGB a color, procesador Snapdragon XR2 Gen 2 con el doble de potencia gráfica y pantallas 4K+ Infinite Display.',
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?auto=format&fit=crop&w=800&q=80',
    colors: ['#F5F6FA'],
    specs: {
      resolucion: '2064x2208 píxeles por ojo (4K+ Infinite Display)',
      procesador: 'Snapdragon XR2 Gen 2',
      almacenamiento: '512GB | Mandos Touch Plus con retroalimentación TruTouch'
    },
    inStock: true
  },
  {
    id: 'm-game-08',
    name: 'Mando Inalámbrico DualSense Edge PS5',
    category: 'gaming',
    tag: 'Control Profesional',
    price: 219,
    oldPrice: 249,
    rating: 4.9,
    reviewsCount: 88,
    hasCashea: true,
    description: 'Mando ultraconfigurable con módulos de joystick reemplazables, botones traseros asignables, topes de gatillo ajustables y perfiles de control personalizados.',
    image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=80',
    colors: ['#F5F6FA'],
    specs: {
      botones_traseros: '2 juegos de palancas intercambiables',
      gatillos: 'Topes de recorrido ajustables físicamente',
      estuche: 'Incluye estuche rígido con conector de carga'
    },
    inStock: true
  },
  {
    id: 'm-game-09',
    name: 'Logitech G Pro X Superlight 2 Wireless',
    category: 'gaming',
    tag: '60g Esports Pro',
    price: 159,
    oldPrice: 189,
    rating: 4.9,
    reviewsCount: 154,
    hasCashea: true,
    description: 'El ratón de esports más laureado del mundo con solo 60 gramos de peso, interruptores híbridos óptico-mecánicos LIGHTFORCE y sensor HERO 2 de 32,000 DPI con 4K polling rate.',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    colors: ['#1C1C1E', '#FFFFFF', '#FF3838'],
    specs: {
      peso: '60 gramos',
      sensor: 'HERO 2 (32,000 DPI / 500+ IPS / 4000Hz Polling)',
      bateria: 'Hasta 95 horas de uso continuo'
    },
    inStock: true
  },
  {
    id: 'm-game-10',
    name: 'Razer Huntsman V3 Pro Teclado Analógico',
    category: 'gaming',
    tag: 'Switches Analógicos Gen 2',
    price: 249,
    oldPrice: 289,
    rating: 4.8,
    reviewsCount: 46,
    hasCashea: true,
    description: 'Interruptores ópticos analógicos Razer Gen 2 con activación ajustable al vuelo desde 0.1 hasta 4.0 mm, modo Rapid Trigger y placa superior de aluminio 5052.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    colors: ['#1A1A1A'],
    specs: {
      switches: 'Razer Analog Optical Switches Gen-2 con Rapid Trigger',
      teclas: 'Teclas PBT de doble inyección texturizadas',
      reposamunecas: 'Cuero sintético magnético con acolchado'
    },
    inStock: true
  },
  {
    id: 'm-game-11',
    name: 'Volante Logitech G923 TRUEFORCE con Pedales',
    category: 'gaming',
    tag: 'Simulador de Carreras',
    price: 389,
    oldPrice: 449,
    rating: 4.9,
    reviewsCount: 62,
    hasCashea: true,
    description: 'Tecnología de retroalimentación de fuerza TRUEFORCE de alta definición que se conecta a la física del juego a 4000 veces por segundo, pedales sensibles a la presión y cuero cosido a mano.',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=80',
    colors: ['#1C1C1E'],
    specs: {
      giro: '900 grados de rotación de bloqueo a bloqueo',
      pedales: 'Pedal de freno progresivo no lineal de acero inoxidable',
      compatibilidad: 'PS5, PS4 y PC'
    },
    inStock: true
  },
  {
    id: 'm-game-12',
    name: 'Auriculares Razer BlackShark V2 Pro 2026',
    category: 'gaming',
    tag: 'Micrófono HyperClear 32kHz',
    price: 199,
    oldPrice: 229,
    rating: 4.8,
    reviewsCount: 89,
    hasCashea: true,
    description: 'Micrófono de banda ultraancha de 32kHz con calidad de transmisión, diafragmas de titanio TriForce de 50mm, 70 horas de batería y conexión Bluetooth + 2.4GHz HyperSpeed.',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    colors: ['#1C1C1E', '#FFFFFF'],
    specs: {
      drivers: 'Razer TriForce Titanium 50mm',
      microfono: 'Razer HyperClear Super Wideband 32kHz desmontable',
      bateria: 'Hasta 70 horas de juego inalámbrico'
    },
    inStock: true
  },

  // ==========================================
  // --- 5. SMART TVS & HOGAR (12 Productos) ---
  // ==========================================
  {
    id: 'm-tv-01',
    name: 'Samsung Neo QLED 85" 8K QN900D (2026)',
    category: 'linea-blanca',
    tag: '8K AI Upscaling Pro',
    price: 4999,
    oldPrice: 5499,
    rating: 5.0,
    reviewsCount: 28,
    hasCashea: true,
    description: 'Procesador NQ8 AI Gen3 con 512 redes neuronales, diseño Infinity Air sin bordes con peana de espejo, Quantum Matrix Pro Mini LED y sonido Dolby Atmos de 90W en 6.2.4 canales.',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
    colors: ['#718093', '#2F3640'],
    specs: {
      pantalla: '85" 8K (7680x4320) Mini LED 240Hz',
      procesador: 'NQ8 AI Gen3 con 512 redes neuronales',
      audio: '90W 6.2.4Ch con Object Tracking Sound Pro'
    },
    inStock: true
  },
  {
    id: 'm-tv-02',
    name: 'LG OLED evo G4 77" 4K Galería 144Hz',
    category: 'linea-blanca',
    tag: 'Brillo OLED Máximo',
    price: 3499,
    oldPrice: 3899,
    rating: 4.9,
    reviewsCount: 42,
    hasCashea: true,
    description: 'Procesador inteligente Alpha 11 AI con 4 veces mayor rendimiento, tecnología Brightness Booster Max con micro-lentes (MLA), diseño One Wall ultraplano de galería y 144Hz con G-Sync.',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80',
    colors: ['#1C1C1E'],
    specs: {
      pantalla: '77" OLED evo 4K 144Hz con MLA (Micro Lens Array)',
      procesador: 'Alpha 11 AI 4K con AI Picture Pro',
      gaming: '4x HDMI 2.1 48Gbps, G-Sync, FreeSync Premium y VRR'
    },
    inStock: true
  },
  {
    id: 'm-tv-03',
    name: 'Sony BRAVIA 9 75" Mini LED QLED 4K',
    category: 'linea-blanca',
    tag: 'El Mini LED Más Brillante',
    price: 3199,
    oldPrice: 3499,
    rating: 4.9,
    reviewsCount: 31,
    hasCashea: true,
    description: 'Control de retroiluminación XR Backlight Master Drive con tecnología de atenuación local de estudio, procesador Cognitive Processor XR y Acoustic Multi-Audio+ con tweeters de haz superior.',
    image: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=800&q=80',
    colors: ['#2C3E50'],
    specs: {
      pantalla: '75" 4K QLED Mini LED 120Hz con XR Triluminos Pro',
      procesador: 'XR Processor con XR Clear Image',
      audio: '70W Acoustic Multi-Audio+ con Sound Positioning'
    },
    inStock: true
  },
  {
    id: 'm-tv-04',
    name: 'TCL QM8 85" QD-Mini LED 5000 Nits',
    category: 'linea-blanca',
    tag: '5000 Nits Monstruosos',
    price: 2199,
    oldPrice: 2499,
    rating: 4.8,
    reviewsCount: 55,
    hasCashea: true,
    description: 'Más de 5000 zonas de atenuación local con brillo de 5000 nits, panel QD-Mini LED de 144Hz nativo (hasta 240Hz VRR), sistema de audio Onkyo 2.1.2 y Google TV integrado.',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
    colors: ['#1A1A1A'],
    specs: {
      pantalla: '85" 4K QD-Mini LED 144Hz (5000 zonas / 5000 nits)',
      audio: 'Sistema Onkyo 2.1.2 de 60W con subwoofer trasero',
      sistema: 'Google TV con control de voz manos libres'
    },
    inStock: true
  },
  {
    id: 'm-tv-05',
    name: 'Samsung The Frame 65" QLED Mate Art',
    category: 'linea-blanca',
    tag: 'Cuadro de Arte 4K',
    price: 1599,
    oldPrice: 1799,
    rating: 4.9,
    reviewsCount: 76,
    hasCashea: true,
    description: 'Pantalla con acabado mate antirreflejos que transforma tu televisor en una galería de arte con marco magnético intercambiable, sensor de movimiento y soporte de pared ultra delgado incluido.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    colors: ['#8B4513', '#F5F6FA', '#1C1C1E'],
    specs: {
      pantalla: '65" QLED 4K 120Hz con Matte Display antirreflejo',
      modo_arte: 'Art Store con más de 2000 obras de museos del mundo',
      conectividad: 'One Connect Box con un solo cable transparente'
    },
    inStock: true
  },
  {
    id: 'm-tv-06',
    name: 'Aire Acondicionado Samsung WindFree 24000 BTU',
    category: 'linea-blanca',
    tag: 'Sin Corrientes de Aire',
    price: 899,
    oldPrice: 999,
    rating: 4.9,
    reviewsCount: 83,
    hasCashea: true,
    description: 'Enfriamiento sin ráfagas de aire molestas a través de 23,000 microorificios, tecnología Digital Inverter Boost que ahorra hasta 73% de energía y control Wi-Fi por SmartThings.',
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80',
    colors: ['#FFFFFF'],
    specs: {
      capacidad: '24,000 BTU / 2 Toneladas (220V)',
      eficiencia: 'Digital Inverter Boost A+++ (Ahorro 73%)',
      filtros: 'Filtro Tri-Care antibacterias y virus con WindFree'
    },
    inStock: true
  },
  {
    id: 'm-tv-07',
    name: 'Aire Acondicionado LG Dual Inverter 18000 BTU',
    category: 'linea-blanca',
    tag: 'Ahorro 70% & Silencioso',
    price: 699,
    oldPrice: 799,
    rating: 4.8,
    reviewsCount: 68,
    hasCashea: true,
    description: 'Compresor Dual Inverter con 10 años de garantía, enfriamiento 40% más rápido, tecnología UVnano que elimina 99.9% de bacterias del ventilador y ThinQ Wi-Fi.',
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80',
    colors: ['#FFFFFF'],
    specs: {
      capacidad: '18,000 BTU (220V)',
      compresor: 'Dual Inverter Compressor con 10 años garantía',
      funciones: 'UVnano, Ionizador Plasmaster Plus y Wi-Fi ThinQ'
    },
    inStock: true
  },
  {
    id: 'm-tv-08',
    name: 'Nevera Samsung French Door Family Hub 614L',
    category: 'linea-blanca',
    tag: 'Pantalla Inteligente 32"',
    price: 2499,
    oldPrice: 2799,
    rating: 4.9,
    reviewsCount: 37,
    hasCashea: true,
    description: 'Refrigerador de 4 puertas con pantalla táctil de 32" Family Hub, cámaras internas View Inside para ver qué hay dentro desde tu smartphone, Beverage Center integrado y dispensador doble de hielo.',
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80',
    colors: ['#2F3640', '#DCDDE1'],
    specs: {
      capacidad: '614 Litros (22 Pies Cúbicos)',
      pantalla: '32" Full HD Touchscreen con SmartThings e IA',
      caracteristicas: 'Beverage Center, Dual Auto Ice Maker y Metal Cooling'
    },
    inStock: true
  },
  {
    id: 'm-tv-09',
    name: 'Lavadora Secadora LG WashTower 22kg/13kg',
    category: 'linea-blanca',
    tag: 'Torre Vertical con IA',
    price: 1999,
    oldPrice: 2299,
    rating: 4.9,
    reviewsCount: 49,
    hasCashea: true,
    description: 'Diseño en torre vertical integrada de un solo cuerpo con panel de control central Center Control, tecnología AI DD que detecta el peso y suavidad de las telas y lavado TurboWash 360.',
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80',
    colors: ['#1C1C1E', '#2C3E50'],
    specs: {
      capacidad: 'Lavadora 22 kg / Secadora 13 kg a gas o eléctrica',
      motor: 'Dual Inverter Direct Drive con Inteligencia Artificial',
      funciones: 'TurboWash 360, Steam+ vapor antialérgenos y Wi-Fi'
    },
    inStock: true
  },
  {
    id: 'm-tv-10',
    name: 'Robot Aspirador Roborock S8 Pro Ultra',
    category: 'linea-blanca',
    tag: 'Limpieza Total Autónoma',
    price: 1299,
    oldPrice: 1449,
    rating: 4.9,
    reviewsCount: 82,
    hasCashea: true,
    description: 'Estación de vaciado y lavado de mopa con secado por aire caliente automático, cepillo doble DuoRoller Riser, potencia de succión descomunal de 6000 Pa y navegación Reactive 3D.',
    image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=800&q=80',
    colors: ['#F5F6FA', '#1C1C1E'],
    specs: {
      succion: '6000 Pa HyperForce con sistema de mopa sónica VibraRise 2.0',
      base: 'RockDock Ultra: Autolavado, autosecado, autovaciado y autorelleno',
      navegacion: 'LIDAR PreciSense + Evasión de obstáculos 3D con luz estructurada'
    },
    inStock: true
  },
  {
    id: 'm-tv-11',
    name: 'Cafetera Súper Automática De\'Longhi Magnifica S',
    category: 'linea-blanca',
    tag: 'Café de Grano Fresco',
    price: 599,
    oldPrice: 699,
    rating: 4.8,
    reviewsCount: 94,
    hasCashea: true,
    description: 'Muele el grano al instante con molinillo cónico de acero calibrado, sistema de espumador manual para cappuccino cremoso, selector de intensidad y limpieza automática.',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80',
    colors: ['#1C1C1E', '#BDC3C7'],
    specs: {
      presion: 'Bomba italiana tradicional de 15 Bares',
      molinillo: 'Acero con 13 ajustes de molienda precisa',
      deposito: '1.8L de agua con filtro descalcificador incluido'
    },
    inStock: true
  },
  {
    id: 'm-tv-12',
    name: 'Barra de Sonido Samsung HW-Q990D 11.1.4 Dolby Atmos',
    category: 'linea-blanca',
    tag: 'Cine Inmersivo 656W',
    price: 1199,
    oldPrice: 1399,
    rating: 4.9,
    reviewsCount: 53,
    hasCashea: true,
    description: 'La barra de sonido definitiva con 11 canales frontales y envolventes, 1 subwoofer inalámbrico acústico y 4 canales de disparo vertical con Dolby Atmos inalámbrico y Q-Symphony.',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    colors: ['#1E272E'],
    specs: {
      canales: '11.1.4 Canales con 22 altavoces integrados (656W)',
      tecnologia: 'Dolby Atmos inalámbrico, DTS:X y SpaceFit Sound Pro',
      puertos: 'HDMI 2.1 Passthrough con soporte 4K 120Hz'
    },
    inStock: true
  },

  // ==========================================
  // --- 6. WEARABLES & SMARTWATCHES (12 Productos) ---
  // ==========================================
  {
    id: 'm-wear-01',
    name: 'Apple Watch Ultra 2 Titanium 49mm',
    category: 'wearables',
    tag: 'Titanio Aeroespacial',
    price: 799,
    oldPrice: 849,
    rating: 4.9,
    reviewsCount: 118,
    hasCashea: true,
    description: 'Caja de titanio de 49mm resistente a 100m, pantalla Retina OLED de 3000 nits, chip S9 SiP con gesto de doble toque, sirena de 86dB y GPS de doble frecuencia.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    colors: ['#948B7D', '#1A1A1A'],
    specs: {
      pantalla: '49mm Retina OLED de zafiro 3000 nits',
      procesador: 'Apple S9 SiP con doble toque',
      bateria: 'Hasta 36 horas de uso normal / 72h bajo consumo',
      resistencia: '100m sumergible + Buceo recreativo EN13319'
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
    reviewsCount: 74,
    hasCashea: true,
    description: 'Diseño ultra resistente con marco de titanio, cristal de zafiro, procesador de 3nm, sensor BioActive avanzado, botón de acción rápida y Galaxy AI para métricas de salud.',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    colors: ['#1C1C1C', '#C4C4C4', '#E67E22'],
    specs: {
      pantalla: '1.5" Super AMOLED 3000 nits con cristal zafiro',
      procesador: 'Exynos W1000 (3nm de 5 núcleos)',
      resistencia: '10ATM + IP68 + MIL-STD-810H',
      bateria: '590 mAh (Hasta 100 horas en modo ahorro)'
    },
    inStock: true
  },
  {
    id: 'm-wear-03',
    name: 'Apple Watch Series 10 46mm Aluminio',
    category: 'wearables',
    tag: 'Diseño Más Fino & Pantalla Gigante',
    price: 429,
    oldPrice: 469,
    rating: 4.9,
    reviewsCount: 140,
    hasCashea: true,
    description: 'La pantalla más grande y avanzada de Apple Watch, chasis casi 10% más fino, carga rápida al 80% en solo 30 minutos y sensor de profundidad y temperatura del agua.',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
    colors: ['#1C1C1E', '#E1E4EB', '#D4AF37', '#E84118'],
    specs: {
      pantalla: 'OLED gran angular con ángulo de visión 40% más brillante',
      procesador: 'Apple S10 SiP con Neural Engine',
      sensores: 'ECG, Oxígeno en sangre, Detección de apnea del sueño'
    },
    inStock: true
  },
  {
    id: 'm-wear-04',
    name: 'Samsung Galaxy Watch 7 44mm Bluetooth',
    category: 'wearables',
    tag: 'Salud con Galaxy AI',
    price: 319,
    oldPrice: 359,
    rating: 4.8,
    reviewsCount: 88,
    hasCashea: true,
    description: 'Procesador de 3nm ultrarrápido con GPS de doble frecuencia para precisión milimétrica, índice de AGEs para seguimiento metabólico y puntuación de energía diaria con Galaxy AI.',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80',
    colors: ['#2F3640', '#747D8C', '#2ED573'],
    specs: {
      pantalla: '1.5" Super AMOLED 2000 nits zafiro',
      procesador: 'Exynos W1000 (3nm)',
      gps: 'Dual GPS (L1 + L5) para rutas perfectas'
    },
    inStock: true
  },
  {
    id: 'm-wear-05',
    name: 'Garmin Fenix 8 AMOLED 51mm Zafiro',
    category: 'wearables',
    tag: 'Aventura & Multideporte',
    price: 1099,
    oldPrice: 1199,
    rating: 5.0,
    reviewsCount: 39,
    hasCashea: true,
    description: 'Pantalla AMOLED brillante de 1.4" con bisel de titanio y lente de zafiro, micrófono y altavoz integrados para llamadas, linterna LED estroboscópica y hasta 29 días de batería.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    colors: ['#1C1C1E', '#EA8685'],
    specs: {
      pantalla: '1.4" AMOLED Zafiro 1000 nits con linterna LED',
      bateria: 'Hasta 29 días en modo smartwatch / 84h en GPS',
      resistencia: '100m sumergible + Botones inductivos a prueba de fugas'
    },
    inStock: true
  },
  {
    id: 'm-wear-06',
    name: 'Huawei Watch Ultimate Design Titanio',
    category: 'wearables',
    tag: 'Metal Líquido Zirconio',
    price: 799,
    oldPrice: 899,
    rating: 4.8,
    reviewsCount: 32,
    hasCashea: true,
    description: 'Caja forjada en metal líquido a base de circonio 4.5 veces más resistente que el titanio, bisel de cerámica nanotecnológica, sumergible hasta 100 metros con modo de expedición.',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    colors: ['#2F3542', '#3742FA'],
    specs: {
      pantalla: '1.5" LTPO AMOLED 1000 nits zafiro',
      material: 'Metal líquido amorfo de circonio + Bisel cerámico',
      inmersion: '100 metros (Resistencia 10ATM certificada EN13319)'
    },
    inStock: true
  },
  {
    id: 'm-wear-07',
    name: 'Google Pixel Watch 3 45mm LTE',
    category: 'wearables',
    tag: 'Fitbit Premium Integrado',
    price: 399,
    oldPrice: 449,
    rating: 4.7,
    reviewsCount: 51,
    hasCashea: true,
    description: 'Pantalla Actua abovedada de 2000 nits con biseles ultrafinos, preparación para el entrenamiento avanzado con Fitbit, detección de pulso vital y carga ultra veloz.',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80',
    colors: ['#1C1C1E', '#F5F6FA', '#CAD3C8'],
    specs: {
      pantalla: '45mm Actua AMOLED abovedada 1-2000 nits',
      procesador: 'Snapdragon W5+ Gen 1 + Coprocesador Cortex M33',
      bateria: 'Hasta 36 horas con modo ahorro de batería'
    },
    inStock: true
  },
  {
    id: 'm-wear-08',
    name: 'Anillo Inteligente Oura Ring Gen 3 Horizon',
    category: 'wearables',
    tag: 'Monitoreo Invisible',
    price: 349,
    oldPrice: 399,
    rating: 4.9,
    reviewsCount: 67,
    hasCashea: true,
    description: 'Titanio ultraligero con revestimiento DLC de grado médico, sensores de temperatura corporal infrarrojos para detección temprana de enfermedades y análisis de sueño líder en la industria.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    colors: ['#1C1C1E', '#D4AF37', '#747D8C', '#BDC3C7'],
    specs: {
      material: 'Titanio con recubrimiento PVD resistente al agua hasta 100m',
      peso: 'Entre 4 y 6 gramos (Dependiendo de la talla)',
      bateria: 'Hasta 7 días con una sola carga'
    },
    inStock: true
  },
  {
    id: 'm-wear-09',
    name: 'Xiaomi Watch 2 Pro LTE WearOS',
    category: 'wearables',
    tag: 'WearOS con Google Play',
    price: 249,
    oldPrice: 289,
    rating: 4.8,
    reviewsCount: 63,
    hasCashea: true,
    description: 'Impulsado por Wear OS by Google con acceso a Google Maps, Wallet y Assistant, procesador Snapdragon W5+ Gen 1, caja de acero inoxidable y corona rotatoria clásica.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    colors: ['#1C1C1E', '#BDC3C7'],
    specs: {
      pantalla: '1.43" AMOLED 466x466 píxeles 600 nits',
      sistema: 'Wear OS by Google con conectividad 4G LTE eSIM',
      sensores: 'Sensor bioeléctrico de composición corporal BIA + ECG'
    },
    inStock: true
  },
  {
    id: 'm-wear-10',
    name: 'Garmin Epix Pro (Gen 2) Sapphire 47mm',
    category: 'wearables',
    tag: 'Cartografía Topográfica Pro',
    price: 899,
    oldPrice: 999,
    rating: 4.9,
    reviewsCount: 47,
    hasCashea: true,
    description: 'Impresionante pantalla AMOLED de 1.3" protegida con cristal de zafiro, mapas TopoActive precargados de todo el mundo con navegación giro a giro y métricas de rendimiento Hill Score.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    colors: ['#1E272E', '#95A5A6'],
    specs: {
      pantalla: '1.3" AMOLED táctil con bisel de titanio',
      bateria: 'Hasta 16 días en modo reloj inteligente / 42h en GPS',
      sensores: 'Sensor de frecuencia cardiaca de 5ta gen con ECG'
    },
    inStock: true
  },
  {
    id: 'm-wear-11',
    name: 'Huawei Band 9 Correa Fluoroelastómero',
    category: 'wearables',
    tag: 'Ligera & Económica',
    price: 59,
    oldPrice: 79,
    rating: 4.8,
    reviewsCount: 195,
    hasCashea: true,
    description: 'Solo 14 gramos de peso y 8.99 mm de grosor, pantalla AMOLED de 1.47 pulgadas con brillo automático, monitoreo de sueño TruSleep 4.0 y hasta 14 días de batería.',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80',
    colors: ['#1E272E', '#FF6B6B', '#54A0FF', '#1DD1A1'],
    specs: {
      pantalla: '1.47" AMOLED a color con pantalla siempre encendida (AOD)',
      peso: '14 gramos (Sin correa)',
      bateria: 'Hasta 14 días de uso máximo / 9 días uso típico'
    },
    inStock: true
  },
  {
    id: 'm-wear-12',
    name: 'Banda de Rendimiento WHOOP 4.0',
    category: 'wearables',
    tag: 'Recuperación & Esfuerzo',
    price: 239,
    oldPrice: 279,
    rating: 4.8,
    reviewsCount: 71,
    hasCashea: true,
    description: 'El rastreador de salud sin pantalla utilizado por atletas de élite para medir tensión muscular, recuperación cardiovascular, sueño profundo y variabilidad de frecuencia cardiaca (HRV).',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    colors: ['#1C1C1E', '#747D8C'],
    specs: {
      bateria: 'Batería inalámbrica impermeable deslizable (Carga sin quitártelo)',
      sensores: '5 LEDs y 4 fotodiodos para SpO2, temperatura de piel y HRV',
      resistencia: 'IP68 sumergible hasta 10 metros'
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
  { id: 'linea-blanca', label: 'Smart TVs 4K & Hogar' },
  { id: 'wearables', label: 'Smartwatches & Wearables' }
];
