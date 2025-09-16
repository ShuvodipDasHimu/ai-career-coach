import React, { useState } from 'react';
import { FaChartLine, FaBookOpen, FaLightbulb, FaClock } from 'react-icons/fa';
import { MdTrendingUp, MdAssessment } from 'react-icons/md';

const SkillsGap = () => {
  const [selectedLevel, setSelectedLevel] = useState('all');

  const skillsData = [
    {
      id: 1,
      name: 'Machine Learning',
      currentLevel: 60,
      requiredLevel: 85,
      priority: 'High',
      category: 'Technical',
      timeToComplete: '3 months',
      recommendations: ['Complete ML Specialization on Coursera', 'Build 3 ML projects', 'Practice Kaggle competitions']
    },
    {
      id: 2,
      name: 'React.js',
      currentLevel: 75,
      requiredLevel: 90,
      priority: 'Medium',
      category: 'Technical',
      timeToComplete: '1 month',
      recommendations: ['Master React hooks', 'Learn Next.js', 'Build full-stack application']
    },
    {
      id: 3,
      name: 'Leadership',
      currentLevel: 45,
      requiredLevel: 70,
      priority: 'High',
      category: 'Soft Skills',
      timeToComplete: '6 months',
      recommendations: ['Take leadership course', 'Lead a team project', 'Practice public speaking']
    },
    {
      id: 4,
      name: 'Data Analysis',
      currentLevel: 70,
      requiredLevel: 80,
      priority: 'Low',
      category: 'Technical',
      timeToComplete: '2 months',
      recommendations: ['Learn advanced Excel', 'Master Tableau', 'Study statistical methods']
    },
    {
      id: 5,
      name: 'Communication',
      currentLevel: 80,
      requiredLevel: 85,
      priority: 'Low',
      category: 'Soft Skills',
      timeToComplete: '1 month',
      recommendations: ['Practice presentations', 'Join Toastmasters', 'Write technical blogs']
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getGapPercentage = (current, required) => {
    return Math.max(0, required - current);
  };

  const filteredSkills = selectedLevel === 'all'
    ? skillsData
    : skillsData.filter(skill => skill.priority.toLowerCase() === selectedLevel);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="p-4 md:p-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 transition-colors duration-300 hover:text-indigo-600">Skills Gap Analysis</h1>
          <p className="text-gray-600 transition-colors duration-200 hover:text-gray-700">Identify and bridge the gaps between your current skills and career requirements</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-4">
              <FaChartLine className="text-blue-400 transition-all duration-200 transform group-hover:scale-110 group-hover:rotate-12" size={24} />
              <span className="text-2xl font-bold transition-colors duration-300 group-hover:text-blue-600">5</span>
            </div>
            <p className="text-gray-600 transition-colors duration-200 group-hover:text-gray-700">Skills to Improve</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-4">
              <MdTrendingUp className="text-red-400 transition-all duration-200 transform group-hover:scale-110 group-hover:rotate-12" size={24} />
              <span className="text-2xl font-bold transition-colors duration-300 group-hover:text-red-600">2</span>
            </div>
            <p className="text-gray-600 transition-colors duration-200 group-hover:text-gray-700">High Priority</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-4">
              <FaClock className="text-yellow-400 transition-all duration-200 transform group-hover:scale-110 group-hover:rotate-12" size={24} />
              <span className="text-2xl font-bold transition-colors duration-300 group-hover:text-yellow-600">13</span>
            </div>
            <p className="text-gray-600 transition-colors duration-200 group-hover:text-gray-700">Months to Complete</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-4">
              <MdAssessment className="text-green-400 transition-all duration-200 transform group-hover:scale-110 group-hover:rotate-12" size={24} />
              <span className="text-2xl font-bold transition-colors duration-300 group-hover:text-green-600">72%</span>
            </div>
            <p className="text-gray-600 transition-colors duration-200 group-hover:text-gray-700">Overall Progress</p>
          </div>
        </div>

        {/* Filter Options */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedLevel('all')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-md ${
                selectedLevel === 'all'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-indigo-300'
              }`}
            >
              All Skills
            </button>
            <button
              onClick={() => setSelectedLevel('high')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-md ${
                selectedLevel === 'high'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-500/25'
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-red-300'
              }`}
            >
              High Priority
            </button>
            <button
              onClick={() => setSelectedLevel('medium')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-md ${
                selectedLevel === 'medium'
                  ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-500/25'
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-yellow-300'
              }`}
            >
              Medium Priority
            </button>
            <button
              onClick={() => setSelectedLevel('low')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-md ${
                selectedLevel === 'low'
                  ? 'bg-green-600 text-white shadow-lg shadow-green-500/25'
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-green-300'
              }`}
            >
              Low Priority
            </button>
          </div>
        </div>

        {/* Skills Gap Cards */}
        <div className="space-y-6">
          {filteredSkills.map((skill) => (
            <div key={skill.id} className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:-translate-y-1 group">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 transition-colors duration-200 group-hover:text-indigo-600">{skill.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 transform group-hover:scale-105 ${getPriorityColor(skill.priority)}`}>
                      {skill.priority} Priority
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 transition-all duration-200 transform group-hover:scale-105 group-hover:bg-indigo-50 group-hover:text-indigo-700">
                      {skill.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-200">
                    <span>Current: {skill.currentLevel}%</span>
                    <span>Required: {skill.requiredLevel}%</span>
                    <span>Gap: {getGapPercentage(skill.currentLevel, skill.requiredLevel)}%</span>
                    <span className="flex items-center gap-1">
                      <FaClock size={12} className="transition-transform duration-200 group-hover:rotate-12" />
                      {skill.timeToComplete}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2 group-hover:text-gray-700 transition-colors duration-200">
                  <span>Progress</span>
                  <span>{skill.currentLevel}% of {skill.requiredLevel}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div className="relative h-3 rounded-full">
                    <div
                      className="bg-indigo-600 h-3 rounded-full transition-all duration-1000 ease-out group-hover:bg-indigo-700 group-hover:shadow-lg"
                      style={{ width: `${(skill.currentLevel / skill.requiredLevel) * 100}%` }}
                    ></div>
                    <div
                      className="absolute top-0 bg-gray-300 h-3 rounded-r-full transition-all duration-300 group-hover:bg-gray-400"
                      style={{
                        left: `${(skill.currentLevel / skill.requiredLevel) * 100}%`,
                        width: `${((skill.requiredLevel - skill.currentLevel) / skill.requiredLevel) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2 group-hover:text-indigo-600 transition-colors duration-200">
                  <FaLightbulb className="text-yellow-400 transition-all duration-200 transform group-hover:scale-110 group-hover:rotate-12" size={14} />
                  Recommended Actions
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {skill.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 rounded-lg p-3 transition-all duration-200 transform hover:scale-105 hover:bg-indigo-50 hover:text-gray-700 hover:shadow-md group/rec">
                      <FaBookOpen size={12} className="text-indigo-400 flex-shrink-0 transition-all duration-200 transform group-hover/rec:scale-110 group-hover/rec:rotate-12" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No skills found for the selected priority level.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsGap;