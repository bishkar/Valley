import './Addimage.css'

import { useState } from 'react';

import addImg from '../../../assets/Icons/Add/add.svg';

const AddImage = ({setImages, images}) => {
    // const [images, setImages] = useState([]);

    const handleImageUpload = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            setImages([...images, files[0]]);
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
    )
}

export default AddImage;