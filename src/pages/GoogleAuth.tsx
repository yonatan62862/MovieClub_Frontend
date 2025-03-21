import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

const GoogleAuth = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = params.get("token");
    const refreshToken = params.get("refresh");

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      dispatch(login({
        email: "user@gmail.com",
        firstName: "Google",
        lastName: "User",
      }));

      navigate("/Home");
    } else {
      navigate("/login");
    }
  }, []);
  
  return <div>Logging in with Google...</div>;
};

export default GoogleAuth;
