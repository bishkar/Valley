import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import { PostItemPage } from "./components/PostItem/PostItemPage";
import { Main } from "./pages/";
import ResultPost from "./pages/ResultPost";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <>
      <div>
        <header>
          <NavLink to="/" style={{ marginRight: "10px" }}>
            Home
          </NavLink>
          <NavLink to="/search" style={{ marginRight: "10px" }}>
            Search
          </NavLink>
        </header>
      </div>

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/post/:postId" element={<PostItemPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/result/:nasaId" element={<ResultPost />} />
      </Routes>
    </>
  );
}

export default App;
