import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const token = localStorage.getItem("accessToken");

const initialState = {
  clicks: 0,
};

export const makeClick = createAsyncThunk("posts/makeClick", async (postId) => {
  const response = await fetch(`https://api.solyver.com/api/v1/url-view-count/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ article: postId }),
  });
  if (!response.ok) {
    throw new Error("Failed to add to add click");
  }
  const data = await response.json();
  return data;
});

export const fetchStats = createAsyncThunk(
  "posts/fetchStats",
  async (postId) => {
    const response = await fetch(
      `https://api.solyver.com/api/v1/url-view-count/${postId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get stats");
    }
    const data = await response.json();

    return data.clicks_count;
  }
);

const clicksSlice = createSlice({
  name: "clicks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(makeClick.fulfilled, (state, action) => {
        //state.clicks = action.payload;
        state.push(action.payload);
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.clicks = action.payload;
      });
  },
});

export default clicksSlice.reducer;
