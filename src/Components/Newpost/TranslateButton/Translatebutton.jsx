import h from "@editorjs/simple-image";
import "./Translatebutton.css";

import React, { useState } from "react";
import { useDispatch } from "react-redux";

const TranslateButton = ({ handleTranslate }) => {
    const [translate, setTranslate] = useState("");

    const dispatch = useDispatch();

    const handleClick = () => {
        handleTranslate();
    }



    return (
        <div className="translate-button-container">
            <div className="translate-button">
                <button onClick={handleTranslate}>
                    Translate
                </button>
            </div>
        </div>
    );
}

export default TranslateButton;