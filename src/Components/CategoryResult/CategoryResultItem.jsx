import { Link } from "react-router-dom";
import "./Category.scss";

export default function CategoryResultItem({ post }) {
  const { pk, en_title, image_urls, tags_name } = post;

  return (
    <div className="category__card">
      <Link className="post__more" to={`/articles/${pk}`}>
        <img src={`http://127.0.0.1:8000${image_urls[0]}`} alt="try" />
        <div className="category__body">
          <h4>{en_title}</h4>
          <ul className="postItem__tagList">
            {tags_name.map((tag, index) => (
              <li key={index}>
                <p>{tag}</p>
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </div>
  );
}
