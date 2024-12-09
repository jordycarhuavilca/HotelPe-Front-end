import { Navigate, useLocation } from "react-router-dom";
import ApiService from "./ApiService";
import PropTypes from "prop-types";

export const ProtectedRoute = ({ element: Component }) => {
  const location = useLocation();

  return ApiService.isAuthenticated() ? (
    Component
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export const AdminRoute = ({ element: Component }) => {
  const location = useLocation();

  return ApiService.isAdmin() ? (
    Component
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

// Validación de PropTypes
AdminRoute.propTypes = {
  element: PropTypes.element.isRequired,
};
