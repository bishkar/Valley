import "./Addlink.css";

import React, { useState } from "react";

const AddLink = ({ setPostData }) => {
    const [link, setLink] = useState("");

    const handleLinkChange = (e) => {
        const newLink = e.target.value;
        setLink(newLink);
        setPostData((prevData) => ({
            ...prevData,
            link_to_product: newLink,
        }));
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
