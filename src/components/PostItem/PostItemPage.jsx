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
// import { use } from "i18next";

import EditorJS from "@editorjs/editorjs";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Image from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";
import { use } from "i18next";

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
    `https://api.solyver.com/api/v1/articles/${postId}`
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

  let [editor, setEditor] = useState(null);
  let language = localStorage.getItem("i18nextLng");
  let editorBlocks;

  if (language === "en") {
    editorBlocks = data?.en_content;
  } else {
    editorBlocks = data?.it_content;
  }

  useEffect(() => {
    if (!editor && data) {
      editor = new EditorJS({
        holder: "editorjs",
        readOnly: true,
        data: editorBlocks,
        tools: {
          header: {
            class: Header,
            inlineToolbar: ["link"],
            config: {
              placeholder: "Enter a header",
              levels: [2, 3, 4],
              defaultLevel: 3,
            },
          },
          embed: {
            class: Embed,
            inlineToolbar: true,
            config: {
              services: {
                youtube: true,
                coub: true,
              },
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          warning: Warning,
          code: Code,
          linkTool: LinkTool,
          image: {
            class: Image,
            config: {
              endpoints: {
                byFile: "https://api.solyver.com/api/v1/articles/image/upload", // Your backend file uploader endpoint
                byUrl: "https://api.solyver.com/api/v1/articles/image/upload", // Your endpoint that provides uploading by Url
              },
              additionalRequestHeaders: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
              },
            },
          },
          raw: Raw,
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
          table: {
            class: Table,
            inlineToolbar: true,
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
            config: {
              quotePlaceholder: "Enter a quote",
              captionPlaceholder: "Quote's author",
            },
          },
          marker: Marker,
          checklist: {
            class: CheckList,
            inlineToolbar: true,
          },
          delimiter: Delimiter,
          inlineCode: {
            class: InlineCode,
            inlineToolbar: true,
          },
          simpleImage: SimpleImage,
        },
      });
      setEditor(editor);
      console.log(editor);
    }
  }, [editor, data]);



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
                  src={`https://api.solyver.com${data?.image_urls[0]}`}
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
              {data?.image_urls.map((imageObj, idx) => {
                const key = Object.keys(imageObj)[0]; // Отримуємо ключ об'єкта
                const url = imageObj[key]; // Отримуємо URL за ключем
                console.log("image_urls", imageObj, "url", url);
                return (
                  <div
                    key={idx}
                    className={
                      idx === imageIndex
                        ? "slide activeSlide"
                        : "slide deactiveSlide"
                    }
                  >
                    <img
                      src={`https://api.solyver.com${imageObj}`}
                      className="slide__image"
                    />
                  </div>
                );
              })}
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
            {admin && (
              <div className="itemPage__admin">
                <Link className="admin__button" to={`/edit/${postId}`}>
                  {t("Edit")}
                </Link>
                <Link className="admin__button" to={`/delete/${postId}`}>
                  {t("Delete")}
                </Link>
                <Link className="admin__button" to={`/add-to-slider/${postId}`}>
                  {t("Add to slider")}
                </Link>
              </div>
            )}
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
            <div className="itemPage__editor">
              <div id="editorjs"></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PostItemPage;
