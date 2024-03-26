import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const PostItemPage = () => {
  const { postId } = useParams();
  const { data, error, loading } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  if (error) return <h1 style={{ color: "red" }}>An error!!!</h1>;
  return (
    <div>
      <h1>Detailed Page</h1>
      {loading ? (
        <div>loading data</div>
      ) : (
        <>
          <h2>{data.title}</h2>
          <p>{data.body}</p>
        </>
      )}
    </div>
  );
}

export default PostItemPage;
