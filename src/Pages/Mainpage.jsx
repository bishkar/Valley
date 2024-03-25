import Mainslider from "../components/Sliders/MainSlider/MainSlider";
import Categorydiv from "../components/Dividers/Category/Categorydiv";
import Navbar from "../components/Navbar/Navbar";
import CardSlider from "../components/Sliders/CardSlider/Cardslider";
import Posts from "../components/Posts/Posts";
import Footer from "../components/Footer/Footer.jsx";

export default function MainPage() {
  return (
    <div>
      <Navbar />
      <Mainslider />
      <Categorydiv />
      <CardSlider />
      <Posts />;
      <Footer />
    </div>
  );
}
