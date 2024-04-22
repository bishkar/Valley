import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchFavorites,
//   selectFavorites,
// } from "../../redux/favourites.slice/favourites.slice";
import PostItem from "../PostItem/PostItem";
import "./Posts.scss";
import { useTranslation } from "react-i18next";
import {
  searchArticles,
  selectArticles,
} from "../../redux/articleSearch.slice/articleSearch.slice";

export default function Posts() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { articles, status } = useSelector(selectArticles);
  // const favorites = useSelector(selectFavorites);
  const postPerRow = 4;
  const [next, setNext] = useState(postPerRow);
  const [currentPage, setCurrentPage] = useState(1);
  const [allArticles, setAllArticles] = useState([]);

  useEffect(() => {
    dispatch(
      searchArticles(
        `http://127.0.0.1:8000/api/v1/articles/?page=${currentPage}`
      )
    );
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (articles?.results && articles?.results.length > 0) {
      if (currentPage === 1) {
        setAllArticles([...articles.results]);
      } else {
        setAllArticles((prevPosts) => {
          const newPosts = articles.results.filter((post) => {
            return !prevPosts.some((prevPost) => prevPost.pk === post.pk);
          });
          return [...prevPosts, ...newPosts];
        });
      }
    }
  }, [articles.results, currentPage]);

  const handleMorePosts = () => {
    if (next >= allArticles.length) {
      setCurrentPage(currentPage + 1);
      setNext(next + postPerRow);
    } else {
      setNext(next + postPerRow - 2);
    }
  };

  if (status === "failed") {
    return <h1>{t("No posts 😢")}</h1>;
  }

  return (
    <>
      <h1 className="posts__title">{t("Posts")}</h1>
      <div className="posts__body">
        <div className="post__container">
          <div className="vl"></div>
          {allArticles?.slice(0, next)?.map((post, index) => {
            return <PostItem key={index} post={post} />;
          })}
        </div>
      </div>
      {next < articles?.count && (
        <button className="loadMoreBtn" onClick={handleMorePosts}>
          {t("more...")}
        </button>
      )}
    </>
  );
}
