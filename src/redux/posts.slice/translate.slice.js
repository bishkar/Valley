import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    post: {},
    error: null,
    status: null
}

export const translate = createAsyncThunk('translate/translate', async (translateData) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/v1/translate/', translateData,
            {
                headers: { Authorization: "Bearer " + localStorage.getItem("accessToken")}
            })
        console.log(response);
        return response.data; // Return the response data
    } catch (error) {
        console.log(error);
        throw error; // Throw error for rejection
    }
})

const translateSlice = createSlice({
    name: 'translate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(translate.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(translate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.post = action.payload;
                state.error = null;
            })
            .addCase(translate.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default translateSlice.reducer;
