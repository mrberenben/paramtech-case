import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { authenticated } = useSelector(state => state.auth);

  if (!authenticated) {
    return <Navigate to="/sign-up" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
