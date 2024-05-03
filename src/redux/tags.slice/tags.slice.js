import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export const fetchTagsByKeyword = createAsyncThunk(
  'tags/fetchByKeyword',
  async (keyword) => {
    const response = await fetch(`https://api.solyver.com/api/v1/favourites/tag/${keyword}`, {
      headers: {
        'Authorization': `Bearer ${getAccessToken()}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  }
);

const tagsSlice = createSlice({
  name: 'tags',
  initialState: {
    tags: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTagsByKeyword.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTagsByKeyword.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = action.payload;
      })
      .addCase(fetchTagsByKeyword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectTags = (state) => state.tags.tags;

export default tagsSlice.reducer;
