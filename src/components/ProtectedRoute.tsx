import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { AppState } from "../redux/state";

const ProtectedRoute: React.FC = () => {
  const { isAutenticated } = useSelector((appState: AppState) => appState.auth);

  if (!isAutenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
