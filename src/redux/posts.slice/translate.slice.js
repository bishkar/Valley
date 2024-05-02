import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    post: {},
    error: null,
    status: null
}

export const translate = createAsyncThunk('translate/translate', async (translateData) => {
    const response = await axios.post('https://api.solyver.com/api/v1/translate/', translateData,
        {
            headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
        })
    return response.data; // Return the response data

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
