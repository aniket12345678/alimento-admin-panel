import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../middleware/api";

export const authSignup = createAsyncThunk('/auth/signup', async (values) => {
    try {
        const response = await API.post('/auth/signup', values);
        console.log('authSignup response:- ', response);
    } catch (error) {
        console.log('authSignup error:- ', error);
    }
});

export const authSignin = createAsyncThunk('/auth/signin', async (values) => {
    try {
        const response = await API.post('/auth/signin', values);
        console.log('response:- ', response);
    } catch (error) {
        console.log('authSignin error:- ', error);
    }
});

export const authSlice = createSlice({
    name: 'authSlice',
    initialState: {},
    reducers: {},
    extraReducers: () => {
        authSignin.fulfilled = (state, action) => {
            console.log('authSignin.fulfilled:- ', state);
        }
        authSignup.fulfilled = (state, action) => {
            console.log('authSignup.fulfilled:- ', state);
        }
    }
});