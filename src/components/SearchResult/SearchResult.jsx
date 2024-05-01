import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function SearchResult({ item }) {
  const { t } = useTranslation();
  return (
    <div className="category__card">
      <Link className="post__more" to={`/articles/${item.pk}`}>
        <img src={`https://api.solyver.com${item.image_urls[0]}`} alt="try" />
        <div className="category__body">
          <h4>{t("parameters.postTitle", { data: item })}</h4>
        </div>
      </Link>
      <ul className="postItem__tagList">
        {item.tags_name.map((tag, index) => (
          <li key={index}>
            <Link className="post__more" to={`/search/tags/${tag}`}>
              <p>{tag}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
