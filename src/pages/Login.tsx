import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/AuthService";
import { useTitle } from "../hooks/useTitle";
import { GoogleLogin } from '@react-oauth/google';


interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  useTitle("Login");
  const { register, handleSubmit } = useForm<LoginForm>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setError(null);
    try {
      await authService.login(data);
      navigate("/Home");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
      console.error("Login Error:", err.response?.data || err);
    }
    setLoading(false);
  };

  return (
    <div className="font-sans">
      <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100">
        <div className="relative sm:max-w-sm w-full">
          <div className="card bg-blue-400 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"></div>
          <div className="card bg-red-400 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>
          <div className="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
            <label className="block mt-3 text-sm text-gray-700 text-center font-semibold">
              Login
            </label>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
              {error && <p className="text-red-500 text-center mb-4">{error}</p>}
              <div>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Email Address"
                  className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>
              <div className="mt-7">
                <input
                  {...register("password")}
                  type="password"
                  placeholder="Password"
                  className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>
              <div className="mt-7 flex">
                <label className="inline-flex items-center w-full cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-200"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <div className="w-full text-right">
                  <a className="underline text-sm text-gray-600 hover:text-gray-900" href="#">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div className="mt-7">
                <button
                  type="submit"
                  className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
              <div className="flex mt-7 items-center text-center">
                <hr className="border-gray-300 border-1 w-full rounded-md" />
                <label className="block font-medium text-sm text-gray-600 w-full">Sign in with</label>
                <hr className="border-gray-300 border-1 w-full rounded-md" />
              </div>
              <div className="flex mt-7 justify-center w-full">
                <button className="mr-5 bg-blue-500 px-4 py-2 rounded-xl text-white shadow-xl hover:shadow-inner transition duration-500 transform hover:-translate-x hover:scale-105">
                  Facebook
                </button>
                <GoogleLogin
                onSuccess={() => {
                   window.location.href = "http://localhost:3000/api/auth/google";
                    }}
                    onError={() => {
                       console.log('Google login failed');
                       }}
                       />
              </div>
              <div className="mt-7 flex justify-center items-center">
                <label className="mr-2">Don't have an account yet?</label>
                <Link
                  to="/register"
                  className="text-blue-500 transition duration-500 transform hover:-translate-x hover:scale-105"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
