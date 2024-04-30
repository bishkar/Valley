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

import { editPost } from "../redux/posts.slice/edit.slice.js";
import { translate } from "../redux/posts.slice/translate.slice.js";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch.js"
import { useEffect } from "react";

const EditPostPage = () => {
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

  const { postId } = useParams();
  
  const { data, error, loading } = useFetch(
    `http://127.0.0.1:8000/api/v1/articles/${postId}/`
  );

    useEffect(() => {
        if (data) {
            setPostData({
                id: data.pk,
                en_title: data.en_title,
                it_title: data.it_title,
                en_content: data.en_content,
                it_content: data.it_content,
                link_to_product: data.link_to_product,
                images: data.image_urls,
                category: data.category,
                article_tags: data.tags_name,
                on_top: data.on_top,
            });
        }
    }, [data]);

  const handlePostDataChange = (updatedData) => {
    setPostData(updatedData);
  };

  const handlePost = async () => {
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
      dispatch(editPost(postData));
      alert("Post edited successfully");
      window.location.href = `/`;
    } catch (error) {
      alert("Error:", error);
    }
  };

  const handleSetTranslatedBlocks = () => {
    setTranslatedBlocks([]);
  }

  const handleTranslateClick = async () => {
    const translateData = postData.it_content.blocks;

    try {
      const translatedData = await dispatch(translate(translateData)).then(
        (res) => {
          setTranslatedBlocks(res.payload);
        }
      )
    } catch (error) {
      alert("Error:", error);
    }
  };

  return (
    <div>
      <h1>Edit Post</h1>
      <AddImage setPostData={handlePostDataChange} oldImages={postData.images}/>
      <AddTitle
        setPostData={handlePostDataChange}
        placeholder={"Title"}
        language={"en"}
        oldTitle={postData.en_title}
      />
      <AddTitle
        setPostData={handlePostDataChange}
        placeholder={"Titolo"}
        language={"it"}
        oldTitle={postData.it_title}
      />
      <Tags setPostData={handlePostDataChange} tags={postData.article_tags}/>
      <Addcategory setPostData={handlePostDataChange} category={postData.category}/>
      <AddLink setPostData={handlePostDataChange} oldLink={postData.link_to_product}/>
      <AddContentIT setPostData={handlePostDataChange} blocks={postData.it_content}/>
      <TranslateButton handleTranslate={handleTranslateClick} />
      <AddContent
        setPostData={handlePostDataChange}
        translatedBlocks={translatedBlocks}
        handleSetTranslatedBlocks={handleSetTranslatedBlocks}
        blocks={postData.en_content}
      />
      <AddOnTop setPostData={handlePostDataChange} onTop={postData.on_top}/>
      <Postbutton handlePost={handlePost} />
    </div>
  );
};

export default EditPostPage;
