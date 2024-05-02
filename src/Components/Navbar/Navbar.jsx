import "./Navbar.css";
import logoImage from "./../../assets/Logo/logo.svg";
// import profileImage from "./../../assets/Icons/Profile/Profile.svg";
import { LiaHomeSolid } from "react-icons/lia";
import savedImage from "./../../assets/Icons/Saved/Saved.svg";
import loginImage from "./../../assets/Icons/Profile/Login.svg";
import logoutImage from "./../../assets/Icons/Profile/Logout.svg";
import addImage from "./../../assets/Icons/Add/add.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategory,
  selectCategory,
} from "../../redux/category.slice/category.slice";
import CategoryItem from "../Category/CategoryItem";
import { Link } from "react-router-dom";
import i18n from "../../../i18n";
import useAuth from "../../hooks/useAuth";
import { isAdminUser } from "../../redux/auth.slice/token.slice";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const dispatch = useDispatch();
  const { category } = useSelector(selectCategory);
  const [searchTerm, setSearchTerm] = useState("");
  const [showRightHeader, setShowRightHeader] = useState(false);
  const { t } = useTranslation();

  let loggedIn = useAuth();
  let currentLanguage = localStorage.getItem("i18nextLng");

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        (!event.target.closest(".hamburger") &&
          !event.target.closest(".right-header")) ||
        event.target.closest(".right-header")
      ) {
        setShowRightHeader(false);
        setIsChecked(false);
      }
    };
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  const handleToggleRightHeader = () => {
    setShowRightHeader(!showRightHeader);
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  if (loggedIn === null || loggedIn === "false" || loggedIn === false) {
    loggedIn = false;
  } else {
    loggedIn = true;
  }
  if (currentLanguage === null || currentLanguage === false) {
    currentLanguage = "it";
  }
  const [language, setLanguage] = useState(currentLanguage);

  function getCurrentLanguage() {
    const nextLanguage = language === "it" ? "en" : "it";
    i18n.changeLanguage(nextLanguage);
    setLanguage(() => nextLanguage);
  }

  return (
    <div className="container">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav__top">
            <div className="nav-header">
              <label className="hamburger" htmlFor="toggleRightHeader">
                <input
                  type="checkbox"
                  id="toggleRightHeader"
                  checked={isChecked}
                  onChange={handleToggleRightHeader}
                />
                <svg viewBox="0 0 32 32">
                  <path
                    className="line line-top-bottom"
                    d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                  ></path>
                  <path className="line" d="M7 16 27 16"></path>
                </svg>
              </label>
              <p className="nav__title">{t("Enjoy yourself with Solyver")}</p>
              <input
                type="text"
                className="nav-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm === "" ? (
                ""
              ) : (
                <Link to={`/search/result/${searchTerm}`}>
                  <svg
                    className="search__icon"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85a1.007 1.007 0 00-.115-.1zM12 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" />
                  </svg>
                </Link>
              )}
            </div>
            <div className="logo">
              <Link to="/">
                <img src={logoImage} className="logo-image" alt="" />
              </Link>
            </div>
            <div
              className={`right-header ${showRightHeader ? "show" : "hide"}`}
            >
              <a
                className="header-element language"
                onClick={getCurrentLanguage}
              >
                {language == "it" ? "Italian" : "English"}
              </a>
              {isAdminUser() && (
                <>
                  <Link to="/edit-slider">
                    <div className="header-element plus-element">
                      <p>Slider</p>
                    </div>
                  </Link>

                  <Link to="/new-post">
                    <div className="header-element plus-element">
                      <img src={addImage} alt="" />
                      <span>Add Post</span>
                    </div>
                  </Link>
                </>
              )}
              <Link to="/">
                <div className="header-element home-element">
                  <LiaHomeSolid className="react__img" />
                  <span>{t("Home")}</span>
                </div>
              </Link>
              {loggedIn ? (
                <>
                  <Link to="/favourites">
                    <div className="header-element">
                      <img src={savedImage} alt="" />
                      <span>{t("Favourites")}</span>
                    </div>
                  </Link>
                  <Link to="/logout">
                    <div className="header-element">
                      <img src={logoutImage} alt="" />
                      <span>{t("Log Out")}</span>
                    </div>
                  </Link>
                </>
              ) : (
                <Link to="/login">
                  <div className="header-element">
                    <img src={loginImage} alt="" />
                    <span>{t("Log In")}</span>
                  </div>
                </Link>
              )}
            </div>
          </div>
          <div className="nav-under">
            <ul className="nav-list">
              {category?.slice(0, 3)?.map((item, index) => (
                <li key={index}>
                  <CategoryItem key={item.pk} category={item} />
                </li>
              ))}
            </ul>
            <ul className="nav-list">
              {category?.slice(3, 6)?.map((item, index) => (
                <li key={index}>
                  <CategoryItem key={item.pk} category={item} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
