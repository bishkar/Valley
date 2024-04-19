import "./Navbar.css";
import logoImage from "./../../assets/Logo/logo.svg";
import profileImage from "./../../assets/Icons/Profile/Profile.svg";
import savedImage from "./../../assets/Icons/Saved/Saved.svg";
import loginImage from "./../../assets/Icons/Profile/Login.svg";
import logoutImage from "./../../assets/Icons/Profile/Logout.svg";
// import settingsImage from "./../../assets/Icons/Profile/Settings.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategory,
  selectCategory,
} from "../../redux/category.slice/category.slice";
import CategoryItem from "../Category/CategoryItem";
import { Link } from "react-router-dom";
import i18n from "../../../i18n";

const Navbar = () => {
  const dispatch = useDispatch();
  const { category } = useSelector(selectCategory);
  const [searchTerm, setSearchTerm] = useState("");

  let loggedIn = localStorage.getItem("loggedIn");

  let currentLanguage = localStorage.getItem("i18nextLng");
  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  if (loggedIn === null || loggedIn === "false") {
    loggedIn = false;
  } else {
    loggedIn = true;
  }
  if (currentLanguage === null || currentLanguage === false) {
    currentLanguage = "it";
  }
  const [language, setLanguage] = useState(currentLanguage);
  let nextLanguage = currentLanguage === "it" ? "en" : "it";
  console.log(nextLanguage);
  console.log(loggedIn);

  function getCurrentLanguage() {
    const nextLanguage = language === "it" ? "en" : "it";
    i18n.changeLanguage(nextLanguage);
    setLanguage(() => nextLanguage);
  }

  return (
    <div className="container">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-header">
            <input
              type="text"
              className="nav-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm === "" ? (
              console.log("enter the text")
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
          <ul className="nav-list nav-under">
            {category?.slice(0, 3)?.map((item, index) => (
              <li key={index}>
                <CategoryItem key={item.pk} category={item} />
              </li>
            ))}
          </ul>
        </div>

        <div className="logo">
          <Link to="/">
            <img src={logoImage} className="logo-image" alt="" />
          </Link>
        </div>

        <div className="nav-container">
          <div className="nav-header right-header">
            <a className="header-element language" onClick={getCurrentLanguage}>
              {language == "it" ? "Italian" : "English"}
            </a>
            {loggedIn ? (
              <>
                <Link to="/favourites">
                  <img className="header-element" src={savedImage} alt="" />
                </Link>
                <img className="header-element" src={profileImage} alt="" />
                {/* 
                   if user is admin, show settings icon
                   <img className="header-element" src={settingsImage} alt="" /> 
                 */}
                <Link to="/logout">
                  <img className="header-element" src={logoutImage} alt="" />
                </Link>
              </>
            ) : (
              <Link to="/login">
                <img className="header-element" src={loginImage} alt="" />
              </Link>
            )}
          </div>
          <ul className="nav-list nav-under">
            {category?.slice(3, 6)?.map((item, index) => (
              <li key={index}>
                <CategoryItem key={item.pk} category={item} />
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
