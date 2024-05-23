import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pedido } from '../../types/types';

type PedidoState = {
  pedidos: Pedido[];
};

const initialState: PedidoState = {
  pedidos: [],
};

const pedidoSlice = createSlice({
  name: 'pedidos',
  initialState,
  reducers: {
    setPedidos(state, action: PayloadAction<Pedido[]>) {
      state.pedidos = action.payload;
    },
  },
});

export const { setPedidos } = pedidoSlice.actions;
export default pedidoSlice.reducer;
