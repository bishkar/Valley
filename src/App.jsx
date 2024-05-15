import { Routes, Route, Navigate } from "react-router-dom";
import PostItemPage from "./components/PostItem/PostItemPage";
import Mainpage from "./pages/Mainpage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import FavouritePage from "./pages/FavouritePage.jsx";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import RecoverPasswordPage from "./pages/RecoverPasswordPage.jsx";
import ChangePasswordPage from "./pages/ChangePasswordPage.jsx";
import LogoutPage from "./pages/LogoutPage.jsx";
import CategoryResult from "./components/CategoryResult/CategoryResult.jsx";
import NewPostPage from "./pages/NewPostPage.jsx";
import SearchResults from "./components/SearchResults/SearchResults.jsx";
import TagsSearch from "./components/TagsSearch/TagsSearch.jsx";
import EditPostPage from "./pages/EditPostPage.jsx";
import DeletePostPage from "./pages/DeletePostPage.jsx";
import AddToSlider from "./pages/AddToSlider.jsx";
import EditSliderPage from "./pages/EditSliderPage.jsx";
import { isAdminUser } from "./redux/auth.slice/token.slice.js";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const admin = isAdminUser();
  const access = localStorage.getItem("accessToken");

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/articles/:postId" element={<PostItemPage />} />
        <Route path="/category/:categoryId" element={<CategoryResult />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/search/result/:searchTerm" element={<SearchResults />} />
        <Route path="/recover" element={<RecoverPasswordPage />} />
        <Route
          path="/recover/change-password"
          element={<ChangePasswordPage />}
        />
        <Route path="/search/tags/:searchTags" element={<TagsSearch />} />

        <Route
          path="/favourites"
          element={
            <ProtectedRoute element={<FavouritePage />} isAllowed={access} />
          }
        />
        <Route
          path="/logout"
          element={
            <ProtectedRoute element={<LogoutPage />} isAllowed={access} />
          }
        />

        <Route
          path="/edit/:postId"
          element={
            <ProtectedRoute
              element={<EditPostPage />}
              isAllowed={access && admin}
            />
          }
        />
        <Route
          path="/delete/:postId"
          element={
            <ProtectedRoute
              element={<DeletePostPage />}
              isAllowed={access && admin}
            />
          }
        />
        <Route
          path="/add-to-slider/:postId"
          element={
            <ProtectedRoute
              element={<AddToSlider />}
              isAllowed={access && admin}
            />
          }
        />
        <Route
          path="/edit-slider"
          element={
            <ProtectedRoute
              element={<EditSliderPage />}
              isAllowed={access && admin}
            />
          }
        />
        <Route
          path="/new-post"
          element={
            <ProtectedRoute
              element={<NewPostPage />}
              isAllowed={access && admin}
            />
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
