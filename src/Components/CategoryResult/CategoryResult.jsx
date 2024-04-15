import { useParams } from "react-router-dom";
import CategoryResultItem from "./CategoryResultItem";
import useFetch from "../../hooks/useFetch";
import "./Category.scss";
import Mainslider from "../Sliders/MainSlider/MainSlider";
import { useState } from "react";

export default function CategoryResult() {
  const { categoryId } = useParams();
  const postPerRow = 15;
  const [next, setNext] = useState(postPerRow);

  const { data, error, loading } = useFetch(
    `http://127.0.0.1:8000/api/v1/articles/?en_category=${categoryId}`
  );

  const handleMorePosts = () => {
    setNext(next + postPerRow);
  };

  if (error) {
    return <div>Oops there is a mistake</div>;
  }

  return (
    <>
      {loading ? (
        <div>loading data</div>
      ) : (
        <>
          <Mainslider />
          <div className="category__container">
            <h1>Posts</h1>
            <div className="favourite__cards">
              {data.results?.slice(0, next)?.map((post, index) => (
                <CategoryResultItem key={index} post={post} />
              ))}
            </div>
            {next < data?.length && (
              <button className="loadMoreBtn" onClick={handleMorePosts}>
                more...
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
}
