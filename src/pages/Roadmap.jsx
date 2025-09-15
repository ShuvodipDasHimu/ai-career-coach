import React, { useState } from 'react';
import { FaCheckCircle, FaCircle, FaClock, FaLightbulb, FaStar, FaBookOpen } from 'react-icons/fa';
import { MdTimeline, MdSpeed, MdTrendingUp } from 'react-icons/md';

const Roadmap = () => {
  const [selectedPath, setSelectedPath] = useState('ai-engineer');

  const roadmapData = {
    'ai-engineer': {
      title: 'AI Engineer',
      description: 'Complete roadmap to become an AI Engineer',
      totalSteps: 12,
      completedSteps: 5,
      estimatedTime: '8 months',
      steps: [
        {
          id: 1,
          title: 'Python Fundamentals',
          description: 'Master Python programming basics',
          status: 'completed',
          duration: '2 weeks',
          difficulty: 'Beginner',
          resources: ['Python.org Tutorial', 'Codecademy Python', 'Python Crash Course Book'],
          skills: ['Variables', 'Functions', 'Data Structures', 'OOP']
        },
        {
          id: 2,
          title: 'Data Structures & Algorithms',
          description: 'Learn essential DS&A for technical interviews',
          status: 'completed',
          duration: '4 weeks',
          difficulty: 'Intermediate',
          resources: ['LeetCode', 'Cracking the Coding Interview', 'AlgoExpert'],
          skills: ['Arrays', 'Linked Lists', 'Trees', 'Dynamic Programming']
        },
        {
          id: 3,
          title: 'Mathematics for AI',
          description: 'Linear algebra, calculus, and statistics',
          status: 'completed',
          duration: '3 weeks',
          difficulty: 'Intermediate',
          resources: ['Khan Academy', 'MIT OpenCourseWare', '3Blue1Brown'],
          skills: ['Linear Algebra', 'Calculus', 'Statistics', 'Probability']
        },
        {
          id: 4,
          title: 'NumPy & Pandas',
          description: 'Data manipulation and analysis libraries',
          status: 'completed',
          duration: '2 weeks',
          difficulty: 'Beginner',
          resources: ['NumPy Docs', 'Pandas Docs', 'Data School YouTube'],
          skills: ['Data Manipulation', 'Data Analysis', 'Data Cleaning']
        },
        {
          id: 5,
          title: 'Machine Learning Basics',
          description: 'Understand ML algorithms and concepts',
          status: 'completed',
          duration: '4 weeks',
          difficulty: 'Intermediate',
          resources: ['Andrew Ng Course', 'Scikit-learn', 'Hands-On ML Book'],
          skills: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation']
        },
        {
          id: 6,
          title: 'Deep Learning Fundamentals',
          description: 'Neural networks and deep learning',
          status: 'in-progress',
          duration: '5 weeks',
          difficulty: 'Advanced',
          resources: ['Deep Learning Specialization', 'PyTorch Tutorials', 'Fast.ai'],
          skills: ['Neural Networks', 'CNNs', 'RNNs', 'Backpropagation']
        },
        {
          id: 7,
          title: 'Computer Vision',
          description: 'Image processing and computer vision',
          status: 'pending',
          duration: '4 weeks',
          difficulty: 'Advanced',
          resources: ['OpenCV', 'PyTorch Vision', 'CS231n Stanford'],
          skills: ['Image Processing', 'Object Detection', 'Image Classification']
        },
        {
          id: 8,
          title: 'Natural Language Processing',
          description: 'Text processing and language models',
          status: 'pending',
          duration: '4 weeks',
          difficulty: 'Advanced',
          resources: ['NLTK', 'spaCy', 'Hugging Face Transformers'],
          skills: ['Text Processing', 'Sentiment Analysis', 'Language Models']
        },
        {
          id: 9,
          title: 'MLOps & Deployment',
          description: 'Deploy ML models to production',
          status: 'pending',
          duration: '3 weeks',
          difficulty: 'Intermediate',
          resources: ['MLflow', 'Docker', 'AWS SageMaker'],
          skills: ['Model Deployment', 'CI/CD', 'Monitoring', 'Containerization']
        },
        {
          id: 10,
          title: 'Cloud Platforms',
          description: 'AWS/GCP/Azure for AI workloads',
          status: 'pending',
          duration: '3 weeks',
          difficulty: 'Intermediate',
          resources: ['AWS ML Services', 'Google AI Platform', 'Azure ML'],
          skills: ['Cloud Computing', 'Scalable ML', 'Cloud Storage']
        },
        {
          id: 11,
          title: 'Portfolio Projects',
          description: 'Build impressive AI projects',
          status: 'pending',
          duration: '6 weeks',
          difficulty: 'Advanced',
          resources: ['GitHub', 'Kaggle', 'Personal Blog'],
          skills: ['Project Management', 'Documentation', 'Presentation']
        },
        {
          id: 12,
          title: 'Job Preparation',
          description: 'Interview prep and job applications',
          status: 'pending',
          duration: '4 weeks',
          difficulty: 'Intermediate',
          resources: ['Pramp', 'InterviewBit', 'Company Research'],
          skills: ['Technical Interviews', 'System Design', 'Communication']
        }
      ]
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle className="text-green-400" size={20} />;
      case 'in-progress':
        return <FaClock className="text-yellow-400" size={20} />;
      default:
        return <FaCircle className="text-gray-400" size={20} />;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'text-green-400 bg-green-900/20';
      case 'intermediate': return 'text-yellow-400 bg-yellow-900/20';
      case 'advanced': return 'text-red-400 bg-red-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const currentRoadmap = roadmapData[selectedPath];
  const progressPercentage = (currentRoadmap.completedSteps / currentRoadmap.totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-4 md:p-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Career Roadmap</h1>
          <p className="text-gray-400">Follow your personalized learning path to achieve your career goals</p>
        </div>

        {/* Roadmap Overview */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{currentRoadmap.title}</h2>
              <p className="text-gray-400">{currentRoadmap.description}</p>
            </div>
            <div className="flex items-center gap-4 mt-4 lg:mt-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{currentRoadmap.completedSteps}</div>
                <div className="text-sm text-gray-400">of {currentRoadmap.totalSteps}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-400">{Math.round(progressPercentage)}%</div>
                <div className="text-sm text-gray-400">Complete</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{currentRoadmap.estimatedTime}</div>
                <div className="text-sm text-gray-400">Remaining</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Overall Progress</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 bg-gray-700/50 rounded-lg p-4">
              <MdTimeline className="text-indigo-400" size={24} />
              <div>
                <div className="text-sm text-gray-400">Next Milestone</div>
                <div className="font-semibold">Deep Learning</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-700/50 rounded-lg p-4">
              <MdSpeed className="text-green-400" size={24} />
              <div>
                <div className="text-sm text-gray-400">Learning Pace</div>
                <div className="font-semibold">On Track</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-700/50 rounded-lg p-4">
              <MdTrendingUp className="text-yellow-400" size={24} />
              <div>
                <div className="text-sm text-gray-400">Streak</div>
                <div className="font-semibold">12 days</div>
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap Steps */}
        <div className="space-y-6">
          {currentRoadmap.steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connecting Line */}
              {index < currentRoadmap.steps.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-700"></div>
              )}

              <div className={`bg-gray-800 rounded-xl p-6 border transition-all duration-200 ${
                step.status === 'in-progress'
                  ? 'border-indigo-500 shadow-lg shadow-indigo-500/20'
                  : step.status === 'completed'
                  ? 'border-green-500/30'
                  : 'border-gray-700 hover:border-gray-600'
              }`}>
                <div className="flex items-start gap-4">
                  {/* Step Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(step.status)}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">{step.title}</h3>
                        <p className="text-gray-400 text-sm">{step.description}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-2 lg:mt-0">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(step.difficulty)}`}>
                          {step.difficulty}
                        </span>
                        <span className="text-sm text-gray-400 flex items-center gap-1">
                          <FaClock size={12} />
                          {step.duration}
                        </span>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                        <FaStar className="text-yellow-400" size={12} />
                        Skills You'll Learn
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {step.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-3 py-1 bg-indigo-900/30 text-indigo-300 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Resources */}
                    <div>
                      <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                        <FaBookOpen className="text-green-400" size={12} />
                        Recommended Resources
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {step.resources.map((resource, resourceIndex) => (
                          <div
                            key={resourceIndex}
                            className="flex items-center gap-2 text-sm text-gray-400 bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-colors cursor-pointer"
                          >
                            <FaLightbulb size={12} className="text-yellow-400 flex-shrink-0" />
                            <span>{resource}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    {step.status === 'in-progress' && (
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                          Continue Learning
                        </button>
                      </div>
                    )}

                    {step.status === 'pending' && (
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                          Start This Step
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;