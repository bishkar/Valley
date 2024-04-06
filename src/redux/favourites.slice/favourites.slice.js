import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const token = localStorage.getItem("accessToken")

export const addToFavorites = createAsyncThunk(
  'favorites/addToFavorites',
  async (payload) => {
    const response = await fetch('http://127.0.0.1:8000/api/v1/favourites/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ article: payload.pk })
    });
    if (!response.ok) {
      throw new Error('Failed to add to favorites');
    }
    const data = await response.json();
    return data;
  }
);

export const removeFromFavorites = createAsyncThunk(
  'favorites/removeFromFavorites',
  async (payload) => {
    const response = await fetch('http://127.0.0.1:8000/api/v1/favourites/', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ article: payload.pk })
    });
    if (!response.ok) {
      throw new Error('Failed to remove from favorites');
    }
    const data = await response.json();
    return data;
  }
);

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async () => {
    const response = await fetch('http://127.0.0.1:8000/api/v1/favourites/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to get favorites');
    }
    const data = await response.json();
    return data;
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToFavorites.fulfilled, (state, action) => {
        console.log('Added to favorites:', action.payload);
        state.push(action.payload);
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        console.log('Removed from favorites:', action.payload);
        // return state.filter((product) => product.pk !== action.payload.pk)
        state.push(action.payload);

      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        console.log('Fetched favorites:', action.payload);
        return action.payload;
      });
  },
});

export const selectFavorites = (state) => state.favorites;

export default favoritesSlice.reducer;