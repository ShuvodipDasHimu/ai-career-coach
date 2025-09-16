import React from 'react';
import { BiRefresh } from 'react-icons/bi';
import { LuBrainCircuit } from 'react-icons/lu';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="p-4 md:p-8">
          {/* Top-level summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Current Career Path Card */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Current Career Path</h3>
                <BiRefresh className="text-gray-600 hover:text-gray-900 cursor-pointer" size={20} />
              </div>
              <div className="bg-gray-100 rounded-lg py-2 px-4 inline-block">
                <span className="text-indigo-400 font-bold">AI Engineer</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">92% fit based on your profile</p>
            </div>

            {/* Skills Mastered Card */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Skills Mastered</h3>
                <LuBrainCircuit style={{color: '#6260ec'}} size={20} />
              </div>
              <p className="text-4xl font-bold text-gray-900 mb-1">12</p>
              <p className="text-sm text-gray-600">Skills completed this month</p>
            </div>

            {/* Pending Steps Card */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Pending Steps</h3>
                <span className="text-red-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </div>
              <p className="text-4xl font-bold text-gray-900 mb-1">5</p>
              <p className="text-sm text-gray-600">Roadmap milestones remaining</p>
            </div>
          </div>

          {/* Recommended Career Paths Section */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended Career Paths</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* AI Engineer Card */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-gray-900">AI Engineer</h3>
                <span className="font-bold" style={{color: '#6260ec'}}>92% <span className="text-gray-600 text-sm font-normal">fit</span></span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Salary: ₹6-15L<br />
                Demand: <span className="text-green-400 font-semibold">Very High</span>
              </p>
              <button className="w-full text-white py-2 rounded-full font-semibold transition-colors duration-300" style={{backgroundColor: '#6260ec'}} onMouseOver={(e) => e.target.style.backgroundColor = '#5048d9'} onMouseOut={(e) => e.target.style.backgroundColor = '#6260ec'}>
                Generate Roadmap
              </button>
            </div>

            {/* Data Analyst Card */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-gray-900">Data Analyst</h3>
                <span className="font-bold" style={{color: '#6260ec'}}>87% <span className="text-gray-600 text-sm font-normal">fit</span></span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Salary: ₹6-15L<br />
                Demand: <span className="text-green-400 font-semibold">Very High</span>
              </p>
              <button className="w-full text-white py-2 rounded-full font-semibold transition-colors duration-300" style={{backgroundColor: '#6260ec'}} onMouseOver={(e) => e.target.style.backgroundColor = '#5048d9'} onMouseOut={(e) => e.target.style.backgroundColor = '#6260ec'}>
                Generate Roadmap
              </button>
            </div>

            {/* UX Designer Card */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-gray-900">UX Designer</h3>
                <span className="font-bold" style={{color: '#6260ec'}}>79% <span className="text-gray-600 text-sm font-normal">fit</span></span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Salary: ₹8-18L<br />
                Demand: <span className="text-green-400 font-semibold">High</span>
              </p>
              <button className="w-full text-white py-2 rounded-full font-semibold transition-colors duration-300" style={{backgroundColor: '#6260ec'}} onMouseOver={(e) => e.target.style.backgroundColor = '#5048d9'} onMouseOut={(e) => e.target.style.backgroundColor = '#6260ec'}>
                Generate Roadmap
              </button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;