import { configureStore } from '@reduxjs/toolkit';
import CartSlice from './slices/CartSlice';

//Si agrego otro reducer deberia hacer un rootReducer con combineReducers
const store = configureStore({
  reducer:{ cart: CartSlice}
  
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
