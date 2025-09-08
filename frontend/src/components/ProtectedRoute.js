// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem("user_id") !== null;
  console.log("isAuthenticated:", isAuthenticated);
  console.log("user_id:", sessionStorage.getItem("user_id"));
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
