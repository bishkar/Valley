import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    post: {},
    error: null,
    status: null
}

export const newPost = createAsyncThunk('newpost/newPost', async (postData) => {
    console.log(postData.images);
    try {
        const updatedImages = [];
        for (const image of postData.images) {
            const formData = new FormData();
            formData.append('image', image);
            console.log(image);
            const response = await axios.post('http://127.0.0.1:8000/api/v1/articles/image/upload', formData, {
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEzNTQxMTgxLCJpYXQiOjE3MTM1Mzc1ODEsImp0aSI6ImQwYWY5NmMxMmZmYzQ4NjRiOWQ5YTdlYzA2MzRmMzE5IiwidXNlcl9pZCI6MSwiaXNfYWRtaW4iOnRydWV9.nr3pX6OnUP8An1KJNhfGDV2pqWQkuUxgpoovazhi8RQ",
                }
            });
            console.log(response);
            updatedImages.push(response.data.file.id);
        }

        const postDataWithUpdatedImages = { ...postData, images: updatedImages };
        return postDataWithUpdatedImages; // Return the post response
    } catch (error) {
        console.log(error);
        throw error; // Throw error for rejection
    }
});

const newPostSlice = createSlice({
    name: 'newPost',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(newPost.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(newPost.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.post = action.payload;
                state.error = null;
            })
            .addCase(newPost.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default newPostSlice.reducer;
