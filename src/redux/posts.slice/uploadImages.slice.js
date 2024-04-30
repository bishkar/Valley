import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    post: {},
    error: null,
    status: null
}

export const uploadImages = createAsyncThunk('images/uploadImages', async (images) => {
    try {
        const updatedImages = [];
        for (const image of images) {
            const formData = new FormData();
            formData.append('image', image);
            console.log(image);
            const response = await axios.post('http://127.0.0.1:8000/api/v1/articles/image/upload', formData, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                }
            });
            console.log(response);
            updatedImages.push({
                [response.data.file.id]: response.data.file.url // Fixing the object creation
            });
        }
        console.log("Updated images:", updatedImages)
        return updatedImages;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

const uploadImagesSlice = createSlice({
    name: 'uploadImages',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadImages.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(uploadImages.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.post = action.payload;
                state.error = null;
            })
            .addCase(uploadImages.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default uploadImagesSlice.reducer;
