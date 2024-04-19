import "./Categorydiv.css";
import { useTranslation } from "react-i18next";

const Categorydiv = ({ category }) => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <div className="category-div">
        <h1>{t("HOT")}</h1>
      </div>
    </div>
  );
};

export default Categorydiv;
