import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectFavorites } from "../../redux/favourites.slice/favourites.slice";

export default function PostItem({
  post,
  onRemoveFromFavorites,
  onAddToFavorites,
}) {
  const { id, title, body } = post;
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
    <div className="post__cart">
      {/* <img src={image} alt={name} /> */}
      <div className="post__body">
        <h4>{title}</h4>
        <p>{body}</p>
        <div className="button__container">
          <button
            className={`btn__favourite ${
              isFavorited ? "active__favourite" : ""
            }`}
            onClick={handleAddToFavorites}
          >
            &#9733;
          </button>
        </div>
      </div>
    </div>
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
