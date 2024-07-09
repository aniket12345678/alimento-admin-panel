import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { categorySlice } from "./slices/category.slice";
import { itemSlice } from "./slices/item.slice";
import { authSlice } from "./slices/auth.slice";
import { userSlice } from "./slices/user.slice";

const rootReducer = combineReducers({
    authSlice: authSlice.reducer,
    categorySlice: categorySlice.reducer,
    itemSlice: itemSlice.reducer,
    userSlice: userSlice.reducer,
})

export const Store = configureStore({
    reducer: rootReducer,
    devTools:true
});