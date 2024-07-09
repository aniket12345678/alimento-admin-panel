import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../middleware/api";

export const categoryAdd = createAsyncThunk('/categories/add',
    async (values) => {
        try {
            const response = await API.post('/categories/add', values);
            return response.data;
        } catch (error) {
            console.log('error:- ', error);
        }
    }
);

export const categoryFindAll = createAsyncThunk('/categories/find/all',
    async (values) => {
        try {
            const response = await API.get('/categories/find/all')
            return response.data;
        } catch (error) {

        }
    }
);

export const categoryFindOne = createAsyncThunk('/categories/delete',
    async (values) => {
        try {
            const response = await API.post('/categories/delete', values)
        } catch (error) {

        }
    }
);

export const categorySlice = createSlice({
    name: 'categorySlice',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(categoryFindAll.fulfilled, (state, action) => {
            console.log('categoryFindAll.fulfilled', action);
        });
        builder.addCase(categoryFindOne.fulfilled, (state, action) => {
            console.log('categoryFindOne.fulfilled', action);
        });
    }
});