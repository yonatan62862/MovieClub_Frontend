import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
import { useState } from "react";
import { authService } from "../services/AuthService";
import InputField from "../components/InputField";

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
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
    <div className="h-screen md:flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-blue-400 justify-around items-center hidden">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">
            Welcome to Movie Club!
          </h1>
          <p className="text-white mt-1">Already have an account?</p>
          <Link to={"/login"}>
            <button className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold">
              Sign in
            </button>
          </Link>
        </div>
      </div>
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <form
          className="w-full max-w-md bg-white p-6 shadow-md rounded-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-gray-800 font-bold text-2xl mb-1">
            Create an Account
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-5">
            Join Movie Club today!
          </p>
          <InputField
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            register={register("firstName", {
              required: "First Name is required",
            })}
            error={errors.firstName?.message}
          />
          <InputField
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            register={register("lastName", {
              required: "Last Name is required",
            })}
            error={errors.lastName?.message}
          />
          <InputField
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            register={register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Enter a valid email address",
              },
            })}
            error={errors.email?.message}
          />
          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            register={register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={errors.password?.message}
          />
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <button
            type="submit"
            className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 transition duration-200 ease-in-out hover:bg-indigo-700 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-sm mt-3">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
