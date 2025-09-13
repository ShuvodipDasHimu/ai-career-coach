import React, { useState } from 'react';
import { LuBrainCircuit } from 'react-icons/lu';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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

      {/* Desktop navigation and buttons (visible on md screens and up) */}
      <div className="hidden md:flex items-center space-x-4">
        {/* Additional links can go here */}
        <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-full hover:bg-indigo-600 transition-colors duration-300">
          Sign Up
        </Link>
        <Link to="/login" className="px-4 py-2 text-sm font-medium text-indigo-400 border border-indigo-400 rounded-full hover:bg-indigo-400 hover:text-white transition-colors duration-300">
          Login
        </Link>
      </div>

      {/* Hamburger menu button for mobile */}
      <button 
        id="menu-button" 
        className="md:hidden text-gray-300 hover:text-white focus:outline-none z-50" 
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <FaBars className="h-6 w-6" />
      </button>

      {/* Mobile Menu - Full-screen overlay */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out" 
          onClick={toggleMenu} // Allows closing by clicking outside the menu
        >
          {/* Background overlay */}
          <div className="absolute inset-0 bg-gray-900 bg-opacity-70"></div>
          
          {/* Menu content */}
          <div className="relative w-80 ml-auto bg-gray-800 h-full p-6 shadow-2xl flex flex-col items-center">
            {/* Close button */}
            <button 
              onClick={toggleMenu} 
              className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none"
              aria-label="Close menu"
            >
              <FaTimes className="h-6 w-6" />
            </button>
            
            {/* Mobile navigation links */}
            <nav className="flex flex-col items-center py-4 space-y-4 w-full mt-10">
              <Link to="/login" className="w-full px-4 py-2 text-sm font-medium text-indigo-400 border border-indigo-400 rounded-full hover:bg-indigo-400 hover:text-white transition-colors duration-300 text-center">
                Login
              </Link>
              <Link to="/register" className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-full hover:bg-indigo-600 transition-colors duration-300 text-center">
                Sign Up
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;