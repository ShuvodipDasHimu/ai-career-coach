import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  MdOutlineDashboard,
  MdOutlineLogout,
  MdOutlineHistory,
  MdOutlineSettings,
  MdOutlinePersonOutline,
  MdOutlineSchool,
  MdOutlineAnalytics,
  MdOutlineAssessment,
  MdTimeline,
  MdWork,
  MdHelp,
  MdBarChart,
} from 'react-icons/md';
import { FaLaptopCode, FaUserTie, FaChartLine, FaTrophy } from 'react-icons/fa';

const navigationItems = [
  {
    name: 'Dashboard',
    icon: MdOutlineDashboard,
    path: '/dashboard',
    type: 'nav'
  },
  {
    name: 'Skills Gap',
    icon: FaChartLine,
    path: '/skills-gap',
    type: 'nav'
  },
  {
    name: 'Roadmap',
    icon: MdTimeline,
    path: '/roadmap',
    type: 'nav'
  },
  {
    name: 'Job Matches',
    icon: MdWork,
    path: '/job-matches',
    type: 'nav'
  },
  {
    name: 'Job Recommendations',
    icon: FaUserTie,
    path: '/job-recommendations',
    type: 'nav'
  },
  {
    name: 'Resume Analyzer',
    icon: MdOutlineAnalytics,
    path: '/resume-analyzer',
    type: 'nav'
  },
  {
    name: 'Roadmap Generator',
    icon: MdOutlineSchool,
    path: '/roadmap-generator',
    type: 'nav'
  },
  {
    name: 'Career Q&A',
    icon: MdOutlineAssessment,
    path: '/career-qa',
    type: 'nav'
  },
  {
    name: 'My History',
    icon: MdOutlineHistory,
    path: '/my-history',
    type: 'nav'
  },
  {
    name: 'Progress & Badges',
    icon: FaTrophy,
    path: '/progress-badges',
    type: 'nav'
  },
  {
    name: 'Reports',
    icon: MdBarChart,
    path: '/reports',
    type: 'nav'
  },
  {
    name: 'Help & Support',
    icon: MdHelp,
    path: '/help-support',
    type: 'nav'
  },
  {
    name: 'Admin & Settings',
    icon: MdOutlineSettings,
    path: '/settings',
    type: 'nav'
  },
  {
    name: 'Logout',
    icon: MdOutlineLogout,
    path: '/logout',
    type: 'action'
  },
];

const Sidebar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    sessionStorage.clear();
    
    // Navigate to home page
    navigate('/');
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  return (
    <>
      <div className="fixed left-0 top-0 w-64 bg-white text-gray-600 p-4 h-screen border-r border-gray-200 overflow-y-auto z-10">
        <div className="flex flex-col space-y-2">
          {navigationItems.map((item, index) => (
            item.type === 'nav' ? (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 p-2 rounded-lg transition-colors duration-200 ` +
                  (isActive
                    ? 'bg-gray-100 text-gray-900'
                    : 'hover:bg-gray-100 hover:text-gray-900')
                }
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.name}</span>
              </NavLink>
            ) : (
              <button
                key={index}
                onClick={handleLogoutClick}
                className="flex items-center space-x-2 p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 text-left w-full"
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.name}</span>
              </button>
            )
          ))}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-2xl border border-gray-200 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <MdOutlineLogout className="text-red-400" size={24} />
              <h3 className="text-xl font-semibold text-gray-900">Confirm Logout</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out? You'll need to sign in again to access your account.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 bg-gray-200 text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;