import DeletePostSlide from "../components/Sliders/DeletePostSlide/DeletePostSlide";

const EditSliderPage = () => {
    if (!isAdminUser()) {
        window.location.href = "/";
    }

    return (
        <div>
            <DeletePostSlide />
        </div>
    );
}

export default EditSliderPage;