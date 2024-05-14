import { use } from "i18next";
import "./Addlink.css";

import React, { useState } from "react";
import { useEffect } from "react";

const AddLink = ({ setPostData, oldLink }) => {
    const [link, setLink] = useState("");

    const handleLinkChange = (e) => {
        const newLink = e.target.value;
        setLink(newLink);
        setPostData((prevData) => ({
            ...prevData,
            link_to_product: newLink,
        }));
    };

    let [rendered, setRendered] = useState(false);
    useEffect(() => {
        if (oldLink && !rendered) {
            setLink(oldLink);
            setRendered(true);
        }
    })

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
