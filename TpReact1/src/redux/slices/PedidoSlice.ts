import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { emptPedido, Pedido } from "../../types/types";

interface PedidoState {
  pedidoActual: Pedido | undefined;
}

const initialState: PedidoState = {
  pedidoActual: undefined,
};

const pedidoSlice = createSlice({
  name: "pedido",
  initialState,
  reducers: {
    setPedidoActual: (state, action: PayloadAction<Pedido>) => {
      state.pedidoActual = action.payload;
    },
    clearPedidoActual: (state) => {
      state.pedidoActual = undefined;
    },
  },
});

export const { setPedidoActual, clearPedidoActual } = pedidoSlice.actions;
export default pedidoSlice.reducer;
