import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const TagsSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tags, setTags] = useState([]);

  // Fetch Tags
  const { data: tagResults = [], isFetching: isTagFetching, error } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const res = await axios.get('https://bistro-boss-server-eight-cyan.vercel.app/tags');
      return res.data || [];
    },
    enabled: true,
  });

  useEffect(() => {
    if (error) {
      console.error('Error fetching tags:', error);
    }
  }, [error]);

  useEffect(() => {
    if (Array.isArray(tagResults) && tagResults.length > 0) {
      setTags(tagResults);
    }
  }, [tagResults]);

  // Fetch Posts based on tag
  const { data: searchResults = [], refetch, isFetching } = useQuery({
    queryKey: ['search', searchTerm],
    queryFn: async () => {
      if (searchTerm.trim() === '') return [];
      const res = await axios.get(`https://bistro-boss-server-eight-cyan.vercel.app/posts?tag=${searchTerm}`);
      return res.data || [];
    },
    enabled: false,
  });

  const handleTagClick = (tagName) => {
    setSearchTerm(tagName);
    refetch();
  };

  return (
    <div className="bg-gradient-to-b from-gray-100 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-800 mb-6">
          🌐 Explore TalkTrove
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover trending topics and engage with the community by exploring tags below.
        </p>

        {/* Tags Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Browse by Tags</h2>

          {isTagFetching ? (
            <p className="text-gray-500">Loading tags...</p>
          ) : tags.length === 0 ? (
            <p className="text-gray-500">No tags available.</p>
          ) : (
            <div className="flex flex-wrap justify-center gap-3">
              {tags.map((tag, index) => (
                <button
                  key={index}
                  onClick={() => handleTagClick(tag.tag)}
                  className="px-4 py-2 rounded-full  bg-gradient-to-r from-indigo-600 via-purple-600 to-black text-white hover:bg-orange-200 hover:text-orange-800 transition-all duration-200 shadow-sm text-sm sm:text-base"
                >
                  #{tag.tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Results Section */}
        <div className="mt-10">
          {isFetching && <p className="text-gray-500">Loading results...</p>}
          {!isFetching && searchResults.length === 0 && searchTerm && (
            <p className="text-gray-500">No results found for "<strong>{searchTerm}</strong>".</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((post) => (
              <div
                key={post._id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {post.postTitle}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {post.postDescription}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-blue-600">#{post.tag}</span>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>👍 {post.upvotes}</span>
                    <span>👎 {post.downvotes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagsSection;
