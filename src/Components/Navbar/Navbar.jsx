import "./Navbar.css";
import logoImage from "./../../assets/Logo/logo.svg";
import profileImage from "./../../assets/Icons/Profile/Profile.svg";
import savedImage from "./../../assets/Icons/Saved/Saved.svg";
import loginImage from "./../../assets/Icons/Profile/Login.svg";
import logoutImage from "./../../assets/Icons/Profile/Logout.svg";
import settingsImage from "./../../assets/Icons/Profile/Settings.svg";

import { Link } from "react-router-dom";

const Navbar = () => {
  let loggedIn = localStorage.getItem("loggedIn");

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
            <li>
              <a className="nav-link">HAIR</a>
            </li>
            <li>
              <a className="nav-link">SKINCARE</a>
            </li>
            <li>
              <a className="nav-link">MAKEUP</a>
            </li>
          </ul>
        </div>

        <div className="logo">
          <img src={logoImage} alt="" />
        </div>

        <div className="nav-container">
          <div className="nav-header .right-header">
            <a className="header-element language">IT / ENG</a>
            <img className="header-element" src={savedImage} alt="" />
            {loggedIn ? (
              <>
                <img className="header-element" src={profileImage} alt="" />
                {/* 
                   if user is admin, show settings icon
                   <img className="header-element" src={settingsImage} alt="" /> 
                 */}
                <Link to="/logout">
                  <img
                    className="header-element"
                    src={logoutImage}
                    alt=""
                  />
                  </Link>
              </>
            ) : (
              <Link to="/login">
                <img
                  className="header-element"
                  src={loginImage}
                  alt=""
                />
              </Link>
            )}

          </div>
          <ul className="nav-list nav-under">
            <li>
              <a className="nav-link">SUNSCREEN</a>
            </li>
            <li>
              <a className="nav-link">VITAMINS</a>
            </li>
            <li>
              <a className="nav-link">PERFUME</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
