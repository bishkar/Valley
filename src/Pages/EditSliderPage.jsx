import DeletePostSlide from "../components/Sliders/DeletePostSlide/DeletePostSlide";
import { isAdminUser } from "../redux/auth.slice/token.slice.js";

const EditSliderPage = () => {
  if (!isAdminUser()) {
    window.location.href = "/";
  }

  return (
    <div>
      <DeletePostSlide />
    </div>
  );
};

export default EditSliderPage;
