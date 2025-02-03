import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../providers/AuthProvider';

const PostDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);  
  const isLoggedIn = !!user;

  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch the post and comments
  useEffect(() => {
    const fetchPostDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://bistro-boss-server-eight-cyan.vercel.app/post/${id}`);
        setPost(response.data);
        setUpvotes(response.data.upvotes ?? 0);
        setDownvotes(response.data.downvotes ?? 0);

        const commentResponse = await axios.get(`https://bistro-boss-server-eight-cyan.vercel.app/comments/${id}`);
        setComments(commentResponse.data);
      } catch (error) {
        console.error('Error fetching post details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [id]);

  // Handle upvote
  const handleUpvote = async () => {
    if (!isLoggedIn) {
      Swal.fire('Error!', 'Please log in to upvote.', 'error');
      return;
    }

    try {
      await axios.patch(`https://bistro-boss-server-eight-cyan.vercel.app/post/${id}/upvote`);
      setUpvotes((prev) => (prev ?? 0) + 1);
    } catch (error) {
      console.error('Error upvoting:', error);
    }
  };

  // Handle downvote
  const handleDownvote = async () => {
    if (!isLoggedIn) {
      Swal.fire('Error!', 'Please log in to downvote.', 'error');
      return;
    }

    try {
      await axios.patch(`https://bistro-boss-server-eight-cyan.vercel.app/post/${id}/downvote`);
      setDownvotes((prev) => (prev ?? 0) + 1);
    } catch (error) {
      console.error('Error downvoting:', error);
    }
  };

  // Handle comment submission
  const handleCommentSubmit = async () => {
    if (!isLoggedIn) {
      Swal.fire('Error!', 'Please log in to comment.', 'error');
      return;
    }

    if (!comment.trim()) return;

    try {
      await axios.post('https://bistro-boss-server-eight-cyan.vercel.app/comments', {
        id,
        comment,
        user: user.displayName || 'Anonymous',
      });

      setComments([...comments, { comment }]);
      setComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const shareUrl = `https://bistro-boss-server-eight-cyan.vercel.app/post/${id}`;

  if (loading) return <div className="text-center text-xl">Loading post details...</div>;

  return (
    <div className="container mx-auto p-6 py-6">
      {post ? (
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
          {/* Post Content */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src={post.authorImage || 'default-image.jpg'}
              alt={post.authorName || 'Unknown'}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-3xl font-semibold text-gray-900">{post.postTitle}</h2>
              <p className="text-lg text-gray-600">{post.authorName}</p>
              <p className="text-sm text-gray-500">
                {new Date(post.postTime).toLocaleString()}
              </p>
            </div>
          </div>
          <p className="text-xl text-gray-800 mb-4">{post.postDescription}</p>
          <div className="text-lg text-gray-500">Tag: <span className="font-semibold">{post.tag}</span></div>

          {/* Vote Buttons */}
          <div className="flex items-center gap-6 mt-4">
            <button onClick={handleUpvote} className="flex items-center gap-2 text-lg text-blue-500 hover:text-blue-700">
              <FaThumbsUp className="text-xl" /> {upvotes}
            </button>
            <button onClick={handleDownvote} className="flex items-center gap-2 text-lg text-red-500 hover:text-red-700">
              <FaThumbsDown className="text-xl" /> {downvotes}
            </button>
          </div>

          {/* Share Button */}
          <div className="mt-6">
            <h4 className="text-xl font-semibold text-gray-900">Share this post:</h4>
            <FacebookShareButton url={shareUrl} className="mt-2">
              <FacebookIcon size={40} round />
            </FacebookShareButton>
          </div>

          {/* Comment Section */}
          <div className="mt-8">
            {isLoggedIn ? (
              <>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write a comment..."
                />
                <button
                  onClick={handleCommentSubmit}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Comment
                </button>
              </>
            ) : (
              <p className="text-lg text-gray-600">Please log in to comment.</p>
            )}

            {/* Display Comments */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-900">Comments:</h4>
              {comments.length > 0 ? (
                <ul className="mt-4 space-y-4">
                  {comments.map((comment, index) => (
                    <li key={index} className="border-b border-gray-200 py-2">{comment.comment}</li>
                  ))}
                </ul>
              ) : (
                <p>No comments yet.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-600">Post not found.</p>
      )}
    </div>
  );
};

export default PostDetail;
