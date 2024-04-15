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
  const postPerRow = 15;
  const [next, setNext] = useState(postPerRow);

  const handleMorePosts = () => {
    setNext(next + postPerRow);
  };

  useEffect(() => {
    dispatch(searchTagsArticles(searchTags));
  }, [dispatch, searchTags]);

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
        {articlesTags.results?.length === 0 ? (
          <div>There are no articles on this topic</div>
        ) : (
          <>
            <div className="favourite__cards">
              {articlesTags.results?.slice(0, next)?.map((post, index) => (
                <TagsSearchResult key={index} item={post} />
              ))}
            </div>
            {next < articlesTags.results?.length && (
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
