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
import AddOnTop from "../components/Newpost/Addontop/Addontop.jsx";
import TranslateButton from "../components/Newpost/TranslateButton/Translatebutton.jsx";

import { useState } from "react";

import { newPost } from "../redux/posts.slice/newpost.slice.js";
import { pushPost } from "../redux/posts.slice/pushpost.slice.js";
import { translate } from "../redux/posts.slice/translate.slice.js";
import { useDispatch } from "react-redux";
import { useRef } from "react";

const NewPostPage = () => {
  const dispatch = useDispatch();

  const [translatedBlocks, setTranslatedBlocks] = useState([]);

  const [postData, setPostData] = useState({
    en_title: "",
    it_title: "",
    en_content: "",
    it_content: "",
    link_to_product: "",
    images: [],
    category: 0,
    article_tags: [],
    on_top: false,
  });

  const handlePostDataChange = (updatedData) => {
    setPostData(updatedData);
  };

  const handlePost = async () => {
    const nonSerializableImage = postData.images.find(
      (image) => !(image instanceof File)
    );
    if (nonSerializableImage) {
      alert("Images must be serializable (File objects)");
      return;
    }

    if (
      postData.en_title === "" ||
      postData.it_title === "" ||
      postData.en_content === "" ||
      postData.it_content === ""
    ) {
      alert("Please fill all the required fields");
      return;
    }

    try {
      const newPostData = await dispatch(newPost(postData));
      console.log(newPostData);
      dispatch(pushPost(newPostData.payload));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleTranslateClick = async () => {
    const translateData = postData.it_content.blocks;
    console.log(translateData);

    try {
      const translatedData = await dispatch(translate(translateData)).then(
        (res) => {
          setTranslatedBlocks(res.payload);
          console.log("rs.payload", res.payload);
          console.log("postData", postData);
        }
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1>New Post</h1>
      <AddImage setPostData={handlePostDataChange} />
      <AddTitle
        setPostData={handlePostDataChange}
        placeholder={"Title"}
        language={"en"}
      />
      <AddTitle
        setPostData={handlePostDataChange}
        placeholder={"Titolo"}
        language={"it"}
      />
      <Tags setPostData={handlePostDataChange} />
      <Addcategory setPostData={handlePostDataChange} />
      <AddLink setPostData={handlePostDataChange} />
      <AddContentIT setPostData={handlePostDataChange} />
      <TranslateButton handleTranslate={handleTranslateClick} />
      <AddContent
        setPostData={handlePostDataChange}
        translatedBlocks={translatedBlocks}
      />
      <AddOnTop setPostData={handlePostDataChange} />
      <Postbutton handlePost={handlePost} />
    </div>
  );
};

export default NewPostPage;
