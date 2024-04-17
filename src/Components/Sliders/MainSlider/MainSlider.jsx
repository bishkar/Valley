import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import "./MainSlider.scss";
import useFetch from "../../../hooks/useFetch";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Mainslider() {
  const { data, error, loading } = useFetch(
    `http://127.0.0.1:8000/api/v1/slider/`
  );

  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <FaArrowRight />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <FaArrowLeft />
      </div>
    );
  };

  const [imageIndex, setImageIndex] = useState(0);

  const settings = {
    centerMode: true,
    infinite: true,
    slidesToShow: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    rows: 1,
    slidesPerRow: 1,
    centerPadding: "0px",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    variableWidth: true,
    beforeChange: (current, next) => setImageIndex(next),
  };

  if (error) return <h1 style={{ color: "red" }}>An error!!!</h1>;

  if (loading) return <h1>loading</h1>;

  return (
    <div className="mainSlider__container">
      <Slider {...settings}>
        {data?.map((post, idx) => (
          <div
            key={idx}
            className={
              idx === imageIndex ? "slide activeSlide" : "slide deactiveSlide"
            }
          >
            <Link to={`/post/${post.id}`}>
              <img
                src={post.big_image}
                alt={post.id}
                className="slide__image"
              />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
