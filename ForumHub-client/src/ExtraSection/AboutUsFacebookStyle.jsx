import React from "react";
import { FaUtensils, FaTshirt, FaLaptop, FaHeart } from "react-icons/fa";

const categories = [
  {
    id: 1,
    title: "Delicious Food",
    description: "We offer a variety of mouth-watering dishes crafted with love. 🍔🍕",
    icon: <FaUtensils className="text-red-500 text-4xl" />,
    image: "https://c8.alamy.com/comp/2T5WMMP/brunch-table-setting-with-different-delicious-food-in-restaurant-2T5WMMP.jpg",
  },
  {
    id: 2,
    title: "Trendy Fashion",
    description: "Stay stylish with our latest fashion trends for every season. 👗👕",
    icon: <FaTshirt className="text-blue-500 text-4xl" />,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfKKpsk-84cqSPAhLisuom2xLdzB0SnegG-Q&s",
  },
  {
    id: 3,
    title: "Latest Technology",
    description: "Bringing you cutting-edge gadgets and tech innovations. 💻📱",
    icon: <FaLaptop className="text-green-500 text-4xl" />,
    image: "https://www.simplilearn.com/ice9/free_resources_article_thumb/Technology_Trends.jpg",
  },
  {
    id: 4,
    title: "Our Passion",
    description: "Passion drives us to create the best products for you. ❤️🔥",
    icon: <FaHeart className="text-purple-500 text-4xl" />,
    image: "https://www.stonebridge.uk.com/blog/wp-content/uploads/2016/02/Follow-your-passion.jpg",
  },
];

const AboutUsFacebookStyle = () => {
  return (
    <section className=" bg-gray-100 md:-mt-16 md:mb-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          <span className="text-purple-800">New for You</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
              <div className="flex justify-center">{category.icon}</div>
              <h3 className="text-xl font-semibold text-center mt-4">{category.title}</h3>
              <p className="text-gray-600 text-center mt-2">{category.description}</p>
              <img src={category.image} alt={category.title} className="w-full h-40 mt-4 rounded-lg object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsFacebookStyle;
