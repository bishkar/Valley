import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  accessToken: null,
  status: "idle",
  error: null,
};

export const refreshToken = createAsyncThunk(
  "tokens/refreshToken",
  async (refreshToken, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/token/refresh/",
        { refresh: refreshToken }
      );
      const { access } = response.data;
      localStorage.setItem("accessToken", access);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const isAccessTokenExpired = (accessToken) => {
//   try {
//     const decodedToken = jwt_decode(accessToken);
//     return decodedToken.exp < Date.now() / 1000;
//   } catch (err) {
//     return true;
//   }
// };

export const tokenSlice = createSlice({
  name: "tokens",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(refreshToken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accessToken = action.payload.accessToken;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default tokenSlice.reducer;
