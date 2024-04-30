// Postbutton.jsx

import "./Postbutton.css";

const Postbutton = ({ handlePost, postData }) => {
    const handleClick = () => {
        handlePost();
    };

    return (
        <div className="postbutton">
            <button onClick={handleClick}>Post</button>
        </div>
    );
};

export default Postbutton;
