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

// Acción para crear un nuevo pedido
export const createPedido = createAsyncThunk(
  'cart/createPedido',
  async (pedidoDetalles: PedidoDetalle[], { dispatch }) => {
    // Realiza la lógica para crear un nuevo pedido en el backend
    try {
      // Hacer la solicitud al backend para crear un nuevo pedido con los detalles proporcionados
      // Esperar la respuesta del backend, que debería incluir el ID del nuevo pedido
      const newPedidoId = await api.createPedido(pedidoDetalles); // api.createPedido es un ejemplo de cómo podría ser tu función para crear un pedido en el backend

      // Actualizar el pedido_id en cada pedidoDetalle con el nuevo ID de pedido
      pedidoDetalles.forEach(pedidoDetalle => {
        pedidoDetalle.pedido_id = newPedidoId;
      });

      // Limpiar el carrito después de crear el pedido exitosamente
      dispatch(clearItems());
    } catch (error) {
      // Manejar errores si falla la creación del pedido
      console.error('Error al crear el pedido:', error);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Instrumento>) => {
      const instrumento = action.payload;
      const nuevoPedidoDetalle: PedidoDetalle = {
        cantidad: 1, //carga inicial
        instrumento_id: instrumento.id,
      };
      state.items.push(nuevoPedidoDetalle);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const pedidoDetalle = state.items.find(item => item.id === action.payload);
      if (pedidoDetalle) {
        pedidoDetalle.cantidad++;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const pedidoDetalle = state.items.find(item => item.id === action.payload);
      if (pedidoDetalle && pedidoDetalle.cantidad > 1) {
        pedidoDetalle.cantidad--;
      }
    },
    clearItems: (state) => {
      state.items = [];
    }
  },
});

export const { addItem, removeItem, increaseQuantity, decreaseQuantity, clearItems } = cartSlice.actions;


// Exporta el reductor
export default cartSlice.reducer;
