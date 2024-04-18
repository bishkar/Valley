import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const searchTagsArticles = createAsyncThunk(
  'articlesTags/searchTags',
  async (searchTags) => {
    const response = await fetch(searchTags);
    const data = await response.json();
    return data;
  }
);

const articlesSearchTags = createSlice({
  name: 'articlesTags',
  initialState: {
    articlesTags: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchTagsArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchTagsArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articlesTags = action.payload;
      })
      .addCase(searchTagsArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectArticlesTags = (state) => state.articlesTags;

export default articlesSearchTags.reducer;