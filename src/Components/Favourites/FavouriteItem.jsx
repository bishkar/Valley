import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch";
import "./Favourite.scss";
import { useTranslation } from "react-i18next";
export default function FavouriteCard({ postId, handleRemoveFromFavorites }) {
  const { data, error, loading } = useFetch(
    `http://127.0.0.1:8000/api/v1/articles/${postId}`
  );
  const { t } = useTranslation();
  //console.log(data);
  // const { it_title, en_title } = data;
  ///const { it_title, en_title } = { it_title: "aaa", en_title: "b" };
  const handleRemoveClick = () => {
    handleRemoveFromFavorites(data);
  };

  if (error) {
    return <div>{t("Oops there is a mistake")}</div>;
  }
  return (
    <>
      {loading ? (
        <div>loading data</div>
      ) : (
        <div className="favourite__card">
          <Link className="post__more" to={`/articles/${postId}`}>
            <img src={`http://127.0.0.1:8000${data.image_urls[0]}`} />
            <div className="favourite__body">
              <h4>{t("parameters.postTitle", { data: data })} </h4>
              <ul className="postItem__tagList">
                {data.tags_name.map((tag, index) => (
                  <li key={index}>
                    <Link className="post__more" to={`/search/tags/${tag}`}>
                      <p>{tag}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Link>
          <div className="button__container">
            <button
              className="heart__img  active__favourite"
              onClick={handleRemoveClick}
            />
          </div>
        </div>
      )}
    </>
  );
}

FavouriteCard.propTypes = {
  postId: PropTypes.number.isRequired,
  handleRemoveFromFavorites: PropTypes.func.isRequired,
};
