import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import "./PostItem.scss";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { fetchStats, makeClick } from "../../redux/posts.slice/clicks.slice";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { TiArrowBack } from "react-icons/ti";
import { isAdminUser } from "../../redux/auth.slice/token.slice";
import { useNavigate } from "react-router-dom";

const PostItemPage = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { postId } = useParams();
  const { t } = useTranslation();
  const admin = isAdminUser();
  const { clicks } = useSelector((state) => state.clicks);
  const isFetching = useRef(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("down");

  const { data, error, loading } = useFetch(
    `http://127.0.0.1:8000/api/v1/articles/${postId}`
  );

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const st = window.scrollY || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      lastScrollTop = st <= 0 ? 0 : st;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (admin) {
      dispatch(fetchStats(postId));
    }
  }, [dispatch, postId, admin]);

  function handleClcik() {
    if (!isFetching.current) {
      dispatch(makeClick(postId));
      isFetching.current = true;
    }
  }

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <FaArrowLeft />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <FaArrowRight />
      </div>
    );
  };

  const settings = {
    centerMode: true,
    infinite: true,
    slidesToShow: 1,
    autoplay: true,
    focusOnSelect: true,
    autoplaySpeed: 3000,
    speed: 600,
    rows: 1,
    vertical: true,
    verticalSwiping: true,
    slidesPerRow: 1,
    centerPadding: "0px",
    variableHeight: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
  };

  if (error) return <h1 style={{ color: "red" }}>An error!!!</h1>;
  return (
    <div className="itemPage__container">
      {loading ? (
        <div>{t("loading data")}</div>
      ) : (
        <>
          <div className="postSlider__container">
            {isMobile && (
              <>
                <img
                  src={`http://127.0.0.1:8000${data?.image_urls[0]}`}
                  className="slide__image"
                />
                {/* <button onClick={() => navigate(-1)}> */}
                <TiArrowBack
                  className="arrowBackPage"
                  onClick={() => navigate(-1)}
                />
                {/* </button> */}
              </>
            )}
            <Slider {...settings}>
              {data?.image_urls.map((image, idx) => (
                <div
                  key={idx}
                  className={
                    idx === imageIndex
                      ? "slide activeSlide"
                      : "slide deactiveSlide"
                  }
                >
                  <img
                    src={`http://127.0.0.1:8000${image}`}
                    className="slide__image"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className={`itemPage__body ${scrollDirection}`}>
            <h2 className="itemPage__title">
              {t("parameters.postTitle", { data })}
              {admin && <span>({clicks})</span>}
            </h2>
            <ul className="itemPage__tagList">
              {data?.tags_name.map((tag, index) => (
                <li key={index}>
                  <Link className="post__more" to={`/search/tags/${tag}`}>
                    <p>{tag}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="link__to__product">
              <p>
                {t("Link to the product: ")}
                <Link
                  to={data.link_to_product}
                  target="_blank"
                  onClick={handleClcik}
                >
                  {data.link_to_product}
                </Link>
              </p>
            </div>
            <p className="itemPage__content">
              {t("parameters.postContent", { data })}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default PostItemPage;
