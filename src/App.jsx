import { Routes, Route } from "react-router-dom";
import PostItemPage from "./components/PostItem/PostItemPage";
import ResultPost from "./pages/ResultPost";
import SearchPage from "./pages/SearchPage";
import Mainpage from "./pages/Mainpage";
import LoginPage from "./pages/LoginPage";
import FavouritePage from "./pages/FavouritePage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer.jsx";
import RegisterPage from "./pages/RegisterPage";
import RecoverPasswordPage from "./pages/RecoverPasswordPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import LogoutPage from "./pages/LogoutPage";

function App() {
  return (
    <>
      {/* <header>
        <NavLink to="/" style={{ marginRight: "10px" }}>
          Home
        </NavLink>
        <NavLink to="/search" style={{ marginRight: "10px" }}>
            Search
          </NavLink>
      </header> */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/articles/:postId" element={<PostItemPage />} />
        <Route path="/favourites" element={<FavouritePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/recover" element={<RecoverPasswordPage />} />
        <Route
          path="/recover/change-password"
          element={<ChangePasswordPage />}
        />
        <Route path="/post/:postId" element={<PostItemPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/result/:nasaId" element={<ResultPost />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
