/**
 * Generación de enlaces a WhatsApp.
 *
 * Un enlace wa.me abre la app (en celular) o WhatsApp Web (en compu)
 * con el chat del negocio y el mensaje ya escrito. El cliente solo envía.
 */

import { CONTACTO, MONEDA } from '../config.js';

const BASE = 'https://wa.me/';

/**
 * Arma un enlace a WhatsApp con un mensaje precargado.
 * @param {string} mensaje Texto que aparecerá escrito en el chat.
 * @returns {string} URL lista para usar en un href.
 */
export function linkWhatsApp(mensaje) {
  const texto = encodeURIComponent(mensaje);
  return `${BASE}${CONTACTO.telefono}?text=${texto}`;
}

/**
 * Enlace de consulta por una pieza puntual del catálogo.
 * @param {import('../../../data/relojes.js').Reloj} reloj
 * @returns {string}
 */
export function linkConsultaReloj(reloj) {
  const mensaje =
    `¡Hola! Me interesa el ${reloj.marca} ${reloj.modelo} ` +
    `(${MONEDA} ${reloj.precio}) que vi en la web. ¿Sigue disponible?`;
  return linkWhatsApp(mensaje);
}
