import "./Auth.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Logout = () => {
  const { t } = useTranslation();
  const logout = () => {
    localStorage.setItem("loggedIn", false);
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    window.location.href = "/";
  };

  const cancel = () => {
    window.location.href = "/";
  };

  return (
    <div className="logout-form-container">
      <div className="auth-form">
        <h1>Logout?</h1>
        <button className="form-button" onClick={logout}>
          {t("Yes")}
        </button>
        <button className="form-button" onClick={cancel}>
          {t("No")}
        </button>
      </div>
    </div>
  );
};

export default Logout;
