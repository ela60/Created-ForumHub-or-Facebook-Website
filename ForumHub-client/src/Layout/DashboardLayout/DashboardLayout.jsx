import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaUser, FaUsersCog, FaFlag, FaBullhorn, FaHome, FaAd } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import useAdmin from "../../hooks/useAdmin";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext); 

  // TODO: Replace this with real admin status from the database
  const [isAdmin] = useAdmin(); 

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
    {/* Sidebar */}
    <div className="w-full sm:w-64 bg-gradient-to-r from-indigo-900 via-purple-800 to-black text-white p-4">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">Dashboard</h2>
  
      {isAdmin ? (
        <div className="space-y-2 sm:space-y-4">
          <Link to="admin-profile" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            <FaUser /> Admin Profile
          </Link>
          <Link to="manage-users" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            <FaUsersCog /> Manage Users
          </Link>
          <Link to="reported-activities" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            <FaFlag /> Reported Activities
          </Link>
          <Link to="make-announcement" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            <FaBullhorn /> Make Announcement
            </Link>
            <Link to="profile" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            <FaUser /> My Profile
          </Link>
          <Link to="add-post" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            <FaBullhorn /> Add Post
          </Link>
          <Link to="my-posts" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            <FaFlag /> My Posts
          </Link>
         
        </div>
      ) : (
        <div className="space-y-2 sm:space-y-4">
          <Link to="profile" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            <FaUser /> My Profile
          </Link>
          <Link to="add-post" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            <FaBullhorn /> Add Post
          </Link>
          <Link to="my-posts" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            <FaFlag /> My Posts
          </Link>
         
        </div>
      )}
  
      {/* Shared Links */}
      <div className="divider my-4"></div>
      <Link to="/" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
        <FaHome /> Home
      </Link>
      <Link to="dashboard/join-us" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
        <FaAd /> Join Us
      </Link>
    </div>
  
    {/* Content Area */}
    <div className="flex-1 bg-gray-100 p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">
        Welcome to your Dashboard, {user ? user.displayName : "User"}
      </h1>
      <Outlet />
    </div>
  </div>
  
  );
};

export default DashboardLayout;
