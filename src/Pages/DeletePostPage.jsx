// DeletePostPage.jsx
import { useState } from "react";

import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch.js";
import { Link } from "react-router-dom";
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

  return (
    <div>
      <h1>Delete Post {postId}</h1>
      <DeletePost />
    </div>
  );
};

export default DeletePostPage;
