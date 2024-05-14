import "./Auth.css";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { changePassword } from "../../redux/auth.slice/restorePassword.slice";
import ErrorMessage from "./Errormessage";
import { useTranslation } from "react-i18next";
const ChangePasswordForm = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    if (password !== password1) {
      setErrors({ password: t("Passwords do not match") });
    } else if (password.length < 6 || password.length > 20) {
      setErrors({
        password: t("Password must be between 6 and 20 characters"),
      });
    } else if (!passwordRegex.test(password)) {
      setErrors({
        password: t(
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
      });
    } else {
      const email = localStorage.getItem("email");
      const restore_token = localStorage.getItem("restore_token");

      const data = {
        restore_token,
        password,
        email,
      };

      dispatch(changePassword(data)).then((response) => {
        if (response.payload) {
          alert(t("Password changed successfully"));
          window.location.href = "/login";
        }
      });

      localStorage.removeItem("email");
      localStorage.removeItem("restore_token");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h1>{t("Change Password")}</h1>
        <label className="form-label" htmlFor="email">
          {t("New password")}
        </label>
        <input
          className="form-input"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="form-label" htmlFor="password">
          {t("Confirm new password")}
        </label>
        <input
          className="form-input"
          type="password"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
        />
        {errors.password && <ErrorMessage message={errors.password} />}

        <button type="submit" className="form-button">
          {t("Change Password")}
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
