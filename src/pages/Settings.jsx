import React, { useState } from 'react';
import { MdOutlineSettings, MdOutlinePerson, MdOutlineNotifications, MdOutlineSecurity, MdOutlineStorage } from 'react-icons/md';
import { BiRefresh, BiDownload, BiSave, BiEdit, BiTrash } from 'react-icons/bi';
import { FaUser, FaEnvelope, FaBell, FaEye, FaEyeSlash, FaLock, FaDatabase } from 'react-icons/fa';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  
  // Profile settings state
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Aspiring AI Engineer with passion for machine learning and data science.',
    location: 'San Francisco, CA',
    linkedin: 'https://linkedin.com/in/johndoe',
    website: 'https://johndoe.dev'
  });

  // Notification settings state
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    roadmapUpdates: true,
    newFeatures: true,
    weeklyDigest: false,
    marketingEmails: false
  });

  // Account settings state
  const [accountSettings, setAccountSettings] = useState({
    twoFactorAuth: false,
    profileVisibility: 'private',
    dataCollection: true,
    analyticsSharing: false
  });

  const tabOptions = [
    { id: 'profile', name: 'Profile', icon: MdOutlinePerson },
    { id: 'notifications', name: 'Notifications', icon: MdOutlineNotifications },
    { id: 'security', name: 'Security', icon: MdOutlineSecurity },
    { id: 'privacy', name: 'Privacy & Data', icon: MdOutlineStorage }
  ];

  const handleInputChange = (section, field, value) => {
    switch (section) {
      case 'profile':
        setProfileData(prev => ({ ...prev, [field]: value }));
        break;
      case 'notifications':
        setNotifications(prev => ({ ...prev, [field]: value }));
        break;
      case 'account':
        setAccountSettings(prev => ({ ...prev, [field]: value }));
        break;
      default:
        break;
    }
  };

  const handleEditToggle = (field) => {
    setIsEditing(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSaveSettings = () => {
    // Save settings logic would go here
    console.log('Saving settings...', { profileData, notifications, accountSettings });
    setIsEditing({});
    // Show success message
  };

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default values?')) {
      // Reset logic would go here
      console.log('Resetting settings...');
    }
  };

  const handleDeleteAccount = () => {
    const confirmText = prompt('Type "DELETE" to confirm account deletion:');
    if (confirmText === 'DELETE') {
      // Delete account logic would go here
      console.log('Deleting account...');
    }
  };

  const handleExportData = () => {
    // Export user data logic would go here
    console.log('Exporting user data...');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="p-4 md:p-8">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-3">
              <MdOutlineSettings className="text-indigo-400" size={32} />
              <h1 className="text-3xl font-bold text-gray-900">Admin & Settings</h1>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={handleSaveSettings}
                className="flex items-center space-x-2 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
              >
                <BiSave size={18} />
                <span className="hidden md:inline">Save Changes</span>
              </button>
              <button 
                onClick={handleResetSettings}
                className="flex items-center space-x-2 bg-white text-gray-600 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <BiRefresh size={18} />
                <span className="hidden md:inline">Reset</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Settings Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
                <nav className="space-y-2">
                  {tabOptions.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'bg-indigo-500 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <tab.icon size={18} />
                      <span>{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3">
              {/* Profile Settings */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <FaUser className="text-indigo-400" size={20} />
                      <span>Personal Information</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">First Name</label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={profileData.firstName}
                            onChange={(e) => handleInputChange('profile', 'firstName', e.target.value)}
                            disabled={!isEditing.firstName}
                            className="flex-1 bg-gray-100 text-gray-900 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 border border-gray-300 disabled:opacity-60"
                          />
                          <button
                            onClick={() => handleEditToggle('firstName')}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <BiEdit size={18} />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Last Name</label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={profileData.lastName}
                            onChange={(e) => handleInputChange('profile', 'lastName', e.target.value)}
                            disabled={!isEditing.lastName}
                            className="flex-1 bg-gray-100 text-gray-900 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 border border-gray-300 disabled:opacity-60"
                          />
                          <button
                            onClick={() => handleEditToggle('lastName')}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <BiEdit size={18} />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="email"
                            value={profileData.email}
                            onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
                            disabled={!isEditing.email}
                            className="flex-1 bg-gray-100 text-gray-900 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 border border-gray-300 disabled:opacity-60"
                          />
                          <button
                            onClick={() => handleEditToggle('email')}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <BiEdit size={18} />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Phone</label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
                            disabled={!isEditing.phone}
                            className="flex-1 bg-gray-100 text-gray-900 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 border border-gray-300 disabled:opacity-60"
                          />
                          <button
                            onClick={() => handleEditToggle('phone')}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <BiEdit size={18} />
                          </button>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Bio</label>
                        <div className="flex items-start space-x-2">
                          <textarea
                            value={profileData.bio}
                            onChange={(e) => handleInputChange('profile', 'bio', e.target.value)}
                            disabled={!isEditing.bio}
                            rows="3"
                            className="flex-1 bg-gray-100 text-gray-900 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 border border-gray-300 disabled:opacity-60 resize-none"
                          />
                          <button
                            onClick={() => handleEditToggle('bio')}
                            className="text-gray-600 hover:text-gray-900 mt-2"
                          >
                            <BiEdit size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <FaBell className="text-indigo-400" size={20} />
                      <span>Notification Preferences</span>
                    </h3>
                    
                    <div className="space-y-4">
                      {Object.entries(notifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {getNotificationDescription(key)}
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) => handleInputChange('notifications', key, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <FaLock className="text-indigo-400" size={20} />
                      <span>Security Settings</span>
                    </h3>
                    
                    <div className="space-y-6">
                      <div className="p-4 bg-gray-100 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Change Password</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Current Password</label>
                            <div className="relative">
                              <input
                                type={showPassword ? "text" : "password"}
                                className="w-full bg-gray-600 text-gray-900 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                placeholder="Enter current password"
                              />
                              <button
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                              >
                                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">New Password</label>
                            <input
                              type="password"
                              className="w-full bg-gray-600 text-gray-900 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                              placeholder="Enter new password"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Confirm New Password</label>
                            <input
                              type="password"
                              className="w-full bg-gray-600 text-gray-900 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                              placeholder="Confirm new password"
                            />
                          </div>
                          <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors">
                            Update Password
                          </button>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-100 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                            <p className="text-sm text-gray-600 mt-1">Add an extra layer of security to your account</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={accountSettings.twoFactorAuth}
                              onChange={(e) => handleInputChange('account', 'twoFactorAuth', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy & Data Settings */}
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <FaDatabase className="text-indigo-400" size={20} />
                      <span>Privacy & Data Management</span>
                    </h3>
                    
                    <div className="space-y-6">
                      <div className="p-4 bg-gray-100 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-4">Data Export & Download</h4>
                        <p className="text-gray-600 text-sm mb-4">Download a copy of all your data including profile information, analysis history, and generated roadmaps.</p>
                        <button 
                          onClick={handleExportData}
                          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <BiDownload size={18} />
                          <span>Export My Data</span>
                        </button>
                      </div>

                      <div className="p-4 bg-gray-100 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-4">Profile Visibility</h4>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="visibility"
                              value="public"
                              checked={accountSettings.profileVisibility === 'public'}
                              onChange={(e) => handleInputChange('account', 'profileVisibility', e.target.value)}
                              className="form-radio text-indigo-400"
                            />
                            <div>
                              <span className="text-gray-900">Public</span>
                              <p className="text-sm text-gray-600">Your profile is visible to everyone</p>
                            </div>
                          </label>
                          <label className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="visibility"
                              value="private"
                              checked={accountSettings.profileVisibility === 'private'}
                              onChange={(e) => handleInputChange('account', 'profileVisibility', e.target.value)}
                              className="form-radio text-indigo-400"
                            />
                            <div>
                              <span className="text-gray-900">Private</span>
                              <p className="text-sm text-gray-600">Only you can see your profile</p>
                            </div>
                          </label>
                        </div>
                      </div>

                      <div className="p-4 bg-red-900/20 border border-red-700 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                          <BiTrash className="text-red-400" size={18} />
                          <span>Delete Account</span>
                        </h4>
                        <p className="text-gray-600 text-sm mb-4">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                        <button 
                          onClick={handleDeleteAccount}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
      </div>
    </div>
  );
};

const getNotificationDescription = (key) => {
  const descriptions = {
    emailNotifications: 'Receive notifications via email',
    pushNotifications: 'Receive push notifications in your browser',
    roadmapUpdates: 'Get notified when your roadmap is updated',
    newFeatures: 'Be the first to know about new platform features',
    weeklyDigest: 'Receive a weekly summary of your progress',
    marketingEmails: 'Receive promotional emails and offers'
  };
  return descriptions[key] || 'Toggle this notification setting';
};

export default Settings;