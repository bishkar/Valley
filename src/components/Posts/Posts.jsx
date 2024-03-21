import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, selectPosts } from "../../redux/posts.slice/posts.slice";
import {
  loadFavouritesFromLocalStorage,
  addToFavorites,
  removeFromFavorites,
} from "../../redux/favourites.slice/favourites.slice";
import { useEffect, useState } from "react";
import PostItem from "../PostItem/PostItem";
import "./Posts.scss";
export default function Posts() {
  const dispatch = useDispatch();
  const { posts, status } = useSelector(selectPosts);

  const postPerRow = 4;
  const [next, setNext] = useState(postPerRow);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(loadFavouritesFromLocalStorage());
  }, [dispatch]);

  const handleMorePosts = () => {
    setNext(next + postPerRow);
  };

  if (status === "error") {
    return <h1>No posts 😢</h1>;
  }
  return (
    <>
      <h1 className="posts__title">Post</h1>

      <div className="post__container">
        <div className="vl"></div>
        {posts?.slice(0, next)?.map((post, index) => (
          <PostItem
            key={index}
            post={post}
            onAddToFavorites={() => dispatch(addToFavorites(post))}
            onRemoveFromFavorites={() => dispatch(removeFromFavorites(post))}
          />
        ))}
      </div>
      {next < posts?.length && (
        <button className="loadMoreBtn" onClick={handleMorePosts}>
          Load more...
        </button>
      )}
    </>
  );
}
