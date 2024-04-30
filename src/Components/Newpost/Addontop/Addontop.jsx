import "./Addontop.css";

import React, { useState } from "react";

const AddOnTop = ({ setPostData, onTop }) => {
    const [top, setTop] = useState("");

    const handleTopChange = (e) => {
        const newTop = e.target.checked;
        setTop(newTop);
        setPostData((prevData) => ({
            ...prevData,
            top: newTop,
        }));
    }

    let [rendered, setRendered] = useState(false);
    if (onTop && !rendered) {
        setTop(onTop);
        setRendered(true);
    }

    return (
        <div className="add-on-top-container">
            <div className="add-on-top">
                <label htmlFor="top">On top:</label>
                <input
                    type="checkbox"
                    id="top"
                    name="top"
                    value={top}
                    onChange={handleTopChange}
                    checked={top}
                />
            </div>
        </div>
    );
}

export default AddOnTop;