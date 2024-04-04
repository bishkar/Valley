import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./PostItem.scss";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/favourites.slice/favourites.slice";
import { useState } from "react";

export default function PostItem({ post }) {
  const dispatch = useDispatch();
  const { pk, original_title, image_urls } = post;
  const favorites = useSelector((state) => state.favorites);
  const isFavorited = favorites.some((favProduct) => favProduct.article === pk);
  const [isFav, setIsFav] = useState(isFavorited);

  const handleAddToFavorites = () => {
    if (isFav) {
      dispatch(removeFromFavorites(post));
      setIsFav(false);
      console.log("Delete", isFav);
    } else {
      dispatch(addToFavorites(post));
      setIsFav(true);
    }
  };

  return (
    <div className="post__cart">
      <Link className="post__more" to={`/articles/${pk}`}>
        <img src={`http://127.0.0.1:8000${image_urls[0]}`} alt="try" />
        <div className="post__body">
          <h4>{original_title}</h4>
          <ul className="postItem__tagList">
            <li>
              <p>#tagName</p>
            </li>
            <li>
              <p>#tagName</p>
            </li>
            <li>
              <p>#tagName</p>
            </li>
          </ul>
        </div>
      </Link>
      <button
        className={`heart__img ${isFav ? "active__favourite" : ""}`}
        onClick={handleAddToFavorites}
      />
    </div>
  );
}

PostItem.propTypes = {
  post: PropTypes.shape({
    pk: PropTypes.number.isRequired,
    original_title: PropTypes.string.isRequired,
  }).isRequired,
};
