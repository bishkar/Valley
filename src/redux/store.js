import { configureStore } from '@reduxjs/toolkit';
import postsSliceReducer from './posts.slice/posts.slice';
import favouriteSliceReduce from './favourites.slice/favourites.slice';
import { imagesApi } from './api.slice/api.slice';

import resgistraionSliceReducer from './auth.slice/register.slice';
import authSliceReducer from './auth.slice/login.slice';
import tokenSlice from './auth.slice/token.slice';
import authFacebookSlice from './auth.slice/facebook.slice';
import restorePasswordSlice from './auth.slice/restorePassword.slice';
import getCategorySlice from './category.slice/getCategory.slice';
import newPostSlice from './posts.slice/newpost.slice';
import pushPostSlice from './posts.slice/pushpost.slice';
import translateSlice from './posts.slice/translate.slice';

export const store = configureStore({
  reducer: {
    posts: postsSliceReducer,
    favorites: favouriteSliceReduce,
    registration: resgistraionSliceReducer,
    auth: authSliceReducer,
    tokens: tokenSlice,
    authFacebook: authFacebookSlice,
    restorePassword: restorePasswordSlice,
    category: getCategorySlice,
    newpost: newPostSlice,
    pushpost: pushPostSlice,
    translate: translateSlice,
    [imagesApi.reducerPath]: imagesApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat(imagesApi.middleware)
});
