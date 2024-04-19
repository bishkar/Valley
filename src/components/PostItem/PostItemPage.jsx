import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Mainslider from "../Sliders/MainSlider/MainSlider";
import "./PostItem.scss";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { fetchStats, makeClick } from "../../redux/posts.slice/clicks.slice";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
const PostItemPage = () => {
  const { postId } = useParams();
  const clicks = useSelector((state) => state.clicks);
  console.log(`clicks ${clicks}`);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isFetching = useRef(false);

  const { data, error, loading } = useFetch(
    `http://127.0.0.1:8000/api/v1/articles/${postId}`
  );

  useEffect(() => {
    dispatch(fetchStats(postId));
  }, [dispatch, postId]);

  const handleClcik = () => {
    if (!isFetching.current) {
      dispatch(makeClick(postId));
      isFetching.current = true;
    }
  };

  if (error) return <h1 style={{ color: "red" }}>An error!!!</h1>;
  return (
    <div className="itemPage__container">
      {loading ? (
        <div>{t("loading data")}</div>
      ) : (
        <>
          <Mainslider />
          <h2 className="itemPage__title">
            {data.en_title} <span>({clicks[0]})</span>
          </h2>
          <ul className="itemPage__tagList">
            {data?.tags_name.map((tag, index) => (
              <li key={index}>
                <Link className="post__more" to={`/search/tags/${tag}`}>
                  <p>{tag}</p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="link__to__product">
            <p>
              {t("Link to the product: ")}
              <Link
                to={data.link_to_product}
                target="_blank"
                onClick={handleClcik()}
              >
                {data.link_to_product}
              </Link>
            </p>
          </div>

          <p className="itemPage__content">
            {t("parameters.postContent", { data })}
          </p>
        </>
      )}
    </div>
  );
};

export default PostItemPage;
