// AddTitle.jsx
import './Addtitle.css';
import { useState } from 'react';

const AddTitle = ({ placeholder, setPostData, language }) => { // Додайте setPostData до параметрів компонента
    const [title, setTitle] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        if (language === 'en') {
            setPostData((prevData) => ({
                ...prevData,
                en_title: e.target.value 
            }));
        } else {
            setPostData((prevData) => ({
                ...prevData,
                it_title: e.target.value 
            }));
        }
    };

    return (
        <div className="add-title-container">
            <input
                className="add-title-input"
                type="text"
                placeholder={placeholder}
                value={title}
                onChange={handleTitleChange}
            />
        </div>
    );
};

export default AddTitle;
