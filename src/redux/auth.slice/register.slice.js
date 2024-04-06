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
        console.log('Registering user...');
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state) => {
        console.log('User registered successfully');
        state.status = 'succeeded';
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log('Failed to register user');
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default registrationSlice.reducer;
