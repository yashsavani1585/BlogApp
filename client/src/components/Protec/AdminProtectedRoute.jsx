import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AminProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    // Redirect to Login page if user is not authenticated
    return <Navigate to="Admin-login" />;
  }

  return children;
};

export default AminProtectedRoute;
