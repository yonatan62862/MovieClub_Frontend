import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppState } from "../redux/state";
import store from "../redux/store";
import { logout } from "../redux/authSlice";

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
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to={user ? "/" : "/login"}
          className="text-white text-2xl font-bold"
        >
          MovieClub 🎬
        </Link>
        <div className="flex space-x-6">
          {user && (
            <>
              <NavItem
                to="/"
                label="Home"
                active={location.pathname === "/"}
              />
              <NavItem
                to="/profile"
                label="Profile"
                active={location.pathname === "/profile"}
              />
              <NavItem
                to="/ai-assistant"
                label="AI Assistant"
                active={location.pathname === "/ai-assistant"}
              />
              <button
                onClick={handleLogout}
                className="text-white px-4 py-2 hover:text-gray-300 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

// Reusable NavItem Component
const NavItem: React.FC<{ to: string; label: string; active: boolean }> = ({
  to,
  label,
  active,
}) => {
  return (
    <Link
      to={to}
      className={`text-white px-4 py-2 ${
        active ? "bg-blue-800 rounded-md" : "hover:text-gray-300"
      }`}
    >
      {label}
    </Link>
  );
};

export default NavBar;
