import { configureStore } from '@reduxjs/toolkit';
import postsSliceReducer from './posts.slice/posts.slice';
import favouriteSliceReducer from './favourites.slice/favourites.slice';
import { imagesApi } from './api.slice/api.slice';
import categorySliceReducer from './category.slice/category.slice';
import tagsSliceReducer from './tags.slice/tags.slice';
import resgistraionSliceReducer from './auth.slice/register.slice';
import authSliceReducer from './auth.slice/login.slice';
import tokenSlice from './auth.slice/token.slice';
import authFacebookSlice from './auth.slice/facebook.slice';
import restorePasswordSlice from './auth.slice/restorePassword.slice';
import articleSearchSliceReducer from './articleSearch.slice/articleSearch.slice';

export const store = configureStore({
  reducer: {
    posts: postsSliceReducer,
    favorites: favouriteSliceReducer,
    category: categorySliceReducer,
    tags: tagsSliceReducer,
    articles: articleSearchSliceReducer,
    registration: resgistraionSliceReducer,
    auth: authSliceReducer,
    tokens: tokenSlice,
    authFacebook: authFacebookSlice,
    restorePassword: restorePasswordSlice,
    [imagesApi.reducerPath]: imagesApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(imagesApi.middleware),
});
