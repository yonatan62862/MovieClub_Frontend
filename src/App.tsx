import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AIAssistant from "./pages/AIAssistant";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Page404 from "./pages/Page404";
import Register from "./pages/Register";
import Profile from "./pages/UserProfile";
import ProtectedRoute from "./components/ProtectedRoute";

type IRoute = {
  path: string;
  element: React.JSX.Element;
};

const App: React.FC = () => {
  const ROUTES: IRoute[] = [
    { element: <Login />, path: "/login" },
    { element: <Register />, path: "/register" },
    { element: <Page404 />, path: "*" },
  ];

  return (
    <>
      <NavBar />
      <Routes>
        {ROUTES.map(({ element, path }) => (
          <Route
            key={path}
            path={path}
            element={element}
          />
        ))}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/ai-assistant"
            element={<AIAssistant />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
