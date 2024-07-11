import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAuthToken, toastMessage } from "../common/functionHooks";
import { API } from "../middleware/api";

const authToken = fetchAuthToken();

export const categoryAdd = createAsyncThunk('/categories/add',
    async (values) => {
        try {
            const response = await API.post('/categories/add', values, authToken);
            return response.data;
        } catch (error) {
            console.log('error:- ', error);
        }
    }
);

export const categoryUpdate = createAsyncThunk('/categories/update',
    async (values) => {
        try {
            console.log('categoryUpdate values:- ', values);
            const response = await API.post('/categories/update', values, authToken);
            if (response.data.code === 200) {
                toastMessage('success', response.data.message);
            }
            return response.data;
        } catch (error) {
            console.log('categoryUpdate -> slice -> error');
            toastMessage('error', 'We are facing some technical issue');
            const errorObj = { ...error }
            throw errorObj;
        }
    }
);

export const categoryFindAll = createAsyncThunk('/categories/find/all',
    async () => {
        try {
            const response = await API.get('/categories/find/all', authToken);
            return response.data;
        } catch (error) {
            console.log('categoryFindAll -> slice -> error');
            toastMessage('error', 'We are facing some technical issue');
            const errorObj = { ...error }
            throw errorObj;
        }
    }
);

export const categoryFindOne = createAsyncThunk('/categories/find/one',
    async (values) => {
        try {
            const response = await API.post('/categories/find/one', values, authToken)
            return response.data
        } catch (error) {
            console.log('categoryFindOne -> slice -> error');
            toastMessage('error', 'We are facing some technical issue');
            const errorObj = { ...error }
            throw errorObj;
        }
    }
);

export const categoryDelete = createAsyncThunk('/categories/delete',
    async (values) => {
        try {
            const response = await API.post('/categories/delete', values, authToken);
            if (response.data.code === 200) {
                toastMessage('success', response.data.message);
            }
            return response.data;
        } catch (error) {
            console.log('categoryDelete -> slice -> error');
            toastMessage('error', 'We are facing some technical issue');
            const errorObj = { ...error }
            throw errorObj;
        }
    }
);

export const categoryResetFindOne = createAsyncThunk('/categories/delete',
    () => {
        return {};
    }
);

const initialState = {
    findAll: [],
    findOne: {
        _id: '',
        category: '',
        category_img: ''
    }
}

export const categorySlice = createSlice({
    name: 'categorySlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(categoryFindAll.fulfilled, (state, action) => {
            state.findAll = action.payload.data;
        });
        builder.addCase(categoryFindOne.fulfilled, (state, action) => {
            state.findOne = action.payload.data;
        });
        builder.addCase(categoryResetFindOne.fulfilled, (state, action) => {
            state.findOne = {};
        });
    }
});