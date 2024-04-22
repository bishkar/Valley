import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchResult from "../SearchResult/SearchResult";
import {
  searchArticles,
  selectArticles,
} from "../../redux/articleSearch.slice/articleSearch.slice";
import { useTranslation } from "react-i18next";

export default function SearchResults() {
  const dispatch = useDispatch();
  const { searchTerm } = useParams();
  const { articles, error } = useSelector(selectArticles);
  const postPerRow = 10;
  const [next, setNext] = useState(postPerRow);
  const [allArticles, setAllArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(
      searchArticles(
        `http://127.0.0.1:8000/api/v1/articles/?page=${currentPage}&search=${searchTerm}`
      )
    );
  }, [dispatch, searchTerm, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    setNext(postPerRow);
  }, []);

  useEffect(() => {
    if (articles?.results && articles?.results?.length > 0) {
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
    setCurrentPage(currentPage + 1);
    setNext(next + postPerRow);
  };

  if (error) {
    return <div>Oops there is a mistake</div>;
  }

  return (
    <>
      <div className="category__container">
        <h1>
          {t("Result")} ({articles.count})
        </h1>
        {articles.count === 0 ? (
          <div>{t("There are no articles on this topic")}</div>
        ) : (
          <>
            <div className="favourite__cards">
              {allArticles?.slice(0, next)?.map((post, index) => (
                <SearchResult key={index} item={post} />
              ))}
            </div>
            {next < articles?.count && (
              <button className="loadMoreBtn" onClick={handleMorePosts}>
                {t("more...")}
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}
