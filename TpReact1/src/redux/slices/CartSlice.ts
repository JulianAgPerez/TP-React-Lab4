import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Instrumento, PedidoDetalle } from '../../types/types';
import { RootState } from '../Store';

// Define el estado inicial del carrito
interface CartState {
  items: PedidoDetalle[];
}

const initialState: CartState = {
  items: [],
};

// Crea un slice para el carrito
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Instrumento>) => {
      const  instrumento  = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.instrumento_id.id === instrumento.id);
      if (existingItemIndex !== -1) {
        // Si el instrumento ya está en el carrito, aumenta la cantidad en lugar de agregar un nuevo elemento
        state.items[existingItemIndex].cantidad += 1;
      } else {
        // Si el instrumento no está en el carrito, agrégalo con cantidad inicial 1
        state.items.push({ instrumento_id : instrumento, cantidad: 1 });
      }
    },
    reduceItem: (state, action: PayloadAction<Instrumento>) => {
      const instrumento = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.instrumento_id.id === instrumento.id);
      if (existingItemIndex !== -1) {
        const item = state.items[existingItemIndex];
        if (item.cantidad > 1) {
          item.cantidad -= 1;
        } else {
          state.items.splice(existingItemIndex, 1);
        }
      }
    },
    removeItem: (state, action: PayloadAction<Instrumento>) => {
      const instrumento = action.payload;
      state.items = state.items.filter(item => item.instrumento_id.id !== instrumento.id);
    },
    updateItemQuantitySuccess: (state, action: PayloadAction<PedidoDetalle>) => {
      // Actualizar el estado local con el pedido detalle actualizado
      const updatedItem = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.instrumento_id.id === updatedItem.instrumento_id.id);
      if (existingItemIndex !== -1) {
        // Si el pedido detalle existe en el carrito, reemplaza el antiguo por el nuevo
        state.items[existingItemIndex] = updatedItem;
      }
    },
    clearItems: (state) => {
      state.items = [];
    },
  },
});

// Exporta las acciones generadas automáticamente
export const { addItem, reduceItem ,removeItem, clearItems } = cartSlice.actions;

// Exporta el reductor
export default cartSlice.reducer;
