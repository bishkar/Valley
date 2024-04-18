// Postbutton.jsx

import "./Postbutton.css";

const Postbutton = ({ handlePost, postData }) => {
    const handleClick = () => {
        console.log("Post", postData);
        handlePost();
    };

    return (
        <div className="postbutton">
            <button onClick={handleClick}>Post</button>
        </div>
    );
};

export default Postbutton;
