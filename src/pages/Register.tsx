import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
import { useState } from "react";
import { authService } from "../services/AuthService";
import Logo from "../assets/Logo.png";

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function Register() {
  useTitle("Register");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterForm>();

  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-8">
          <img
            src={Logo}
            alt="Logo"
            className="w-30 h-20"
          />
        </div>
        <h1 className="text-2xl font-semibold text-center text-gray-500 mt-8 mb-6">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-2 text-sm text-gray-600">First Name</label>
            <input
              {...register("firstName", { required: "First Name is required" })}
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm text-gray-600">Last Name</label>
            <input
              {...register("lastName", { required: "Last Name is required" })}
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm text-gray-600">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email" },
              })}
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm text-gray-600">Password</label>
            <input
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm text-gray-600">Confirm Password</label>
            <input
              {...register("confirmPassword", { required: "Please confirm your password" })}
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <button
            type="submit"
            className="w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm">
            Already have an account? <Link to="/login" className="text-cyan-600">Sign in</Link>
          </p>
        </div>
        <p className="text-xs text-gray-600 text-center mt-8">&copy; 2023 WCS LAT</p>
      </div>
    </div>
  );
}

export default Register;