import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectFavorites } from "../../redux/favourites.slice/favourites.slice";
import { Link } from "react-router-dom";
import "./PostItem.scss";
import photo from "../../img/img1.jpeg";
export default function PostItem({
  post,
  onRemoveFromFavorites,
  onAddToFavorites,
}) {
  const { id, title } = post;
  const favorites = useSelector(selectFavorites);

  const handleAddToFavorites = () => {
    if (isFavorited) {
      onRemoveFromFavorites(post);
    } else {
      onAddToFavorites(post);
    }
  };

  const isFavorited = favorites.some((favProduct) => favProduct.id === id);

  return (
    <Link className="post__more" to={`/post/${id}`}>
      <div className="post__cart">
        <img src={photo} alt="try" />
        <div className="post__body">
          <h4>{title}</h4>
          <div className="button__container">
            <button
              className={`btn__favourite ${
                isFavorited ? "active__favourite" : ""
              }`}
              onClick={handleAddToFavorites}
            >
              &#x2661;
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

PostItem.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  onRemoveFromFavorites: PropTypes.func.isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
};
