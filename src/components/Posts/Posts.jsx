import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, selectPosts } from "../../redux/posts.slice/posts.slice";
import {
  loadFavouritesFromLocalStorage,
  addToFavorites,
  removeFromFavorites,
} from "../../redux/favourites.slice/favourites.slice";
import { useEffect } from "react";
import PostItem from "../PostItem/PostItem";

export default function Posts() {
  const dispatch = useDispatch();
  const { posts, status } = useSelector(selectPosts);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(loadFavouritesFromLocalStorage());
  }, [dispatch]);

  if (status === "error") {
    return <h1>No posts 😢</h1>;
  }
  return (
    <>
      <h1>Post</h1>
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          onAddToFavorites={() => dispatch(addToFavorites(post))}
          onRemoveFromFavorites={() => dispatch(removeFromFavorites(post))}
        />
      ))}
    </>
  );
}
