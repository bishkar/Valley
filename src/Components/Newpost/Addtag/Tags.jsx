import { useState } from 'react';
import AddTag from './Addtag';

function Tags({setPostData}) {
    const [tags, setTags] = useState([]);

    const handleTagsChange = (updatedTags) => {
        setTags(updatedTags);
        setPostData((prevData) => ({
            ...prevData,
            tags: updatedTags
        }));
    }

    return (
        <div className='tags-container'>
            <AddTag tags={tags} setTags={handleTagsChange} />
        </div>
    );
}

export default Tags;
