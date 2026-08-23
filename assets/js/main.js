/**
 * Punto de entrada del sitio.
 *
 * Coordina el arranque: renderiza las galerías, coloca las imágenes
 * del hero y de la sección institucional, conecta los enlaces de
 * contacto y activa las animaciones de aparición.
 *
 * Este archivo no contiene lógica de negocio: solo llama a los módulos
 * en el orden correcto.
 */

import { destacados, catalogo } from '../../data/relojes.js';
import { CONTACTO, RUTAS, TEXTOS, linkMapa } from './config.js';
import { linkWhatsApp } from './lib/whatsapp.js';
import { watchSvg } from './lib/watchSvg.js';
import { renderGaleria, alternarSeccion } from './components/Galeria.js';

/** IDs de los elementos que deben apuntar al WhatsApp general. */
const BOTONES_WA = ['nav-wa', 'hero-wa', 'cta-wa', 'foot-wa', 'fab-wa'];

/** Elementos decorativos que muestran una foto con ilustración de reserva. */
const DECORATIVOS = [
  {
    selector: '#hero-visual',
    ruta: RUTAS.portada,
    estilo: { aro: 'gSteel', esfera: 'dRed', correa: 'steel', agujaSeg: '#f1ece0' },
    alt: 'Pieza destacada de ' + TEXTOS.marca,
  },
  {
    selector: '#nosotros-visual',
    ruta: RUTAS.local,
    estilo: { aro: 'gGold', esfera: 'dCream', correa: 'leather' },
    alt: TEXTOS.marca,
  },
];

/** Renderiza las dos galerías de piezas. */
function montarGalerias() {
  const hayDestacados = renderGaleria('#grid-destacados', destacados);
  alternarSeccion('#destacados', hayDestacados);

  renderGaleria('#grid-catalogo', catalogo, {
    compacta: true,
    vacio: 'Estamos renovando el stock. Escribinos y te contamos qué piezas están por entrar.',
  });
}

/**
 * Coloca una imagen decorativa, con ilustración mientras la foto no exista.
 * @param {{selector: string, ruta: string, estilo: object, alt: string}} item
 */
function montarDecorativo(item) {
  const contenedor = document.querySelector(item.selector);
  if (!contenedor) return;

  contenedor.innerHTML = watchSvg(item.estilo);

  const prueba = new Image();
  prueba.onload = () => {
    contenedor.innerHTML = `<img class="visual__img" src="${item.ruta}" alt="${item.alt}">`;
  };
  prueba.src = item.ruta;
}

/**
 * Aplica un enlace a un conjunto de elementos y los abre en pestaña nueva.
 * @param {NodeListOf<Element>|Element[]} elementos
 * @param {string} href
 */
function enlazar(elementos, href) {
  elementos.forEach((el) => {
    if (!el) return;
    el.href = href;
    el.target = '_blank';
    el.rel = 'noopener';
  });
}

/** Conecta los enlaces de WhatsApp, Instagram y Google Maps. */
function montarContacto() {
  const botonesWa = BOTONES_WA.map((id) => document.getElementById(id));

  enlazar(botonesWa, linkWhatsApp(TEXTOS.consultaGeneral));
  enlazar(document.querySelectorAll('[data-instagram]'), CONTACTO.instagram);
  enlazar(document.querySelectorAll('[data-mapa]'), linkMapa());
}

/** Anima el segundero de la ilustración del hero, si quedó a la vista. */
function animarSegundero() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const aguja = document.querySelector('#hero-visual .aguja-seg');
  if (!aguja) return;

  let grados = 150;
  setInterval(() => {
    grados = (grados + 6) % 360;
    aguja.setAttribute('transform', `rotate(${grados} 100 140)`);
  }, 1000);
}

/** Revela los elementos a medida que entran en pantalla. */
function activarAnimaciones() {
  const elementos = document.querySelectorAll('.reveal');

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elementos.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        entrada.target.classList.add('is-visible');
        observador.unobserve(entrada.target);
      });
    },
    { threshold: 0.14 }
  );

  elementos.forEach((el) => observador.observe(el));
}

/** Arranca la aplicación. */
function init() {
  montarGalerias();
  DECORATIVOS.forEach(montarDecorativo);
  montarContacto();
  animarSegundero();
  activarAnimaciones();
}

document.addEventListener('DOMContentLoaded', init);