// NewPostPage.jsx
import Navbar from "../components/Navbar/Navbar.jsx";
import AddImage from "../components/Newpost/Addimage/Addimage.jsx";
import AddTitle from "../components/Newpost/Addtitle/Addtitle.jsx";
import Tags from "../components/Newpost/Addtag/Tags.jsx";
import AddLink from "../components/Newpost/Addlink/Addlink.jsx";
import AddContent from "../components/Newpost/Addcontent/Addcontent.jsx";
import AddContentIT from "../components/Newpost/AddcontentIT/AddcontentIT.jsx";
import Postbutton from "../components/Newpost/Postbutton/Postbutton.jsx";
import Addcategory from "../components/Newpost/Addcategory/Addcategory.jsx";
import { useState } from "react";

import { newPost } from "../redux/posts.slice/newpost.slice.js";
import { useDispatch } from "react-redux";

const NewPostPage = () => {
    const dispatch = useDispatch();

    const [postData, setPostData] = useState({
        en_title: '',
        it_title: '',
        en_content: '',
        it_content: '',
        link_to_product: '',
        images: [],
        category: 0,
        tags: []
    });

    const handlePostDataChange = (updatedData) => {
        setPostData(updatedData);
    };

    const handlePost = () => {
        
        
        if (postData.en_title === '' || postData.it_title === '' || postData.en_content === '' || postData.it_content === '') {
            alert('Please fill all the required fields');
            return;
        }

        dispatch(newPost(postData)).then((response) => {
            if (response.payload) {
                alert('Post created successfully');
            } else if (response.error) {
                alert('Error creating post' + response.error.message);
            }
        })

        console.log(postData);
    };

    return (
        <div>
            <Navbar />
            <h1>New Post</h1>
            <AddImage setPostData={handlePostDataChange} />
            <AddTitle setPostData={handlePostDataChange} placeholder={'Title'} language={'en'}/>
            <AddTitle setPostData={handlePostDataChange} placeholder={'Titolo'} language={'it'}/>
            <Tags setPostData={handlePostDataChange} />
            <Addcategory setPostData={handlePostDataChange} />
            <AddLink setPostData={handlePostDataChange} />
            <AddContent setPostData={handlePostDataChange} />
            <AddContentIT setPostData={handlePostDataChange} />
            <Postbutton handlePost={handlePost} />
        </div>
    );
};

export default NewPostPage;
