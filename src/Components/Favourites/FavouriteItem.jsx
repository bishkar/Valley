import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Favourite.scss";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function FavouriteCard({ postId, handleRemoveFromFavorites }) {
  const { pk, image_urls, tags_name } = postId;
  const { t } = useTranslation();
  const [isFav, setIsFav] = useState(true);

  const handleRemoveClick = () => {
    handleRemoveFromFavorites(postId);
    setIsFav(false);
  };

  return (
    <>
      <div
        style={{ display: isFav ? "block" : "none" }}
        className="favourite__card"
      >
        <Link className="post__more" to={`/articles/${pk}`}>
          <img src={`http://127.0.0.1:8000${image_urls[0]}`} />
          <div className="favourite__body">
            <h4>{t("parameters.postTitle", { data: postId })} </h4>
          </div>
        </Link>
        <ul className="postItem__tagList">
          {tags_name.map((tag, index) => (
            <li key={index}>
              <Link className="post__more" to={`/search/tags/${tag}`}>
                <p>{tag}</p>
              </Link>
            </li>
          ))}
        </ul>
        <div className="button__container">
          <button
            className="heart__img  active__favourite"
            onClick={handleRemoveClick}
          />
        </div>
      </div>
    </>
  );
}

FavouriteCard.propTypes = {
  postId: PropTypes.object.isRequired,
  handleRemoveFromFavorites: PropTypes.func.isRequired,
};
