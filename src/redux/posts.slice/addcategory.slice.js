import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    category: {},
    error: null,
    status: null
}

export const addCategory = createAsyncThunk('addCategory/addCategory', async (categoryData) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/v1/category/', categoryData, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
);

const addCategorySlice = createSlice({
    name: 'addCategory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addCategory.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.category = action.payload;
                state.error = null;
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default addCategorySlice.reducer;