import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { categorySlice } from "./slices/category.slice";
import { itemSlice } from "./slices/item.slice";
import { authSlice } from "./slices/auth.slice";


export const Store = configureStore({
    reducer: {
        authSlice: authSlice.reducer,
        categorySlice: categorySlice.reducer,
        itemSlice: itemSlice.reducer,
    }
});