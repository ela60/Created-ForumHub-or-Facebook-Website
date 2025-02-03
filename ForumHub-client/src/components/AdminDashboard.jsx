import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';
import PieChartComponent from './PieChartComponent';
import TagForm from './TagForm';

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState({
    name: '',
    email: '',
    image: '',
    postCount: 0,
    commentCount: 0,
    userCount: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const postsSnapshot = await getDocs(collection(db, 'posts'));
      const commentsSnapshot = await getDocs(collection(db, 'comments'));
      const usersSnapshot = await getDocs(collection(db, 'users'));

      setAdminData({
        name: 'Admin Name',
        email: 'admin@example.com',
        image: '/admin-avatar.png',
        postCount: postsSnapshot.size,
        commentCount: commentsSnapshot.size,
        userCount: usersSnapshot.size,
      });
    };

    fetchData();
  }, []);

  return (
    <div className="p-8">
      {/* Admin Profile */}
      <div className="flex items-center space-x-6 bg-white p-6 rounded-lg shadow-md">
        <img
          src={adminData.image}
          alt="Admin Avatar"
          className="w-24 h-24 rounded-full border-2 border-blue-500"
        />
        <div>
          <h2 className="text-2xl font-semibold">{adminData.name}</h2>
          <p className="text-gray-600">{adminData.email}</p>
          <div className="flex space-x-4 mt-2">
            <p>Posts: {adminData.postCount}</p>
            <p>Comments: {adminData.commentCount}</p>
            <p>Users: {adminData.userCount}</p>
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="mt-8">
        <PieChartComponent
          posts={adminData.postCount}
          comments={adminData.commentCount}
          users={adminData.userCount}
        />
      </div>

      {/* Tag Form */}
      <div className="mt-8">
        <TagForm />
      </div>
    </div>
  );
};

export default AdminDashboard;
