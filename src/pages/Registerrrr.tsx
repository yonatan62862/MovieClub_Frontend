import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/AuthService";
import { useTitle } from "../hooks/useTitle";

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Register = () => {
  useTitle("Register");
  const { register, handleSubmit } = useForm<RegisterForm>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    setError(null);
    try {
      await authService.register(data);
      navigate("/profile");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-400 to-green-600">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="First Name"
            {...register("firstName")}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            placeholder="Last Name"
            {...register("lastName")}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
          />
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-500 font-semibold hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
