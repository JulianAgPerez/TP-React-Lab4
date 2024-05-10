export interface Instrumento{
    id: number,
    instrumento: string,
    marca: string,
	modelo: string,
	imagen: string,
	precio: number,
	costoEnvio: string,
	cantidadVendida: number,
	descripcion: string,
	idCategoria: number
}
export const emptyInstrumento = {
    instrumento: "",
	marca: "",
	modelo: "",
	imagen: "",
	precio: 0,
	costoEnvio: "",
	cantidadVendida: 0,
	descripcion: "",
	idCategoria: 0
}
export interface categoria {
	id: number,
	denominacion: string,
	baja: boolean
}
export const emptyCategoria = {
	denominacion: "",
}