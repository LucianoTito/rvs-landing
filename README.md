# Relojes Vintage Salta — Landing

Sitio de catálogo para **Relojes Vintage Salta** (RVS), casa de curaduría de
relojes vintage y de colección en Salta, Argentina.

Las piezas son unidades únicas con precio de referencia en dólares, y la venta
se cierra de forma personal. Por eso el sitio no usa carrito ni pago online:
cada reloj enlaza a WhatsApp con un mensaje ya redactado, lo que reduce la
fricción de la consulta y le permite al vendedor saber de qué pieza se trata.

## Stack

Sin dependencias ni proceso de build. HTML semántico, CSS moderno
(grillas fluidas, `clamp()`, propiedades lógicas) y JavaScript en módulos ES.

## Estructura
├── index.html Estructura de la página
├── data/
│ └── relojes.js Fuente única de datos del catálogo
└── assets/
├── css/
│ ├── base.css Variables de diseño, reset, tipografía fluida
│ ├── layout.css Nav, secciones, grillas, pie
│ └── components.css Botones, tarjetas, badges
├── js/
│ ├── config.js Contacto, rutas y textos fijos
│ ├── main.js Punto de entrada
│ ├── lib/ Utilidades sin estado
│ └── components/ Generadores de marcado
└── img/ Imágenes del sitio


## Decisiones de diseño

**Datos separados de la presentación.** `data/relojes.js` es la única fuente de
verdad. Agregar o modificar piezas no requiere tocar una línea de HTML.

**Datos crudos, no texto prearmado.** Cada pieza guarda campos independientes
(`movimiento`, `diametro`, `caja`). Las fichas técnicas y las descripciones de
venta se generan a partir de ellos, lo que permite reutilizarlos más adelante
para filtros o búsquedas.

**Imagen con reserva.** Si una foto todavía no llegó, se muestra una
ilustración SVG cuyos colores derivan de los datos de la pieza. El sitio nunca
muestra una imagen rota.

**Responsive sin media queries de tamaño.** Las grillas usan
`repeat(auto-fill, minmax(...))` y la tipografía usa `clamp()`. Las pocas
consultas de medios que existen cambian comportamiento, no dimensiones.

## Desarrollo

Los módulos ES requieren servir el proyecto por HTTP; abrir `index.html`
directamente no funciona.

```bash
npx serve .
```

O la extensión Live Server de VS Code.

## Cargar piezas nuevas

1. Agregar un objeto al array de `data/relojes.js`.
2. Guardar la foto en `assets/img/relojes/` con el nombre indicado en `foto`.
3. Marcar `destacado: true` en las piezas que van arriba.

## Pendientes

- [ ] Reemplazar datos de ejemplo por el catálogo real
- [ ] Cargar fotografías definitivas
- [ ] Quitar `noindex` del `<head>` antes de publicar
- [ ] Conectar dominio propio
- [ ] Migrar a Next.js

---

Desarrollado por **Luciano F. Tito Cedrón** · [LinkedIn](https://linkedin.com/in/luciano-facundo-tito-cedrón)