import "./Cardslider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

import arrowForward from "../../../assets/Icons/Arrows/ArrowForward.svg";
import arrowBackward from "../../../assets/Icons/Arrows/ArrowBack.svg";
import photo from "../../../img/img1.jpeg";

const CardSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <img src={arrowForward} alt="arrow" />,
    prevArrow: <img src={arrowBackward} alt="arrow" />,
  };

  const data = [
    {
      //   img: "https://via.placeholder.com/150",
      img: `${photo}`,
      title: "Title 1",
      description: "Description 1",
    },
    {
      //   img: "https://via.placeholder.com/150",
      img: `${photo}`,
      title: "Title 2",
      description: "Description 2",
    },
    {
      //   img: "https://via.placeholder.com/150",
      img: `${photo}`,
      title: "Title 3",
      description: "Description 3",
    },
    {
      //   img: "https://via.placeholder.com/150",
      img: `${photo}`,
      title: "Title 4",
      description: "Description 4",
    },
    {
      //   img: "https://via.placeholder.com/150",
      img: `${photo}`,
      title: "Title 5",
      description: "Description 5",
    },
    {
      //   img: "https://via.placeholder.com/150",
      img: `${photo}`,
      title: "Title 6",
      description: "Description 6",
    },
  ];

  return (
    // <div className="container">
    <div className="card-slider">
      <Slider {...settings}>
        {data.map((item, index) => (
          <div key={index} className="card">
            <img className="card__img" src={item.img} alt="" />
            <div className="card__body">
              <h3>{item.title}</h3>
              {/* <p>{item.description}</p> */}
            </div>
          </div>
        ))}
      </Slider>
    </div>
    // </div>
  );
};

export default CardSlider;
