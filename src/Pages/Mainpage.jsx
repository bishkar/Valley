import Mainslider from "../components/Sliders/MainSlider/MainSlider.jsx";
import Categorydiv from "../components/Dividers/Category/Categorydiv.jsx";
import CardSlider from "../components/Sliders/CardSlider/Cardslider.jsx";
import Posts from "../components/Posts/Posts.jsx";

export default function MainPage() {
  return (
    <>
      <Mainslider />
      <Categorydiv />
      <CardSlider />
      <Posts />
    </>
  );
}
