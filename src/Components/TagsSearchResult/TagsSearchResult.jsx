import { Link } from "react-router-dom";

export default function TagsSearchResult({ item }) {
  return (
    <div className="category__card">
      <Link className="post__more" to={`/articles/${item.pk}`}>
        <img src={`http://127.0.0.1:8000${item.image_urls[0]}`} alt="try" />
        <div className="category__body">
          <h4>{item.en_title}</h4>
          <ul className="postItem__tagList">
            {item.tags_name.map((tag, index) => (
              <li key={index}>
                <Link as="li" className="post__more" to={`/search/tags/${tag}`}>
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
