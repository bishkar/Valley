import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export const addToFavorites = createAsyncThunk(
  "favorites/addToFavorites",
  async (payload) => {
    const response = await fetch("https://api.solyver.com/api/v1/favourites/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ article_id: payload.pk }),
    });
    if (!response.ok) {
      throw new Error("Failed to add to favorites");
    }
    const data = await response.json();
    return data;
  }
);

export const removeFromFavorites = createAsyncThunk(
  "favorites/removeFromFavorites",
  async (payload) => {
    const response = await fetch(
      "https://api.solyver.com/api/v1/favourites/1/",
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: payload.pk }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to remove from favorites");
    }
    const data = await response.json();
    return data;
  }
);

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async () => {
    const response = await fetch(
      "https://api.solyver.com/api/v1/favourites/1/",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get favorites");
    }
    const data = await response.json();
    return data;
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        console.log("Added to favorites:", action.payload);
        state.loading = false;
        state.favorites.push(action.payload);
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        console.log("Removed from favorites:", action.payload);
        state.loading = false;
        state.favorites.filter((product) => {
          return product.pk !== action.payload.pk;
        });
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        console.log("Fetched favorites:", action.payload);
        state.loading = false;
        state.favorites = action.payload;
      });
  },
});

export const selectFavorites = (state) => state.favorites;

export default favoritesSlice.reducer;
