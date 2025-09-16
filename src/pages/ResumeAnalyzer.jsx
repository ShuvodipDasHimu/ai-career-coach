import React, { useState } from 'react';
import { MdOutlineAnalytics, MdOutlineUploadFile, MdOutlineInsertDriveFile } from 'react-icons/md';
import { BiRefresh, BiDownload } from 'react-icons/bi';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';

const ResumeAnalyzer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'application/pdf' || file.type.includes('word'))) {
      setSelectedFile(file);
      setAnalysisResults(null);
    }
  };

  const handleAnalyze = () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setAnalysisResults({
        overallScore: 78,
        strengths: [
          'Well-structured technical skills section',
          'Relevant project experience highlighted',
          'Clear education background',
          'Good use of action verbs'
        ],
        improvements: [
          'Add quantifiable achievements with metrics',
          'Include more industry-specific keywords',
          'Optimize formatting for ATS systems',
          'Add a professional summary section'
        ],
        missingSkills: [
          'Cloud platforms (AWS, Azure)',
          'Machine Learning frameworks',
          'DevOps tools and practices',
          'Data visualization tools'
        ],
        atsCompatibility: 85,
        suggestions: [
          'Use standard section headings',
          'Include relevant certifications',
          'Add LinkedIn profile URL',
          'Ensure consistent formatting'
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleResetAnalysis = () => {
    setSelectedFile(null);
    setAnalysisResults(null);
    setIsAnalyzing(false);
    // Reset file input
    const fileInput = document.getElementById('resume-upload');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="p-4 md:p-8">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-3">
              <MdOutlineAnalytics className="text-indigo-400" size={32} />
              <h1 className="text-3xl font-bold text-gray-900">Resume Analyzer</h1>
            </div>
            <button 
              onClick={handleResetAnalysis}
              className="flex items-center space-x-2 bg-white text-gray-600 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <BiRefresh size={18} />
              <span>Reset Analysis</span>
            </button>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Your Resume</h2>
            
            {!selectedFile ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors">
                <MdOutlineUploadFile className="mx-auto text-gray-600 mb-4" size={48} />
                <p className="text-gray-600 mb-4">Drag and drop your resume here, or click to browse</p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload"
                />
                <label
                  htmlFor="resume-upload"
                  className="bg-indigo-500 text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-indigo-600 cursor-pointer transition-colors duration-300"
                >
                  Choose File
                </label>
                <p className="text-sm text-gray-500 mt-2">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-gray-100 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <MdOutlineInsertDriveFile className="text-indigo-400" size={24} />
                  <span className="text-gray-900">{selectedFile.name}</span>
                  <span className="text-gray-600 text-sm">({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                </div>
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="bg-indigo-500 text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-indigo-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-300"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
                </button>
              </div>
            )}
          </div>

          {/* Analysis Results */}
          {(isAnalyzing || analysisResults) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Overall Score Card */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">Overall Score</h3>
                  <MdOutlineAnalytics className="text-indigo-400" size={20} />
                </div>
                {isAnalyzing ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-400"></div>
                    <span className="text-gray-600">Analyzing your resume...</span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="text-4xl font-bold text-gray-900">{analysisResults?.overallScore}</div>
                      <div className="text-indigo-400 text-lg">/100</div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className="bg-indigo-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${analysisResults?.overallScore}%` }}
                      ></div>
                    </div>
                  </>
                )}
              </div>

              {/* ATS Compatibility Card */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">ATS Compatibility</h3>
                  <FaCheckCircle className="text-green-400" size={20} />
                </div>
                {isAnalyzing ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
                    <span className="text-gray-600">Checking ATS compatibility...</span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="text-4xl font-bold text-gray-900">{analysisResults?.atsCompatibility}</div>
                      <div className="text-green-400 text-lg">%</div>
                    </div>
                    <p className="text-sm text-gray-600">Good ATS compatibility score</p>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Detailed Analysis */}
          {analysisResults && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center space-x-2 mb-4">
                  <FaCheckCircle className="text-green-400" size={20} />
                  <h3 className="text-xl font-semibold text-gray-900">Strengths</h3>
                </div>
                <ul className="space-y-2">
                  {analysisResults.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <FaCheckCircle className="text-green-400 text-sm mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Areas for Improvement */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center space-x-2 mb-4">
                  <FaExclamationTriangle className="text-yellow-400" size={20} />
                  <h3 className="text-xl font-semibold text-gray-900">Areas for Improvement</h3>
                </div>
                <ul className="space-y-2">
                  {analysisResults.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <FaExclamationTriangle className="text-yellow-400 text-sm mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Missing Skills */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center space-x-2 mb-4">
                  <FaTimesCircle className="text-red-400" size={20} />
                  <h3 className="text-xl font-semibold text-gray-900">Missing Skills</h3>
                </div>
                <ul className="space-y-2">
                  {analysisResults.missingSkills.map((skill, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <FaTimesCircle className="text-red-400 text-sm mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suggestions */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">Suggestions</h3>
                  <BiDownload className="text-indigo-400 hover:text-gray-900 cursor-pointer" size={20} />
                </div>
                <ul className="space-y-2">
                  {analysisResults.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {analysisResults && (
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button className="flex-1 bg-indigo-500 text-white py-3 px-6 rounded-full font-semibold hover:bg-indigo-600 transition-colors duration-300">
                Download Analysis Report
              </button>
              <button className="flex-1 bg-gray-100 text-gray-900 py-3 px-6 rounded-full font-semibold hover:bg-gray-200 transition-colors duration-300">
                Generate Career Roadmap
              </button>
              <button className="flex-1 bg-gray-100 text-gray-900 py-3 px-6 rounded-full font-semibold hover:bg-gray-200 transition-colors duration-300">
                Upload New Resume
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default ResumeAnalyzer;