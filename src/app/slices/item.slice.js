import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAuthToken, toastMessage } from "../common/functions/functions";
import { API } from "../middleware/api";

export const itemAdd = createAsyncThunk('/items/add',
    async ({ form, token }) => {
        try {
            const response = await API.post('/items/add', form, fetchAuthToken(token));
            if (response.data.code === 200) {
                toastMessage('success', response.data.message);
            }
            return response.data
        } catch (error) {
            console.log('itemUpdate -> slice -> error');
            toastMessage('error', 'We are facing some technical issue');
            const errorObj = { ...error }
            throw errorObj;
        }
    }
);

export const itemUpdate = createAsyncThunk('/items/update',
    async ({ form, token }) => {
        try {
            const response = await API.post('/items/update', form, fetchAuthToken(token));
            if (response.data.code === 200) {
                toastMessage('success', response.data.message);
            }
            return response.data
        } catch (error) {
            console.log('itemUpdate -> slice -> error');
            toastMessage('error', 'We are facing some technical issue');
            const errorObj = { ...error }
            throw errorObj;
        }
    }
);

export const itemFindAll = createAsyncThunk('/items/find/all',
    async ({ token }) => {
        try {
            const response = await API.post('/items/find/all', {}, fetchAuthToken(token));
            return response.data;
        } catch (error) {
            console.log('itemFindAll -> slice -> error');
            toastMessage('error', 'We are facing some technical issue');
            const errorObj = { ...error }
            throw errorObj;
        }
    }
);

export const itemDelete = createAsyncThunk('/items/delete',
    async ({ main, token }) => {
        try {
            const response = await API.post('/items/delete', main, fetchAuthToken(token));
            if (response.data.code === 200) {
                toastMessage('success', response.data.message);
            }
            return response.data;
        } catch (error) {
            console.log('itemDelete -> slice -> error');
            toastMessage('error', 'We are facing some technical issue');
            const errorObj = { ...error }
            throw errorObj;
        }
    }
);

const initialValues = {
    findAll: [],
}

export const itemSlice = createSlice({
    name: 'itemSlice',
    initialState: initialValues,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(itemFindAll.fulfilled, (state, action) => {
            state.findAll = action.payload.data;
        });
    }
});