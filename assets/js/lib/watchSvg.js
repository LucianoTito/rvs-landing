/**
 * Ilustración SVG de un reloj, usada como imagen de reserva.
 *
 * Mientras una pieza no tenga foto real, se dibuja este reloj en su lugar.
 * Los colores se derivan de los datos de la pieza, así cada tarjeta se ve
 * distinta y el catálogo no parece un placeholder repetido.
 */

/** Aros de caja disponibles (definidos en el <defs> del index.html). */
const AROS = { oro: 'gGold', acero: 'gSteel' };

/** Esferas disponibles. */
const ESFERAS = {
  crema: 'dCream',
  negra: 'dBlack',
  azul: 'dBlue',
  roja: 'dRed',
  plateada: 'dSilver',
  verde: 'dGreen',
};

/** Correas disponibles. */
const CORREAS = { acero: 'steel', cuero: 'leather', cueroNegro: 'leatherB' };

/**
 * Traduce los datos de una pieza a los colores del dibujo.
 * @param {import('../../../data/relojes.js').Reloj} reloj
 * @returns {{aro: string, esfera: string, correa: string, agujaSeg: string}}
 */
export function estiloDesdeReloj(reloj) {
  const caja = (reloj.caja || '').toLowerCase();
  const esferaTxt = (reloj.esfera || '').toLowerCase();
  const mallaTxt = (reloj.malla || '').toLowerCase();

  const aro = caja.includes('oro') ? AROS.oro : AROS.acero;

  let esfera = ESFERAS.crema;
  if (esferaTxt.includes('negr')) esfera = ESFERAS.negra;
  else if (esferaTxt.includes('azul')) esfera = ESFERAS.azul;
  else if (esferaTxt.includes('roj') || esferaTxt.includes('carmes')) esfera = ESFERAS.roja;
  else if (esferaTxt.includes('plat') || esferaTxt.includes('gris')) esfera = ESFERAS.plateada;
  else if (esferaTxt.includes('verde')) esfera = ESFERAS.verde;

  let correa = CORREAS.cuero;
  if (mallaTxt.includes('acero')) correa = CORREAS.acero;
  else if (mallaTxt.includes('negro')) correa = CORREAS.cueroNegro;

  const agujaSeg = esfera === ESFERAS.negra || esfera === ESFERAS.azul ? '#d4af37' : '#8f2533';

  return { aro, esfera, correa, agujaSeg };
}

/**
 * Dibuja los índices de las horas alrededor de la esfera.
 * @returns {string} Marcado SVG de las 12 marcas.
 */
function indices() {
  let salida = '';
  for (let i = 0; i < 12; i++) {
    const angulo = (i * 30 * Math.PI) / 180;
    const principal = i % 3 === 0;
    const radioInterno = principal ? 54 : 57;
    const radioExterno = 63;
    const x1 = 100 + Math.sin(angulo) * radioInterno;
    const y1 = 140 - Math.cos(angulo) * radioInterno;
    const x2 = 100 + Math.sin(angulo) * radioExterno;
    const y2 = 140 - Math.cos(angulo) * radioExterno;
    salida +=
      `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" ` +
      `x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" ` +
      `stroke="url(#gGold)" stroke-width="${principal ? 3 : 1.4}" stroke-linecap="round"/>`;
  }
  return salida;
}

/**
 * Dibuja la malla o correa, arriba y abajo de la caja.
 * @param {string} tipo Una de las claves de CORREAS.
 * @returns {string}
 */
function correaSvg(tipo) {
  if (tipo === CORREAS.acero) {
    return (
      '<rect x="76" y="4" width="48" height="66" rx="7" fill="url(#gSteel)"/>' +
      '<line x1="76" y1="26" x2="124" y2="26" stroke="#5a626c" stroke-width="1.2"/>' +
      '<line x1="76" y1="46" x2="124" y2="46" stroke="#5a626c" stroke-width="1.2"/>' +
      '<rect x="76" y="210" width="48" height="66" rx="7" fill="url(#gSteel)"/>' +
      '<line x1="76" y1="234" x2="124" y2="234" stroke="#5a626c" stroke-width="1.2"/>' +
      '<line x1="76" y1="254" x2="124" y2="254" stroke="#5a626c" stroke-width="1.2"/>'
    );
  }
  return (
    `<path d="M78 6 h44 l-4 66 h-36 z" fill="url(#${tipo})"/>` +
    `<path d="M82 208 h36 l4 66 h-44 z" fill="url(#${tipo})"/>`
  );
}

/**
 * Genera la ilustración completa de un reloj.
 * @param {{aro?: string, esfera?: string, correa?: string, agujaSeg?: string}} [estilo]
 * @returns {string} Marcado SVG listo para insertar.
 */
export function watchSvg(estilo = {}) {
  const aro = estilo.aro || AROS.oro;
  const esfera = estilo.esfera || ESFERAS.crema;
  const correa = estilo.correa || CORREAS.cuero;
  const agujaSeg = estilo.agujaSeg || '#8f2533';

  return (
    '<svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">' +
    correaSvg(correa) +
    `<circle cx="100" cy="140" r="78" fill="url(#${aro})"/>` +
    '<circle cx="100" cy="140" r="70" fill="#0c0c0e"/>' +
    `<circle cx="100" cy="140" r="66" fill="url(#${esfera})"/>` +
    indices() +
    '<g transform="rotate(-52 100 140)"><rect x="97.5" y="108" width="5" height="40" rx="2.5" fill="#20201d"/></g>' +
    '<g transform="rotate(66 100 140)"><rect x="98.3" y="92" width="3.4" height="56" rx="1.7" fill="#20201d"/></g>' +
    `<g class="aguja-seg" transform="rotate(150 100 140)"><rect x="99.2" y="86" width="1.6" height="62" rx="1" fill="${agujaSeg}"/></g>` +
    '<circle cx="100" cy="140" r="4.5" fill="url(#gGold)"/>' +
    `<rect x="176" y="134" width="10" height="12" rx="2" fill="url(#${aro})"/>` +
    '<ellipse cx="80" cy="118" rx="30" ry="16" fill="#fff" opacity=".07"/>' +
    '</svg>'
  );
}