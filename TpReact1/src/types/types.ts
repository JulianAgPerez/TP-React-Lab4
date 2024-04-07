export interface Instrumento{
    id: number,
    instrumento: string,
    marca: string,
	modelo: string,
	imagen: string,
	precio: number,
	costoEnvio: number,
	cantidadVendida: number,
	descripcion: string
}
export const emptyInstrumento = {
    instrumento: "",
	marca: "",
	modelo: "",
	imagen: "",
	precio: 0,
	costoEnvio: 0,
	cantidadVendida: 0,
	descripcion: ""
}