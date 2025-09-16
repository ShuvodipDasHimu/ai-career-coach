import React from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle, FaLinkedinIn, FaUser } from 'react-icons/fa';

const Login = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Container for the login card */}
      <div className="w-full max-w-sm p-8 rounded-lg shadow-lg bg-white border border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">Log In</h2>
        
        {/* Email/Password Form */}
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              placeholder="Enter your email" 
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900" 
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required 
              placeholder="Enter your password" 
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900" 
            />
          </div>
          <button 
            type="submit" 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Log In
          </button>
        </form>

        {/* Separator */}
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-600 text-sm">Or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Social/Guest Sign-in Options */}
        <div className="space-y-4">
          <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors duration-300">
            <FaGoogle className="mr-2" />
            Sign In with Google
          </button>
          <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors duration-300">
            <FaLinkedinIn className="mr-2" />
            Sign In with LinkedIn
          </button>
          <Link to="/dashboard" className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors duration-300">
            <FaUser className="mr-2" />
            Continue as Guest
          </Link>
        </div>

        {/* Register link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account? 
          <Link to="/register" className="font-medium text-indigo-400 hover:text-indigo-300 ml-1">Sign Up</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;