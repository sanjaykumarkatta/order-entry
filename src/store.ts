import { configureStore } from '@reduxjs/toolkit';
import { ordersSlice } from './slices/orderSlice';

const store = configureStore({
  reducer: {
    orders: ordersSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch