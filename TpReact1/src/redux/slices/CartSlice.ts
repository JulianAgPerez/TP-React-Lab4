import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define el estado inicial del carrito
interface CartState {
  items: string[];
}

const initialState: CartState = {
  items: [],
};

// Crea un slice para el carrito
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<string>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item !== action.payload);
    },
  },
});

// Exporta las acciones generadas automáticamente
export const { addItem, removeItem } = cartSlice.actions;

// Exporta el reductor
export default cartSlice.reducer;
