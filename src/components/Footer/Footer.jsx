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
          <p>{t("You can write us a letter")}</p>
          <div className="divider-content">
            <Link
              to={
                "https://www.instagram.com/solyver__shop?igsh=N29kMzU3amo3NG10&utm_source=qr"
              }
              target="_blank"
            >
              <img src={instagramImage} alt="" className="footer-image" />
            </Link>
            <Link
              to={"https://www.facebook.com/profile.php?id=61559616841695"}
              target="_blank"
            >
              <img src={facebookImage} alt="" className="footer-image" />
            </Link>
          </div>
        </div>
        <div className="logo">
          <img src={logoImage} alt="" />
        </div>
        <div className="footer-divider">
          <p>{t("We are waiting for feedback:")}</p>
          <a href="mailto: solyver@outlook.it" className="footer-link">
            solyver@outlook.it
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
