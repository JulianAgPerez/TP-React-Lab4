import { configureStore } from '@reduxjs/toolkit';
import CartReducer from './slices/CartSlice';
import InstrumentoReducer from "./slices/InstrumentoSlice"
import pedidoReducer from "./slices/PedidoSlice"

//Si agrego otro reducer deberia hacer un rootReducer con combineReducers
const store = configureStore({
  reducer:{ 
    cart: CartReducer,
    instrumentos: InstrumentoReducer,
    pedidos: pedidoReducer,
  }
  
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
