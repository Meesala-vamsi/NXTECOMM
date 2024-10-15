import { configureStore } from "@reduxjs/toolkit";
import reducer from "./slices/productSlice";
import productSlice from "./slices/productSlice";
import authSlice from "./slices/authSlice";


export const store = configureStore({
  reducer: {
    products: productSlice,
    auth:authSlice
  },
});