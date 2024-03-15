import Main from "./pages/Main";
import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import { PostItemPage } from "./components/PostItem/PostItemPage";

function App() {
  return (
    <>
      <div>
        <header>
          <NavLink to="/" style={{ marginRight: "10px" }}>
            Home
          </NavLink>
        </header>
      </div>

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/post/:postId" element={<PostItemPage />} />
      </Routes>
    </>
  );
}

export default App;
