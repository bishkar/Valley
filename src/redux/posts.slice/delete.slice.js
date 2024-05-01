import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    post: {},
    error: null,
    status: null
}

export const deletePost = createAsyncThunk('delete/deletePost', async (postId) => {
    try {
        const response = await axios.delete(`https://api.solyver.com/api/v1/articles/${postId}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            }
        });
    } catch (error) {
        throw error;
    }
})

const deletePostSlice = createSlice({
    name: 'deletePost',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deletePost.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.post = action.payload;
                state.error = null;
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default deletePostSlice.reducer;
