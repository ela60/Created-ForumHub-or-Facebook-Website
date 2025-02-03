import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaMedal } from 'react-icons/fa';

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [membershipStatus, setMembershipStatus] = useState('');
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/membership-status?email=${user.email}`)
        .then(res => {
          setMembershipStatus(res.data.membership);
        })
        .catch(err => console.error('Membership fetch error:', err));

      axiosSecure.get(`/posts/recent?email=${user.email}&limit=3`)
        .then(res => setRecentPosts(res.data))
        .catch(err => console.error('Posts fetch error:', err));
    }
  }, [user, axiosSecure]);

  const Badge = ({ type }) => {
    const badgeStyle = type === 'Gold' 
      ? 'bg-yellow-400 text-white' 
      : 'bg-orange-400 text-white';

    return (
      <div className={`flex items-center px-3 py-1 rounded-full ${badgeStyle}`}>
        <FaMedal className="mr-1" />
        {type} Badge
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
        <img 
          src={user?.photoURL || '/default-profile.png'} 
          alt="Profile" 
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-300" 
        />
        <div className="text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-semibold">{user?.displayName || 'User'}</h2>
          <p className="text-gray-600 text-sm sm:text-base">{user?.email}</p>
          <p className="text-gray-500 text-xs sm:text-sm">Membership Status: {membershipStatus}</p>

          <div className="flex justify-center sm:justify-start space-x-2 mt-2">
            {membershipStatus === 'Gold' ? (
              <Badge type="Gold" />
            ) : (
              <Badge type="Bronze" />
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center text-purple-800">---My Recent Posts---</h3>
        {recentPosts.length > 0 ? (
          <ul className="space-y-4">
            {recentPosts.map(post => (
              <li key={post._id} className="p-3 sm:p-4 bg-gray-100 rounded-md shadow-sm">
                <div className="flex items-center mb-2">
                  <img 
                    src={post.authorImage || '/default-profile.png'} 
                    alt={post.authorName} 
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2"
                  />
                  <div>
                    <h4 className="text-sm sm:text-lg font-semibold">{post.postTitle}</h4>
                    <p className="text-gray-500 text-xs">{post.tag || 'No Tag'}</p>
                  </div>
                </div>

                <p className="text-gray-600 text-xs sm:text-sm mb-2">
                  {post.postDescription.length > 100 
                    ? `${post.postDescription.slice(0, 100)}...` 
                    : post.postDescription}
                </p>

                <p className="text-gray-500 text-xs">Posted on: {new Date(post.createdAt).toLocaleString()}</p>

                <div className="flex items-center space-x-2 mt-2">
                  <button className="text-green-500 text-sm sm:text-base">👍 {post.upVotes || 0}</button>
                  <button className="text-red-500 text-sm sm:text-base">👎 {post.downVotes || 0}</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
