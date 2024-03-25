import logoImage from "./../../assets/Logo/logo.svg"

import "./Footer.css"

const Footer = () => {
    return (
        <div className="container">
            <div className="footer">
                <span className="footer-divider"></span>
                <div className="logo">
                    <img src={logoImage} alt="" />
                </div>
                <span className="footer-divider"></span>
            </div>
        </div>
    )
}

export default Footer;