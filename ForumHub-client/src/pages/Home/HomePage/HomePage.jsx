import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PostCard from '../PostCard/PostCard';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

const HomePage = () => {
  const [posts, setPosts] = useState([]); 
  const [sortByPopularity, setSortByPopularity] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch posts from the server
  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://bistro-boss-server-eight-cyan.vercel.app/posts', {
        params: {
          page: currentPage,
          limit: 5,
          sortBy: sortByPopularity ? 'popularity' : 'newest'
        }
      });

      // Handle the fetched posts
      const fetchedPosts = Array.isArray(response.data.posts) ? response.data.posts : [];
      console.log(fetchedPosts); 
      setPosts(fetchedPosts);
      setTotalPages(response.data.totalPages || 1);  
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]); 
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [sortByPopularity, currentPage]);

  return (
    <div className="container mx-auto p-4">
      {/* Header with Sort by Popularity Button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Forum Posts</h1>
        <button
  onClick={() => setSortByPopularity(!sortByPopularity)}
  className="flex items-center gap-2 bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-900 transition duration-300"
>
  {sortByPopularity ? "Sort by Newest" : "Sort by Popularity"}
  {sortByPopularity ? (
    <FaAngleUp className="text-lg" />
  ) : (
    <FaAngleDown className="text-lg" />
  )}
</button>
      </div>

      {/* List of Posts */}
      {posts.length > 0 ? (
        posts.map((post) => (
          <Link to={`/post/${post._id}`} key={post._id}>
            <PostCard post={post} />
          </Link>
        ))
      ) : (
        <p>No posts available.</p>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
