import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    post: {},
    error: null,
    status: null
}

export const pushPost = createAsyncThunk('newpost/pushPost', async (postData) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/v1/articles/', postData, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            }
        });
        console.log(postData)
        console.log(response);
        return response.data; // Return the response data
    } catch (error) {
        console.log(error);
        throw error; // Throw error for rejection
    }
});

const pushPostSlice = createSlice({
    name: 'pushPost',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(pushPost.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(pushPost.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.post = action.payload;
                state.error = null;
            })
            .addCase(pushPost.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default pushPostSlice.reducer;