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
	idCategoria: Categoria,
	baja: boolean
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
	idCategoria: null
}
export interface Categoria {
	id: number,
	denominacion: string,
	baja: boolean
}
export const emptyCategoria = {
	denominacion: "",
}
export interface PedidoDetalle{
	id?:number,
	cantidad:number,
	instrumento_id:Instrumento,
	pedido_id?:number
}
export const emptyPedidoDetalle={
	id:null,
	cantidad:null,
	instrumento_id:null,
	pedido_id:null
}
export interface PreferenceMp{
	id?:string,
	statusCode?: number
}