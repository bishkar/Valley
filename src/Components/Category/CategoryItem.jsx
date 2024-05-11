import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CategoryItem({ category }) {
  const { t } = useTranslation();

  return (
    <>
      <Link to={`/category/${category.pk}`}>
        <p className="nav-link">{t("parameters.categoryName", { category })}</p>
      </Link>
    </>
  );
}
