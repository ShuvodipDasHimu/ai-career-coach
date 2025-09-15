import React, { useState } from 'react';
import { FaMapMarkerAlt, FaDollarSign, FaClock, FaBuilding, FaHeart, FaHeartBroken, FaExternalLinkAlt } from 'react-icons/fa';
import { MdWork, MdTrendingUp, MdFilterList } from 'react-icons/md';
import { BiRefresh } from 'react-icons/bi';
import Sidebar from '../components/dashboard/Sidebar';

const JobMatches = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [savedJobs, setSavedJobs] = useState(new Set([1, 3]));

  const jobMatches = [
    {
      id: 1,
      title: 'AI/ML Engineer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      salary: '$140,000 - $180,000',
      type: 'Full-time',
      remote: true,
      matchScore: 95,
      postedDate: '2 days ago',
      logo: '🏢',
      skills: ['Python', 'TensorFlow', 'Machine Learning', 'Deep Learning', 'AWS'],
      description: 'We are looking for an AI/ML Engineer to join our innovative team building cutting-edge AI solutions.',
      requirements: ['3+ years ML experience', 'Python proficiency', 'Cloud platform experience'],
      benefits: ['Health Insurance', 'Stock Options', 'Flexible Hours', 'Remote Work']
    },
    {
      id: 2,
      title: 'Senior Data Scientist',
      company: 'DataVision Labs',
      location: 'New York, NY',
      salary: '$130,000 - $170,000',
      type: 'Full-time',
      remote: false,
      matchScore: 88,
      postedDate: '1 week ago',
      logo: '📊',
      skills: ['Python', 'R', 'SQL', 'Statistics', 'Machine Learning'],
      description: 'Join our data science team to drive insights and build predictive models for business growth.',
      requirements: ['5+ years data science experience', 'Advanced statistics knowledge', 'Business acumen'],
      benefits: ['Health Insurance', 'Retirement Plan', 'Learning Budget', 'Gym Membership']
    },
    {
      id: 3,
      title: 'Machine Learning Researcher',
      company: 'AI Research Institute',
      location: 'Boston, MA',
      salary: '$120,000 - $160,000',
      type: 'Full-time',
      remote: true,
      matchScore: 82,
      postedDate: '3 days ago',
      logo: '🔬',
      skills: ['Python', 'PyTorch', 'Research', 'Deep Learning', 'Computer Vision'],
      description: 'Research and develop novel ML algorithms for computer vision and natural language processing.',
      requirements: ['PhD or Masters in CS/ML', 'Publication record', 'Strong math background'],
      benefits: ['Health Insurance', 'Research Budget', 'Conference Travel', 'Flexible Schedule']
    },
    {
      id: 4,
      title: 'AI Product Manager',
      company: 'InnovateTech',
      location: 'Seattle, WA',
      salary: '$150,000 - $200,000',
      type: 'Full-time',
      remote: true,
      matchScore: 75,
      postedDate: '5 days ago',
      logo: '📱',
      skills: ['Product Management', 'AI/ML Understanding', 'Strategy', 'Leadership'],
      description: 'Lead AI product strategy and work with engineering teams to deliver AI-powered solutions.',
      requirements: ['5+ years product management', 'Technical AI knowledge', 'Leadership experience'],
      benefits: ['Health Insurance', 'Stock Options', 'Unlimited PTO', 'Remote Work']
    },
    {
      id: 5,
      title: 'Computer Vision Engineer',
      company: 'VisionTech Solutions',
      location: 'Austin, TX',
      salary: '$125,000 - $165,000',
      type: 'Full-time',
      remote: false,
      matchScore: 90,
      postedDate: '1 day ago',
      logo: '👁️',
      skills: ['Python', 'OpenCV', 'Computer Vision', 'Deep Learning', 'C++'],
      description: 'Develop computer vision algorithms for autonomous vehicle perception systems.',
      requirements: ['3+ years CV experience', 'Strong programming skills', 'Automotive experience preferred'],
      benefits: ['Health Insurance', 'Stock Options', 'Relocation Package', 'Tech Budget']
    },
    {
      id: 6,
      title: 'NLP Engineer',
      company: 'Language AI Corp',
      location: 'Remote',
      salary: '$135,000 - $175,000',
      type: 'Full-time',
      remote: true,
      matchScore: 85,
      postedDate: '4 days ago',
      logo: '💬',
      skills: ['Python', 'NLP', 'Transformers', 'BERT', 'Spacy'],
      description: 'Build and deploy NLP models for text understanding and generation applications.',
      requirements: ['4+ years NLP experience', 'Transformer models expertise', 'Production ML experience'],
      benefits: ['Health Insurance', 'Fully Remote', 'Learning Budget', 'Equipment Allowance']
    }
  ];

  const toggleSaveJob = (jobId) => {
    const newSavedJobs = new Set(savedJobs);
    if (newSavedJobs.has(jobId)) {
      newSavedJobs.delete(jobId);
    } else {
      newSavedJobs.add(jobId);
    }
    setSavedJobs(newSavedJobs);
  };

  const getMatchColor = (score) => {
    if (score >= 90) return 'text-green-400 bg-green-900/20';
    if (score >= 80) return 'text-yellow-400 bg-yellow-900/20';
    if (score >= 70) return 'text-orange-400 bg-orange-900/20';
    return 'text-red-400 bg-red-900/20';
  };

  const filteredJobs = selectedFilter === 'all'
    ? jobMatches
    : selectedFilter === 'saved'
    ? jobMatches.filter(job => savedJobs.has(job.id))
    : selectedFilter === 'remote'
    ? jobMatches.filter(job => job.remote)
    : jobMatches.filter(job => job.matchScore >= 85);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-grow p-4 md:p-8">
        <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Job Matches</h1>
            <p className="text-gray-400">AI-powered job recommendations tailored to your profile</p>
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors mt-4 lg:mt-0">
            <BiRefresh size={16} />
            Refresh Matches
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <MdWork className="text-indigo-400" size={24} />
              <span className="text-2xl font-bold">{jobMatches.length}</span>
            </div>
            <p className="text-gray-400">Total Matches</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <MdTrendingUp className="text-green-400" size={24} />
              <span className="text-2xl font-bold">{jobMatches.filter(job => job.matchScore >= 85).length}</span>
            </div>
            <p className="text-gray-400">High Match</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <FaHeart className="text-pink-400" size={24} />
              <span className="text-2xl font-bold">{savedJobs.size}</span>
            </div>
            <p className="text-gray-400">Saved Jobs</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <FaClock className="text-yellow-400" size={24} />
              <span className="text-2xl font-bold">3</span>
            </div>
            <p className="text-gray-400">Applied Today</p>
          </div>
        </div>

        {/* Filter Options */}
        <div className="flex items-center gap-4 mb-6">
          <MdFilterList className="text-gray-400" size={20} />
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              All Jobs
            </button>
            <button
              onClick={() => setSelectedFilter('high-match')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedFilter === 'high-match'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              High Match (85%+)
            </button>
            <button
              onClick={() => setSelectedFilter('remote')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedFilter === 'remote'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              Remote Jobs
            </button>
            <button
              onClick={() => setSelectedFilter('saved')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedFilter === 'saved'
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              Saved Jobs
            </button>
          </div>
        </div>

        {/* Job Cards */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-3xl">{job.logo}</div>
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getMatchColor(job.matchScore)}`}>
                          {job.matchScore}% Match
                        </span>
                        {job.remote && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-900/30 text-blue-300">
                            Remote
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-gray-400 mb-3">
                        <span className="flex items-center gap-1">
                          <FaBuilding size={12} />
                          {job.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaMapMarkerAlt size={12} />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaDollarSign size={12} />
                          {job.salary}
                        </span>
                        <span className="text-sm">{job.postedDate}</span>
                      </div>
                      <p className="text-gray-300 mb-4">{job.description}</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-white mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-indigo-900/30 text-indigo-300 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-white mb-2">Key Requirements</h4>
                    <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-white mb-2">Benefits</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.benefits.map((benefit, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 mt-4 lg:mt-0 lg:ml-6">
                  <button
                    onClick={() => toggleSaveJob(job.id)}
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      savedJobs.has(job.id)
                        ? 'bg-pink-600 text-white hover:bg-pink-700'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {savedJobs.has(job.id) ? <FaHeartBroken size={14} /> : <FaHeart size={14} />}
                    {savedJobs.has(job.id) ? 'Unsave' : 'Save'}
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
                    <FaExternalLinkAlt size={14} />
                    Apply Now
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No jobs found for the selected filter.</p>
            <button
              onClick={() => setSelectedFilter('all')}
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              View all jobs
            </button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default JobMatches;