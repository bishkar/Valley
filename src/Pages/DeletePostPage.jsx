// DeletePostPage.jsx
import { useState } from "react";

import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch.js"
import { Link } from "react-router-dom";

import DeletePost from "../components/DeletePost/DeletePost.jsx";

const DeletePostPage = () => {
  const dispatch = useDispatch();

  const { postId } = useParams();
  
  const { data, error, loading } = useFetch(
    `http://127.0.0.1:8000/api/v1/articles/${postId}`
  );

  return (
    <div>
        <h1>Delete Post {postId}</h1>
        <DeletePost />
    </div>
  );
};

export default DeletePostPage;
