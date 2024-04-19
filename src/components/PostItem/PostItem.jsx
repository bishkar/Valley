import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./PostItem.scss";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/favourites.slice/favourites.slice";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function PostItem({ post, isFavorited }) {
  const dispatch = useDispatch();
  const { pk, image_urls, tags_name } = post;
  const [isFav, setIsFav] = useState(isFavorited);
  const { t } = useTranslation();
  const loggedIn = localStorage.getItem("loggedIn");

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
          <h4>{t("parameters.postNameTitle", { data: post })}</h4>
          <ul className="postItem__tagList">
            {tags_name.map((tag, index) => (
              <li key={index}>
                <Link className="post__more" to={`/search/tags/${tag}`}>
                  <p>{tag}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Link>

      <button
        style={{ display: loggedIn === "true" ? "block" : "none" }}
        className={`heart__img ${isFav ? "active__favourite" : ""}`}
        onClick={handleAddToFavorites}
      />
    </div>
  );
}

PostItem.propTypes = {
  post: PropTypes.shape({
    pk: PropTypes.number.isRequired,
    en_title: PropTypes.string.isRequired,
  }).isRequired,
};
