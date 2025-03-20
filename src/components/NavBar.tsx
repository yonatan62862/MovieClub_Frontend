import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppState } from "../redux/state";
import store from "../redux/store";
import { logout } from "../redux/authSlice";
import AppLogo from "../assets/Logo.png";

const NavBar: React.FC = () => {
  const location = useLocation();
  const { user } = useSelector((appState: AppState) => appState.auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
    store.dispatch(logout());
  };

  return (
    <nav className="bg-white p-2 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <Link
          to={user ? "/" : "/login"}
          className="text-blue-600 text-2xl font-bold flex items-center space-x-2"
        >
          <img
            src={AppLogo}
            alt="App-logo"
            className="h-16 w-auto sm:h-20 lg:h-24 transition-all duration-300"
          />
        </Link>
        <div className="hidden sm:flex space-x-6 items-center">
          {user && (
            <>
              <OutlineNavItem
                to="/"
                label="Home"
                active={location.pathname === "/"}
              />
              <OutlineNavItem
                to="/profile"
                label="Profile"
                active={location.pathname === "/profile"}
              />
              <OutlineNavItem
                to="/ai-assistant"
                label="AI Assistant"
                active={location.pathname === "/ai-assistant"}
              />
              <OutlineNavItem
                to="/about"
                label="About"
                active={location.pathname === "/about"}
              />
              <button
                onClick={handleLogout}
                className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Logout
              </button>
            </>
          )}
        </div>

        <div className="sm:hidden flex items-center">
          <button
            className="text-blue-600 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => {}}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

const OutlineNavItem: React.FC<{ to: string; label: string; active: boolean }> = ({
  to,
  label,
  active,
}) => {
  return (
    <Link
      to={to}
      className={`border border-blue-600 text-blue-600 px-4 py-2 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 
        ${active ? "bg-blue-600 text-white" : "hover:bg-blue-500 hover:text-white"}`}
    >
      {label}
    </Link>
  );
};

export default NavBar;
