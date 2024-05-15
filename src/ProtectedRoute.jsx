import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, isAllowed, redirectPath = "/login" }) => {
  return isAllowed ? element : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
