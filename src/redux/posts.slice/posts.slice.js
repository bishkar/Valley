import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  error: null,
  status: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const data = await fetch("http://127.0.0.1:8000/api/v1/articles/",)
    .then((res) => res.json())

  return data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      });
  },
});

export const selectPosts = (state) => state.posts;

export default postsSlice.reducer;
