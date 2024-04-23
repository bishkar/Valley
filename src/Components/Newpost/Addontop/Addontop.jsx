import "./Addontop.css";

import React, { useState } from "react";

const AddOnTop = ({ setPostData }) => {
    const [top, setTop] = useState("");

    const handleTopChange = (e) => {
        const newTop = e.target.checked;
        setTop(newTop);
        setPostData((prevData) => ({
            ...prevData,
            top: newTop,
        }));
        console.log(newTop);
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
                />
            </div>
        </div>
    );
}

export default AddOnTop;