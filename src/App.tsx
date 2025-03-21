import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import AIAssistant from "./pages/AIAssistant";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Page404 from "./pages/Page404";
import Profile from "./pages/UserProfile";
import Register from "./pages/Register";
import About from "./pages/About";
import GoogleAuth from "./pages/GoogleAuth";

const App: React.FC = () => {
  const ROUTES = [
    { element: <Login />, path: "/login" },
    { element: <Register />, path: "/register" },
    { element: <GoogleAuth />, path: "/google-auth" },
    { element: <About />, path: "/about" },
    { element: <Page404 />, path: "*" }
  ];

  return (
    <>
      <NavBar />
      <Routes>
        {ROUTES.map(({ element, path }) => (
          <Route key={path} path={path} element={element} />
        ))}
        <Route element={<ProtectedRoute />}>
          <Route path="/Home" element={<Home />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
