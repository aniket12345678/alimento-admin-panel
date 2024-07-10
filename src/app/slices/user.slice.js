import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../middleware/api";
import { fetchAuthToken, toastMessage } from "../common/functionHooks";

const authToken = fetchAuthToken();

export const userAdd = createAsyncThunk('/users/add',
    async (values) => {
        try {
            const response = await API.post('/users/add', values, authToken);
            return response.data
        } catch (error) {
            console.log('error itemAdd:- ', error);
        }
    }
);

export const userFindAll = createAsyncThunk('/users/find/all',
    async () => {
        try {
            const response = await API.get('/users/find/all', authToken);
            return response.data
        } catch (error) {
            console.log('userFindAll -> slice -> error');
            toastMessage('error', 'We are facing some technical issue');
            const errorObj = { ...error }
            throw errorObj;
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
            state.findAll = action.payload.data;
        });
    }
});