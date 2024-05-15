// DeletePostPage.jsx
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch.js";
import { isAdminUser } from "../redux/auth.slice/token.slice.js";

import DeletePost from "../components/DeletePost/DeletePost.jsx";

const DeletePostPage = () => {
  if (!isAdminUser()) {
    window.location.href = "/";
  }

  const { postId } = useParams();

  const { data, error, loading } = useFetch(
    `https://api.solyver.com/api/v1/articles/${postId}`
  );

  const language = localStorage.getItem("i18nextLng");

  return (
    <div>
      <h1>Delete Post</h1>
      <h2>{
          loading ? "Loading..." : error ? "Error" : language === "en" ? data.en_title : data.it_title
        }</h2>
        
      <DeletePost />
    </div>
  );
};

export default DeletePostPage;
