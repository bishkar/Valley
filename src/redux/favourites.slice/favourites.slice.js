import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addToFavorites: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("favorites", JSON.stringify(state));
    },
    removeFromFavorites: (state, action) => {
      const updatedFavorites = state.filter((product) => product.id !== action.payload.id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    },
    loadFavouritesFromLocalStorage: () => {
      const cartItems = JSON.parse(localStorage.getItem("favorites")) || [];
      return cartItems;
    },
  },
});

export const { addToFavorites, removeFromFavorites, loadFavouritesFromLocalStorage } = favoritesSlice.actions;

export const selectFavorites = (state) => state.favorites;

export default favoritesSlice.reducer;
