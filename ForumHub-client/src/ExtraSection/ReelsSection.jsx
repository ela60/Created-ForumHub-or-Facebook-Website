import React from "react";

const ReelsSection = () => {
  const videos = [
    {
      id: 1,
      title: "React Introduction Tutorial",
      description: "Learn the basics of React.js and create your first component.",
      thumbnail: "https://via.placeholder.com/640x360/61dafb/333333?text=React+Intro",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 2,
      title: "Java Programming Basics",
      description: "Understand the fundamentals of Java and write your first Java program.",
      thumbnail: "https://via.placeholder.com/640x360/f7f7f7/333333?text=Java+Basics",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 3,
      title: "C++ for Beginners",
      description: "Start learning C++ and get familiar with syntax and basic concepts.",
      thumbnail: "https://via.placeholder.com/640x360/00599C/333333?text=C+++Tutorial",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 4,
      title: "Advanced JavaScript",
      description: "Dive into advanced JavaScript concepts including closures and promises.",
      thumbnail: "https://via.placeholder.com/640x360/f7df1e/333333?text=JavaScript+Advanced",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 5,
      title: "Building Web Apps with Node.js",
      description: "Learn how to use Node.js for backend development and creating web servers.",
      thumbnail: "https://via.placeholder.com/640x360/8cc84b/333333?text=Node.js+Web+Apps",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <h2 className="md:text-3xl text-lg font-semibold mb-6 text-center text-purple-800">---Programming Tutorials---</h2>
      <div className="grid grid-cols-1 mx-4 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {videos.map((video) => (
          <div key={video.id} className="w-full h-80 relative group">
            <div className="w-full h-full rounded-xl overflow-hidden shadow-lg bg-black">
              <video
                className="w-full h-full object-cover"
                src={video.videoUrl}
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-70">
                <h3 className="text-white font-bold text-lg">{video.title}</h3>
                <p className="text-white text-sm">{video.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReelsSection;
