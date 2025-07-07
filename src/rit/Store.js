import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/Cart-slice";
import globalReducer from './slices/globalSlice';
export const store = configureStore({
  reducer: {
    cart: cartSlice,
    global: globalReducer,
  },
});
