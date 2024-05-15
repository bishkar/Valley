import "./Addtag.css"

import { useState } from 'react';
import addImg from '../../../assets/Icons/Add/add.svg';

const AddTag = ({setTags, tags}) => {
    const [tag, setTag] = useState('');

    const handleTagChange = (e) => {
        setTag(e.target.value);
    };

    const handleTagAdd = () => {
        if (tags.includes(tag) || tag === '' || tags.length >= 5) return;

        setTags([...tags, tag]);
        setTag('');
    };

    const handleTagDelete = (index) => {
        const newTags = tags.filter((_, i) => i !== index);
        setTags(newTags);
    };

    return (
        <div className="add-tag-container">
            <div className="add-tag">
                <input
                    className="add-tag-input"
                    type="text"
                    placeholder="Add tag"
                    value={tag}
                    onChange={handleTagChange}
                />
                <button className="add-tag-button" onClick={handleTagAdd}>
                    <img src={addImg} alt="" />
                </button>
            </div>
            <div className="tags">
            {tags.map((tag, index) => (
                    <div key={index} className="tag">
                        <span>{tag}</span>
                        <button className="delete-tag" onClick={() => handleTagDelete(index)}>
                            <img src={addImg} alt="" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AddTag;