import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  MdOutlineDashboard,
  MdWorkOutline,
  MdOutlineHistory,
  MdOutlineSettings,
  MdOutlinePersonOutline,
  MdOutlineSchool,
  MdOutlineAnalytics,
  MdOutlineAssessment,
} from 'react-icons/md';
import { FaLaptopCode, FaUserTie } from 'react-icons/fa';

const sidebarItems = [
  {
    name: 'Dashboard',
    icon: MdOutlineDashboard,
    path: '/dashboard',
  },
  {
    name: 'Job Recommendations',
    icon: FaUserTie,
    path: '/job-recommendations',
  },
  {
    name: 'Resume Analyzer',
    icon: MdOutlineAnalytics,
    path: '/resume-analyzer',
  },
  {
    name: 'Roadmap Generator',
    icon: MdOutlineSchool,
    path: '/roadmap-generator',
  },
  {
    name: 'Career Q&A',
    icon: MdOutlineAssessment,
    path: '/career-qa',
  },
  {
    name: 'My History',
    icon: MdOutlineHistory,
    path: '/my-history',
  },
  {
    name: 'Admin & Settings',
    icon: MdOutlineSettings,
    path: '/settings',
  },
  {
    name: 'Logout',
    icon: MdWorkOutline,
    path: '/logout',
  },
];

const Sidebar = () => {
  return (
    <div className="flex-none w-64 bg-gray-800 text-gray-400 p-4 min-h-screen border-r border-gray-700">
      <div className="flex flex-col space-y-2">
        {sidebarItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded-lg transition-colors duration-200 ` +
              (isActive
                ? 'bg-gray-700 text-white'
                : 'hover:bg-gray-700 hover:text-white')
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="text-sm font-medium">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;