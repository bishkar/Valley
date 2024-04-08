import Mainslider from "../components/Sliders/MainSlider/MainSlider.jsx";
import Categorydiv from "../components/Dividers/Category/Categorydiv.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import CardSlider from "../components/Sliders/CardSlider/Cardslider.jsx";
import Posts from "../components/Posts/Posts.jsx";
import Footer from "../components/Footer/Footer.jsx";

export default function MainPage() {
  return (
    <div>
      <Navbar />
      <Mainslider />
      <Categorydiv />
      <CardSlider />
      <Posts />;
    </div>
  );
}
