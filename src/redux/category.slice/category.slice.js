import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: [],
  error: null,
  status: null
}

export const fetchCategory = createAsyncThunk('category/fetchCategory', async () => {
  const data = await fetch("http://127.0.0.1:8000/api/v1/category/",)
    .then((res) => res.json())

  return data;
});

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.category = action.payload;
      });
  },
});

export const selectCategory = (state) => state.category;

export default categorySlice.reducer;
