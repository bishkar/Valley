import Mainslider from "../components/Sliders/MainSlider/MainSlider";
import Categorydiv from "../components/Dividers/Category/Categorydiv";
import CardSlider from "../components/Sliders/CardSlider/Cardslider";
import Posts from "../components/Posts/Posts";

export default function MainPage() {
  return (
    <div>
      <Mainslider />
      <Categorydiv />
      <CardSlider />
      <Posts />
    </div>
  );
}
