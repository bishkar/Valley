import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavorites,
  removeFromFavorites,
} from "../../redux/favourites.slice/favourites.slice";
import { fetchPosts, selectPosts } from "../../redux/posts.slice/posts.slice";
import { useEffect, useState } from "react";
import FavouriteItem from "./FavouriteItem";
import "./Favourite.scss";

export default function Favourites() {
  const dispatch = useDispatch();
  const postPerRow = 9;
  const { posts } = useSelector(selectPosts);
  const favorites = useSelector((state) => state.favorites);
  const [next, setNext] = useState(postPerRow);

  useEffect(() => {
    dispatch(fetchFavorites());
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleRemoveFromFavorites = (article) => {
    dispatch(removeFromFavorites(article));
    dispatch(fetchFavorites());
  };

  const handleMorePosts = () => {
    setNext(next + postPerRow);
  };

  return (
    <div className="favourite__container">
      <h1>Favourite Page</h1>
      <input className="fav__input" placeholder="#tagName"></input>

      <div className="favourite__cards">
        {favorites?.length == 0 ? (
          <div>
            <h2>Your favourite page is empty</h2>
          </div>
        ) : (
          <>
            {favorites?.slice(0, next)?.map((favPost, index) => {
              const post = posts.find((post) => post.pk === favPost.article);
              if (post) {
                return (
                  <FavouriteItem
                    key={index}
                    postId={favPost.article}
                    handleRemoveFromFavorites={handleRemoveFromFavorites}
                  />
                );
              }
            })}
          </>
        )}
      </div>
      {next < favorites?.length && (
        <button className="loadMoreBtn" onClick={handleMorePosts}>
          more...
        </button>
      )}
    </div>
  );
}
