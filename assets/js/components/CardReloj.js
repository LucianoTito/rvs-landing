/**
 * Tarjeta de una pieza del catálogo.
 *
 * Genera el marcado de la tarjeta y se encarga de mostrar la foto real
 * cuando existe, o la ilustración de reserva cuando todavía no llegó.
 */

import { MONEDA } from '../config.js';
import { rutaFoto } from '../config.js';
import { linkConsultaReloj } from '../lib/whatsapp.js';
import { watchSvg, estiloDesdeReloj } from '../lib/watchSvg.js';

/** Ícono de WhatsApp para el botón de consulta. */
const ICONO_WA =
  '<svg viewBox="0 0 24 24" aria-hidden="true">' +
  '<path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2' +
  'l-.3-.2-3.1.8.8-3-.2-.3a8.2 8.2 0 1 1 7.2 3.9z"/></svg>';

/**
 * Arma la ficha técnica corta a partir de los datos crudos.
 * @param {import('../../../data/relojes.js').Reloj} reloj
 * @returns {string} Ej. 'Automático · 40 mm · Acero'
 */
export function fichaTecnica(reloj) {
  const partes = [reloj.movimiento, `${reloj.diametro} mm`, reloj.malla];
  if (reloj.funciones) partes.push(reloj.funciones);
  return partes.filter(Boolean).join(' · ');
}

/**
 * Redacta la descripción de venta a partir de los datos de la pieza.
 * @param {import('../../../data/relojes.js').Reloj} reloj
 * @returns {string}
 */
export function descripcion(reloj) {
  if (reloj.detalle) return reloj.detalle;

  const origen = reloj.origen ? `${reloj.origen.toLowerCase()} ` : '';
  const epoca = reloj.decada && reloj.decada !== 'No sé' ? ` de los ${reloj.decada}` : '';
  const conserva =
    reloj.estado === 'Excelente'
      ? 'En excelente estado de conservación.'
      : `En ${reloj.estado.toLowerCase()} estado.`;

  return (
    `Reloj ${origen}${epoca ? epoca.trim() + ', ' : ''}` +
    `con caja de ${reloj.caja.toLowerCase()} de ${reloj.diametro} mm ` +
    `y esfera ${reloj.esfera.toLowerCase()}. ${conserva}`
  );
}

/**
 * Genera el marcado de una tarjeta.
 * @param {import('../../../data/relojes.js').Reloj} reloj
 * @param {{compacta?: boolean}} [opciones] compacta = versión chica del catálogo.
 * @returns {string}
 */
export function CardReloj(reloj, opciones = {}) {
  const compacta = Boolean(opciones.compacta);
  const clases = compacta ? 'card card--compacta' : 'card';

  const cuerpoDescripcion = compacta
    ? ''
    : `<p class="card__desc">${descripcion(reloj)}</p>`;

  return `
    <article class="${clases} reveal">
      <div class="card__pic" data-foto-id="${reloj.id}">
        <span class="card__tag">${reloj.condicion}</span>
        <span class="card__uniq">1 disponible</span>
      </div>
      <div class="card__body">
        <p class="card__marca">${reloj.marca}</p>
        <h3 class="card__modelo">${reloj.modelo}</h3>
        <p class="card__ficha">${fichaTecnica(reloj)}</p>
        ${cuerpoDescripcion}
        <div class="card__foot">
          <p class="card__precio"><small>${MONEDA}</small>${reloj.precio}</p>
          <a class="card__wa"
             href="${linkConsultaReloj(reloj)}"
             target="_blank"
             rel="noopener"
             aria-label="Consultar por ${reloj.marca} ${reloj.modelo} por WhatsApp">
            ${ICONO_WA}Consultar
          </a>
        </div>
      </div>
    </article>`;
}

/**
 * Coloca la imagen de una tarjeta ya insertada en el DOM.
 *
 * Primero dibuja la ilustración, y si la foto real carga bien, la reemplaza.
 * Así una foto faltante nunca deja un ícono roto en pantalla.
 *
 * @param {import('../../../data/relojes.js').Reloj} reloj
 */
export function montarImagen(reloj) {
  const contenedor = document.querySelector(`[data-foto-id="${reloj.id}"]`);
  if (!contenedor) return;

  const etiquetas = contenedor.innerHTML;
  contenedor.innerHTML = watchSvg(estiloDesdeReloj(reloj)) + etiquetas;

  if (!reloj.foto) return;

  const ruta = rutaFoto(reloj.foto);
  const prueba = new Image();
  prueba.onload = () => {
    contenedor.innerHTML =
      `<img class="card__img" src="${ruta}" alt="${reloj.marca} ${reloj.modelo}" loading="lazy">` +
      etiquetas;
  };
  prueba.src = ruta;
}