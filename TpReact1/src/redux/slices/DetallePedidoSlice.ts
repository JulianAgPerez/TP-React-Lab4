import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PedidoDetalle, emptyPedidoDetalle } from "../../types/types";
import { RootState } from "../Store";

const initialState = { emptyPedidoDetalle };

export const detallePedidoSlice = createSlice({
  name: "Detalle",
  initialState,
  reducers: {},
});

// Función asincrónica para recuperar los detalles de los pedidos desde el servidor
export const fetchPedidoDetalles = createAsyncThunk(
  "pedidoDetalles/fetchPedidoDetalles",
  async () => {
    const response = await fetch("api/pedidos");
    return (await response.json()) as PedidoDetalle[];
  }
);

// Slice para los detalles de los pedidos
const pedidoDetalleSlice = createSlice({
  name: "pedidoDetalles",
  initialState,
  reducers: {},
});

// Exporta el reducer generado automáticamente por createSlice
export default pedidoDetalleSlice.reducer;

// Exporta acciones generadas automáticamente por createSlice si las necesitas
// export const { actionName } = pedidoDetalleSlice.actions;
