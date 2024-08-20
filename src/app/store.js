import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/services/_baseApi';
import { setupListeners } from "@reduxjs/toolkit/query";
import bookReducer from '@/redux/bookSlice';
import cateReducer from '@/redux/cateSlice'
import authReducer from '@/redux/authSlice';
import profileReducer from'@/redux/profileSlice'
import checkoutReducer from '@/redux/checkoutSlice'
import cartReducer from '@/redux/cartSlice'


const store = configureStore({
  reducer: {
    [baseApi.reducerPath]:baseApi.reducer,
    books: bookReducer,
    cates: cateReducer,
    auth: authReducer,
    profile: profileReducer,
    checkout: checkoutReducer,
    cart:cartReducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(baseApi.middleware),
  devTools: process.env.NODE_ENV !== "production",

});
setupListeners(store.dispatch);

export default store;