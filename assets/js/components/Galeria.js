/**
 * Galerías de piezas: destacados y catálogo.
 *
 * Recibe una lista de relojes, la renderiza dentro de un contenedor
 * y monta las imágenes de cada tarjeta.
 */

import { CardReloj, montarImagen } from './CardReloj.js';

/**
 * Renderiza una lista de relojes dentro de un contenedor.
 *
 * @param {string} selector Selector CSS del contenedor destino.
 * @param {import('../../../data/relojes.js').Reloj[]} piezas
 * @param {{compacta?: boolean, vacio?: string}} [opciones]
 * @returns {boolean} true si se renderizó al menos una pieza.
 */
export function renderGaleria(selector, piezas, opciones = {}) {
  const contenedor = document.querySelector(selector);
  if (!contenedor) {
    console.warn(`Galeria: no se encontró el contenedor "${selector}".`);
    return false;
  }

  if (!piezas.length) {
    contenedor.innerHTML = `<p class="galeria__vacio">${
      opciones.vacio || 'No hay piezas para mostrar en este momento.'
    }</p>`;
    return false;
  }

  contenedor.innerHTML = piezas
    .map((reloj) => CardReloj(reloj, { compacta: opciones.compacta }))
    .join('');

  piezas.forEach(montarImagen);
  return true;
}

/**
 * Oculta una sección entera si no tiene piezas que mostrar.
 * Evita que quede un título suelto sobre un espacio vacío.
 *
 * @param {string} selectorSeccion
 * @param {boolean} tieneContenido
 */
export function alternarSeccion(selectorSeccion, tieneContenido) {
  const seccion = document.querySelector(selectorSeccion);
  if (seccion) seccion.hidden = !tieneContenido;
}
