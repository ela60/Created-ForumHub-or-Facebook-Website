import React, { useContext } from "react";

import { Navigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const MoreInfo = () => {
  const { user } = useContext(AuthContext);

  // Redirect to login if user is not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-4xl font-bold text-yellow-400 mb-4">More Info</h1>
      <p className="text-lg text-gray-300 max-w-3xl text-center">
        Welcome to <span className="text-yellow-300 font-semibold">FacebookUI</span> or{" "}
        <span className="text-yellow-300 font-semibold">FromHub</span>! 
        Our platform is designed to provide users with an intuitive and engaging social experience. 
        Whether you're looking for the latest discussions, polls, or trending topics, we've got you covered!
      </p>

      <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg text-center">
        <h2 className="text-2xl font-semibold text-yellow-400">Why Choose Us?</h2>
        <ul className="mt-4 text-gray-300 text-left">
          <li>✅ Intuitive and modern user interface</li>
          <li>✅ Seamless community interactions</li>
          <li>✅ Exclusive membership benefits</li>
          <li>✅ Stay updated with trending discussions</li>
        </ul>
      </div>

      <div className="mt-6">
        <a href="/" className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-full shadow-lg hover:bg-yellow-500 transition-transform hover:scale-105">
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default MoreInfo;
