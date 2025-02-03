

// Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-900 via-purple-800 to-black text-white py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between">
          {/* About Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 mb-8">
            <h3 className="text-xl font-semibold mb-4">TalkTrove</h3>
            <p className="text-gray-400 text-sm">
              We are a team of passionate individuals dedicated to bringing you the best experience. Join us in our journey!
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full sm:w-1/2 md:w-1/4 mb-8">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <a href="#home" className="text-gray-400 hover:text-white">Home</a>
              </li>
              <li className="mb-2">
                <a href="#services" className="text-gray-400 hover:text-white">Services</a>
              </li>
              <li className="mb-2">
                <a href="#about" className="text-gray-400 hover:text-white">About</a>
              </li>
              <li className="mb-2">
                <a href="#contact" className="text-gray-400 hover:text-white">Contact</a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 mb-8">
            <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">Stay updated with our latest news. Subscribe to our newsletter!</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 w-full text-gray-900 rounded-l-lg"
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r-lg">Subscribe</button>
            </form>
          </div>

          {/* Social Media Links */}
          <div className="w-full sm:w-1/2 md:w-1/4 mb-8">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook fa-2x"></i>
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter fa-2x"></i>
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram fa-2x"></i>
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-white">
                <i className="fab fa-linkedin fa-2x"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center border-t border-gray-700 pt-6">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Your Company. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};




export default Footer;
