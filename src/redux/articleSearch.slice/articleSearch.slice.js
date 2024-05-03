import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}
export const searchArticles = createAsyncThunk(
  'articles/search',
  async (searchTerm) => {
    const headers = getAccessToken() ? { 'Authorization': `Bearer ${getAccessToken()}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' }
    const response = await fetch(searchTerm, {
      headers,
    });
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