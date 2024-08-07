import { API } from "../middleware/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const authSignup = createAsyncThunk('/admin/auth/signup', async (values) => {
    try {
        const response = await API.post('/admin/auth/signup', values);
        return response.data;
    } catch (error) {
        console.log('authSignup error:- ', error);
        const errorMessage = { error, status: 'fail' }
        throw errorMessage;
    }
});

export const authSignin = createAsyncThunk('/admin/auth/signin', async (values) => {
    try {
        const response = await API.post('/admin/auth/signin', values);
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
    initialState: {
        signin: {
            token: null,
            user_id: null,
            isloggedIn: false
        }
    },
    reducers: {
        logout: (state) => {
            state.signin.isloggedIn = false;
            state.signin.user_id = null;
            state.signin.token = null;
            window.localStorage.clear();
        }
    },
    extraReducers: (builder) => {
        builder.addCase(authSignin.fulfilled, (state, action) => {
            if (action.payload.code===200) {
                state.signin.isloggedIn = true;
                state.signin.token = action.payload.auth_token;
                state.signin.user_id = action.payload.user_id;
            }
        });
        builder.addCase(authSignup.fulfilled, (state, action) => {
            console.log('authSignup.fulfilled', action.payload);
        });
    }
});

export const { logout } = authSlice.actions;