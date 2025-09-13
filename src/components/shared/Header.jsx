import React, { useState } from 'react';
import { LuBrainCircuit } from 'react-icons/lu';
import { Link } from 'react-router';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full max-w-7xl flex justify-between items-center py-6 px-4 md:px-8">
      {/* Brand logo and text */}
      <div className="flex items-center space-x-2">
        <LuBrainCircuit size={40} color='#6260ec'/>
        <Link to="/" className="text-xl sm:text-2xl font-bold text-gray-100">
          AI Career Coach
        </Link>
      </div>

      {/* Desktop navigation links (hidden on mobile) */}
      <nav className="hidden md:flex space-x-6">
        {/* Additional links can go here */}
      </nav>

      {/* Desktop and mobile login/signup buttons */}
      <div className="flex items-center space-x-4">
        <Link to="/register" className="hidden md:block px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-full hover:bg-indigo-600 transition-colors duration-300">
          Sign Up
        </Link>
        <Link to="/login" className="px-4 py-2 text-sm font-medium text-indigo-400 border border-indigo-400 rounded-full hover:bg-indigo-400 hover:text-white transition-colors duration-300">
          Login
        </Link>
        {/* Hamburger menu button for mobile */}
        <button id="menu-button" className="md:hidden text-gray-300 hover:text-white focus:outline-none" onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-gray-800 rounded-lg shadow-lg mt-4 transition-all duration-300 ease-in-out z-50 p-4">
          <nav className="flex flex-col items-center py-4 space-y-4">
            <Link to="/login" className="w-full px-4 py-2 text-sm font-medium text-indigo-400 border border-indigo-400 rounded-full hover:bg-indigo-400 hover:text-white transition-colors duration-300 text-center">
              Login
            </Link>
            <Link to="/register" className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-full hover:bg-indigo-600 transition-colors duration-300 text-center">
              Sign Up
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;