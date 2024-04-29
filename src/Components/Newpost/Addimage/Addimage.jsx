import './Addimage.css'

import { useState } from 'react';
import { useEffect } from 'react';

import addImg from '../../../assets/Icons/Add/add.svg';
import deleteImg from '../../../assets/Icons/Delete/delete.svg';

const AddImage = ({setPostData, oldImages}) => {
    const [images, setImages] = useState([]);

    const handleImageUpload = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            setImages([...images, files[0]]);
            setPostData((prevData) => ({
                ...prevData,
                images: [...images, files[0]]
            }));
        }
    };

    const handlePlusClick = () => {
        const inputElement = document.getElementById('imageInput');
        inputElement.click();
    };

    let [rendered, setRendered] = useState(false);
    useEffect(() => {
        if (oldImages && oldImages.length > 0 && !rendered) {
            setImages(oldImages);
            setRendered(true);
        }
    }, [oldImages, rendered]);

    console.log(images)

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
            <div className="added__images">
                {images.map((image, index) => (
                    <div key={index} className="image">
                        <img src={"http://127.0.0.1:8000" + image} alt="" />
                        <button className="delete-image" onClick={() => setImages(images.filter((_, i) => i !== index))}>
                            <img src={deleteImg} alt="" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AddImage;