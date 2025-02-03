import React, { useState } from 'react';
import { motion } from 'framer-motion';

const NewPost = () => {
  const [image, setImage] = useState(null);
  const [feeling, setFeeling] = useState('');

  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleFeelingChange = (e) => {
    setFeeling(e.target.value);
  };

  return (
    <section className="px-4 md:px-6 py-8 md:py-12 bg-gradient-to-r from-indigo-600 via-purple-400 to-black text-white">
      <motion.h2 
        className="text-2xl md:text-3xl font-semibold  mb-4 md:mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Create a New Post
      </motion.h2>
      <motion.p 
        className=" mb-6 text-center text-sm md:text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Share your thoughts, photos, videos, or reactions with your friends!
      </motion.p>

      <motion.div 
        className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center mb-4">
          <img 
            src="https://i.ibb.co.com/hfHLh16/Whats-App-Image-2024-10-11-at-9-45-47-PM.jpg" 
            alt="User Profile" 
            className="w-10 h-10 md:w-12 md:h-12 rounded-full mr-3 md:mr-4 border-2 border-blue-400"
          />
          <h3 className="text-sm md:text-lg font-semibold text-gray-800">What's on your mind?</h3>
        </div>

        <textarea
          placeholder="Write something..."
          rows="3"
          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        ></textarea>

        <div className='flex flex-col md:flex-row gap-4 mt-4'>
          <div className="flex-1">
            <label htmlFor="feeling" className="block text-gray-600 mb-1">How are you feeling?</label>
            <select
              id="feeling"
              value={feeling}
              onChange={handleFeelingChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select a feeling</option>
              <option value="Happy">😊 Happy</option>
              <option value="Sad">😢 Sad</option>
              <option value="Excited">😃 Excited</option>
              <option value="Angry">😡 Angry</option>
              <option value="Surprised">😲 Surprised</option>
            </select>
          </div>

          <div className="flex-1">
            <label htmlFor="image-upload" className="block text-gray-600 mb-1">Upload a Photo</label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 border border-gray-300 rounded-lg cursor-pointer"
            />
            {image && (
              <motion.img 
                src={image} 
                alt="Uploaded Preview" 
                className="w-full mt-2 rounded-lg shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </div>
        </div>

        <motion.button
          className="mt-6 w-full py-2 bg-gradient-to-r from-indigo-900 via-purple-800 to-black text-white font-semibold rounded-lg transition-transform transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
        >
          Post
        </motion.button>
      </motion.div>
    </section>
  );
};

export default NewPost;
