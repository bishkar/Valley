import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    post: {},
    error: null,
    status: null
}

export const deleteSlide = createAsyncThunk('delete/deleteSlide', async (slideId) => {
    try {
        console.log(slideId)
        const response = await axios.delete(`http://127.0.0.1:8000/api/v1/slider/${slideId}/`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
})

const deleteSlideSlice = createSlice({
    name: 'deleteSlide',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteSlide.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteSlide.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.post = action.payload;
                state.error = null;
            })
            .addCase(deleteSlide.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default deleteSlideSlice.reducer;