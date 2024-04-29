import { useState, useEffect } from 'react';
import AddTag from './Addtag';

function Tags({ setPostData, tags }) {
    const [article_tags, setTags] = useState([]);
    const [rendered, setRendered] = useState(false);

    useEffect(() => {
        if (tags && tags.length > 0 && !rendered) {
            setTags(tags);
            setRendered(true);
        }
    }, [tags, rendered]);

    const handleTagsChange = (updatedTags) => {
        setTags(updatedTags);
        setPostData((prevData) => ({
            ...prevData,
            article_tags: updatedTags
        }));
    };

    return (
        <div className='tags-container'>
            <AddTag tags={article_tags} setTags={handleTagsChange} />
        </div>
    );
}

export default Tags;
