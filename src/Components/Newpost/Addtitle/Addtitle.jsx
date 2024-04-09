import './Addtitle.css'

import { useState } from 'react';

const AddTitle = ({placeholder}) => {
    const [title, setTitle] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
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
    )
}

export default AddTitle;