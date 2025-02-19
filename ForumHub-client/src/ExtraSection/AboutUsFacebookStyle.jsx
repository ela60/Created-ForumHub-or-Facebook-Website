import React from "react";
import { FaUtensils, FaTshirt, FaLaptop, FaHeart } from "react-icons/fa";

const categories = [
  {
    id: 1,
    title: "Delicious Food",
    description: "We offer a variety of mouth-watering dishes crafted with love. 🍔🍕",
    icon: <FaUtensils className="text-red-500 text-4xl" />,
    image: "https://source.unsplash.com/400x300/?food,restaurant",
  },
  {
    id: 2,
    title: "Trendy Fashion",
    description: "Stay stylish with our latest fashion trends for every season. 👗👕",
    icon: <FaTshirt className="text-blue-500 text-4xl" />,
    image: "https://source.unsplash.com/400x300/?fashion,clothes",
  },
  {
    id: 3,
    title: "Latest Technology",
    description: "Bringing you cutting-edge gadgets and tech innovations. 💻📱",
    icon: <FaLaptop className="text-green-500 text-4xl" />,
    image: "https://source.unsplash.com/400x300/?technology,laptop",
  },
  {
    id: 4,
    title: "Our Passion",
    description: "Passion drives us to create the best products for you. ❤️🔥",
    icon: <FaHeart className="text-purple-500 text-4xl" />,
    image: "https://source.unsplash.com/400x300/?love,passion",
  },
];

const AboutUsFacebookStyle = () => {
  return (
    <section className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          About <span className="text-blue-500">Us</span>
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
