import "./Navbar.css";
import logoImage from "./../../assets/Logo/logo.svg";
import profileImage from "./../../assets/Icons/Profile/Profile.svg";
import savedImage from "./../../assets/Icons/Saved/Saved.svg";
import loginImage from "./../../assets/Icons/Profile/Login.svg";
import logoutImage from "./../../assets/Icons/Profile/Logout.svg";
// import settingsImage from "./../../assets/Icons/Profile/Settings.svg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategory,
  selectCategory,
} from "../../redux/category.slice/category.slice";
import CategoryItem from "../Category/CategoryItem";

import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const { category } = useSelector(selectCategory);
  let loggedIn = localStorage.getItem("loggedIn");

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  if (loggedIn === null || loggedIn === "false") {
    loggedIn = false;
  } else {
    loggedIn = true;
  }

  console.log(loggedIn);

  return (
    <div className="container">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-header">
            <input type="text" className="nav-input" />
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
          <div className="nav-header .right-header">
            <a className="header-element language">IT / ENG</a>
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
