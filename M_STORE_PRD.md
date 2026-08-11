# Documento de Requisitos del Producto (PRD) — M Store E-Commerce

## 1. Visión General del Producto
**M Store** es la plataforma e-commerce de referencia para la venta de tecnología de consumo, electrodomésticos y telefonía en Venezuela (estilo IVOO / Damasco / Apple Store). La plataforma ofrece una experiencia visual futurista *glassmorphic*, velocidad de carga ultrarrápida y un flujo de compra simplificado directamente vía WhatsApp.

---

## 2. Requisitos de Negocio y Reglas Mandatorias
- **0% Cashea / Cuotas**: Sin ningún tipo de financiamiento, calculadoras de cuotas ni menciones a Cashea.
- **Términos Formales**: Queda prohibido el uso del término "VIP". Se utiliza un lenguaje formal en español como "Envío Exprés" o "Garantía Oficial".
- **Precios en $USD Nítidos**: Todos los precios deben expresarse en formato `$1,399.00 USD` con tipografía limpia de alto contraste (`font-inter font-black text-white`).
- **100% en Español**: Todas las interfaces, botones e indicaciones deben estar en español.
- **Canal de Venta Principal**: Checkout directo hacia WhatsApp con mensaje estructurado conteniendo el resumen del pedido.

---

## 3. Funcionalidades y Casos de Uso del Sistema

### 3.1 Header & Navegación Principal
- **Logotipo M Store**: Conexión a la página principal y reinicio de filtros.
- **Buscador Predictivo en Tiempo Real**: Autocompletado que filtra por nombre de producto o marca, mostrando miniaturas y precios nítidos en USD.
- **Mega Menú de Categorías (5 Columnas Directas)**: Desplegable con categorías principales:
  - Televisores & Pantallas
  - Teléfonos & Movilidad
  - Computadoras & Laptops
  - Línea Blanca & Climatización (Aires A/C, Lavadoras, Neveras)
  - Audio & Accesorios
- **Botonera Móvil & Escritorio**: Acceso rápido al menú lateral de categorías y al carrito de compras con contador flotante reactivo.

### 3.2 Hero Banner Promocional (Carrusel Interactivo)
- **Sliders de Ofertas**: Carruseles interactivos con imágenes promocionales de alta definición, distintivos de descuento y precios destacados.
- **Botón de Acción "Comprar Ahora"**: Acceso directo al producto destacado.
- **Controles de Slider Ajustados**: Flechas de navegación y puntos situados en una fila independiente sin solapar la fotografía del producto en celulares.

### 3.3 Cinta de Marcas Oficiales
- **Carrusel de 1 Fila**: Deslizable horizontalmente con las marcas principales (Samsung, Apple, Síragon, LG, Xiaomi, JBL, Sony) con indicador glowing cian y filtro automático al hacer clic.

### 3.4 Catálogo Principal de Productos
- **Filtros por Pastillas (Pills)**: Botones interactivos para filtrar rápidamente el catálogo por categoría activa.
- **Tarjetas de Producto**:
  - Foto sobre marco blanco estilo estudio (`bg-white border-2 border-[#00E5FF]/40`).
  - Sin botones flotantes ni íconos de favoritos (corazón) sobre la foto.
  - Título, valoración en estrellas y precio `$USD` en tipografía blanco nítido.
  - Botón `"Añadir al Carrito"` con feedback táctil e indicación visual.

### 3.5 Modal de Vista Rápida (`QuickViewModal`)
- **Barra Superior Dedicada**: Botón `X` de cerrar e indicación de categoría en la barra superior sin tapar la imagen.
- **Lienzo Fotográfico Blanco**: Foto del producto en fondo blanco limpio.
- **Especificaciones Técnicas**: Lista detallada de características principales.
- **Selector de Cantidad**: Botones `+` y `-` para ajustar unidades.
- **Botón de Comprar por WhatsApp**: Inicia el pedido directo.

### 3.6 Carrito de Compras Lateral (`CartDrawer`)
- **Desplegable Lateral**: Muestra la lista de productos seleccionados, imágenes en miniatura, cantidad y precio unitario.
- **Cálculo de Subtotal y Envío Exprés**: Muestra el total exacto en USD.
- **Botón "Comprar por WhatsApp"**: Formatea y abre la aplicación con el detalle completo del carrito listo para enviar.

### 3.7 Panel de Administración (`AdminPanelModal`)
- **Protección por Clave**: Modal de gestión resguardado.
- **CRUD de Productos y Categorías**: Permite crear, modificar o eliminar productos y categorías personalizadas con persistencia local (`localStorage`).

---

## 4. Requisitos No Funcionales (Calidad y Rendimiento)
- **Accesibilidad & Responsive**: 100% adaptable a cualquier tamaño de pantalla móvil (desde 360px) hasta monitores 4K.
- **Compilación & Despliegue**: Libre de errores de consola JavaScript y desplegado en producción en Vercel (`https://m-store-nine.vercel.app/`).
