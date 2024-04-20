import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TagsSearchResult from "../TagsSearchResult/TagsSearchResult";
import {
  searchTagsArticles,
  selectArticlesTags,
} from "../../redux/articleTagsSearch.slice/articleTagsSearch.slice";
import { useTranslation } from "react-i18next";
export default function TagsSearchj() {
  const dispatch = useDispatch();
  const { searchTags } = useParams();
  const postPerRow = 6;
  const { articlesTags, error } = useSelector(selectArticlesTags);
  const [currentPage, setCurrentPage] = useState(1);
  const [allArticles, setAllArticles] = useState([]);
  const [next, setNext] = useState(postPerRow);
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(
      searchTagsArticles(
        `http://127.0.0.1:8000/api/v1/articles/?page=${currentPage}&tag=${searchTags}`
      )
    );
  }, [dispatch, searchTags, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    setNext(postPerRow);
  }, [searchTags]);

  useEffect(() => {
    if (articlesTags?.results && articlesTags?.results?.length > 0) {
      if (currentPage === 1) {
        setAllArticles([...articlesTags.results]);
      } else {
        setAllArticles((prevPosts) => {
          const newPosts = articlesTags.results.filter((post) => {
            return !prevPosts.some((prevPost) => prevPost.pk === post.pk);
          });
          return [...prevPosts, ...newPosts];
        });
      }
    }
  }, [articlesTags.results, currentPage]);

  const handleMorePosts = () => {
    if (next >= allArticles.length) {
      setCurrentPage(currentPage + 1);
      setNext(next + postPerRow);
    } else {
      setNext(next + postPerRow);
    }
  };

  if (error) {
    return <div>Oops there is a mistake</div>;
  }

  return (
    <>
      <div className="category__container">
        <h1>
          {searchTags} ({articlesTags.count})
        </h1>
        {articlesTags?.count === 0 ? (
          <div>{t("There are no articles on this topic")}</div>
        ) : (
          <>
            <div className="favourite__cards">
              {allArticles?.slice(0, next).map((post, index) => (
                <TagsSearchResult key={index} item={post} />
              ))}
            </div>
            {next < articlesTags?.count && (
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
