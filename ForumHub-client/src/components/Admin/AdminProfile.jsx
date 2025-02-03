import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Pie } from "react-chartjs-2"; 
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';


ChartJS.register(ArcElement, Tooltip, Legend);

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [newTag, setNewTag] = useState('');

 
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['admin-profile', user?.email],  
    queryFn: async () => {
      if (!user?.email) return null; 
      const res = await axiosSecure.get(`/admin/${user.email}`); 
      return res.data;
    },
    enabled: !!user?.email,  
  });

  // Add a new tag
  const handleAddTag = async () => {
    if (!newTag.trim()) {
      alert('Please enter a valid tag name');
      return;
    }
  
    try {
      await axiosSecure.post('/admin/tags', { name: newTag });
      setNewTag('');
      alert('Tag added successfully!');
    } catch (err) {
      alert('Failed to add tag: ' + (err.response?.data || err.message));
    }
  };
  

  // Handle loading and error states
  if (isLoading) return <div className="text-center text-blue-500">Loading admin profile...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

  // Pie chart data
  const chartData = {
    labels: ['Posts', 'Comments', 'Users'],
    datasets: [
      {
        data: [stats?.forumPostsCount || 0, stats?.commentsCount || 0, stats?.usersCount || 0],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF5A5E', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-6 text-purple-700">---Admin Profile---</h2>

      {/* Admin Profile Section */}
      <div className="flex flex-col items-center mb-6 p-4 bg-white shadow-lg rounded-lg">
        <img
          src={stats?.photoURL || 'https://via.placeholder.com/150'}
          alt="Admin"
          className="w-24 h-24 rounded-full mb-4"
        />
        <h3 className="text-xl font-medium">{stats?.name || 'Admin'}</h3>
        <p className="text-gray-600">{stats?.email || 'No email available'}</p>
        <p className="text-gray-600">Users Count: {stats?.usersCount || 0}</p>
        <p className="text-gray-600">Posts Count: {stats?.forumPostsCount || 0}</p>
        <p className="text-gray-600">Comments Count: {stats?.commentsCount || 0}</p>
      </div>

      {/* Pie Chart */}
      <div className="mb-6 p-4 bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-medium text-center mb-4 text-purple-700">--Site Stats (Pie Chart)--</h3>
        <Pie data={chartData} />
      </div>

      {/* Add Tag Form */}
      <div className="mb-6 p-4 bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-medium text-center mb-4 text-purple-700">---Add a Tag---</h3>
        <div className="mb-4">
          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="Enter new tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
        </div>
        <button
          onClick={handleAddTag}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Tag
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;
