import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../middleware/api";

export const userAdd = createAsyncThunk('/users/add',
    async (values) => {
        try {
            const response = await API.post('/users/add', values);
            console.log('itemAdd', response);
            return response.data
        } catch (error) {
            console.log('error itemAdd:- ', error);
        }
    }
);

export const userFindAll = createAsyncThunk('/users/find/all',
    async (values) => {
        try {
            const response = await API.get('/users/find/all');
            console.log('userFindAll:- ', response);
            return response.data
        } catch (error) {
            console.log('error itemFindAll:- ', error);
        }
    }
);

export const userFindOne = createAsyncThunk('/users/find/one',
    async (values) => {
        try {
            const response = await API.post('/users/find/one', values);
            console.log('itemFindOne:- ', response);
        } catch (error) {
            console.log('error itemFindOne:- ', error);
        }
    }
);

const initialValues = {
    findAll: []
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: initialValues,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userFindAll.fulfilled, (state, action) => {
            console.log('userFindAll.fulfilled', action);
            // state.findAll = action
        });
        builder.addCase(userFindOne.fulfilled, (state, action) => {
            console.log('userFindOne.fulfilled', action);
        });
    }
});