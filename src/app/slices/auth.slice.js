import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../middleware/api";

export const authSignup = createAsyncThunk('/auth/signup', async (values) => {
    try {
        const response = await API.post('/auth/signup', values);
        return response.data;
    } catch (error) {
        console.log('authSignup error:- ', error);
        const errorMessage = { error, status: 'fail' }
        throw errorMessage;
    }
});

export const authSignin = createAsyncThunk('/auth/signin', async (values) => {
    try {
        const response = await API.post('/auth/signin', values);
        console.log('response:- ', response);
        return response.data;
    } catch (error) {
        console.log('authSignin error:- ', error);
        const errorMessage = { error, status: 'fail' }
        throw errorMessage;
    }
});

export const authSlice = createSlice({
    name: 'authSlice',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(authSignin.fulfilled, (state, action) => {
            console.log('categoryFindAll.fulfilled', action);
        });
        builder.addCase(authSignup.fulfilled, (state, action) => {
            console.log('authSignup.fulfilled', action);
        });
    }
});