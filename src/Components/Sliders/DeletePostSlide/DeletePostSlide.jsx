import "./DeletePostSlide.css";

import useFetch from "../../../hooks/useFetch";
import { useDispatch } from "react-redux";

import { deleteSlide } from "../../../redux/posts.slice/deletefromslider.slice";

const DeletePostSlide = () => {
  const dispatch = useDispatch();

  const { data, error, loading } = useFetch(
    `https://api.solyver.com/api/v1/slider`
  );

  const handleDelete = (id) => {
    dispatch(deleteSlide(id));
    window.location.reload();
  };

  return (
    <div>
      <h1>Delete Post Slide</h1>
      {error ? <h1 style={{ color: "red" }}>An error!!!</h1> : null}
      {loading ? <h1>loading</h1> : null}

      <div className="slides-container">
        {data &&
          data.map((item) => (
            <div className="slide-big_image" key={item.id}>
              <img src={item.big_image} alt="" />
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DeletePostSlide;
