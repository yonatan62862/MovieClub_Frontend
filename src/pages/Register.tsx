import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const { register, handleSubmit } = useForm<RegisterForm>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit = (data: RegisterForm) => {
    dispatch(registerUser(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/login");
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-400 to-green-600">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            {...register("username")}
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
          >
            Register
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
