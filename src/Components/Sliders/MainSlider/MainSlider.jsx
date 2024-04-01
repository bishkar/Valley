import imageOne from "../../../assets/FromFigma/Slider1.jpg";
import imageTwo from "../../../assets/FromFigma/Slider2.webp";
import imageThree from "../../../assets/FromFigma/Slider3.jpg";
import arrowForward from "../../../assets/Icons/Arrows/ArrowForward.svg";
import arrowBackward from "../../../assets/Icons/Arrows/ArrowBack.svg";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./MainSlider.css";

export default function Mainslider() {
  const images = [imageOne, imageTwo, imageThree];

  return (
    <div className="slider-cont">
      <span className="slider-background"></span>
      <div className="slider-container">
        <Slide
          className="slider"
          prevArrow={
            <div>
              <img
                className="custom-arrow prev-arrow"
                src={arrowBackward}
                alt=""
              />
            </div>
          }
          nextArrow={
            <div>
              <img
                className="custom-arrow next-arrow"
                src={arrowForward}
                alt=""
              />
            </div>
          }
        >
          <div className="each-slide-effect">
            <div
              style={{ backgroundImage: `url(${images[0]})` }}
              className="slide-image"
            ></div>
          </div>
          <div className="each-slide-effect">
            <div
              style={{ backgroundImage: `url(${images[1]})` }}
              className="slide-image"
            ></div>
          </div>
          <div className="each-slide-effect">
            <div
              style={{ backgroundImage: `url(${images[2]})` }}
              className="slide-image"
            ></div>
          </div>
        </Slide>
      </div>
    </div>
  );
}
