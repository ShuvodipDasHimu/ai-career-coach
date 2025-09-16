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
      <div className="flex items-center space-x-2 group">
        <LuBrainCircuit size={40} color='#6260ec' className="transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-12"/>
        <Link to="/" className="text-xl sm:text-2xl font-bold text-gray-900 transition-all duration-200 hover:text-indigo-600 transform hover:scale-105">
          AI Career Coach
        </Link>
      </div>

      {/* Desktop navigation and buttons (visible on md screens and up) */}
      <div className="hidden md:flex items-center space-x-6">
        {/* Additional links can go here */}
        <Link to="/auth/register" className="px-6 py-3 text-base font-semibold text-white bg-indigo-500 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-indigo-500/25 hover:bg-indigo-600">
          Sign Up
        </Link>
        <Link to="/auth/login" className="px-6 py-3 text-base font-semibold text-indigo-400 border-2 border-indigo-400 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 hover:bg-indigo-400 hover:text-white hover:shadow-md">
          Login
        </Link>
      </div>

      {/* Hamburger menu button for mobile */}
      <button
        id="menu-button"
        className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none z-50 transition-all duration-200 transform hover:scale-110 active:scale-95"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <FaBars className="h-6 w-6 transition-transform duration-200" />
      </button>

      {/* Mobile Menu - Full-screen overlay */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out animate-fadeIn"
          onClick={toggleMenu} // Allows closing by clicking outside the menu
        >
          {/* Background overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"></div>

          {/* Menu content */}
          <div className="relative w-80 ml-auto bg-white h-full p-6 shadow-2xl flex flex-col items-center transform transition-transform duration-300 ease-out translate-x-0">
            {/* Close button */}
            <button
              onClick={toggleMenu}
              className="absolute top-4 right-4 text-gray-900 hover:text-gray-600 focus:outline-none transition-all duration-200 transform hover:scale-110 active:scale-95 hover:rotate-90"
              aria-label="Close menu"
            >
              <FaTimes className="h-6 w-6 transition-transform duration-200" />
            </button>

            {/* Mobile navigation links */}
            <nav className="flex flex-col items-center py-4 space-y-4 w-full mt-10">
              <Link to="/auth/login" className="w-full px-4 py-2 text-sm font-medium text-indigo-400 border border-indigo-400 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 hover:bg-indigo-400 hover:text-white hover:shadow-md text-center">
                Login
              </Link>
              <Link to="/auth/register" className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-indigo-500/25 hover:bg-indigo-600 text-center">
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