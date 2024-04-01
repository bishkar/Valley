import { configureStore } from '@reduxjs/toolkit';
import postsSliceReducer from './posts.slice/posts.slice';
import favouriteSliceReduce from './favourites.slice/favourites.slice';
import { imagesApi } from './api.slice/api.slice';

import resgistraionSliceReducer from './auth.slice/register.slice';
import authSliceReducer from './auth.slice/login.slice';
import tokenSlice from './auth.slice/token.slice';
import authFacebookSlice from './auth.slice/facebook.slice';

export const store = configureStore({
  reducer: {
    posts: postsSliceReducer,
    favorites: favouriteSliceReduce,
    registration: resgistraionSliceReducer,
    auth: authSliceReducer,
    tokens: tokenSlice,
    authFacebook: authFacebookSlice,
    [imagesApi.reducerPath]: imagesApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(imagesApi.middleware),
});
