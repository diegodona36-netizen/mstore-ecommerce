---
name: landing-page-experiment
description: Guía de experimentación para mejorar el diseño, la tasa de conversión (CRO) y los elementos interactivos del Landing Page de M Store en un entorno sandbox aislado sin afectar la producción.
---

# Landing Page Experiment Skill

Esta habilidad proporciona pautas y componentes interactivos para testear mejoras en la página de aterrizaje de M Store en un entorno aislado (`#test`).

## Principios de Conversión (CRO) y Diseño Futurista:

1. **Aislamiento de Seguridad**:
   - Todas las pruebas deben desarrollarse en `src/components/LandingPageTest.jsx` o en la ruta `#test`.
   - La versión en producción (`App.jsx`) nunca se modifica durante las pruebas.

2. **Elementos de Alta Conversión (High-Converting Components)**:
   - **Comparador Técnico Interactivo**: Tabla comparativa dinámicas de Flagships (iPhone 16 Pro Max vs S24 Ultra).
   - **Cronómetro Cyber Flash Sale**: Contador regresivo en vivo con urgencia psicológica.
   - **Calculadora de Descuentos / Financiamiento**: Slider para calcular cuotas o ahorro VIP.
   - **Reseñas & Testimonios 3D Carousel**: Carrusel con fotos de clientes satisfechos y estrellas en 3D.
   - **Garantías & Certificados Interactivos**: Sellos holográficos con efecto glassmorphic.

3. **Promoción a Producción**:
   - Solo cuando el usuario apruebe explícitamente el test, las mejoras se integran gradualmente al sitio principal.
