import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, selectPosts } from "../../redux/posts.slice/posts.slice";
import { fetchFavorites } from "../../redux/favourites.slice/favourites.slice";
import PostItem from "../PostItem/PostItem";
import "./Posts.scss";

export default function Posts() {
  const dispatch = useDispatch();
  const { posts, status } = useSelector(selectPosts);
  const postPerRow = 4;
  const [next, setNext] = useState(postPerRow);
  const favorites = useSelector((state) => state.favorites);
  console.log(favorites);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchFavorites());
  }, [dispatch]);

  const handleMorePosts = () => {
    setNext(next + postPerRow);
  };

  if (status === "failed") {
    return <h1>No posts 😢</h1>;
  }
  return (
    <>
      <h1 className="posts__title">Posts</h1>
      <div className="posts__body">
        <div className="post__container">
          <div className="vl"></div>
          {posts.results?.slice(0, next)?.map((post, index) => {
            const isFavorited = favorites.some((favProduct) => {
              return favProduct.article.pk === post.pk;
            });
            return (
              <PostItem key={index} post={post} isFavorited={isFavorited} />
            );
          })}
        </div>
      </div>
      {next < posts.results?.length && (
        <button className="loadMoreBtn" onClick={handleMorePosts}>
          more...
        </button>
      )}
    </>
  );
}
