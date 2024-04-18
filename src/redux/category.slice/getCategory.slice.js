import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    category: [],
    status: "idle",
    error: null,
};

export const getCategory = createAsyncThunk("category/getCategory", async () => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/v1/category/");
        return response.data;
    } catch (error) {
        return error.response.data;
    }
})

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategory.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.category = action.payload;
            })
            .addCase(getCategory.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default categorySlice.reducer;