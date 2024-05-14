import Mainslider from "../components/Sliders/MainSlider/MainSlider.jsx";
import Categorydiv from "../components/Dividers/Category/Categorydiv.jsx";
import CardSlider from "../components/Sliders/CardSlider/Cardslider.jsx";
import Posts from "../components/Posts/Posts.jsx";
import useAuth from "../hooks/useAuth";

export default function MainPage() {
  let loggedIn = useAuth();

  return (
    <>
      {loggedIn !== null && (
        <>
          <Mainslider />
          <Categorydiv />
          <CardSlider />
          <Posts />
        </>
      )}
    </>
  );
}
