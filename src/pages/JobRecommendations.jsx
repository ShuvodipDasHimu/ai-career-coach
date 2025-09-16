import React, { useState } from 'react';
import { FaUserTie, FaMapMarkerAlt, FaDollarSign, FaClock, FaBuilding, FaHeart, FaExternalLinkAlt } from 'react-icons/fa';
import { MdOutlineWorkOutline, MdOutlineLocationOn, MdOutlineAttachMoney, MdSearch, MdFilterList } from 'react-icons/md';
import { BiRefresh, BiBookmark, BiBookmarkHeart } from 'react-icons/bi';

const JobRecommendations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    jobType: 'all',
    experience: 'all',
    location: 'all',
    salary: 'all'
  });
  const [savedJobs, setSavedJobs] = useState(new Set());

  // Sample job data
  const jobsData = [
    {
      id: 1,
      title: 'Senior AI Engineer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      salary: '$120k - $180k',
      type: 'Full-time',
      experience: 'Senior',
      matchScore: 95,
      description: 'Join our AI team to build cutting-edge machine learning models and deploy them at scale.',
      requirements: ['Python', 'TensorFlow', 'PyTorch', 'AWS', 'Docker'],
      benefits: ['Health Insurance', 'Stock Options', 'Remote Work', '401k'],
      posted: '2 days ago',
      applicants: 45,
      logo: '🤖'
    },
    {
      id: 2,
      title: 'Machine Learning Engineer',
      company: 'DataFlow Inc',
      location: 'New York, NY',
      salary: '$100k - $150k',
      type: 'Full-time',
      experience: 'Mid-level',
      matchScore: 92,
      description: 'Work on MLOps pipelines and deploy machine learning models in production environments.',
      requirements: ['Python', 'Kubernetes', 'MLOps', 'Scikit-learn', 'Apache Spark'],
      benefits: ['Health Insurance', 'Flexible Hours', 'Learning Budget', 'Gym Membership'],
      posted: '1 day ago',
      applicants: 32,
      logo: '📊'
    },
    {
      id: 3,
      title: 'Data Scientist',
      company: 'Analytics Pro',
      location: 'Remote',
      salary: '$90k - $130k',
      type: 'Full-time',
      experience: 'Mid-level',
      matchScore: 88,
      description: 'Analyze complex datasets to drive business insights and build predictive models.',
      requirements: ['Python', 'R', 'SQL', 'Tableau', 'Statistics'],
      benefits: ['Fully Remote', 'Health Insurance', 'PTO', 'Professional Development'],
      posted: '3 days ago',
      applicants: 67,
      logo: '📈'
    },
    {
      id: 4,
      title: 'AI Research Intern',
      company: 'Innovation Labs',
      location: 'Boston, MA',
      salary: '$60k - $80k',
      type: 'Internship',
      experience: 'Entry-level',
      matchScore: 82,
      description: 'Research and develop novel AI algorithms in computer vision and NLP.',
      requirements: ['Python', 'Deep Learning', 'Research', 'OpenCV', 'NLTK'],
      benefits: ['Mentorship', 'Research Publications', 'Conference Attendance'],
      posted: '1 week ago',
      applicants: 89,
      logo: '🔬'
    },
    {
      id: 5,
      title: 'Frontend Developer',
      company: 'WebTech Solutions',
      location: 'Austin, TX',
      salary: '$80k - $120k',
      type: 'Full-time',
      experience: 'Mid-level',
      matchScore: 78,
      description: 'Build responsive web applications using modern JavaScript frameworks.',
      requirements: ['React', 'TypeScript', 'CSS', 'Node.js', 'Git'],
      benefits: ['Health Insurance', 'Flexible Schedule', 'Stock Options', 'Free Lunch'],
      posted: '4 days ago',
      applicants: 156,
      logo: '💻'
    },
    {
      id: 6,
      title: 'DevOps Engineer',
      company: 'CloudFirst',
      location: 'Seattle, WA',
      salary: '$110k - $160k',
      type: 'Full-time',
      experience: 'Senior',
      matchScore: 85,
      description: 'Manage cloud infrastructure and implement CI/CD pipelines for high-scale applications.',
      requirements: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins'],
      benefits: ['Health Insurance', 'Stock Options', 'Remote Work', 'Learning Budget'],
      posted: '5 days ago',
      applicants: 73,
      logo: '☁️'
    }
  ];

  const filterOptions = {
    jobType: [
      { value: 'all', label: 'All Types' },
      { value: 'full-time', label: 'Full-time' },
      { value: 'part-time', label: 'Part-time' },
      { value: 'contract', label: 'Contract' },
      { value: 'internship', label: 'Internship' }
    ],
    experience: [
      { value: 'all', label: 'All Levels' },
      { value: 'entry-level', label: 'Entry Level' },
      { value: 'mid-level', label: 'Mid Level' },
      { value: 'senior', label: 'Senior Level' }
    ],
    location: [
      { value: 'all', label: 'All Locations' },
      { value: 'remote', label: 'Remote' },
      { value: 'san-francisco', label: 'San Francisco' },
      { value: 'new-york', label: 'New York' },
      { value: 'seattle', label: 'Seattle' }
    ],
    salary: [
      { value: 'all', label: 'Any Salary' },
      { value: '50k-80k', label: '$50k - $80k' },
      { value: '80k-120k', label: '$80k - $120k' },
      { value: '120k+', label: '$120k+' }
    ]
  };

  const filteredJobs = jobsData.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.requirements.some(req => req.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedFilters.jobType === 'all' || 
                       job.type.toLowerCase().replace('-', '-') === selectedFilters.jobType;
    
    const matchesExperience = selectedFilters.experience === 'all' || 
                             job.experience.toLowerCase().replace(' ', '-') === selectedFilters.experience;
    
    const matchesLocation = selectedFilters.location === 'all' || 
                           job.location.toLowerCase().includes(selectedFilters.location.replace('-', ' '));

    return matchesSearch && matchesType && matchesExperience && matchesLocation;
  });

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleSaveJob = (jobId) => {
    setSavedJobs(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(jobId)) {
        newSaved.delete(jobId);
      } else {
        newSaved.add(jobId);
      }
      return newSaved;
    });
  };

  const handleApplyJob = (job) => {
    // Apply job logic would go here
    console.log('Applying to job:', job.title);
    // Could open external link or show application modal
  };

  const getMatchColor = (score) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getMatchBadgeColor = (score) => {
    if (score >= 90) return 'bg-green-400/20 text-green-400';
    if (score >= 80) return 'bg-yellow-400/20 text-yellow-400';
    return 'bg-orange-400/20 text-orange-400';
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="p-4 md:p-8">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-3">
              <FaUserTie className="text-indigo-400" size={32} />
              <h1 className="text-3xl font-bold text-gray-900">Job Recommendations</h1>
            </div>
            <div className="flex space-x-2">
              <button className="flex items-center space-x-2 bg-white text-gray-600 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                <BiBookmarkHeart size={18} />
                <span className="hidden md:inline">Saved ({savedJobs.size})</span>
              </button>
              <button className="flex items-center space-x-2 bg-white text-gray-600 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                <BiRefresh size={18} />
                <span className="hidden md:inline">Refresh</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <MdOutlineWorkOutline className="text-indigo-400" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">Available Jobs</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{jobsData.length}</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <FaHeart className="text-red-400" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">Saved Jobs</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{savedJobs.size}</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <MdOutlineLocationOn className="text-blue-400" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">Remote Jobs</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {jobsData.filter(job => job.location.toLowerCase().includes('remote')).length}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <MdOutlineAttachMoney className="text-green-400" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">Avg Match</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {Math.round(jobsData.reduce((acc, job) => acc + job.matchScore, 0) / jobsData.length)}%
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" size={20} />
                <input
                  type="text"
                  placeholder="Search jobs, companies, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-100 text-gray-900 pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 border border-gray-300"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                {Object.entries(filterOptions).map(([filterType, options]) => (
                  <select
                    key={filterType}
                    value={selectedFilters[filterType]}
                    onChange={(e) => handleFilterChange(filterType, e.target.value)}
                    className="bg-gray-100 text-gray-900 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    {options.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ))}
              </div>
            </div>
          </div>

          {/* Job Results */}
          <div className="mb-4 flex items-center justify-between">
            <p className="text-gray-600">
              Showing {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} 
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
            <select className="bg-white text-gray-900 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none">
              <option>Sort by Match</option>
              <option>Sort by Date</option>
              <option>Sort by Salary</option>
            </select>
          </div>

          {/* Job Cards */}
          <div className="space-y-6">
            {filteredJobs.length === 0 ? (
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 text-center">
                <FaUserTie className="mx-auto text-gray-600 mb-4" size={48} />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Jobs Found</h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or filters to find more opportunities.
                </p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="text-4xl">{job.logo}</div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchBadgeColor(job.matchScore)}`}>
                            {job.matchScore}% match
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-gray-600 text-sm mb-3">
                          <div className="flex items-center space-x-1">
                            <FaBuilding size={14} />
                            <span>{job.company}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FaMapMarkerAlt size={14} />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FaDollarSign size={14} />
                            <span>{job.salary}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FaClock size={14} />
                            <span>{job.posted}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4">{job.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.requirements.map((skill, index) => (
                            <span key={index} className="bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            {job.applicants} applicants
                          </div>
                          
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleSaveJob(job.id)}
                              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                                savedJobs.has(job.id)
                                  ? 'bg-red-600 text-gray-900 hover:bg-red-700'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              <BiBookmark size={16} />
                              <span>{savedJobs.has(job.id) ? 'Saved' : 'Save'}</span>
                            </button>
                            
                            <button
                              onClick={() => handleApplyJob(job)}
                              className="flex items-center space-x-1 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
                            >
                              <FaExternalLinkAlt size={14} />
                              <span>Apply</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Load More Button */}
          {filteredJobs.length > 0 && (
            <div className="text-center mt-8">
              <button className="bg-gray-100 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors duration-300">
                Load More Jobs
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default JobRecommendations;