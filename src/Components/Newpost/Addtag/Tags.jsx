import { useState } from 'react';
import AddTag from './Addtag';

function Tags({setPostData}) {
    const [article_tags, setTags] = useState([]);

    const handleTagsChange = (updatedTags) => {
        setTags(updatedTags);
        setPostData((prevData) => ({
            ...prevData,
            article_tags: updatedTags
        }));
    }

    return (
        <div className='tags-container'>
            <AddTag tags={article_tags} setTags={handleTagsChange} />
        </div>
    );
}

export default Tags;
