import "./Addimage.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import addImg from "../../../assets/Icons/Add/add.svg";
import deleteImg from "../../../assets/Icons/Delete/delete.svg";
import { uploadImages } from "../../../redux/posts.slice/uploadImages.slice";
import s from "@editorjs/marker";
import { isObject } from "formik";

const AddImage = ({ setPostData, oldImages }) => {
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (oldImages) {
      setImages(oldImages);
    }
  }, [oldImages]);

  const handleImageUpload = async (e) => {
    try {
      const files = e.target.files;
      const formData = new FormData();
      formData.append("image", files);
      const uploadedImages = await dispatch(uploadImages(files));
      console.log(uploadedImages);
      if (images.length > 0) {
        setImages((prevImages) => [...prevImages, ...uploadedImages.payload]);
      } else {
        setImages(uploadedImages.payload);
      }

      setPostData((prevData) => ({
        ...prevData,
        images: [...prevData.images, ...uploadedImages.payload],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlusClick = () => {
    const inputElement = document.getElementById("imageInput");
    inputElement.click();
  };

  const handleDeleteImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setPostData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="add-image-container">
      <div className="add-image">
        <input
          id="imageInput"
          className="add-image-input"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
        <button className="add-image-button" onClick={handlePlusClick}>
          <img src={addImg} alt="" />
        </button>
      </div>
      <div className="added__images">
        {images.map((image, index) => (
          <div key={index} className="image">
            {console.log(image, index)}
            <img
              src={"https://api.solyver.com" + Object.values(image)[0]}
              alt=""
            />
            <button
              className="delete-image"
              onClick={() => handleDeleteImage(index)}
            >
              <img src={deleteImg} alt="" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddImage;
