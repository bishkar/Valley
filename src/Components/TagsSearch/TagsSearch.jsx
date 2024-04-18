import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TagsSearchResult from "../TagsSearchResult/TagsSearchResult";
import {
  searchTagsArticles,
  selectArticlesTags,
} from "../../redux/articleTagsSearch.slice/articleTagsSearch.slice";

export default function TagsSearchj() {
  const dispatch = useDispatch();
  const { searchTags } = useParams();
  const { articlesTags, loading, error } = useSelector(selectArticlesTags);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(
      searchTagsArticles(
        `http://127.0.0.1:8000/api/v1/articles/?page=${currentPage}&tag=${searchTags}`
      )
    );
  }, [dispatch, searchTags, currentPage]);

  useEffect(() => {
    if (articlesTags.count > articlesTags?.results.length) {
      setCurrentPage(currentPage + 1);
    }
  }, [articlesTags, currentPage]);

  if (error) {
    return <div>Oops there is a mistake</div>;
  }

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <div className="category__container">
        <h1>
          {searchTags} ({articlesTags.count})
        </h1>
        {articlesTags?.count === 0 ? (
          <div>There are no articles on this topic</div>
        ) : (
          <>
            <div className="favourite__cards">
              {articlesTags.results?.map((post, index) => (
                <TagsSearchResult key={index} item={post} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
