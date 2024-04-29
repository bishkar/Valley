import { useState, useEffect } from "react";
import "./Addcategory.css";
import { getCategory } from "../../../redux/category.slice/getCategory.slice";
import { useDispatch } from "react-redux";
import { use } from "i18next";
import s from "@editorjs/marker";

const Addcategory = ({ setPostData, category }) => {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory())
      .then((response) => {
        setCategories(response.payload);
      })
      .catch((error) => {
        console.log(error);
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

  return (
    <div className="addcategory">
      <select onChange={handleCategoryChange}>
        <option value={category}>{category && categories.find(item => item.pk === category)?.en_category}</option>
        {categories.map((item, index) => (
          <option key={index} value={item.pk}>
            {item.en_category}
          </option>
        ))}
      </select>
      <input
        type="text"
        className="add-link-input"
        placeholder="Write here new category"
      />
      <button className="add-link-button">Add</button>
    </div>
  );
};

export default Addcategory;
