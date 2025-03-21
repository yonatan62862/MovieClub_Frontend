import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const location = useLocation();

  const isLoggedIn = localStorage.getItem("accessToken") !== null;

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />; 
};

export default ProtectedRoute;
