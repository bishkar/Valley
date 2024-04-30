import './AddPostSlider.css'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import addImg from '../../../assets/Icons/Add/add.svg';
import deleteImg from '../../../assets/Icons/Delete/delete.svg';
import { uploadImages } from '../../../redux/posts.slice/uploadImages.slice';
import s from '@editorjs/marker';
import f from '@editorjs/checklist';

const AddPostSlider = ({ setPostData }) => {
    const [images, setImages] = useState([]);
    const dispatch = useDispatch();

    const handleImageUpload = async (e) => {
        try {
            const files = e.target.files;

            setImages(prevImages => [...prevImages, ...files]);

            
            setPostData((prevData) => ({
                ...prevData,
                big_image: files[0],
            }));
        } catch (error) {
        }
    };    

    const handlePlusClick = () => {
        const inputElement = document.getElementById('imageInput');
        inputElement.click();
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
                    style={{ display: 'none' }}
                />
                <button className="add-image-button" onClick={handlePlusClick}>
                    <img src={addImg} alt="" />
                </button>
            </div>
        </div>
    );
};

export default AddPostSlider;
