/**
 * Catálogo de piezas de Relojes Vintage Salta.
 *
 * Esta es la ÚNICA fuente de datos del sitio. Para agregar, sacar o
 * modificar un reloj, se edita solamente este archivo.
 *
 * Cada pieza sale de una fila de la planilla de carga.
 *
 * @typedef  {Object} Reloj
 * @property {string} id          Identificador único (mismo N° que la planilla)
 * @property {string} marca
 * @property {string} modelo
 * @property {string} condicion   'Vintage' | 'Nuevo' | 'Vintage restaurado'
 * @property {string} origen      'Suizo' | 'Japonés' | ...
 * @property {string} movimiento  'Automático' | 'Cuerda manual' | 'Cuarzo' | ...
 * @property {number} diametro    En milímetros
 * @property {string} caja        Material de la caja
 * @property {string} malla       Malla o correa
 * @property {string} esfera      Color de la esfera
 * @property {string} decada      Ej. '1970s'
 * @property {string} estado      'Excelente' | 'Muy bueno' | 'Bueno'
 * @property {string} funciones   Complicaciones extra. Puede ir vacío.
 * @property {number} precio      En dólares, sin símbolo
 * @property {boolean} destacado  true = aparece grande arriba
 * @property {string} foto        Nombre del archivo en assets/img/relojes/
 * @property {string} [detalle]   Comentario del vendedor. Opcional.
 */

/** @type {Reloj[]} */
export const relojes = [
  {
    id: '01',
    marca: 'Omega',
    modelo: 'De Ville',
    condicion: 'Vintage',
    origen: 'Suizo',
    movimiento: 'Cuerda manual',
    diametro: 35,
    caja: 'Acero',
    malla: 'Cuero negro',
    esfera: 'Plateada',
    decada: '1970s',
    estado: 'Excelente',
    funciones: 'Fecha a las 3',
    precio: 750,
    destacado: true,
    foto: 'reloj-01.jpg',
    detalle: 'Entró de una colección familiar, anda impecable.',
  },
  {
    id: '02',
    marca: 'Citizen',
    modelo: 'Tsuyosa',
    condicion: 'Nuevo',
    origen: 'Japonés',
    movimiento: 'Automático',
    diametro: 40,
    caja: 'Acero',
    malla: 'Acero',
    esfera: 'Rojo carmesí',
    decada: '2020s',
    estado: 'Excelente',
    funciones: 'Maquinaria a la vista',
    precio: 520,
    destacado: true,
    foto: 'reloj-02.jpg',
  },
  {
    id: '03',
    marca: 'Seiko',
    modelo: '5 Automatic',
    condicion: 'Vintage',
    origen: 'Japonés',
    movimiento: 'Automático',
    diametro: 37,
    caja: 'Acero',
    malla: 'Acero',
    esfera: 'Negra',
    decada: '1980s',
    estado: 'Muy bueno',
    funciones: 'Día y fecha',
    precio: 150,
    destacado: false,
    foto: 'reloj-03.jpg',
  },
];

/** Piezas que se muestran en grande, arriba de todo. */
export const destacados = relojes.filter((r) => r.destacado);

/** Resto del catálogo. */
export const catalogo = relojes.filter((r) => !r.destacado);
