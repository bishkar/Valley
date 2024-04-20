import "./Footer.css";

import logoImage from "./../../assets/Logo/logo.svg";
import instagramImage from "./../../assets/Icons/Social/Instagram.svg";
import facebookImage from "./../../assets/Icons/Social/Facebook.svg";
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="footer">
        <div className="footer-divider">
          <p>You can write us a letter</p>
          <div className="divider-content">
            <p>{t("You can write us a letter")}</p>
            <Link>
              <img src={instagramImage} alt="" className="footer-image" />
            </Link>
            <Link>
              <img src={facebookImage} alt="" className="footer-image" />
            </Link>
          </div>
        </div>
        <div className="logo">
          <img src={logoImage} alt="" />
        </div>
        <div className="footer-divider">
          <p>{t("We are waiting for feedback:")}</p>
          <a href="" className="footer-link">
            navejo7441@mnsaf.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
