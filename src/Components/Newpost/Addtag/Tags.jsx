import { useState } from 'react';
import AddTag from './Addtag';

function Tags() {
    const [tags, setTags] = useState([]);

    return (
        <div className='tags-container'>
            <AddTag tags={tags} setTags={setTags} />
        </div>
    );
}

export default Tags;
