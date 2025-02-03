import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBell, FaBars, FaTimes, FaCrown } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const [announcementCount, setAnnouncementCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get('https://bistro-boss-server-eight-cyan.vercel.app/announcements');
        setAnnouncementCount(res.data.length);
      } catch (err) {
        console.error('Error fetching announcements:', err);
      }
    };
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = () => {
    logOut()
      .then(() => console.log("Logged out successfully"))
      .catch((error) => console.error(error));
  };

  const navLinkStyle = (path) =>
    location.pathname === path
      ? "text-yellow-300 font-bold border-b-2 border-yellow-300"
      : "hover:text-yellow-300 transition-colors";

  return (
     <nav className="bg-gradient-to-r from-indigo-900 via-purple-800 to-black text-white py-4 px-6 shadow-md sticky top-0 z-50 ">
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 hover:scale-110 transition-transform">
          <FaCrown className="text-yellow-400 text-3xl md:-ml-5 animate-pulse" />
          <span className="text-2xl md:text-lg md:mr-4 font-extrabold tracking-widest">TalkTrove</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 ">
          <Link to="/" className={navLinkStyle("/")}>Home</Link>
          <Link to="/explore-topics" className={navLinkStyle("/explore-topics")}>Explore Topics</Link>
          <Link to="/new-posts" className={navLinkStyle("/new-posts")}>New Posts</Link>
          <Link to="/polls-surveys" className={navLinkStyle("/polls-surveys")}>Polls & Surveys</Link>
          <Link to="/membership" className={navLinkStyle("/membership")}>Membership</Link>
          <div className="relative group">
            <FaBell className="text-2xl md:mr-4  cursor-pointer group-hover:text-yellow-300 animate-bounce" />
            {announcementCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5 animate-ping md:mr-4">
                {announcementCount}
              </span>
            )}
          </div>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes className="text-3xl" /> : <FaBars className="text-3xl" />}
          </button>
        </div>

        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-gradient-to-b from-indigo-700 to-purple-800 text-white shadow-md md:hidden animate-slide-in">
            {["/", "/explore-topics", "/new-posts", "/polls-surveys", "/membership"].map((path, index) => (
              <Link
                key={index}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={`block px-6 py-3 hover:bg-purple-700 ${navLinkStyle(path)}`}
              >
                {path === "/" ? "Home" : path.replace("/", "").replace("-", " ")}
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/dashboard" className="block px-6 py-3 hover:bg-purple-700 ">Dashboard</Link>
                <button onClick={handleLogOut} className="w-full text-left px-6 py-3 hover:bg-purple-700 text-red-400">Logout</button>
              </>
            ) : (
              <Link to="/login" className="block px-6 py-3 hover:bg-purple-700">Join Us</Link>
            )}
          </div>
        )}

        <div className="hidden md:block">
          {!user ? (
            <Link to="/login" className="bg-yellow-400 text-gray-900 py-2 px-6 rounded-full shadow-lg hover:bg-yellow-500 transition-transform hover:scale-105">
              Join Us
            </Link>
          ) : (
            <div className="relative">
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="Profile"
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 rounded-full cursor-pointer border-4 border-yellow-300 shadow-lg hover:scale-105 transition-transform"
              />
              {isOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border rounded-xl shadow-xl py-3 z-10 animate-fade-in">
                  <div className="px-5 py-2 text-gray-700 font-semibold">{user.displayName}</div>
                  <Link to="/dashboard" className="block bg-yellow-400 px-5 py-2 rounded hover:bg-yellow-500">Dashboard</Link>
                  <button onClick={handleLogOut} className="w-full text-left px-5 py-2 hover:bg-gray-100 text-red-500">Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
