import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    category: {},
    error: null,
    status: null
}

export const deleteCategory = createAsyncThunk('deleteCategory/deleteCategory', async (categoryId) => {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/v1/category/${categoryId}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
})

const deleteCategorySlice = createSlice({
    name: 'deleteCategory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteCategory.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.category = action.payload;
                state.error = null;
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default deleteCategorySlice.reducer;