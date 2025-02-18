import React from 'react';
import { Link } from 'react-router-dom';

const ExploreTopics = () => {
  const topics = [
    {
      name: 'Technology',
      description: 'Discuss the latest trends in tech, gadgets, and innovations!',
      link: '#',
      image: 'https://i.ibb.co/hgBPcyG/stock-photo-data-science-and-big-data-technology-scientist-computing-analysing-and-visualizing-compl.jpg'
    },
    {
      name: 'Lifestyle',
      description: 'Share tips on living well, health, and personal development.',
      link: '#',
      image: 'https://i.ibb.co/qWDnTd1/istockphoto-1366667952-612x612.jpg'
    },
    {
      name: 'Entertainment',
      description: 'Join discussions about movies, TV shows, music, and pop culture.',
      link: '#',
      image: 'https://i.ibb.co/BZfZ5nd/istockphoto-1324561072-612x612.jpg'
    },
    {
      name: 'Sports',
      description: 'Chat about your favorite teams, players, and the latest matches.',
      link: '#',
      image: 'https://i.ibb.co/Chv2hsT/pg-26-IMG-Academy-Gatorade-Under-Armour.jpg'
    }
  ];

  return (
    <section className="px-6 py-10  bg-gradient-to-r from-indigo-600 via-purple-400 to-black text-white">
      <h2 className="text-3xl font-semibold  mb-6">Explore Topics</h2>
      <p className=" mb-6 text-lg">Dive into our diverse range of topics and join the discussions that matter most to you. Whether you're looking for advice, insights, or just want to connect with others, there's something for everyone.</p>

      {/* Grid Layout: 1 column for small screens, 2 for medium, and 4 for large screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {topics.map((topic, index) => (
          <div key={index} className="p-6 bg-white border rounded-lg shadow-lg hover:shadow-2xl transition-all">
            <div className="mb-4">
              <img src={topic.image} alt={topic.name} className="w-full h-32 object-cover rounded-lg" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{topic.name}</h3>
            <p className="text-gray-500 mb-4">{topic.description}</p>
            {/* <a href={topic.link} className="text-blue-500 hover:underline inline-block">Explore</a> */}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link to="/" className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700">Explore All Topics</Link>
      </div>
    </section>
  );
};

export default ExploreTopics;
