import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const searchArticles = createAsyncThunk(
  'articles/search',
  async (searchTerm) => {
    const response = await fetch(searchTerm);
    const data = await response.json();
    return data;
  }
);

const articleSearchslice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(searchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectArticles = (state) => state.articles;

export default articleSearchslice.reducer;