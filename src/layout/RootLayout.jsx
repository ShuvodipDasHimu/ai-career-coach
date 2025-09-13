import React from 'react';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans text-white bg-gray-900 bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header section - responsive padding and max width for centering */}
      <header className="flex-shrink-0 w-full px-4 sm:px-6 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Header />
        </div>
      </header>

      {/* Main content section - grows to fill available space, centered content */}
      <main className="flex-grow flex justify-center items-start px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-7xl">
          <Outlet />
        </div>
      </main>

      {/* Footer section - responsive padding and max width for centering */}
      <footer className="flex-shrink-0 w-full px-4 sm:px-6 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Footer />
        </div>
      </footer>
    </div>
  );
};

export default RootLayout;