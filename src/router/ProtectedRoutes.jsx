// src/router/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  return token ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
