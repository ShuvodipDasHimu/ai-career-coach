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
      case 'ahead': return 'text-green-400 bg-green-900/20';
      case 'on-track': return 'text-blue-400 bg-blue-900/20';
      case 'behind': return 'text-red-400 bg-red-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const exportReport = (format) => {
    console.log(`Exporting ${selectedReport} report as ${format}`);
    // Handle export logic here
  };

  const renderOverviewReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <FaChartLine className="text-blue-400" size={24} />
            <span className="text-2xl font-bold text-white">{overviewStats.totalLearningHours}</span>
          </div>
          <p className="text-gray-400">Total Learning Hours</p>
          <p className="text-sm text-green-400 mt-1">+12% from last month</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <MdTrendingUp className="text-green-400" size={24} />
            <span className="text-2xl font-bold text-white">{overviewStats.skillsImproved}</span>
          </div>
          <p className="text-gray-400">Skills Improved</p>
          <p className="text-sm text-green-400 mt-1">+3 from last month</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <MdAssessment className="text-purple-400" size={24} />
            <span className="text-2xl font-bold text-white">{overviewStats.assessmentsCompleted}</span>
          </div>
          <p className="text-gray-400">Assessments Completed</p>
          <p className="text-sm text-green-400 mt-1">+5 from last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Average Assessment Score</span>
              <span className="text-xl font-bold text-green-400">{overviewStats.averageScore}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Goals Achieved</span>
              <span className="text-xl font-bold text-blue-400">{overviewStats.goalsAchieved}/8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Current Streak</span>
              <span className="text-xl font-bold text-yellow-400">{overviewStats.streakDays} days</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Weekly Activity</h3>
          <div className="space-y-3">
            {activityData.map((week, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-400">{week.week}</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-blue-400">{week.hours}h</span>
                  <span className="text-sm text-green-400">{week.assessments} assessments</span>
                  <span className="text-sm text-purple-400">{week.goals} goals</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSkillsReport = () => (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-semibold text-white mb-6">Skills Development Analysis</h3>
      <div className="space-y-6">
        {skillsData.map((skill, index) => (
          <div key={index} className="border-b border-gray-700 pb-4 last:border-b-0">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-white">{skill.skill}</h4>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">{skill.timeSpent}h spent</span>
                <span className={`text-sm ${skill.improvement > 15 ? 'text-green-400' : 'text-yellow-400'}`}>
                  +{skill.improvement}% improvement
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>Current Level</span>
                  <span>{skill.currentLevel}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
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
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-6">Learning Activity Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {activityData.map((week, index) => (
            <div key={index} className="text-center">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-2xl font-bold text-indigo-400 mb-2">{week.hours}</div>
                <div className="text-sm text-gray-400">{week.week}</div>
                <div className="text-xs text-gray-500 mt-1">{week.assessments} assessments</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Peak Learning Times</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Most Active Day</span>
              <span className="text-white">Wednesday</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Peak Hours</span>
              <span className="text-white">2:00 PM - 4:00 PM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Average Session</span>
              <span className="text-white">45 minutes</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Engagement Metrics</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Completion Rate</span>
              <span className="text-green-400">89%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Time on Platform</span>
              <span className="text-blue-400">127 hours</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Consistency Score</span>
              <span className="text-purple-400">8.5/10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGoalsReport = () => (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-semibold text-white mb-6">Goals Progress Report</h3>
      <div className="space-y-6">
        {goalsData.map((goal, index) => (
          <div key={index} className="border border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-white">{goal.goal}</h4>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(goal.status)}`}>
                  {goal.status.replace('-', ' ')}
                </span>
                <span className="text-sm text-gray-400">{goal.timeSpent}h</span>
              </div>
            </div>
            <div className="mb-3">
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>Progress</span>
                <span>{goal.progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    goal.status === 'ahead' ? 'bg-green-500' :
                    goal.status === 'on-track' ? 'bg-blue-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
              <span>{Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24))} days left</span>
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
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-4 md:p-8">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Reports & Analytics</h1>
              <p className="text-gray-400">Comprehensive insights into your career development progress</p>
            </div>
            <div className="flex items-center gap-3 mt-4 lg:mt-0">
              <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors">
                <BiRefresh size={16} />
                Refresh
              </button>
              <div className="relative">
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors">
                  <FaDownload size={16} />
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
                className={`text-left p-4 rounded-xl border transition-all ${
                  selectedReport === report.id
                    ? 'bg-indigo-600 border-indigo-500'
                    : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                }`}
              >
                <report.icon className={`${report.color} mb-3`} size={24} />
                <h3 className="font-semibold text-white mb-1">{report.name}</h3>
                <p className="text-sm text-gray-400">{report.description}</p>
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-gray-400" size={16} />
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
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