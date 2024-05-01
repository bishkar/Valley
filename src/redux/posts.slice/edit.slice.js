import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    post: {},
    error: null,
    status: null
}

export const editPost = createAsyncThunk('edit/editPost', async (postData) => {
    let images = postData.images;
    let imageIds = [];

    images.forEach(image => {
        let keys = Object.keys(image);
        keys.forEach(key => {
            if (key !== "id") {
                imageIds.push(key);
            }
        });
    });
    postData.images = imageIds;

    try {
        const response = await axios.put(`http://127.0.0.1:8000/api/v1/articles/${postData.id}/`, postData, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            }
        })
        return response.data;
    } catch (error) {
        throw error;
    }
});

const editPostSlice = createSlice({
    name: 'editPost',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(editPost.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(editPost.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.post = action.payload;
                state.error = null;
            })
            .addCase(editPost.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default editPostSlice.reducer;