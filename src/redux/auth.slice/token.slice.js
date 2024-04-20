import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { logout } from "./login.slice";

const initialState = {
  accessToken: null,
  status: "idle",
  loggedIn: false,
  error: null,
  admin: false,
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
    console.log("isaAdminUser", accessToken);
    const decodedToken = jwtDecode(accessToken);

    return decodedToken.is_admin;
  } catch (err) {
    return false;
  }
};

export const setUser = createAsyncThunk("tokens/setUser", async () => {
  let access = localStorage.getItem("accessToken");
  let refresh = localStorage.getItem("refreshToken");
  // const dispatch = useDispatch();

  console.log("set user");
  if (!access || !refresh) {
    // localStorage.setItem("loggedIn", false);

    return false;
  }

  if (isAccessTokenExpired(access)) {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/token/refresh/",
        { refresh: refresh }
      );
      const data = response.data;
      console.log(data);
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("loggedIn", true);
      return true;
    } catch (error) {
      console.log(error);
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
  // reducers: {
  //   isAdminUser: (state) => {
  //     state.admin = isAdminUser();
  //   },
  // },
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

// export const { setCredentials, logOut } = tokenSlice.actions;

export default tokenSlice.reducer;

// export const selectCurrentUser = (state) => state.token.user;

// export const selectToken = (state) => state.token;
