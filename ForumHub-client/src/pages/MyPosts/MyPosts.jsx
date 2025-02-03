import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";

const MyPosts = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`https://bistro-boss-server-eight-cyan.vercel.app/posts/user/${user.email}`);
        setPosts(res.data);
        console.log("Fetched Posts:", res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    if (user) fetchPosts();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://bistro-boss-server-eight-cyan.vercel.app/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
      alert("Post deleted successfully");
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const handleCommentRedirect = (id) => {
    navigate(`/dashboard/comments/${id}`);
  };

  return (
    <div className="my-posts-container p-4 sm:p-6 bg-gray-100 rounded-md shadow-md max-w-5xl mx-auto mt-8 sm:mt-12">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center text-purple-800">---My Posts---</h2>
      {posts.length === 0 ? (
        <p className="text-center text-gray-600">You haven't posted anything yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 text-sm sm:text-base">
            <thead>
              <tr className="bg-purple-800 text-white">
                <th className="py-2 px-2 sm:px-4 border-b">Post Title</th>
                <th className="py-2 px-2 sm:px-4 border-b">Votes</th>
                <th className="py-2 px-2 sm:px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id} className="hover:bg-gray-100">
                  <td className="py-2 px-2 sm:px-4 border-b break-words max-w-xs">{post.postTitle}</td>
                  <td className="py-2 px-2 sm:px-4 border-b text-center">{post.upVotes - post.downVotes}</td>
                  <td className="py-2 px-2 sm:px-4 border-b flex flex-col sm:flex-row gap-2 justify-center items-center">
                    <button
                      onClick={() => handleCommentRedirect(post._id)}
                      className="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded w-full sm:w-auto"
                    >
                      💬 Comment
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded w-full sm:w-auto"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyPosts;
