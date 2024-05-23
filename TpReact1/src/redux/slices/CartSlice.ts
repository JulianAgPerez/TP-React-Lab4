import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Instrumento } from '../../types/types';
import { RootState } from '../Store';

// Define el estado inicial del carrito
interface CartState {
  items: Instrumento[];
}

const initialState: CartState = {
  items: [],
};
export const updateItemQuantity = createAsyncThunk(
  "cart/updateItemQuantity",
  async ({ id, quantity }: { id: number; quantity: number }, { getState, dispatch }) => {
    // Obtener el estado actual
    const state = getState() as RootState;
    // Buscar el instrumento en el carrito
    const item = state.cart.items.find((item) => item.id === id);
    if (item) {
      // Crear un nuevo objeto de instrumento con la cantidad actualizada
      const updatedItem = { ...item, quantity };
      // Realizar la petición para actualizar la cantidad en el backend
      /*
              REVISAR URL
      */
      try {
        const response = await fetch(`http://localhost:8080/cart/items/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedItem),
        });
        const data = await response.json();
        if (response.ok) {
          // Actualizar el estado local del carrito con la cantidad actualizada
          dispatch(updateItemQuantitySuccess(data));
        } else {
          throw new Error("Error updating item quantity");
        }
      } catch (error) {
        console.error("Error updating item quantity:", error);
        throw error;
      }
    }
  }
);
// Crea un slice para el carrito
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Instrumento>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<Instrumento>) => {
      state.items = state.items.filter((item) => item !== action.payload);
    },
    updateItemQuantitySuccess: (state, action: PayloadAction<Instrumento>) => {
      // Actualizar el estado local con el instrumento actualizado
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      )
    },
    clearItems: (state) =>{
      state.items = [];
    }
  },
});

// Exporta las acciones generadas automáticamente
export const { addItem, removeItem, clearItems } = cartSlice.actions;

// Exporta el reductor
export default cartSlice.reducer;
