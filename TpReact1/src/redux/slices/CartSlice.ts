import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Instrumento, PedidoDetalle } from '../../types/types';

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
      const existingItemIndex = state.items.findIndex(item => item.instrumento.id === instrumento.id);
      if (existingItemIndex !== -1) {
        // Si el instrumento ya está en el carrito, aumenta la cantidad en lugar de agregar un nuevo elemento
        state.items[existingItemIndex].cantidad += 1;
      } else {
        // Si el instrumento no está en el carrito, lo agrega con cantidad inicial 1
        state.items.push({ instrumento : instrumento, cantidad: 1 });
      }
        //Guarda en local storage
        localStorage.setItem("cart", JSON.stringify(state.items))
    },
    //Agrega muchos, pasamos la cantidad como parametro
     addItems: (state, action: PayloadAction<{ instrumento: Instrumento; cantidad: number }>) => {
      const { instrumento, cantidad } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.instrumento.id === instrumento.id);
      if (existingItemIndex !== -1) {
        // Si el artículo ya está en el carrito, aumenta la cantidad
        state.items[existingItemIndex].cantidad += cantidad;
      } else {
        // Si el artículo no está en el carrito, lo agrega con la cantidad especificada
        state.items.push({
        instrumento: instrumento,
        cantidad: cantidad,
      });
    }
    //Guarda en local storage
    localStorage.setItem("cart", JSON.stringify(state.items))
    },
    reduceItem: (state, action: PayloadAction<Instrumento>) => {
      const instrumento = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.instrumento.id === instrumento.id);
      if (existingItemIndex !== -1) {
        const item = state.items[existingItemIndex];
        if (item.cantidad > 1) {
          item.cantidad -= 1;
        } else {
          state.items.splice(existingItemIndex, 1);
        }
      }
      //Guarda en local storage
      localStorage.setItem("cart", JSON.stringify(state.items))
    },
    removeItem: (state, action: PayloadAction<Instrumento>) => {
      const instrumento = action.payload;
      state.items = state.items.filter(item => item.instrumento.id !== instrumento.id);
      //Guarda en local storage
      localStorage.setItem("cart", JSON.stringify(state.items))
    },
    clearItems: (state) => {
      state.items = [];
      //limpia la localStorage
      localStorage.removeItem("cart");
    },
  },
});

// Exporta las acciones generadas automáticamente
export const { addItem,addItems, reduceItem ,removeItem, clearItems } = cartSlice.actions;

// Exporta el reductor
export default cartSlice.reducer;
