import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Mainslider from "../Sliders/MainSlider/MainSlider";
import "./PostItem.scss";

const PostItemPage = () => {
  const { postId } = useParams();
  const { data, error, loading } = useFetch(
    `http://127.0.0.1:8000/api/v1/articles/${postId}`
  );

  if (error) return <h1 style={{ color: "red" }}>An error!!!</h1>;
  return (
    <div className="itemPage__container">
      {loading ? (
        <div>loading data</div>
      ) : (
        <>
          <Mainslider />
          <h2 className="itemPage__title">{data.en_title}</h2>
          <ul className="itemPage__tagList">
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
          <div className="link__to__product">
            <p>
              Link to the product:{" "}
              <a href={data.link_to_product} target="_blank">
                {data.link_to_product}
              </a>
            </p>
          </div>
          <p className="itemPage__content">{data.en_content}</p>
        </>
      )}
    </div>
  );
};

export default PostItemPage;
