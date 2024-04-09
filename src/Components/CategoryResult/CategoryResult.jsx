import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, selectPosts } from "../../redux/posts.slice/posts.slice";
import CategoryResultItem from "./CategoryResultItem";
import "./Category.scss";
import Mainslider from "../Sliders/MainSlider/MainSlider";

export default function CategoryResult() {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const { posts } = useSelector(selectPosts);
  const postPerRow = 15;
  const [next, setNext] = useState(postPerRow);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleMorePosts = () => {
    setNext(next + postPerRow);
  };

  return (
    <>
      <Mainslider />
      <div className="category__container">
        <h1>Posts</h1>
        <div className="favourite__cards">
          {posts?.slice(0, next)?.map((post, index) => {
            if (post.category == categoryId) {
              return <CategoryResultItem key={index} post={post} />;
            }
          })}
        </div>
        {next < posts?.length && (
          <button className="loadMoreBtn" onClick={handleMorePosts}>
            more...
          </button>
        )}
      </div>
    </>
  );
}
