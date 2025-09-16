import React, { useState } from 'react';
import { MdOutlineHistory, MdOutlineAnalytics, MdOutlineSchool, MdOutlineAssessment, MdSearch, MdFilterList } from 'react-icons/md';
import { BiRefresh, BiDownload, BiBot, BiUser } from 'react-icons/bi';
import { FaFileAlt, FaRoad, FaComments, FaCalendarAlt, FaClock } from 'react-icons/fa';

const MyHistory = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample history data
  const historyData = [
    {
      id: 1,
      type: 'resume',
      title: 'Resume Analysis - Software Engineer Position',
      description: 'Analyzed resume for software engineering role with 78% overall score',
      date: '2024-01-15',
      time: '14:30',
      status: 'completed',
      details: {
        score: 78,
        strengths: 4,
        improvements: 3,
        missingSkills: 2
      }
    },
    {
      id: 2,
      type: 'roadmap',
      title: 'AI Engineer Career Roadmap',
      description: 'Generated 6-month learning roadmap for AI Engineer transition',
      date: '2024-01-14',
      time: '10:15',
      status: 'in-progress',
      details: {
        phases: 4,
        duration: '6-12 months',
        currentPhase: 'Foundation Phase'
      }
    },
    {
      id: 3,
      type: 'chat',
      title: 'Career Q&A Session',
      description: 'Discussed interview preparation strategies and salary negotiation',
      date: '2024-01-13',
      time: '16:45',
      status: 'completed',
      details: {
        messages: 24,
        duration: '45 minutes',
        topics: ['Interviews', 'Salary', 'Skills']
      }
    },
    {
      id: 4,
      type: 'resume',
      title: 'Resume Analysis - Data Scientist Role',
      description: 'Comprehensive analysis for data science position application',
      date: '2024-01-12',
      time: '09:20',
      status: 'completed',
      details: {
        score: 85,
        strengths: 6,
        improvements: 2,
        missingSkills: 3
      }
    },
    {
      id: 5,
      type: 'roadmap',
      title: 'Full Stack Developer Roadmap',
      description: 'Created learning path for full stack web development',
      date: '2024-01-10',
      time: '11:30',
      status: 'completed',
      details: {
        phases: 4,
        duration: '8-10 months',
        currentPhase: 'Completed'
      }
    },
    {
      id: 6,
      type: 'chat',
      title: 'Career Transition Discussion',
      description: 'Explored career change options from marketing to tech',
      date: '2024-01-08',
      time: '13:15',
      status: 'completed',
      details: {
        messages: 18,
        duration: '30 minutes',
        topics: ['Career Change', 'Skills Gap', 'Learning Path']
      }
    }
  ];

  const filterOptions = [
    { id: 'all', name: 'All Activities', icon: MdOutlineHistory },
    { id: 'resume', name: 'Resume Analysis', icon: MdOutlineAnalytics },
    { id: 'roadmap', name: 'Career Roadmaps', icon: MdOutlineSchool },
    { id: 'chat', name: 'Q&A Sessions', icon: MdOutlineAssessment }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'resume':
        return <FaFileAlt className="text-blue-400" size={20} />;
      case 'roadmap':
        return <FaRoad className="text-green-400" size={20} />;
      case 'chat':
        return <FaComments className="text-indigo-400" size={20} />;
      default:
        return <MdOutlineHistory className="text-gray-600" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-400/10';
      case 'in-progress':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'failed':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-gray-600 bg-gray-400/10';
    }
  };

  const filteredHistory = historyData.filter(item => {
    const matchesFilter = activeFilter === 'all' || item.type === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history? This action cannot be undone.')) {
      // Clear history logic would go here
      console.log('History cleared');
    }
  };

  const handleExportHistory = () => {
    // Export history logic would go here
    console.log('Exporting history...');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="p-4 md:p-8">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-3">
              <MdOutlineHistory className="text-indigo-400" size={32} />
              <h1 className="text-3xl font-bold text-gray-900">My History</h1>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={handleExportHistory}
                className="flex items-center space-x-2 bg-white text-gray-600 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <BiDownload size={18} />
                <span className="hidden md:inline">Export</span>
              </button>
              <button 
                onClick={handleClearHistory}
                className="flex items-center space-x-2 bg-white text-gray-600 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <BiRefresh size={18} />
                <span className="hidden md:inline">Clear All</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <MdOutlineHistory className="text-indigo-400" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">Total Activities</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{historyData.length}</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <FaFileAlt className="text-blue-400" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">Resume Analysis</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {historyData.filter(item => item.type === 'resume').length}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <FaRoad className="text-green-400" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">Career Roadmaps</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {historyData.filter(item => item.type === 'roadmap').length}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <FaComments className="text-yellow-400" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">Q&A Sessions</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {historyData.filter(item => item.type === 'chat').length}
              </p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                {filterOptions.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                      activeFilter === filter.id
                        ? 'bg-indigo-500 text-gray-900'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                    }`}
                  >
                    <filter.icon size={16} />
                    <span>{filter.name}</span>
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative">
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" size={20} />
                <input
                  type="text"
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-100 text-gray-900 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 border border-gray-300 w-full lg:w-64"
                />
              </div>
            </div>
          </div>

          {/* History List */}
          <div className="space-y-4">
            {filteredHistory.length === 0 ? (
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 text-center">
                <MdOutlineHistory className="mx-auto text-gray-600 mb-4" size={48} />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No History Found</h3>
                <p className="text-gray-600">
                  {searchTerm ? 'No activities match your search criteria.' : 'Start using the platform to see your activity history here.'}
                </p>
              </div>
            ) : (
              filteredHistory.map((item) => (
                <div key={item.id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="flex-shrink-0">
                        {getTypeIcon(item.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{item.description}</p>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <FaCalendarAlt size={14} />
                            <span>{formatDate(item.date)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FaClock size={14} />
                            <span>{item.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Details Panel */}
                    <div className="flex-shrink-0 ml-6">
                      <div className="bg-gray-100 rounded-lg p-4 min-w-[200px]">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Details</h4>
                        {item.type === 'resume' && (
                          <div className="space-y-1 text-sm text-gray-700">
                            <div>Score: <span className="text-gray-900">{item.details.score}%</span></div>
                            <div>Strengths: <span className="text-green-400">{item.details.strengths}</span></div>
                            <div>Improvements: <span className="text-yellow-400">{item.details.improvements}</span></div>
                            <div>Missing Skills: <span className="text-red-400">{item.details.missingSkills}</span></div>
                          </div>
                        )}
                        {item.type === 'roadmap' && (
                          <div className="space-y-1 text-sm text-gray-700">
                            <div>Duration: <span className="text-gray-900">{item.details.duration}</span></div>
                            <div>Phases: <span className="text-gray-900">{item.details.phases}</span></div>
                            <div>Current: <span className="text-indigo-400">{item.details.currentPhase}</span></div>
                          </div>
                        )}
                        {item.type === 'chat' && (
                          <div className="space-y-1 text-sm text-gray-700">
                            <div>Messages: <span className="text-gray-900">{item.details.messages}</span></div>
                            <div>Duration: <span className="text-gray-900">{item.details.duration}</span></div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {item.details.topics.map((topic, index) => (
                                <span key={index} className="bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded text-xs">
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Load More Button */}
          {filteredHistory.length > 0 && (
            <div className="text-center mt-8">
              <button className="bg-gray-100 text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors duration-300">
                Load More Activities
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default MyHistory;