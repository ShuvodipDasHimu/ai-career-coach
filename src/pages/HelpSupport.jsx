import React, { useState } from 'react';
import { FaQuestionCircle, FaBook, FaVideo, FaEnvelope, FaPhone, FaComment, FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { MdContactSupport, MdChat, MdEmail, MdLiveTv } from 'react-icons/md';
import { BiRefresh, BiSend } from 'react-icons/bi';
import Sidebar from '../components/dashboard/Sidebar';

const HelpSupport = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [contactForm, setContactForm] = useState({
    subject: '',
    category: 'general',
    message: '',
    priority: 'medium'
  });

  const supportOptions = [
    {
      id: 1,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: MdChat,
      availability: 'Available 24/7',
      responseTime: 'Immediate',
      color: 'text-green-400'
    },
    {
      id: 2,
      title: 'Email Support',
      description: 'Send us a detailed message',
      icon: MdEmail,
      availability: 'Always available',
      responseTime: '24 hours',
      color: 'text-blue-400'
    },
    {
      id: 3,
      title: 'Video Call',
      description: 'Schedule a one-on-one session',
      icon: MdLiveTv,
      availability: 'Mon-Fri 9AM-6PM',
      responseTime: 'Same day',
      color: 'text-purple-400'
    },
    {
      id: 4,
      title: 'Phone Support',
      description: 'Call our support hotline',
      icon: FaPhone,
      availability: 'Mon-Fri 8AM-8PM',
      responseTime: 'Immediate',
      color: 'text-yellow-400'
    }
  ];

  const faqs = [
    {
      id: 1,
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'You can reset your password by clicking on "Forgot Password" on the login page. Enter your email address and follow the instructions sent to your email.'
    },
    {
      id: 2,
      category: 'features',
      question: 'How do I upload my resume for analysis?',
      answer: 'Navigate to the Resume Analyzer page, click on "Upload Resume" button, select your resume file (PDF, DOC, or DOCX), and click "Analyze" to get detailed feedback.'
    },
    {
      id: 3,
      category: 'features',
      question: 'How does the job matching algorithm work?',
      answer: 'Our AI analyzes your skills, experience, preferences, and career goals to match you with relevant job opportunities. The match percentage indicates compatibility.'
    },
    {
      id: 4,
      category: 'billing',
      question: 'How can I upgrade my subscription?',
      answer: 'Go to Settings > Subscription, choose your preferred plan, and follow the payment process. Upgrades take effect immediately.'
    },
    {
      id: 5,
      category: 'account',
      question: 'Can I delete my account?',
      answer: 'Yes, you can delete your account by going to Settings > Account > Delete Account. This action is permanent and cannot be undone.'
    },
    {
      id: 6,
      category: 'features',
      question: 'How do I track my learning progress?',
      answer: 'Visit the Progress & Badges page to see your learning statistics, earned badges, skill progression, and achievement milestones.'
    },
    {
      id: 7,
      category: 'technical',
      question: 'The app is running slowly. What should I do?',
      answer: 'Try clearing your browser cache, disabling browser extensions, or using a different browser. If issues persist, contact our technical support.'
    },
    {
      id: 8,
      category: 'billing',
      question: 'How do I cancel my subscription?',
      answer: 'You can cancel your subscription anytime by going to Settings > Subscription > Cancel Subscription. You\'ll retain access until the end of your billing period.'
    }
  ];

  const tutorials = [
    {
      id: 1,
      title: 'Getting Started with AI Career Coach',
      duration: '5 min',
      type: 'video',
      description: 'Learn the basics of navigating the platform'
    },
    {
      id: 2,
      title: 'Optimizing Your Resume',
      duration: '8 min',
      type: 'video',
      description: 'Step-by-step guide to resume improvement'
    },
    {
      id: 3,
      title: 'Using the Job Matcher',
      duration: '6 min',
      type: 'video',
      description: 'Find the perfect job opportunities'
    },
    {
      id: 4,
      title: 'Building Your Learning Roadmap',
      duration: '10 min',
      type: 'video',
      description: 'Create a personalized learning path'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted:', contactForm);
    // Reset form
    setContactForm({
      subject: '',
      category: 'general',
      message: '',
      priority: 'medium'
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-grow p-4 md:p-8">
        <div className="mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Help & Support</h1>
            <p className="text-gray-400">Get the help you need to succeed in your career journey</p>
          </div>

          {/* Quick Support Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {supportOptions.map((option) => (
              <div key={option.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <option.icon className={`${option.color}`} size={24} />
                  <span className="text-xs text-gray-400">{option.responseTime}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{option.title}</h3>
                <p className="text-sm text-gray-400 mb-3">{option.description}</p>
                <div className="text-xs text-gray-500">{option.availability}</div>
              </div>
            ))}
          </div>

          {/* Search and Categories */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>

            {/* Search Bar */}
            <div className="relative mb-6">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search FAQ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700 text-gray-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedCategory('account')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === 'account'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700 text-gray-400 hover:text-white'
                }`}
              >
                Account
              </button>
              <button
                onClick={() => setSelectedCategory('features')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === 'features'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700 text-gray-400 hover:text-white'
                }`}
              >
                Features
              </button>
              <button
                onClick={() => setSelectedCategory('billing')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === 'billing'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700 text-gray-400 hover:text-white'
                }`}
              >
                Billing
              </button>
              <button
                onClick={() => setSelectedCategory('technical')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === 'technical'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700 text-gray-400 hover:text-white'
                }`}
              >
                Technical
              </button>
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <div key={faq.id} className="border border-gray-700 rounded-lg">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-700/50 transition-colors"
                  >
                    <span className="font-medium text-white">{faq.question}</span>
                    {expandedFaq === faq.id ? (
                      <FaChevronUp className="text-gray-400" size={16} />
                    ) : (
                      <FaChevronDown className="text-gray-400" size={16} />
                    )}
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="px-4 pb-4 text-gray-300 border-t border-gray-700">
                      <p className="mt-3">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-400">No FAQs found matching your search.</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Video Tutorials */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Video Tutorials</h2>
              <div className="space-y-4">
                {tutorials.map((tutorial) => (
                  <div key={tutorial.id} className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                    <FaVideo className="text-indigo-400" size={20} />
                    <div className="flex-1">
                      <h3 className="font-medium text-white">{tutorial.title}</h3>
                      <p className="text-sm text-gray-400">{tutorial.description}</p>
                    </div>
                    <span className="text-xs text-gray-500">{tutorial.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Contact Support</h2>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                    placeholder="Brief description of your issue"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                    <select
                      value={contactForm.category}
                      onChange={(e) => setContactForm({...contactForm, category: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
                    >
                      <option value="general">General</option>
                      <option value="technical">Technical</option>
                      <option value="billing">Billing</option>
                      <option value="feature">Feature Request</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                    <select
                      value={contactForm.priority}
                      onChange={(e) => setContactForm({...contactForm, priority: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    placeholder="Describe your issue in detail..."
                    rows={5}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg transition-colors"
                >
                  <BiSend size={16} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;