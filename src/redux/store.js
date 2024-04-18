import { configureStore } from '@reduxjs/toolkit';
import postsSliceReducer from './posts.slice/posts.slice';
import favouriteSliceReducer from './favourites.slice/favourites.slice';
import categorySliceReducer from './category.slice/category.slice';
import tagsSliceReducer from './tags.slice/tags.slice';
import resgistraionSliceReducer from './auth.slice/register.slice';
import authSliceReducer from './auth.slice/login.slice';
import tokenSlice from './auth.slice/token.slice';
import authFacebookSlice from './auth.slice/facebook.slice';
import restorePasswordSlice from './auth.slice/restorePassword.slice';
import articleSearchSliceReducer from './articleSearch.slice/articleSearch.slice';
import articleTagsSearchReducer from './articleTagsSearch.slice/articleTagsSearch.slice';
// import getCategorySlice from './category.slice/getCategory.slice';
import newPostSlice from './posts.slice/newpost.slice';

export const store = configureStore({
  reducer: {
    posts: postsSliceReducer,
    favorites: favouriteSliceReducer,
    category: categorySliceReducer,
    tags: tagsSliceReducer,
    articles: articleSearchSliceReducer,
    articlesTags: articleTagsSearchReducer,
    registration: resgistraionSliceReducer,
    auth: authSliceReducer,
    tokens: tokenSlice,
    authFacebook: authFacebookSlice,
    restorePassword: restorePasswordSlice,
    // category: getCategorySlice,
    newpost: newPostSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
