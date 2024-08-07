import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { categorySlice } from "../slices/category.slice";
import { itemSlice } from "../slices/item.slice";
import { authSlice } from "../slices/auth.slice";
import { userSlice } from "../slices/user.slice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    authSlice: authSlice.reducer,
    categorySlice: categorySlice.reducer,
    itemSlice: itemSlice.reducer,
    userSlice: userSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getmiddleware) => getmiddleware({
        serializableCheck: false
    })
});

export const persistor = persistStore(Store);