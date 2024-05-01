// DeletePostPage.jsx
import "./DeletePost.css";

import { useState } from "react";

import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";
import { deletePost } from "../../redux/posts.slice/delete.slice.js";

const DeletePost = () => {
  const dispatch = useDispatch();

  const { postId } = useParams();

  const { data, error, loading } = useFetch(
    `https://api.solyver.com/api/v1/articles/${postId}`
  );

  const deletePostHandler = () => {
    dispatch(deletePost(postId))
      .then(() => {
        alert("Post deleted successfully");
        window.location.href = "/";
      })
      .catch((error) => {
        alert("You are not authorized to delete this post");
      });
  };

  return (
    <div>
      <div className="delete__post">
        <h2>Are you sure you want to delete this post?</h2>
        <div className="delete__buttons">
          <button onClick={deletePostHandler}>Delete</button>
          <Link to={`/articles/${postId}`} className="delete__back_button">
            Back to post
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeletePost;
