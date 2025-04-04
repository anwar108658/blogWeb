import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="container mx-auto px-6 grid md:grid-cols-4 sm:grid-cols-2 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
          <p className="text-sm">Welcome to our blog! We share insights, tutorials, and stories on web development, design, and technology.</p>
        </div>

        {/* Categories Section */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Categories</h3>
          <ul className="text-sm space-y-2">
            <li><a href="#" className="hover:text-white">Web Development</a></li>
            <li><a href="#" className="hover:text-white">Design</a></li>
            <li><a href="#" className="hover:text-white">AI & Tech</a></li>
            <li><a href="#" className="hover:text-white">Tutorials</a></li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="text-sm space-y-2">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white text-xl"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>
      
      {/* Copyright Section */}
      <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} Your Blog Name. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer