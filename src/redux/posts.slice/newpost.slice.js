import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    post: {},
    error: null,
    status: null
}

export const newPost = createAsyncThunk('newpost/newPost', async (postData) => {
    console.log(postData.images);
    postData.images.forEach(async (image, index) => {
        const formData = new FormData();
        formData.append('image', image);
        console.log(index)
        const response = await axios.post('http://127.0.0.1:8000/api/v1/articles/image/upload/', formData, {
            headers: {
                Authorization: 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEzNDUxNTM5LCJpYXQiOjE3MTM0NDc5MzksImp0aSI6IjQ2MGViM2U5MDQyMTQwOTliZDc4ZGFjNTVjYTdiZGI1IiwidXNlcl9pZCI6MTB9.TkAVcZetn7iJ9lpjUSsTBUvIAYZRGdxC9DMu-CA3dog",
            }
        }).catch((error) => {
            console.log(error);
        });
        postData.images[index] = response.url;
    })

    console.log(postData);

    const response = await axios.post('http://127.0.0.1:8000/api/v1/articles/', postData);
    return response.data;
})

const newPostSlice = createSlice({
    name: 'newpost',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(newPost.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(newPost.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.post = action.payload;
            })
            .addCase(newPost.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export default newPostSlice.reducer;