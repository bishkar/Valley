import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    post: {},
    error: null,
    status: null
}

export const pushPost = createAsyncThunk('newpost/pushPost', async (postData) => {
    try {
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
        console.log("imageIds", imageIds)
        postData.images = imageIds;

        const response = await axios.post('https://api.solyver.com/api/v1/articles/', postData, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            }
        });
        console.log("pushPost response", response)
        return response.data;
    } catch (error) {
        throw error;
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