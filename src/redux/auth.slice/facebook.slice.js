import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  status: 'idle',
  error: null,
};

export const loginUserFacebook = createAsyncThunk('auth/loginFacebook', async ({ auth_token }, { rejectWithValue }) => {
    try {
      console.log({ auth_token })
      const response = await axios.post('http://127.0.0.1:8000/api/v1/token/facebook/', { auth_token });
      const { access, refresh } = response.data;
      console.log(response);
      localStorage.setItem('loggedIn', true)
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
});

export const authFacebookSlice = createSlice({
  name: 'authFacebook',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserFacebook.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserFacebook.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginUserFacebook.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});


export const { logout } = authFacebookSlice.actions;

export default authFacebookSlice.reducer;
