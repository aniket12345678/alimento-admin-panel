import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAuthToken, toastMessage } from "../common/functionHooks";
import { API } from "../middleware/api";

const authToken = fetchAuthToken();

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
            const response = await API.post('/items/find/all', values, authToken);
            return response.data;
        } catch (error) {
            console.log('itemFindAll -> slice -> error');
            toastMessage('error', 'We are facing some technical issue');
            const errorObj = { ...error }
            throw errorObj;
        }
    }
);

export const itemFindOne = createAsyncThunk('/items/find/one',
    async (values) => {
        try {
            const response = await API.post('/items/find/one', values, authToken);
            return response.data
        } catch (error) {
            console.log('itemFindOne -> slice -> error');
            toastMessage('error', 'We are facing some technical issue');
            const errorObj = { ...error }
            throw errorObj;
        }
    }
);

export const itemDelete = createAsyncThunk('/items/delete',
    async (values) => {
        try {
            const response = await API.post('/items/delete', values, authToken);
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
    findAll: []
}

export const itemSlice = createSlice({
    name: 'itemSlice',
    initialState: initialValues,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(itemFindAll.fulfilled, (state, action) => {
            state.findAll = action.payload.data;
        });
        builder.addCase(itemFindOne.fulfilled, (state, action) => {
            console.log('itemFindOne.fulfilled', action);
        });
    }
});