import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../middleware/api";

export const itemAdd = createAsyncThunk('/categories/add',
    async (values) => {
        try {
            const response = await API.post('/categories/add', values);
            console.log('itemAdd', response);
        } catch (error) {
            console.log('error itemAdd:- ', error);
        }
    }
);

export const itemFindAll = createAsyncThunk('/categories/find/all',
    async (values) => {
        try {
            const response = await API.post('/categories/find/all', values);
            console.log('itemFindAll:- ', response);
        } catch (error) {
            console.log('error itemFindAll:- ', error);
        }
    }
);

export const itemFindOne = createAsyncThunk('/categories/delete',
    async (values) => {
        try {
            const response = await API.post('/categories/delete', values);
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
    extraReducers: () => {
        itemFindAll.fulfilled = (state, action) => {
            console.log('itemFindAll.fulfilled:- ', state);
        }
        itemFindOne.fulfilled = (state, action) => {
            console.log('itemFindOne.fulfilled:- ', state);
        }
    }
});