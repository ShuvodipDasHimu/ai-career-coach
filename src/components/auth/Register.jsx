import React from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle, FaLinkedinIn, FaUser } from 'react-icons/fa';

const Register = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Container for the registration card */}
      <div className="w-full max-w-sm p-8 rounded-lg shadow-lg bg-gray-800 border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Create an Account</h2>
        
        {/* Registration form */}
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              placeholder="Enter your email" 
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required 
              placeholder="Create a password" 
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300">Confirm Password</label>
            <input 
              type="password" 
              id="confirm-password" 
              name="confirm-password" 
              required 
              placeholder="Confirm your password" 
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
            />
          </div>
          <button 
            type="submit" 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </form>

        {/* Separator */}
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="flex-shrink mx-4 text-gray-500 text-sm">Or</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        {/* Social login buttons */}
        <div className="space-y-4">
          <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-600 rounded-full shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 transition-colors duration-300">
            <FaGoogle className="mr-2" />
            Sign Up with Google
          </button>
          <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-600 rounded-full shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 transition-colors duration-300">
            <FaLinkedinIn className="mr-2" />
            Sign Up with LinkedIn
          </button>
          <button className="w-full flex justify-center py-2 px-4 border border-gray-600 rounded-full shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 transition-colors duration-300">
            <FaUser className="mr-2" />
            Continue as Guest
          </button>
        </div>

        {/* Login link */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account? 
          <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300 ml-1">Log In</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;