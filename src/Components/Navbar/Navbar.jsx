import "./Navbar.css";
import logoImage from "./../../assets/Logo/logo.svg";
import profileImage from "./../../assets/Icons/Profile/Profile.svg";
import savedImage from "./../../assets/Icons/Saved/Saved.svg";

const Navbar = () => {
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
            <img className="header-element" src={profileImage} alt="" />
          </div>
          <ul className="nav-list nav-under">
            <li>
              <a className="nav-link">HOW TO</a>
            </li>
            <li>
              <a className="nav-link">ACCESSORIES</a>
            </li>
            <li>
              <a className="nav-link">SALES</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
