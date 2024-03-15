import { configureStore } from '@reduxjs/toolkit';
import postsSliceReducer from './posts.slice/posts.slice';
import favouriteSliceReduce from './favourites.slice/favourites.slice';

export const store = configureStore({
  reducer: {
    posts: postsSliceReducer,
    favorites: favouriteSliceReduce,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});