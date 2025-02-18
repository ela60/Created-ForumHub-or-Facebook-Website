import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="max-w-lg text-center p-8 rounded-3xl shadow-2xl bg-gray-950 border border-gray-700">
        {/* Unique 404 Illustration */}
        <div className="relative w-full">
          <span className="text-9xl font-extrabold text-gray-600">404</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl font-bold mt-6">Oops! Page Not Found</h2>
        <p className="text-gray-400 mt-2">
          The page you are looking for doesn't exist or an error occurred.
        </p>

        {/* Home Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 bg-red-500 text-white rounded-full text-lg font-semibold shadow-md hover:bg-red-600 transition transform hover:scale-105"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
