import { useNavigate } from "react-router-dom";
import "./Page404.css";

function Page404() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-500 bg-fixed bg-cover bg-center error-bg">
      <div className="container">
        <div className="row">
          <div className="col-sm-8 offset-sm-2 text-gray-50 text-center mt-10 sm:mt-20 md:mt-32 lg:mt-12">
            <div className="relative">
              <h1 className="relative text-9xl tracking-tighter-less text-shadow font-sans font-bold">
                <span>4</span>
                <span>0</span>
                <span>4</span>
              </h1>
              <span className="absolute top-0 -ml-12 text-gray-300 font-semibold">
                Oops..{" "}
              </span>
            </div>
            <h5 className="text-gray-300 font-semibold mt-3">
              {" "}
              Page Not Found !{" "}
            </h5>
            <p className="text-gray-100 mt-2 mb-6">
              We're sorry, the requested page isn't available{" "}
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => navigate("/")}
                className="bg-green-400 px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-50 rounded-full hover:shadow-lg"
              >
                Back To Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page404;
