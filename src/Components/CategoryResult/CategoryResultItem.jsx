import { Link } from "react-router-dom";
import "./Category.scss";
import { useTranslation } from "react-i18next";
export default function CategoryResultItem({ post }) {
  const { pk, image_urls, tags_name } = post;
  const { t } = useTranslation();
  return (
    <div className="category__card">
      <Link className="post__more" to={`/articles/${pk}`}>
        <img src={`http://127.0.0.1:8000${image_urls[0]}`} alt="try" />
        <div className="category__body">
          <h4>{t("parameters.postTitle", { data: post })}</h4>
          <ul className="postItem__tagList">
            {tags_name.map((tag, index) => (
              <li key={index}>
                <Link className="post__more" to={`/search/tags/${tag}`}>
                  <p>{tag}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </div>
  );
}
