import "./Addlink.css";

import { useState } from "react";

const AddLink = () => {
    const [link, setLink] = useState("");

    const handleLinkChange = (e) => {
        setLink(e.target.value);
    };

    return (
        <div className="add-link-container">
            <div className="add-link">
                <input
                    className="add-link-input"
                    type="text"
                    placeholder="Add link"
                    value={link}
                    onChange={handleLinkChange}
                />
            </div>
        </div>
    );
}

export default AddLink;