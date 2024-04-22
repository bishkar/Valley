import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryResultItem from "./CategoryResultItem";
import "./Category.scss";
import Mainslider from "../Sliders/MainSlider/MainSlider";
import { useTranslation } from "react-i18next";
import {
  searchArticles,
  selectArticles,
} from "../../redux/articleSearch.slice/articleSearch.slice";

export default function CategoryResult() {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const { articles, error } = useSelector(selectArticles);
  const { t } = useTranslation();
  const postPerRow = 6;
  const [next, setNext] = useState(postPerRow);
  const [allArticles, setAllArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(
      searchArticles(
        `http://127.0.0.1:8000/api/v1/articles/?page=${currentPage}&?category_id=${categoryId}`
      )
    );
  }, [dispatch, categoryId, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    setNext(postPerRow);
  }, []);

  useEffect(() => {
    if (articles?.results && articles?.results?.length > 0) {
      if (currentPage === 1) {
        setAllArticles([...articles.results]);
      } else {
        setAllArticles((prevPosts) => {
          const newPosts = articles.results.filter((post) => {
            return !prevPosts.some((prevPost) => prevPost.pk === post.pk);
          });
          return [...prevPosts, ...newPosts];
        });
      }
    }
  }, [articles.results, currentPage]);

  const handleMorePosts = () => {
    if (next >= allArticles.length) {
      setCurrentPage(currentPage + 1);
      setNext(next + postPerRow);
    } else {
      setNext(next - 2 + postPerRow);
    }
  };

  if (error) {
    return <div>{t("Oops there is a mistake")}</div>;
  }

  return (
    <>
      <Mainslider />
      <div className="category__container">
        <h1>{t("Posts")}</h1>
        <div className="favourite__cards">
          {allArticles?.slice(0, next)?.map((post, index) => (
            <CategoryResultItem key={index} post={post} />
          ))}
        </div>
        {next < articles?.count && (
          <button className="loadMoreBtn" onClick={handleMorePosts}>
            {t("more...")}
          </button>
        )}
      </div>
    </>
  );
}
