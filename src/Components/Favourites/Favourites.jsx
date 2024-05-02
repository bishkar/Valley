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
import { useTranslation } from "react-i18next";
import useAuth from "../../hooks/useAuth";
export default function Favourites() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const tags = useSelector(selectTags);
  const postPerRow = 9;
  let loggedIn = useAuth();

  const [next, setNext] = useState(postPerRow);
  const [keyword, setKeyword] = useState("");
  const filteredFavorites = keyword === "" ? favorites : tags;
  const { t } = useTranslation();

  useEffect(() => {
    if (loggedIn) {
      dispatch(fetchFavorites());
      if (keyword !== "") {
        dispatch(fetchTagsByKeyword(keyword));
      }
    }
  }, [dispatch, keyword, loggedIn]);

  const handleRemoveFromFavorites = (article) => {
    dispatch(removeFromFavorites(article)).then(() => {
      dispatch(fetchFavorites());
    });
  };

  const handleMorePosts = () => {
    setNext(next + postPerRow);
  };

  return (
    <div className="favourite__container">
      <h1>{t("Favourite Page")}</h1>
      <input
        className="fav__input"
        type="text"
        value={keyword}
        placeholder="Search by tagName"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <div className="favourite__cards">
        {favorites.length === 0 ? (
          <div>
            <h2>{t("Your favourite page is empty")}</h2>
          </div>
        ) : (
          <>
            {filteredFavorites?.slice(0, next)?.map((favPost, index) => (
              <FavouriteItem
                key={index}
                postId={favPost.article}
                handleRemoveFromFavorites={handleRemoveFromFavorites}
              />
            ))}
          </>
        )}
      </div>
      {next < filteredFavorites.length && (
        <button className="loadMoreBtn" onClick={handleMorePosts}>
          {t("more...")}
        </button>
      )}
    </div>
  );
}
