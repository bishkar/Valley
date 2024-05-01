

import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import AddPostSlider from "../components/Sliders/AddPostSlider/AddPostSlider";
import { addSlide } from "../redux/posts.slice/addtoslider.slice";

const AddToSlider = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();

    const { data, error, loading } = useFetch(
        `http://127.0.0.1:8000/api/v1/articles/${postId}`
    );

    const [postData, setPostData] = useState({
        big_image: null,
        article: postId,
    });

    const handleSetPostData = (updatedData) => {
        setPostData(updatedData);
        console.log(postData)
    };

    const handleSave = () => {
        dispatch(addSlide(postData))
        alert("Post added to slider")
        window.location.href = "/"
    }

    return (
        <div>
            <h1>Add to slider</h1>
            <AddPostSlider setPostData={handleSetPostData} />
            <button onClick={handleSave}>Save</button>
        </div>
    )
}

export default AddToSlider