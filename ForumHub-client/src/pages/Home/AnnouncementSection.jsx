import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaBullhorn } from "react-icons/fa";

// Fetch announcements using Axios
const fetchAnnouncements = async () => {
  const { data } = await axios.get("https://bistro-boss-server-eight-cyan.vercel.app/announcements");
  return data;
};

const AnnouncementSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Using useQuery for fetching data
  const {
    data: announcements = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["announcements"],
    queryFn: fetchAnnouncements,
    staleTime: 1000, // 5 minutes caching
    retry: 2,
  });

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (announcements.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === announcements.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [announcements]);

  // Loading and Error States
  if (isLoading) {
    return (
      <div className="text-center text-yellow-600 py-4">
        Loading announcements...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 py-4">
        Error loading announcements: {error.message}
      </div>
    );
  }

  if (announcements.length === 0) {
    return null;
  }

  return (
    <div className="relative  bg-gradient-to-r from-indigo-600 via-purple-700 to-black text-white py-6 px-6 my-6 rounded-xl shadow-lg overflow-hidden">
      <h2 className="text-2xl font-bold  flex items-center mb-4">
        <FaBullhorn className="text-yellow-400 mr-2" /> Announcements
      </h2>

      <div className="transition-transform duration-500 ease-in-out">
        <div
          key={announcements[currentIndex]._id}
          className="p-4 bg-white shadow-md rounded-lg"
        >
          <div>
            <img
              src={announcements[currentIndex].authorImage}
              alt={announcements[currentIndex].authorName}
              className="w-14 h-14 rounded-full border-2 border-purple-500 object-cover"
            />
          </div>
          <h2 className="font-semibold text-2xl text-purple-800">
            {announcements[currentIndex].authorName}
          </h2>
          <h3 className="font-semibold text-lg text-purple-800">
            {announcements[currentIndex].title}
          </h3>
          <p className="text-gray-600 mt-1">
            {announcements[currentIndex].description}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {new Date(
              announcements[currentIndex].createdAt
            ).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
        {announcements.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-yellow-600" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementSection;
