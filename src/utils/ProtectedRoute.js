import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { authenticated } = useSelector(state => state.auth);

  if (!authenticated) {
    return <Navigate to="/sign-up" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  children: PropTypes.node
};
