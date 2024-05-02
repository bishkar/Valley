import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    post: {},
    error: null,
    status: null
}

export const uploadImages = createAsyncThunk('images/uploadImages', async (images) => {
    const updatedImages = [];
    for (const image of images) {
        const formData = new FormData();
        formData.append('image', image);
        const response = await axios.post('https://api.solyver.com/api/v1/articles/image/upload', formData, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            }
        });
        console.log("upload respone", response)
        updatedImages.push({
            // [response.data.file.pk]: response.data.file.url // Fixing the object creation
            [response.data.file.id]: response.data.file.url // Fixing the object creation
        });
    }
    console.log(updatedImages)
    return updatedImages;

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
