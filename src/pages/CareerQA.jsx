import React, { useState, useRef, useEffect } from 'react';
import { MdOutlineAssessment, MdSend, MdOutlineHistory, MdOutlineQuestionMark } from 'react-icons/md';
import { BiRefresh, BiBot, BiUser } from 'react-icons/bi';
import { FaLightbulb, FaGraduationCap, FaBriefcase, FaChartLine } from 'react-icons/fa';
import Sidebar from '../components/dashboard/Sidebar';

const CareerQA = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm your AI Career Coach. I'm here to help answer any questions about your career journey, skills development, job search strategies, and professional growth. What would you like to know today?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    {
      category: 'Career Path',
      icon: FaGraduationCap,
      questions: [
        "What career path should I choose based on my interests?",
        "How do I transition from my current role to a new field?",
        "What are the emerging career opportunities in tech?"
      ]
    },
    {
      category: 'Skills Development',
      icon: FaLightbulb,
      questions: [
        "What skills are in demand for my target role?",
        "How can I improve my technical skills quickly?",
        "What certifications should I pursue for career growth?"
      ]
    },
    {
      category: 'Job Search',
      icon: FaBriefcase,
      questions: [
        "How do I write an effective resume?",
        "What should I expect in technical interviews?",
        "How do I negotiate salary and benefits?"
      ]
    },
    {
      category: 'Career Growth',
      icon: FaChartLine,
      questions: [
        "How do I advance to a leadership position?",
        "What networking strategies work best?",
        "How do I build a personal brand in my industry?"
      ]
    }
  ];

  const aiResponses = {
    "career path": "Choosing the right career path depends on several factors: your interests, natural abilities, values, and market demand. I'd recommend starting with a self-assessment to identify your core interests and strengths. Then research industries that align with these factors and have good growth prospects. Consider shadowing professionals or doing informational interviews to get real insights into different roles.",
    
    "skills": "The most in-demand skills vary by industry, but some universally valuable skills include: problem-solving, communication, digital literacy, data analysis, and adaptability. For tech roles specifically, focus on programming languages relevant to your target role, cloud platforms, and understanding of AI/ML concepts. I recommend creating a learning plan that combines theoretical knowledge with hands-on projects.",
    
    "resume": "An effective resume should be tailored to each job application, highlighting relevant experience and achievements with quantifiable results. Use a clean, professional format with clear sections: contact info, professional summary, experience, education, and relevant skills. Focus on accomplishments rather than just job duties, and use action verbs to describe your impact.",
    
    "interview": "Technical interviews typically include coding challenges, system design questions, and behavioral questions. Prepare by practicing coding problems on platforms like LeetCode, reviewing fundamental concepts, and preparing STAR method responses for behavioral questions. Research the company thoroughly and prepare thoughtful questions about the role and team culture.",
    
    "default": "That's a great question! Career development is a journey that's unique to everyone. Based on your specific situation, I'd recommend focusing on understanding your strengths, identifying skill gaps, and creating a strategic plan for growth. Would you like me to elaborate on any particular aspect of career development?"
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responseContent = getAIResponse(inputMessage);
      const aiMessage = {
        id: messages.length + 2,
        type: 'ai',
        content: responseContent,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const getAIResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    for (const [key, response] of Object.entries(aiResponses)) {
      if (key !== 'default' && lowerInput.includes(key)) {
        return response;
      }
    }
    
    return aiResponses.default;
  };

  const handleSuggestedQuestion = (question) => {
    setInputMessage(question);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'ai',
        content: "Hello! I'm your AI Career Coach. I'm here to help answer any questions about your career journey, skills development, job search strategies, and professional growth. What would you like to know today?",
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
    setInputMessage('');
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-grow flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 md:p-8 pb-4">
          <div className="flex items-center space-x-3">
            <MdOutlineAssessment className="text-purple-400" size={32} />
            <h1 className="text-3xl font-bold text-white">Career Q&A</h1>
          </div>
          <div className="flex space-x-2">
            <button className="flex items-center space-x-2 bg-gray-800 text-gray-400 px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-700 hover:text-white transition-colors">
              <MdOutlineHistory size={18} />
              <span className="hidden md:inline">History</span>
            </button>
            <button 
              onClick={handleClearChat}
              className="flex items-center space-x-2 bg-gray-800 text-gray-400 px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-700 hover:text-white transition-colors"
            >
              <BiRefresh size={18} />
              <span className="hidden md:inline">Clear Chat</span>
            </button>
          </div>
        </div>

        <div className="flex-grow flex px-4 md:px-8 pb-8">
          {/* Main Chat Area */}
          <div className="flex-grow flex flex-col max-w-4xl mx-auto">
            {/* Messages Container */}
            <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 mb-4 flex flex-col h-[600px]">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {/* Avatar */}
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === 'user' ? 'bg-purple-600' : 'bg-blue-600'
                      }`}>
                        {message.type === 'user' ? (
                          <BiUser size={16} />
                        ) : (
                          <BiBot size={16} />
                        )}
                      </div>

                      {/* Message Bubble */}
                      <div className={`rounded-lg p-4 ${
                        message.type === 'user' 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-700 text-gray-100'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p className="text-xs opacity-70 mt-2">{message.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex space-x-3 max-w-[80%]">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <BiBot size={16} />
                      </div>
                      <div className="bg-gray-700 rounded-lg p-4">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="flex-shrink-0 p-6 border-t border-gray-700">
                <div className="flex space-x-4">
                  <div className="flex-grow relative">
                    <textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about your career..."
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 border border-gray-600"
                      rows="3"
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center"
                  >
                    <MdSend size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerQA;