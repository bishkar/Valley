import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import "./PostItem.scss";

const PostItemPage = () => {
  const { postId } = useParams();
  const { data, error, loading } = useFetch(
    `http://127.0.0.1:8000/api/v1/articles/${postId}`
  );

  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <FaArrowLeft />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <FaArrowRight />
      </div>
    );
  };

  const [imageIndex, setImageIndex] = useState(0);

  const settings = {
    centerMode: true,
    infinite: true,
    slidesToShow: 1,
    autoplay: true,
    focusOnSelect: true,
    autoplaySpeed: 3000,
    speed: 600,
    rows: 1,
    vertical: true,
    verticalSwiping: true,
    slidesPerRow: 1,
    centerPadding: "0px",
    variableHeight: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
  };

  if (error) return <h1 style={{ color: "red" }}>An error!!!</h1>;
  return (
    <div className="itemPage__container">
      {loading ? (
        <div>loading data</div>
      ) : (
        <>
          <div className="postSlider__container">
            <Slider {...settings}>
              {data?.image_urls.map((image, idx) => (
                <div
                  key={idx}
                  className={
                    idx === imageIndex
                      ? "slide activeSlide"
                      : "slide deactiveSlide"
                  }
                >
                  <img
                    src={`http://127.0.0.1:8000${image}`}
                    className="slide__image"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <h2 className="itemPage__title">{data.en_title}</h2>
          <ul className="itemPage__tagList">
            {data.tags_name.map((tag, index) => (
              <li key={index}>
                <Link className="post__more" to={`/search/tags/${tag}`}>
                  <p>{tag}</p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="link__to__product">
            <p>
              Link to the product:
              <br />
              <Link to={data.link_to_product} target="_blank">
                {data.link_to_product}
              </Link>
            </p>
          </div>
          <p className="itemPage__content">{data.en_content}</p>
        </>
      )}
    </div>
  );
};

export default PostItemPage;
