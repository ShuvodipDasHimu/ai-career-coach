import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import Sidebar from '../components/dashboard/Sidebar';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900 bg-gray-50 bg-gradient-to-br from-gray-50 to-gray-100 overflow-x-hidden">
      <Sidebar />

      {/* Header section - responsive padding and max width for centering */}
      <header className="flex-shrink-0 w-full px-4 sm:px-6 md:px-8 ml-64 bg-white border-b border-gray-200 shadow-sm transition-all duration-300 ease-out">
        <div className="w-full transition-all duration-200">
          <Header />
        </div>
      </header>

      {/* Main content section - grows to fill available space, centered content */}
      <main className="flex-grow flex justify-center items-start px-4 sm:px-6 md:px-8 ml-64 overflow-x-hidden transition-all duration-300 ease-out">
        <div className="w-full max-w-full transition-all duration-200 opacity-100 animate-fadeIn">
          <Outlet />
        </div>
      </main>

      {/* Footer section - responsive padding and max width for centering */}
      <footer className="flex-shrink-0 w-full px-4 sm:px-6 md:px-8 ml-64 bg-white border-t border-gray-200 transition-all duration-300 ease-out">
        <div className="w-full transition-all duration-200">
          <Footer />
        </div>
      </footer>
    </div>
  );
};

export default RootLayout;