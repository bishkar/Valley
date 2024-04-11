import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SearchResult from "../SearchResult/SearchResult";
import {
  searchArticles,
  selectArticles,
} from "../../redux/articleSearch.slice/articleSearch.slice";

export default function SearchResults() {
  const dispatch = useDispatch();
  const { searchTerm } = useParams();
  const { articles, loading, error } = useSelector(selectArticles);
  const postPerRow = 15;
  const [next, setNext] = useState(postPerRow);

  const handleMorePosts = () => {
    setNext(next + postPerRow);
  };

  useEffect(() => {
    dispatch(searchArticles(searchTerm));
  }, [dispatch, searchTerm]);

  if (error) {
    return <div>Oops there is a mistake</div>;
  }

  return (
    <>
      <div className="category__container">
        <h1>Result({articles.length})</h1>
        {articles.length === 0 ? (
          <div>There are no articles on this topic</div>
        ) : (
          <>
            <div className="favourite__cards">
              {articles?.slice(0, next)?.map((post, index) => (
                <SearchResult key={index} item={post} />
              ))}
            </div>
            {next < articles?.length && (
              <button className="loadMoreBtn" onClick={handleMorePosts}>
                more...
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}
