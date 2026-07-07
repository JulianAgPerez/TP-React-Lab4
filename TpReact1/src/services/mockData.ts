import { Categoria, Instrumento } from "../types/types";

export interface UsuarioMock {
  nombreUsuario: string;
  clave: string;
  rol: string;
}

export const mockCategorias: Categoria[] = [
  { id: 1, denominacion: "Cuerda", baja: false },
  { id: 2, denominacion: "Percusión", baja: false },
  { id: 3, denominacion: "Teclado", baja: false },
  { id: 4, denominacion: "Viento", baja: false },
];

export const mockUsuarios: UsuarioMock[] = [
  { nombreUsuario: "admin", clave: "admin", rol: "Admin" },
  { nombreUsuario: "operador", clave: "operador", rol: "Operador" },
  { nombreUsuario: "visor", clave: "visor", rol: "Visor" },
];

export const generateMockInstrumentos = (): Instrumento[] => [
  {
    id: 1,
    instrumento: "Mandolina Instrumento Musical Stagg Sunburst",
    marca: "Stagg",
    modelo: "M20",
    imagen: "nro10.jpg",
    precio: 2450,
    costoEnvio: "G",
    cantidadVendida: 28,
    descripcion:
      "Excelente mandolina de la marca Stagg, con un sonido muy dulce, tapa aros y fondo de tilo, y diapasón de palisandro.",
    idCategoria: { id: 1, denominacion: "Cuerda", baja: false },
    baja: false,
  },
  {
    id: 2,
    instrumento: "Pandereta Pandero Instrumento Musical",
    marca: "DyM ventas",
    modelo: "32 sonajas",
    imagen: "nro9.jpg",
    precio: 325,
    costoEnvio: "150",
    cantidadVendida: 10,
    descripcion:
      "1 Pandereta - 32 sonajas metálicas. Más de 8 años vendiendo con 100% de calificaciones POSITIVAS.",
    idCategoria: { id: 2, denominacion: "Percusión", baja: false },
    baja: false,
  },
  {
    id: 3,
    instrumento: "Triangulo Musical 24 Cm Percusion",
    marca: "LBP",
    modelo: "24",
    imagen: "nro8.jpg",
    precio: 260,
    costoEnvio: "250",
    cantidadVendida: 3,
    descripcion:
      "Triangulo Musical de 24 Centímetros De Acero. Ideal para percusión.",
    idCategoria: { id: 2, denominacion: "Percusión", baja: false },
    baja: false,
  },
  {
    id: 4,
    instrumento: "Bar Chimes Lp Cortina Musical 72 Barras",
    marca: "FM",
    modelo: "LATIN",
    imagen: "nro7.jpg",
    precio: 2250,
    costoEnvio: "G",
    cantidadVendida: 2,
    descripcion:
      "BARCHIME CORTINA MUSICAL DE 25 BARRAS LATIN CUSTOM. Emitimos factura A y B.",
    idCategoria: { id: 2, denominacion: "Percusión", baja: false },
    baja: false,
  },
  {
    id: 5,
    instrumento: "Shekeres. Instrumento. Música. Artesanía.",
    marca: "Azalea Artesanías",
    modelo: "Cuentas de madera",
    imagen: "nro6.jpg",
    precio: 850,
    costoEnvio: "300",
    cantidadVendida: 5,
    descripcion:
      "Calabazas sembradas y cosechadas por nosotros, seleccionando el mejor fruto para garantizar la calidad.",
    idCategoria: { id: 2, denominacion: "Percusión", baja: false },
    baja: false,
  },
  {
    id: 6,
    instrumento: "Antiguo Piano Aleman Con Candelabros.",
    marca: "Neumeyer",
    modelo: "Stratus",
    imagen: "nro3.jpg",
    precio: 17000,
    costoEnvio: "2000",
    cantidadVendida: 0,
    descripcion:
      "Piano Alemán Neumeyer con candelabros incluidos. Talla muy bonita en la madera.",
    idCategoria: { id: 3, denominacion: "Teclado", baja: false },
    baja: false,
  },
  {
    id: 7,
    instrumento: "Guitarra Ukelele Infantil Grande 60cm",
    marca: "GUITARRA",
    modelo: "UKELELE",
    imagen: "nro4.jpg",
    precio: 500,
    costoEnvio: "G",
    cantidadVendida: 5,
    descripcion:
      "Material: Plástico simil madera, 4 cuerdas, longitud 60cm. Regalo ideal para 3-18 años.",
    idCategoria: { id: 1, denominacion: "Cuerda", baja: false },
    baja: false,
  },
  {
    id: 8,
    instrumento: "Teclado Organo Electronico Musical 54 Teclas",
    marca: "GADNIC",
    modelo: "T01",
    imagen: "nro2.jpg",
    precio: 2250,
    costoEnvio: "G",
    cantidadVendida: 1375,
    descripcion:
      "Organo Electrónico GADNIC T01. Display de Led. 54 Teclas. 100 Timbres / 100 Ritmos.",
    idCategoria: { id: 3, denominacion: "Teclado", baja: false },
    baja: false,
  },
  {
    id: 9,
    instrumento: "Instrumentos De Percusión Niños Set Musical Con Estuche",
    marca: "KNIGHT",
    modelo: "LB17",
    imagen: "nro1.jpg",
    precio: 2700,
    costoEnvio: "300",
    cantidadVendida: 15,
    descripcion:
      "Completísimo set de percusión para niños con estuche rígido, equipado con los instrumentos más divertidos.",
    idCategoria: { id: 2, denominacion: "Percusión", baja: false },
    baja: false,
  },
  {
    id: 10,
    instrumento: "Batería Musical Infantil Juguete Niño 9 Piezas Palillos",
    marca: "Bateria",
    modelo: "Infantil",
    imagen: "nro5.jpg",
    precio: 850,
    costoEnvio: "250",
    cantidadVendida: 380,
    descripcion:
      "DE 1 A 3 AÑOS. EL SET INCLUYE 5 TAMBORES, PALILLOS Y EL PLATILLO. SONIDOS REALISTAS.",
    idCategoria: { id: 2, denominacion: "Percusión", baja: false },
    baja: false,
  },
];

export const mockDataPorMesYAnio = [
  [1, 5], [2, 3], [3, 8], [4, 2], [5, 6], [6, 4],
  [7, 7], [8, 3], [9, 5], [10, 9], [11, 2], [12, 4],
  [13, 6], [14, 3], [15, 7], [16, 5], [17, 8], [18, 2],
  [19, 4], [20, 6], [21, 3], [22, 5], [23, 7], [24, 4],
  [25, 6], [26, 2], [27, 5], [28, 3], [29, 4], [30, 6],
];

export const mockDataPorInstrumento = [
  [5, { instrumento: "Mandolina Instrumento Musical Stagg Sunburst" }],
  [3, { instrumento: "Teclado Organo Electronico Musical 54 Teclas" }],
  [2, { instrumento: "Pandereta Pandero Instrumento Musical" }],
  [1, { instrumento: "Shekeres. Instrumento. Música. Artesanía." }],
  [1, { instrumento: "Triangulo Musical 24 Cm Percusion" }],
];
