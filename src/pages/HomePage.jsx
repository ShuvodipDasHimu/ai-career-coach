import React from 'react';
import { Link } from 'react-router';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center text-center p-4 max-w-5xl w-full">
        {/* Title Section */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mt-10">
          Your Career, Redefined by AI.
        </h2>
        <p className="mt-6 text-base sm:text-lg text-gray-700 max-w-2xl">
          Unlock your potential with an AI-powered career coach that helps you build resumes, practice interviews, and find your dream job.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/register" className="cursor-pointer bg-indigo-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
            Get Started
          </Link>
          <button className="bg-transparent text-gray-900 font-semibold py-3 px-8 rounded-full border border-gray-400 hover:border-white transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
            Learn More
          </button>
        </div>

        {/* Hero Image */}
        <div className="mt-16 w-full max-w-5xl relative">
          <div className="relative w-full aspect-[16/9] bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 flex items-center justify-center">
            <img 
              src="/hero.png" 
              alt="AI Career Coach Interface"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;