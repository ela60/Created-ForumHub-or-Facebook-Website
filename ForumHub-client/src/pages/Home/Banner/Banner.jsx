import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

const Banner = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: searchResults = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: async () => {
      if (searchTerm.trim() === "") return [];
      const res = await axios.get(`https://bistro-boss-server-eight-cyan.vercel.app/search?query=${searchTerm}`);
      return res.data || [];
    },
    enabled: false,
  });

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      refetch();
    }
  };

  const carouselItems = [
    {
      id: 1,
      title: "Join Vibrant Discussions",
      description: "Engage with the community and share your thoughts!",
      image: "https://i.ibb.co.com/ypzkrdQ/stock-photo-data-science-and-big-data-technology-scientist-computing-analysing-visualizing-compl.jpg",
    },
    {
      id: 2,
      title: "Discover Trending Topics",
      description: "Stay updated with the latest discussions.",
      image: "https://i.ibb.co.com/wcK6XXF/1682491756860.png",
    },
    {
      id: 3,
      title: "Connect with Like-Minded People",
      description: "Expand your network and make new friends!",
      image: "https://i.ibb.co.com/DfJdjcj/1-TIocb-P0-Hq-No-AE0av-BNPRQ.png",
    },
  ];

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Carousel Banner */}
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={4000}
        showDots={true}
        className="h-full"
      >
        {carouselItems.map((item) => (
          <motion.div
            key={item.id}
            className="w-full h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${item.image})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="bg-gradient-to-b from-black/70 to-transparent p-8 rounded-lg text-center text-white">
              <h2 className="text-5xl font-extrabold drop-shadow-md mb-4 animate-pulse">
                {item.title}
              </h2>
              <p className="text-xl italic text-gray-300">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </Carousel>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg animate-bounce">
          🌐 Explore ForumHub
        </h1>
        <p className="text-xl mb-8 max-w-xl">
          Discover trending topics and engage with the community by exploring tags below.
        </p>

        {/* Search Bar */}
        <div className="flex w-full max-w-md sm:max-w-lg">
          <input
            type="text"
            placeholder="Search by tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow px-4 py-2 rounded-l-md text-gray-800 shadow-lg focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSearch}
            disabled={searchTerm.trim() === ""}
            className={`px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white rounded-r-md shadow-md transition-transform transform hover:scale-105 ${
              searchTerm.trim() === "" ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isFetching ? <FaSearch className="animate-spin" /> : <FaSearch />}
          </button>
        </div>

        {/* Search Results */}
        <div className="mt-10 w-full max-w-6xl">
          {isFetching && <p>Loading results...</p>}
          {!isFetching && searchResults.length === 0 && searchTerm && <p>No results found.</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {searchResults.map((post) => (
              <motion.div
                key={post._id}
                className="bg-white/90 backdrop-blur-md p-5 rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center mb-3">
                  <img src={post.authorImage} alt="Author" className="w-10 h-10 rounded-full mr-3" />
                  <h2 className="text-lg font-semibold text-gray-800">{post.postTitle}</h2>
                </div>
                <p className="text-gray-600 line-clamp-3">{post.postDescription}</p>
                <div className="mt-2 text-sm text-blue-500">Tags: {post.tag}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
