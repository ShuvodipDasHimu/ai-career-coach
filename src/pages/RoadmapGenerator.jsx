import React, { useState } from 'react';
import { MdOutlineSchool, MdOutlineTimer, MdOutlineStars, MdOutlinePlayArrow } from 'react-icons/md';
import { BiRefresh, BiDownload } from 'react-icons/bi';
import { FaCheckCircle, FaClock, FaLock, FaBook, FaCode, FaLaptopCode } from 'react-icons/fa';

const RoadmapGenerator = () => {
  const [selectedCareer, setSelectedCareer] = useState('');
  const [currentLevel, setCurrentLevel] = useState('');
  const [timeCommitment, setTimeCommitment] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRoadmap, setGeneratedRoadmap] = useState(null);

  const careerPaths = [
    { id: 'ai-engineer', name: 'AI Engineer', description: 'Build intelligent systems and machine learning models' },
    { id: 'data-analyst', name: 'Data Analyst', description: 'Analyze data to drive business insights' },
    { id: 'frontend-dev', name: 'Frontend Developer', description: 'Create user interfaces and experiences' },
    { id: 'backend-dev', name: 'Backend Developer', description: 'Build server-side applications and APIs' },
    { id: 'fullstack-dev', name: 'Full Stack Developer', description: 'End-to-end web application development' },
    { id: 'data-scientist', name: 'Data Scientist', description: 'Extract insights from complex datasets' },
    { id: 'devops-engineer', name: 'DevOps Engineer', description: 'Automate deployment and infrastructure' },
    { id: 'ux-designer', name: 'UX Designer', description: 'Design user-centered digital experiences' }
  ];

  const skillLevels = [
    { id: 'beginner', name: 'Beginner', description: 'New to this field' },
    { id: 'intermediate', name: 'Intermediate', description: 'Some experience in this area' },
    { id: 'advanced', name: 'Advanced', description: 'Experienced but want to specialize' }
  ];

  const timeCommitments = [
    { id: '5-10', name: '5-10 hours/week', description: 'Part-time learning' },
    { id: '10-20', name: '10-20 hours/week', description: 'Dedicated learning' },
    { id: '20+', name: '20+ hours/week', description: 'Intensive learning' }
  ];

  const handleGenerateRoadmap = () => {
    if (!selectedCareer || !currentLevel || !timeCommitment) return;

    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setGeneratedRoadmap({
        title: careerPaths.find(cp => cp.id === selectedCareer)?.name,
        duration: '6-12 months',
        totalSteps: 8,
        phases: [
          {
            id: 1,
            title: 'Foundation Phase',
            duration: '2-3 months',
            status: 'current',
            skills: [
              { name: 'Programming Fundamentals', completed: true, hours: 40 },
              { name: 'Data Structures & Algorithms', completed: true, hours: 60 },
              { name: 'Version Control (Git)', completed: false, hours: 20 },
              { name: 'Database Basics', completed: false, hours: 30 }
            ]
          },
          {
            id: 2,
            title: 'Core Skills Phase',
            duration: '2-3 months',
            status: 'next',
            skills: [
              { name: 'Machine Learning Basics', completed: false, hours: 80 },
              { name: 'Python for Data Science', completed: false, hours: 60 },
              { name: 'Statistics & Mathematics', completed: false, hours: 50 },
              { name: 'Data Visualization', completed: false, hours: 40 }
            ]
          },
          {
            id: 3,
            title: 'Specialization Phase',
            duration: '2-3 months',
            status: 'locked',
            skills: [
              { name: 'Deep Learning Frameworks', completed: false, hours: 100 },
              { name: 'Natural Language Processing', completed: false, hours: 70 },
              { name: 'Computer Vision', completed: false, hours: 70 },
              { name: 'MLOps and Deployment', completed: false, hours: 60 }
            ]
          },
          {
            id: 4,
            title: 'Project & Portfolio Phase',
            duration: '2-3 months',
            status: 'locked',
            skills: [
              { name: 'Capstone Project', completed: false, hours: 120 },
              { name: 'Portfolio Development', completed: false, hours: 40 },
              { name: 'Technical Writing', completed: false, hours: 30 },
              { name: 'Interview Preparation', completed: false, hours: 50 }
            ]
          }
        ]
      });
      setIsGenerating(false);
    }, 3000);
  };

  const handleResetRoadmap = () => {
    setSelectedCareer('');
    setCurrentLevel('');
    setTimeCommitment('');
    setGeneratedRoadmap(null);
    setIsGenerating(false);
  };

  const getPhaseIcon = (status) => {
    switch (status) {
      case 'current':
        return <MdOutlinePlayArrow className="text-green-400" size={20} />;
      case 'next':
        return <FaClock className="text-yellow-400" size={18} />;
      default:
        return <FaLock className="text-gray-600" size={18} />;
    }
  };

  const getPhaseColor = (status) => {
    switch (status) {
      case 'current':
        return 'border-green-400 bg-green-400/10';
      case 'next':
        return 'border-yellow-400 bg-yellow-400/10';
      default:
        return 'border-gray-300 bg-gray-100/50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="p-4 md:p-8">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-3">
              <MdOutlineSchool className="text-indigo-400" size={32} />
              <h1 className="text-3xl font-bold text-gray-900 transition-colors duration-300 hover:text-indigo-600">Career Roadmap Generator</h1>
            </div>
            <button 
              onClick={handleResetRoadmap}
              className="flex items-center space-x-2 bg-white text-gray-600 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <BiRefresh size={18} />
              <span>Reset Roadmap</span>
            </button>
          </div>

          {!generatedRoadmap && (
            <>
              {/* Career Path Selection */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <MdOutlineStars className="text-indigo-400" size={24} />
                  <span>Select Your Target Career</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {careerPaths.map((career) => (
                    <div
                      key={career.id}
                      onClick={() => setSelectedCareer(career.id)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                        selectedCareer === career.id
                          ? 'border-indigo-400 bg-indigo-500/10'
                          : 'border-gray-300 hover:border-gray-500'
                      }`}
                    >
                      <h3 className="font-semibold text-gray-900 mb-2">{career.name}</h3>
                      <p className="text-sm text-gray-600">{career.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Skill Level */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <MdOutlineSchool className="text-indigo-400" size={24} />
                  <span>Current Skill Level</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {skillLevels.map((level) => (
                    <div
                      key={level.id}
                      onClick={() => setCurrentLevel(level.id)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                        currentLevel === level.id
                          ? 'border-indigo-400 bg-indigo-500/10'
                          : 'border-gray-300 hover:border-gray-500'
                      }`}
                    >
                      <h3 className="font-semibold text-gray-900 mb-2">{level.name}</h3>
                      <p className="text-sm text-gray-600">{level.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Commitment */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <MdOutlineTimer className="text-indigo-400" size={24} />
                  <span>Weekly Time Commitment</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {timeCommitments.map((time) => (
                    <div
                      key={time.id}
                      onClick={() => setTimeCommitment(time.id)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                        timeCommitment === time.id
                          ? 'border-indigo-400 bg-indigo-500/10'
                          : 'border-gray-300 hover:border-gray-500'
                      }`}
                    >
                      <h3 className="font-semibold text-gray-900 mb-2">{time.name}</h3>
                      <p className="text-sm text-gray-600">{time.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <div className="text-center">
                <button
                  onClick={handleGenerateRoadmap}
                  disabled={!selectedCareer || !currentLevel || !timeCommitment || isGenerating}
                  className="bg-indigo-500 text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-indigo-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-300"
                >
                  {isGenerating ? 'Generating Your Roadmap...' : 'Generate Personalized Roadmap'}
                </button>
              </div>
            </>
          )}

          {/* Loading State */}
          {isGenerating && (
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Generating Your Career Roadmap</h3>
              <p className="text-gray-600">Analyzing your preferences and creating a personalized learning path...</p>
            </div>
          )}

          {/* Generated Roadmap */}
          {generatedRoadmap && (
            <>
              {/* Roadmap Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <div className="flex items-center space-x-2 mb-4">
                    <MdOutlineStars className="text-indigo-400" size={20} />
                    <h3 className="text-xl font-semibold text-gray-900">Career Path</h3>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{generatedRoadmap.title}</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <div className="flex items-center space-x-2 mb-4">
                    <MdOutlineTimer className="text-green-400" size={20} />
                    <h3 className="text-xl font-semibold text-gray-900">Duration</h3>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{generatedRoadmap.duration}</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <div className="flex items-center space-x-2 mb-4">
                    <FaBook className="text-blue-400" size={20} />
                    <h3 className="text-xl font-semibold text-gray-900">Total Phases</h3>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{generatedRoadmap.phases.length}</p>
                </div>
              </div>

              {/* Roadmap Phases */}
              <div className="space-y-6">
                {generatedRoadmap.phases.map((phase, index) => (
                  <div
                    key={phase.id}
                    className={`bg-white rounded-xl p-6 shadow-lg border-2 ${getPhaseColor(phase.status)}`}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-3">
                        {getPhaseIcon(phase.status)}
                        <h3 className="text-xl font-semibold text-gray-900">{phase.title}</h3>
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {phase.duration}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Phase {index + 1} of {generatedRoadmap.phases.length}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {phase.skills.map((skill, skillIndex) => (
                        <div
                          key={skillIndex}
                          className="flex items-center justify-between p-3 bg-gray-100 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            {skill.completed ? (
                              <FaCheckCircle className="text-green-400" size={16} />
                            ) : (
                              <FaCode className="text-gray-600" size={16} />
                            )}
                            <span className={skill.completed ? 'text-gray-900' : 'text-gray-700'}>
                              {skill.name}
                            </span>
                          </div>
                          <span className="text-sm text-gray-600">{skill.hours}h</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button className="flex-1 bg-indigo-500 text-white py-3 px-6 rounded-full font-semibold hover:bg-indigo-600 transition-colors duration-300 flex items-center justify-center space-x-2">
                  <BiDownload size={18} />
                  <span>Download Roadmap</span>
                </button>
                <button className="flex-1 bg-gray-100 text-gray-900 py-3 px-6 rounded-full font-semibold hover:bg-gray-200 transition-colors duration-300">
                  Start Learning Path
                </button>
                <button 
                  onClick={handleResetRoadmap}
                  className="flex-1 bg-gray-100 text-gray-900 py-3 px-6 rounded-full font-semibold hover:bg-gray-200 transition-colors duration-300"
                >
                  Generate New Roadmap
                </button>
              </div>
            </>
          )}
      </div>
    </div>
  );
};

export default RoadmapGenerator;