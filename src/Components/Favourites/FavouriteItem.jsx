import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Favourite.scss";
import { useTranslation } from "react-i18next";

export default function FavouriteCard({ postId, handleRemoveFromFavorites }) {
  const { image_urls, tags_name } = postId.article;
  const { t } = useTranslation();
  const handleRemoveClick = () => {
    handleRemoveFromFavorites(postId.article);
  };

  return (
    <>
      <div className="favourite__card">
        <Link className="post__more" to={`/articles/${postId}`}>
          <img src={`http://127.0.0.1:8000${image_urls[0]}`} />
          <div className="favourite__body">
            <h4>{t("parameters.postTitle", { data: postId.article })} </h4>
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
