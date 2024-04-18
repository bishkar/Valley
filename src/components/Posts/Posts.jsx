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
  const [currentPage, setCurrentPage] = useState(1);
  const [allPosts, setAllPosts] = useState([]);
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    dispatch(
      fetchPosts(`http://127.0.0.1:8000/api/v1/articles/?page=${currentPage}`)
    );
    dispatch(fetchFavorites());
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (posts?.results && posts?.results.length > 0) {
      if (currentPage === 1) {
        setAllPosts([...posts.results]);
      } else {
        setAllPosts((prevPosts) => {
          const newPosts = posts.results.filter((post) => {
            return !prevPosts.some((prevPost) => prevPost.pk === post.pk);
          });
          return [...prevPosts, ...newPosts];
        });
      }
    }
  }, [posts.results, currentPage]);

  console.log(allPosts);
  const handleMorePosts = () => {
    if (next >= allPosts.length) {
      setCurrentPage(currentPage + 1);
      setNext(next + postPerRow);
    } else {
      setNext(next + postPerRow);
    }
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
          {allPosts.slice(0, next).map((post, index) => {
            const isFavorited = favorites.some((favProduct) => {
              return favProduct.article.pk === post.pk;
            });
            return (
              <PostItem key={index} post={post} isFavorited={isFavorited} />
            );
          })}
        </div>
      </div>
      {next < posts?.count && (
        <button className="loadMoreBtn" onClick={handleMorePosts}>
          more...
        </button>
      )}
    </>
  );
}
