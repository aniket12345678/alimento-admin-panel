import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../middleware/api";

export const itemAdd = createAsyncThunk('/items/add',
    async (values) => {
        try {
            const response = await API.post('/items/add', values);
            console.log('itemAdd', response);
            return response.data
        } catch (error) {
            console.log('error itemAdd:- ', error);
        }
    }
);

export const itemFindAll = createAsyncThunk('/items/find/all',
    async (values) => {
        try {
            const response = await API.post('/items/find/all', values);
            console.log('itemFindAll:- ', response);
            return response.data
        } catch (error) {
            console.log('error itemFindAll:- ', error);
        }
    }
);

export const itemFindOne = createAsyncThunk('/items/delete',
    async (values) => {
        try {
            const response = await API.post('/items/delete', values);
            console.log('itemFindOne:- ', response);
        } catch (error) {
            console.log('error itemFindOne:- ', error);
        }
    }
);

const initialValues = {
    findAll: []
}

export const itemSlice = createSlice({
    name: 'itemSlice',
    initialState: initialValues,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(itemFindAll.fulfilled, (state, action) => {
            console.log('itemFindAll.fulfilled', action);
        });
        builder.addCase(itemFindOne.fulfilled, (state, action) => {
            console.log('itemFindOne.fulfilled', action);
        });
    }
});