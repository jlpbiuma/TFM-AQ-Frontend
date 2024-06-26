// src/router/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import ViewUnauthorized from "../pages/Unathorized";

const ProtectedRoute = ({ element, requiredRole }) => {
  const token = localStorage.getItem("token");
  const role = parseInt(localStorage.getItem("role"), 10);
  console.log("Role:", role);
  console.log("Required Role:", requiredRole);
  if (!token) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && role < requiredRole) {
    return <ViewUnauthorized />;
  }

  return element;
};

export default ProtectedRoute;
