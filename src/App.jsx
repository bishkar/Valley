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

function App() {
  const isLoggedIn = localStorage.getItem("loggedIn");

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/articles/:postId" element={<PostItemPage />} />
        <Route path="/category/:categoryId" element={<CategoryResult />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/articles/:postId" element={<PostItemPage />} /> */}
        <Route path="/search/result/:searchTerm" element={<SearchResults />} />
        <Route path="/recover" element={<RecoverPasswordPage />} />
        <Route
          path="/recover/change-password"
          element={<ChangePasswordPage />}
        />
        {isLoggedIn === "true" ? (
          <>
            <Route path="/favourites" element={<FavouritePage />} />
            <Route path="/edit/:postId" element={<EditPostPage />} />
            <Route path="/delete/:postId" element={<DeletePostPage />} />
            <Route path="/add-to-slider/:postId" element={<AddToSlider />} />
            <Route path="/edit-slider" element={<EditSliderPage />} />

            <Route path="/search/tags/:searchTags" element={<TagsSearch />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/new-post" element={<NewPostPage />} />
          </>
        ) : (
          <>
            <Route path="/favourites" element={<Navigate to="/login" />} />
            <Route path="/edit/:postId" element={<Navigate to="/login" />} />
            <Route path="/delete/:postId" element={<Navigate to="/login" />} />
            <Route
              path="/add-to-slider/:postId"
              element={<Navigate to="/login" />}
            />
            <Route path="/edit-slider" element={<Navigate to="/login" />} />

            <Route
              path="/search/tags/:searchTags"
              element={<Navigate to="/login" />}
            />
            <Route path="/logout" element={<Navigate to="/login" />} />
            <Route path="/new-post" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>

      <Footer />
    </>
  );
}

export default App;
