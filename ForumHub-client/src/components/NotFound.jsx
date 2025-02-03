import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mt-2">Oops! Page Not Found</h2>
        <p className="text-gray-500 mt-4">The page you're looking for might have been moved or doesn't exist anymore.</p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
