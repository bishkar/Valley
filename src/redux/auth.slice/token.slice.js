import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { logout } from "./login.slice";

const initialState = {
  accessToken: null,
  status: "idle",
  loggedIn: null,
  error: null,
  admin: false,
};

export const refreshToken = createAsyncThunk(
  "tokens/refreshToken",
  async (refreshToken, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://api.solyver.com/api/v1/token/refresh/",
        { refresh: refreshToken }
      );
      const { access } = response.data;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("loggedIn", true);
      return true;
    } catch (error) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("loggedIn");
      logout();
      return rejectWithValue(error.response.data);
    }
  }
);

export const isAccessTokenExpired = (accessToken) => {
  try {
    const decodedToken = jwtDecode(accessToken);

    return decodedToken.exp < Date.now() / 1000;
  } catch (err) {
    return true;
  }
};

export const isAdminUser = () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const decodedToken = jwtDecode(accessToken);

    return decodedToken.is_admin;
  } catch (err) {
    return false;
  }
};

export const setUser = createAsyncThunk("tokens/setUser", async () => {
  let access = localStorage.getItem("accessToken");
  let refresh = localStorage.getItem("refreshToken");

  if (!access || !refresh) {
    return false;
  }

  if (isAccessTokenExpired(access)) {
    try {
      const response = await axios.post(
        "https://api.solyver.com/api/v1/token/refresh/",
        { refresh: refresh }
      );
      const data = response.data;
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("loggedIn", true);
      return true;
    } catch (error) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("loggedIn");
      logout();
      return false;
    }
  }
  return true;
});

export const tokenSlice = createSlice({
  name: "tokens",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(setUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loggedIn = action.payload;
      })
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
