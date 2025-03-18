import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/AuthService";
import { useTitle } from "../hooks/useTitle";

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
      navigate("/profile");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
      console.error("Login Error:", err.response?.data || err);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-600">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign In
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 font-semibold hover:underline"
          >
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
