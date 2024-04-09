import { Routes, Route, NavLink } from "react-router-dom";
 import PostItemPage from "./components/PostItem/PostItemPage";
 import ResultPost from "./Pages/ResultPost";
 import SearchPage from "./Pages/SearchPage";
import Mainpage from "./Pages/Mainpage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import RecoverPasswordPage from "./Pages/RecoverPasswordPage";
import ChangePasswordPage from "./Pages/ChangePasswordPage";
import LogoutPage from "./Pages/LogoutPage";
import NewPostPage from "./Pages/NewPostPage";

import Footer from "./components/Footer/Footer";

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
        <Route path="/new-post" element={<NewPostPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
