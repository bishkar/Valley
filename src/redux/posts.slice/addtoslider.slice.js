import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    post: {},
    error: null,
    status: null
}

export const addSlide = createAsyncThunk('slider/addSlide', async (postData) => {
    try {
        console.log(postData)
        const response = await axios.post(`https://api.solyver.com/api/v1/slider/`, postData, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
                "Content-Type": "multipart/form-data"
            }
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
})

const addSlideSlice = createSlice({
    name: 'addSlide',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addSlide.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addSlide.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.post = action.payload;
                state.error = null;
            })
            .addCase(addSlide.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default addSlideSlice.reducer;