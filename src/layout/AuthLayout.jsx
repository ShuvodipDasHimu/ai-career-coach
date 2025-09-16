import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900 bg-gray-50 bg-gradient-to-br from-gray-50 to-gray-100 overflow-x-hidden">
      <main className="flex-grow flex justify-center items-start">
        <div className="w-full max-w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;