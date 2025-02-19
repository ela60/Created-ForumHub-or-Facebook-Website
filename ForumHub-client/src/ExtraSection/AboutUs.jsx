import React from "react";
import { FaUsers, FaLightbulb, FaHandshake, FaRocket } from "react-icons/fa";

const aboutData = [
  {
    id: 1,
    icon: <FaUsers className="text-4xl text-blue-500" />,
    title: "Who We Are",
    description:
      "A passionate team dedicated to providing innovative and user-friendly solutions for our customers.",
  },
  {
    id: 2,
    icon: <FaLightbulb className="text-4xl text-yellow-500" />,
    title: "Our Vision",
    description:
      "To revolutionize the industry by introducing cutting-edge technology and creative approaches.",
  },
  {
    id: 3,
    icon: <FaHandshake className="text-4xl text-green-500" />,
    title: "Our Values",
    description:
      "We believe in integrity, teamwork, and delivering high-quality results to our clients.",
  },
  {
    id: 4,
    icon: <FaRocket className="text-4xl text-purple-500" />,
    title: "Our Mission",
    description:
      "To empower businesses and individuals with digital solutions that make a real impact.",
  },
];

const AboutUs = () => {
  return (
    <section className="min-h-screen bg-gray-100 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          About <span className="text-purple-800">Us</span>
        </h2>
        <p className="text-gray-600 mt-4 text-lg">
          We are a team of dedicated professionals committed to excellence and innovation.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {aboutData.map((item) => (
          <div
            key={item.id}
            className="bg-purple-300 p-6 rounded-2xl shadow-lg transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="flex justify-center">{item.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mt-4 text-center">
              {item.title}
            </h3>
            <p className="text-gray-600 mt-2 text-center">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;
