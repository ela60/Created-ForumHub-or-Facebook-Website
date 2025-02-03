// AnnouncementForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AnnouncementForm = () => {
  const [formData, setFormData] = useState({
    authorImage: '',
    authorName: '',
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://bistro-boss-server-eight-cyan.vercel.app/announcements', {
        authorImage: formData.authorImage,
        authorName: formData.authorName,
        title: formData.title,
        description: formData.description,
        createdAt: new Date().toISOString(),
      });
      Swal.fire('Success', 'Announcement created successfully!', 'success');
      setFormData({ authorImage: '', authorName: '', title: '', description: '' });
    } catch (error) {
      Swal.fire('Error', 'Failed to create announcement', 'error');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400   rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-purple-800">---Create Announcement---</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Author Image URL</label>
          <input
            type="text"
            name="authorImage"
            value={formData.authorImage}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter image URL"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Author Name</label>
          <input
            type="text"
            name="authorName"
            value={formData.authorName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter author name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter announcement title"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter announcement description"
            required
          ></textarea>
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-purple-800 text-white rounded hover:bg-blue-700">
          Create Announcement
        </button>
      </form>
    </div>
  );
};

export default AnnouncementForm;
