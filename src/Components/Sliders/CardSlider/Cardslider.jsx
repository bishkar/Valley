import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Slider from "react-slick";
import useFetch from "../../../hooks/useFetch";
import "./Cardslider.scss";

export default function CardSlider() {
  const { data, error, loading } = useFetch(
    `http://127.0.0.1:8000/api/v1/articles/on_top/`
  );

  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next__cardSlider" onClick={onClick}>
        <FaArrowRight />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev__cardSlider" onClick={onClick}>
        <FaArrowLeft />
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  if (error) return <h1 style={{ color: "red" }}>An error!!!</h1>;

  if (loading) return <h1>loading</h1>;

  return (
    <div className="card-slider">
      <Slider {...settings}>
        {data?.slice(0, 6).map((item, index) => {
          return (
            <div key={index} className="card">
              <img
                className="card__img"
                src={`http://127.0.0.1:8000/${item.image_urls[0]}`}
                alt=""
              />
              <div className="card__body">
                <h3>{item.en_title}</h3>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
