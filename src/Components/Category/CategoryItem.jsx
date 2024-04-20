import { Link } from "react-router-dom";

export default function CategoryItem({ category }) {
  return (
    <>
      <Link to={`/category/${category.en_category}`}>
        <p className="nav-link">{category.en_category}</p>
      </Link>
    </>
  );
}
