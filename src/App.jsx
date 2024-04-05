import { Routes, Route, NavLink } from "react-router-dom";
import PostItemPage from "./components/PostItem/PostItemPage";
import ResultPost from "./pages/ResultPost";
import SearchPage from "./pages/SearchPage";
import Mainpage from "./pages/Mainpage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RecoverPasswordPage from "./pages/RecoverPasswordPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import LogoutPage from "./pages/LogoutPage";

import Navbar from "./components/Navbar/Navbar";

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

      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/recover" element={<RecoverPasswordPage />} />
        <Route path="/recover/change-password" element={<ChangePasswordPage />} />
        <Route path="/post/:postId" element={<PostItemPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/result/:nasaId" element={<ResultPost />} />
      </Routes>
    </>
  );
}

export default App;
