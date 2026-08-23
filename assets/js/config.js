/**
 * Configuración global del sitio.
 *
 * Todo lo que puede cambiar sin tocar la lógica vive acá:
 * datos de contacto, rutas y textos fijos.
 *
 * Regla: si un valor aparece en más de un archivo, va acá.
 */

/** Datos de contacto del negocio. */
export const CONTACTO = {
  telefono: '5493872280438',
  instagram: 'https://instagram.com/relojesvintagesalta',
  direccion: 'Zuviría 1810, Salta Capital',
  ciudad: 'Salta, Argentina',
  /** Dirección tal cual se envía a Google Maps para buscar el lugar. */
  direccionMapa: 'Zuviría 1810, Salta, Argentina',
};


/** Rutas base de las imágenes. Si cambia la carpeta, se cambia solo acá. */
export const RUTAS = {
  relojes: 'assets/img/relojes/',
  portada: 'assets/img/portada.jpg',
  local: 'assets/img/local.jpg',
};

/** Textos que se repiten en varios lugares. */
export const TEXTOS = {
  marca: 'Relojes Vintage Salta',
  siglas: 'RVS',
  bajada: 'Curaduría · desde 2026',
  /** Mensaje del botón general de WhatsApp. */
  consultaGeneral: '¡Hola! Vi la página de Relojes Vintage Salta y quería hacerles una consulta.',
};

/** Moneda en la que se publican los precios. */
export const MONEDA = 'USD';

/**
 * Devuelve la ruta completa de la foto de un reloj.
 * @param {string} nombreArchivo Ej. 'reloj-01.jpg'
 * @returns {string}
 */
export function rutaFoto(nombreArchivo) {
  return RUTAS.relojes + nombreArchivo;
}

/**
 * Enlace a Google Maps con la dirección del local.
 *
 * Se usa el buscador universal en vez de coordenadas fijas: funciona en
 * celular (abre la app y ofrece iniciar el viaje) y en escritorio (abre
 * Maps en el navegador), sin depender de una API key.
 *
 * @returns {string}
 */
export function linkMapa() {
  const consulta = encodeURIComponent(CONTACTO.direccionMapa);
  return `https://www.google.com/maps/search/?api=1&query=${consulta}`;
}