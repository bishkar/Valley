import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import useFetch from "../../../hooks/useFetch";
import "./MainSlider.scss";

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

  window.addEventListener("touchstart", function (event) {
    // some logic
    event.preventDefault(); // <-- that should not be used in passive
    // some other magic
  });

  const [imageIndex, setImageIndex] = useState(0);

  const settings = {
    centerMode: true,
    infinite: true,
    slidesToShow: 1,
    // swipeToSlide: false,
    // draggable: false,
    // swipe: false,
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
            <Link to={idx === imageIndex ? `/post/${post.id}` : "#"}>
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
