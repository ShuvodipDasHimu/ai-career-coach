import React from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle, FaLinkedinIn, FaUser } from 'react-icons/fa';

const Register = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Container for the registration card */}
      <div className="w-full max-w-sm p-8 rounded-lg shadow-lg bg-white border border-gray-200 animate-fade-in-up transition-all duration-500">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">Create an Account</h2>
        
        {/* Registration form */}
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:scale-105 focus:shadow-lg transition-all duration-200 sm:text-sm text-gray-900"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Create a password"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:scale-105 focus:shadow-lg transition-all duration-200 sm:text-sm text-gray-900"
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              required
              placeholder="Confirm your password"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:scale-105 focus:shadow-lg transition-all duration-200 sm:text-sm text-gray-900"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 active:scale-95"
          >
            Sign Up
          </button>
        </form>

        {/* Separator */}
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-600 text-sm">Or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Social login buttons */}
        <div className="space-y-4">
          <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-900 bg-gray-100 hover:bg-gray-200 hover:scale-105 hover:shadow-lg transition-all duration-200 active:scale-95">
            <FaGoogle className="mr-2" />
            Sign Up with Google
          </button>
          <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-900 bg-gray-100 hover:bg-gray-200 hover:scale-105 hover:shadow-lg transition-all duration-200 active:scale-95">
            <FaLinkedinIn className="mr-2" />
            Sign Up with LinkedIn
          </button>
          <Link to="/dashboard" className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-900 bg-gray-100 hover:bg-gray-200 hover:scale-105 hover:shadow-lg transition-all duration-200 active:scale-95">
            <FaUser className="mr-2" />
            Continue as Guest
          </Link>
        </div>

        {/* Login link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? 
          <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300 hover:scale-105 transition-all duration-200 ml-1">Log In</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;