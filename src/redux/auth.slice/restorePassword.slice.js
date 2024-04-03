import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    status: 'idle',
    error: null,
    code: null,
    email: null,
    otp: null,
};

export const sendCode = createAsyncThunk('auth/sendCode', async (data, { rejectWithValue }) => {
    try {
        console.log(data)
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/reset-password/request/${data}/`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const confirmCode = createAsyncThunk('auth/confirmCode', async (data, { rejectWithValue }) => {
    console.log(`http://127.0.0.1:8000/api/v1/verify/otp/${data.email}/${data.otp}/`)
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/reset-password/verify/otp/${data.email}/${data.otp}/`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const changePassword = createAsyncThunk('auth/changePassword', async (data, { rejectWithValue }) => {
    try {
        console.log(data)
        const response = await axios.put('http://127.0.0.1:8000/api/v1/reset-password/confirm/', data);
        console.log(response)
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

const restorePasswordSlice = createSlice({
    name: 'restorePassword',
    initialState,
    reducers: {
        resetState: (state) => {
            state.status = 'idle';
            state.error = null;
            state.code = null;
            state.email = null;
            state.otp = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendCode.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(sendCode.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.email = action.payload.email;
                state.code = action.payload.code;
            })
            .addCase(sendCode.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(confirmCode.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(confirmCode.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(confirmCode.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(changePassword.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    }
});

export const { resetState } = restorePasswordSlice.actions;

export default restorePasswordSlice.reducer;
