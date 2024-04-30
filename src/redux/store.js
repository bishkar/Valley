import { configureStore } from "@reduxjs/toolkit";
import favouriteSliceReducer from "./favourites.slice/favourites.slice";
import categorySliceReducer from "./category.slice/category.slice";
import tagsSliceReducer from "./tags.slice/tags.slice";
import resgistraionSliceReducer from "./auth.slice/register.slice";
import authSliceReducer from "./auth.slice/login.slice";
import tokenSlice from "./auth.slice/token.slice";
import authFacebookSlice from "./auth.slice/facebook.slice";
import restorePasswordSlice from "./auth.slice/restorePassword.slice";
import articleSearchSliceReducer from "./articleSearch.slice/articleSearch.slice";
// import getCategorySlice from './category.slice/getCategory.slice';
import uploadImagesSlice from "./posts.slice/uploadImages.slice";
import clicksSlice from "./posts.slice/clicks.slice";
import pushPostSlice from './posts.slice/pushpost.slice';
import translateSlice from './posts.slice/translate.slice';
import deletePostSlice from './posts.slice/delete.slice';
import editPostSlice from "./posts.slice/edit.slice";
import addCategorySlice from "./posts.slice/addcategory.slice";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    favorites: favouriteSliceReducer,
    category: categorySliceReducer,
    tags: tagsSliceReducer,
    articles: articleSearchSliceReducer,
    registration: resgistraionSliceReducer,

    tokens: tokenSlice,
    authFacebook: authFacebookSlice,
    restorePassword: restorePasswordSlice,
    // category: getCategorySlice,
    uploadImages: uploadImagesSlice,
    clicks: clicksSlice,
    devTools: true,
    addcategory: addCategorySlice,
    pushpost: pushPostSlice,
    editpost: editPostSlice,
    deletePost: deletePostSlice,
    translate: translateSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});
