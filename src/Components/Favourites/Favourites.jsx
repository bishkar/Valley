import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavorites,
  removeFromFavorites,
} from "../../redux/favourites.slice/favourites.slice";
import { useEffect, useState } from "react";
import {
  fetchTagsByKeyword,
  selectTags,
} from "../../redux/tags.slice/tags.slice";
import FavouriteItem from "./FavouriteItem";
import "./Favourite.scss";

export default function Favourites() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const tags = useSelector(selectTags);
  const postPerRow = 9;
  const [next, setNext] = useState(postPerRow);
  const [keyword, setKeyword] = useState("");
  const filteredFavorites = keyword === "" ? favorites : tags;

  useEffect(() => {
    dispatch(fetchFavorites());
    if (keyword !== "") {
      dispatch(fetchTagsByKeyword(keyword));
    }
  }, [dispatch, keyword]);

  const handleRemoveFromFavorites = (article) => {
    dispatch(removeFromFavorites(article));
    dispatch(fetchTagsByKeyword(keyword));
    dispatch(fetchFavorites());
  };

  const handleMorePosts = () => {
    setNext(next + postPerRow);
  };

  return (
    <div className="favourite__container">
      <h1>Favourite Page</h1>
      <input
        className="fav__input"
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <div className="favourite__cards">
        {favorites.length === 0 ? (
          <div>
            <h2>Your favourite page is empty</h2>
          </div>
        ) : (
          <>
            {filteredFavorites?.slice(0, next)?.map((favPost, index) => (
              <FavouriteItem
                key={index}
                postId={favPost}
                handleRemoveFromFavorites={handleRemoveFromFavorites}
              />
            ))}
          </>
        )}
      </div>
      {next < filteredFavorites.length && (
        <button className="loadMoreBtn" onClick={handleMorePosts}>
          more...
        </button>
      )}
    </div>
  );
}
