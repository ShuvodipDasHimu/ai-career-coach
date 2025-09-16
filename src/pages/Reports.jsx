import React, { useState } from 'react';
import { FaChartBar, FaChartLine, FaChartPie, FaDownload, FaCalendarAlt, FaFilter } from 'react-icons/fa';
import { MdAnalytics, MdTrendingUp, MdAssessment, MdDateRange } from 'react-icons/md';
import { BiRefresh, BiExport } from 'react-icons/bi';

const Reports = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('last30days');
  const [selectedReport, setSelectedReport] = useState('overview');

  const reportTypes = [
    {
      id: 'overview',
      name: 'Overview Report',
      description: 'Comprehensive view of your career progress',
      icon: MdAnalytics,
      color: 'text-blue-400'
    },
    {
      id: 'skills',
      name: 'Skills Analysis',
      description: 'Detailed breakdown of skill development',
      icon: FaChartBar,
      color: 'text-green-400'
    },
    {
      id: 'activity',
      name: 'Activity Report',
      description: 'Your learning and engagement patterns',
      icon: FaChartLine,
      color: 'text-purple-400'
    },
    {
      id: 'goals',
      name: 'Goals Progress',
      description: 'Track progress towards career objectives',
      icon: MdTrendingUp,
      color: 'text-yellow-400'
    }
  ];

  const overviewStats = {
    totalLearningHours: 127,
    skillsImproved: 8,
    assessmentsCompleted: 12,
    goalsAchieved: 5,
    averageScore: 87,
    streakDays: 15
  };

  const skillsData = [
    { skill: 'Python', currentLevel: 85, improvement: 15, timeSpent: 45 },
    { skill: 'Machine Learning', currentLevel: 72, improvement: 22, timeSpent: 38 },
    { skill: 'Data Analysis', currentLevel: 90, improvement: 10, timeSpent: 25 },
    { skill: 'React.js', currentLevel: 78, improvement: 18, timeSpent: 32 },
    { skill: 'AWS', currentLevel: 65, improvement: 25, timeSpent: 28 },
    { skill: 'Communication', currentLevel: 82, improvement: 12, timeSpent: 15 }
  ];

  const activityData = [
    { week: 'Week 1', hours: 12, assessments: 3, goals: 1 },
    { week: 'Week 2', hours: 18, assessments: 2, goals: 2 },
    { week: 'Week 3', hours: 15, assessments: 4, goals: 1 },
    { week: 'Week 4', hours: 22, assessments: 3, goals: 1 }
  ];

  const goalsData = [
    {
      goal: 'Complete Python Certification',
      progress: 85,
      deadline: '2024-04-15',
      status: 'on-track',
      timeSpent: 45
    },
    {
      goal: 'Build ML Portfolio Project',
      progress: 60,
      deadline: '2024-05-01',
      status: 'on-track',
      timeSpent: 32
    },
    {
      goal: 'Improve Resume Score to 95%',
      progress: 92,
      deadline: '2024-03-30',
      status: 'ahead',
      timeSpent: 8
    },
    {
      goal: 'Network with 20 Professionals',
      progress: 40,
      deadline: '2024-06-01',
      status: 'behind',
      timeSpent: 12
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'ahead': return 'text-green-600 bg-green-100';
      case 'on-track': return 'text-blue-600 bg-blue-100';
      case 'behind': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const exportReport = (format) => {
    console.log(`Exporting ${selectedReport} report as ${format}`);
    // Handle export logic here
  };

  const renderOverviewReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:-translate-y-1 group">
          <div className="flex items-center justify-between mb-4">
            <FaChartLine className="text-blue-400 transition-all duration-200 transform group-hover:scale-110 group-hover:rotate-12" size={24} />
            <span className="text-2xl font-bold text-gray-900 transition-all duration-300 group-hover:text-blue-500">{overviewStats.totalLearningHours}</span>
          </div>
          <p className="text-gray-600 transition-colors duration-200 group-hover:text-gray-700">Total Learning Hours</p>
          <p className="text-sm text-green-400 mt-1 transition-colors duration-200 group-hover:text-green-500">+12% from last month</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:-translate-y-1 group">
          <div className="flex items-center justify-between mb-4">
            <MdTrendingUp className="text-green-400 transition-all duration-200 transform group-hover:scale-110 group-hover:rotate-12" size={24} />
            <span className="text-2xl font-bold text-gray-900 transition-all duration-300 group-hover:text-green-500">{overviewStats.skillsImproved}</span>
          </div>
          <p className="text-gray-600 transition-colors duration-200 group-hover:text-gray-700">Skills Improved</p>
          <p className="text-sm text-green-400 mt-1 transition-colors duration-200 group-hover:text-green-500">+3 from last month</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:-translate-y-1 group">
          <div className="flex items-center justify-between mb-4">
            <MdAssessment className="text-purple-400 transition-all duration-200 transform group-hover:scale-110 group-hover:rotate-12" size={24} />
            <span className="text-2xl font-bold text-gray-900 transition-all duration-300 group-hover:text-purple-500">{overviewStats.assessmentsCompleted}</span>
          </div>
          <p className="text-gray-600 transition-colors duration-200 group-hover:text-gray-700">Assessments Completed</p>
          <p className="text-sm text-green-400 mt-1 transition-colors duration-200 group-hover:text-green-500">+5 from last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl group">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 transition-colors duration-200 group-hover:text-indigo-600">Performance Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Assessment Score</span>
              <span className="text-xl font-bold text-green-400">{overviewStats.averageScore}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Goals Achieved</span>
              <span className="text-xl font-bold text-blue-400">{overviewStats.goalsAchieved}/8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Current Streak</span>
              <span className="text-xl font-bold text-yellow-400">{overviewStats.streakDays} days</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl group">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 transition-colors duration-200 group-hover:text-indigo-600">Weekly Activity</h3>
          <div className="space-y-3">
            {activityData.map((week, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-md">
                <span className="text-gray-600 transition-colors duration-200 hover:text-gray-700">{week.week}</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-blue-400 transition-colors duration-200 hover:text-blue-500">{week.hours}h</span>
                  <span className="text-sm text-green-400 transition-colors duration-200 hover:text-green-500">{week.assessments} assessments</span>
                  <span className="text-sm text-purple-400 transition-colors duration-200 hover:text-purple-500">{week.goals} goals</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSkillsReport = () => (
    <div className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl group">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 transition-colors duration-200 group-hover:text-indigo-600">Skills Development Analysis</h3>
      <div className="space-y-6">
        {skillsData.map((skill, index) => (
          <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0 p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-md">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-900 transition-colors duration-200 hover:text-indigo-600">{skill.skill}</h4>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 transition-colors duration-200 hover:text-gray-700">{skill.timeSpent}h spent</span>
                <span className={`text-sm transition-colors duration-200 ${skill.improvement > 15 ? 'text-green-400 hover:text-green-500' : 'text-yellow-400 hover:text-yellow-500'}`}>
                  +{skill.improvement}% improvement
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Current Level</span>
                  <span>{skill.currentLevel}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500 animate-pulse"
                    style={{ width: `${skill.currentLevel}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderActivityReport = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl group">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 transition-colors duration-200 group-hover:text-indigo-600">Learning Activity Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {activityData.map((week, index) => (
            <div key={index} className="text-center">
              <div className="bg-gray-100 rounded-lg p-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:-translate-y-1 hover:bg-indigo-50 group">
                <div className="text-2xl font-bold text-indigo-400 mb-2 transition-all duration-300 group-hover:text-indigo-600 group-hover:scale-110">{week.hours}</div>
                <div className="text-sm text-gray-600 transition-colors duration-200 group-hover:text-gray-700">{week.week}</div>
                <div className="text-xs text-gray-500 mt-1 transition-colors duration-200 group-hover:text-gray-600">{week.assessments} assessments</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl group">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 transition-colors duration-200 group-hover:text-indigo-600">Peak Learning Times</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-md">
              <span className="text-gray-600 transition-colors duration-200 hover:text-gray-700">Most Active Day</span>
              <span className="text-gray-900 transition-colors duration-200 hover:text-indigo-600">Wednesday</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-md">
              <span className="text-gray-600 transition-colors duration-200 hover:text-gray-700">Peak Hours</span>
              <span className="text-gray-900 transition-colors duration-200 hover:text-indigo-600">2:00 PM - 4:00 PM</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-md">
              <span className="text-gray-600 transition-colors duration-200 hover:text-gray-700">Average Session</span>
              <span className="text-gray-900 transition-colors duration-200 hover:text-indigo-600">45 minutes</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl group">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 transition-colors duration-200 group-hover:text-indigo-600">Engagement Metrics</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-md">
              <span className="text-gray-600 transition-colors duration-200 hover:text-gray-700">Completion Rate</span>
              <span className="text-green-400 transition-colors duration-200 hover:text-green-500">89%</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-md">
              <span className="text-gray-600 transition-colors duration-200 hover:text-gray-700">Time on Platform</span>
              <span className="text-blue-400 transition-colors duration-200 hover:text-blue-500">127 hours</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-md">
              <span className="text-gray-600 transition-colors duration-200 hover:text-gray-700">Consistency Score</span>
              <span className="text-purple-400 transition-colors duration-200 hover:text-purple-500">8.5/10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGoalsReport = () => (
    <div className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl group">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 transition-colors duration-200 group-hover:text-indigo-600">Goals Progress Report</h3>
      <div className="space-y-6">
        {goalsData.map((goal, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:-translate-y-1 group">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-900 transition-colors duration-200 group-hover:text-indigo-600">{goal.goal}</h4>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded-full text-xs transition-all duration-200 transform group-hover:scale-105 ${getStatusColor(goal.status)}`}>
                  {goal.status.replace('-', ' ')}
                </span>
                <span className="text-sm text-gray-600 transition-colors duration-200 group-hover:text-gray-700">{goal.timeSpent}h</span>
              </div>
            </div>
            <div className="mb-3">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{goal.progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 animate-pulse ${
                    goal.status === 'ahead' ? 'bg-green-500' :
                    goal.status === 'on-track' ? 'bg-blue-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span className="transition-colors duration-200 group-hover:text-gray-700">Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
              <span className="transition-colors duration-200 group-hover:text-gray-700">{Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24))} days left</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'overview': return renderOverviewReport();
      case 'skills': return renderSkillsReport();
      case 'activity': return renderActivityReport();
      case 'goals': return renderGoalsReport();
      default: return renderOverviewReport();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="p-4 md:p-8">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
            <div className="group">
              <div className="flex items-center space-x-3 mb-2">
                <MdAnalytics className="text-indigo-400 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-12" size={32} />
                <h1 className="text-3xl font-bold text-gray-900 transition-colors duration-300 hover:text-indigo-600">Reports & Analytics</h1>
              </div>
              <p className="text-gray-600 transition-colors duration-200 hover:text-gray-700">Comprehensive insights into your career development progress</p>
            </div>
            <div className="flex items-center gap-3 mt-4 lg:mt-0">
              <button className="flex items-center gap-2 bg-white hover:bg-gray-100 px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-md border border-gray-200">
                <BiRefresh size={16} className="transition-transform duration-200 hover:rotate-180" />
                Refresh
              </button>
              <div className="relative">
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-indigo-500/25">
                  <FaDownload size={16} className="transition-transform duration-200 hover:scale-110" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Report Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {reportTypes.map((report) => (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className={`text-left p-4 rounded-xl border transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:-translate-y-1 group ${
                  selectedReport === report.id
                    ? 'bg-indigo-600 border-indigo-500 shadow-lg shadow-indigo-500/25'
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg'
                }`}
              >
                <report.icon className={`${selectedReport === report.id ? 'text-white' : report.color} mb-3 transition-all duration-200 transform group-hover:scale-110 group-hover:rotate-12`} size={24} />
                <h3 className={`font-semibold mb-1 transition-colors duration-200 ${
                  selectedReport === report.id ? 'text-white' : 'text-gray-900 group-hover:text-indigo-600'
                }`}>{report.name}</h3>
                <p className={`text-sm transition-colors duration-200 ${
                  selectedReport === report.id ? 'text-indigo-100' : 'text-gray-600 group-hover:text-gray-700'
                }`}>{report.description}</p>
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2 group">
              <FaCalendarAlt className="text-gray-600 transition-all duration-200 transform group-hover:scale-110 group-hover:rotate-12" size={16} />
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:scale-105 focus:shadow-lg hover:border-indigo-300 hover:shadow-md"
              >
                <option value="last7days">Last 7 days</option>
                <option value="last30days">Last 30 days</option>
                <option value="last3months">Last 3 months</option>
                <option value="last6months">Last 6 months</option>
                <option value="lastyear">Last year</option>
              </select>
            </div>
          </div>

          {/* Report Content */}
          {renderReportContent()}
      </div>
    </div>
  );
};

export default Reports;