import { API } from "../middleware/api";
import secureLocalStorage from "react-secure-storage";
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
            token: secureLocalStorage.getItem('authToken') || null,
            user_id: (secureLocalStorage.getItem('loginStatus') && JSON.parse(secureLocalStorage.getItem('loginStatus')).user_id) || null,
            isloggedIn: (secureLocalStorage.getItem('loginStatus') && JSON.parse(secureLocalStorage.getItem('loginStatus')).isloggedIn) || false
        }
    },
    reducers: {
        logout: (state) => {
            state.signin.isloggedIn = false;
            state.signin.user_id = null;
            state.signin.token = null;
            secureLocalStorage.clear();
        }
    },
    extraReducers: (builder) => {
        builder.addCase(authSignin.fulfilled, (state, action) => {
            state.signin.isloggedIn = true;
            state.signin.token = action.payload.auth_token;
            state.signin.user_id = action.payload.user_id;
            secureLocalStorage.setItem('loginStatus', JSON.stringify({
                user_id: action.payload.user_id,
                isloggedIn: true
            }));
            secureLocalStorage.setItem('authToken', action.payload.auth_token);
        });
        builder.addCase(authSignup.fulfilled, (state, action) => {
            console.log('authSignup.fulfilled', action.payload);
        });
    }
});

export const { logout } = authSlice.actions;