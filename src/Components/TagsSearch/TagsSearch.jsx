import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TagsSearchResult from "../TagsSearchResult/TagsSearchResult";
import { useTranslation } from "react-i18next";
import {
  searchArticles,
  selectArticles,
} from "../../redux/articleSearch.slice/articleSearch.slice";

export default function TagsSearchj() {
  const dispatch = useDispatch();
  const { searchTags } = useParams();
  const postPerRow = 6;
  const { articles, error } = useSelector(selectArticles);
  const [currentPage, setCurrentPage] = useState(1);
  const [allArticles, setAllArticles] = useState([]);
  const [next, setNext] = useState(postPerRow);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(
      searchArticles(
        `https://api.solyver.com/api/v1/articles/?page=${currentPage}&tag=${searchTags}`
      )
    );
  }, [dispatch, searchTags, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    setNext(postPerRow);
  }, [searchTags]);

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
    if (next >= allArticles.length) {
      setCurrentPage(currentPage + 1);
      setNext(next + postPerRow);
    } else {
      setNext(next - 2 + postPerRow);
    }
  };

  if (error) {
    return <div>Oops there is a mistake</div>;
  }

  return (
    <>
      <div className="category__container">
        <h1>
          {searchTags} ({articles.count})
        </h1>
        {articles?.count === 0 ? (
          <div>{t("There are no articles on this topic")}</div>
        ) : (
          <>
            <div className="favourite__cards">
              {allArticles?.slice(0, next).map((post, index) => (
                <TagsSearchResult key={index} item={post} />
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
