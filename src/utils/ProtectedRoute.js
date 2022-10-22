import { useLocation, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const auth = true;

  if (!auth) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
