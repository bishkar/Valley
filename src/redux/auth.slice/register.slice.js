import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  error: null,
};

export const registerUser = createAsyncThunk('registration/registerUser', async (userData, { rejectWithValue }) => {
  try {
    console.log(userData)
    const response = await axios.post('http://127.0.0.1:8000/api/v1/register/', userData);
    console.log(response.data);
    const access = response.data.access;
    const refresh = response.data.refresh;
    localStorage.setItem('loggedIn', true)
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default registrationSlice.reducer;
