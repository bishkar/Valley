import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const token = localStorage.getItem("accessToken");

// const initialState = {
//   clicks: [],
// };

export const makeClick = createAsyncThunk("posts/makeClick", async (postId) => {
  console.log("make click..");
  console.log(postId);
  const response = await fetch(
    `http://127.0.0.1:8000/api/v1/url-view-count/${postId}/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ article: postId }),
    }
  );
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
      `http://127.0.0.1:8000/api/v1/url-view-count/${postId}`,
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
    console.log(data);

    return data.clicks_count;
  }
);

const clicksSlice = createSlice({
  name: "clicks",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(makeClick.fulfilled, (state, action) => {
        console.log("Make click:", action.payload);
        //state.clicks = action.payload;
        state.push(action.payload);
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        console.log("Checking stats:", action.payload);
        state.push(action.payload);
      });
  },
});

export default clicksSlice.reducer;
