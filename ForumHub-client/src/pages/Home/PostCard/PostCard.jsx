import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaThumbsUp, FaCommentAlt, FaShare } from 'react-icons/fa';

const PostCard = ({ post }) => {
  const [commentCount, setCommentCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.voteDifference);

  useEffect(() => {
    const fetchCommentCount = async () => {
      try {
        const response = await axios.get(`https://bistro-boss-server-eight-cyan.vercel.app/posts/${post.postTitle}/comments/count`);
        setCommentCount(response.data.commentCount);
      } catch (error) {
        console.error("Error fetching comment count:", error);
        setCommentCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCommentCount();
  }, [post.postTitle]);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prevCount => liked ? prevCount - 1 : prevCount + 1);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6 border border-gray-200">
      {/* Post Header */}
      <div className="flex items-center p-4">
        <img src={post.authorImage} alt={post.authorName} className="w-12 h-12 rounded-full object-cover" />
        <div className="ml-3">
          <h3 className="font-semibold text-gray-900">{post.authorName}</h3>
          <p className="text-xs text-gray-500">Posted on {new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      
      {/* Post Content */}
      <div className="px-4 pb-4">
        <p className="text-gray-800 text-sm mb-2">{post.postDescription}</p>
        {post.image && (
          <img src={post.image} alt="Post" className="w-full h-60 object-cover rounded-md" />
        )}
      </div>

      {/* Post Actions */}
      <div className="px-4 py-2 border-t border-gray-200">
        <div className="flex justify-between text-gray-600 text-sm">
          <span>{likeCount} Likes</span>
          <span>{loading ? "Loading..." : `${commentCount} Comments`}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-around border-t border-gray-200 text-gray-600">
        <button onClick={handleLike} className={`flex items-center justify-center gap-2 py-2 w-full hover:bg-gray-100 ${liked ? 'text-blue-600' : ''}`}>
          <FaThumbsUp /> Like
        </button>
        <button className="flex items-center justify-center gap-2 py-2 w-full hover:bg-gray-100">
          <FaCommentAlt /> Comment
        </button>
        <button className="flex items-center justify-center gap-2 py-2 w-full hover:bg-gray-100">
          <FaShare /> Share
        </button>
      </div>
    </div>
  );
};

export default PostCard;
