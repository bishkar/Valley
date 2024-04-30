import { useState, useEffect } from "react";
import "./Addcategory.css";
import { getCategory } from "../../../redux/category.slice/getCategory.slice";
import { useDispatch } from "react-redux";
import { use } from "i18next";
import s from "@editorjs/marker";

import { addCategory } from "../../../redux/posts.slice/addcategory.slice";
import { deleteCategory } from "../../../redux/posts.slice/deletecategory.slice";



const Addcategory = ({ setPostData, category }) => {
  const [categories, setCategories] = useState([]);
  const [en_category, setEnCategory] = useState("");
  const [it_category, setItCategory] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory())
      .then((response) => {
        setCategories(response.payload);
      })
      .catch((error) => {
        alert("Error: ", error);
      });
  }, [dispatch]);

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setPostData((prevData) => ({
      ...prevData,
      category: newCategory,
    }));
  };

  let [rendered, setRendered] = useState(false);
  useEffect(() => {
    if (category && !rendered) {
      setPostData((prevData) => ({
        ...prevData,
        category: category,
      }));
      setRendered(true);
    }
  })

  const handleAddCategory = () => {
    const postCategory = {
      en_category: en_category,
      it_category: it_category,
    }

    dispatch(addCategory(postCategory))
  }

  const handleDeleteCategory = () => {
    dispatch(deleteCategory(category))
    console.log(category)
  }


    useEffect(() => {
      if (dispatch(getCategory()) !== categories) {
        dispatch(getCategory())
          .then((response) => {
            setCategories(response.payload);
          })
          .catch((error) => {
            alert("Error: ", error);
          });
      }
    })


  return (
    <div className="addcategory">
      <select onChange={handleCategoryChange}>
        <option value={category}>{category && categories.find(item => item.pk === category)?.en_category}</option>
        {categories.map((item, index) => (
          <option key={index} value={item.pk}>
            {item.en_category} / {item.it_category}
          </option>
        ))}
      </select>
      <input
        type="text"
        className="add-category-input"
        placeholder="Write here new english category"
        onChange={(e) => setEnCategory(e.target.value)}
      />
      <input
        type="text"
        className="add-category-input"
        placeholder="Write here new italian category"
        onChange={(e) => setItCategory(e.target.value)}
      />
      <button className="add-link-button" onClick={() => handleAddCategory()}>Add</button>
      <button className="add-link-button" onClick={() => handleDeleteCategory()}>Delete</button>
    </div>
  );
};

export default Addcategory;
