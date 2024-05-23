import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PedidoDetalle, emptyPedidoDetalle } from "../../types/types";

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchPedidoDetalles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPedidoDetalles.fulfilled, (state, action) => {
        state.loading = false;
        state.detalles = action.payload;
      })
      .addCase(fetchPedidoDetalles.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Error al obtener los detalles del pedido";
      });
  },
});

// Exporta el reducer generado automáticamente por createSlice
export default pedidoDetalleSlice.reducer;

// Exporta acciones generadas automáticamente por createSlice si las necesitas
// export const { actionName } = pedidoDetalleSlice.actions;

// Selector para obtener los detalles de los pedidos del estado
export const selectPedidoDetalles = (state: RootState) =>
  state.pedidoDetalles.detalles;
