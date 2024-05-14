import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import useFetch from "../../../hooks/useFetch";
import "./MainSlider.scss";

export default function Mainslider() {
  const { data, error, loading } = useFetch(
    `https://api.solyver.com/api/v1/slider/`
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
    swipeToSlide: false,
    draggable: false,
    swipe: false,
    slidesToShow: 1,
    autoplay: true,
    focusOnSelect: true,
    autoplaySpeed: 3000,
    speed: 500,
    rows: 1,
    slidesPerRow: 1,
    centerPadding: "0px",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    variableWidth: true,
    variableHeight: true,
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
            <Link to={idx === imageIndex ? `/articles/${post.article}` : "#"}>
              <img
                src={post.big_image}
                alt={post.article}
                className="slide__image"
              />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
