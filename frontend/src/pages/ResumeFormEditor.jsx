import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUser, FaGraduationCap, FaBriefcase, FaProjectDiagram, FaCertificate, FaTrophy, FaRunning } from 'react-icons/fa';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import AppHeader from '../components/AppHeader';

const ResumeFormEditor = () => {
  const { templateType } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [isDark, setIsDark] = useState(false);

  const [formData, setFormData] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem('resumeFormData'));
    return savedData || {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      summary: '',
      education: [{ degree: '', school: '', location: '', year: '', grade: '' }],
      experience: [{ company: '', role: '', duration: '', description: [''] }],
      internships: [{ company: '', role: '', duration: '' }],
      skills: '',
      projects: [{ name: '', description: '' }],
      certifications: [{ name: '', issuer: '', year: '' }],
      achievements: [''],
      activities: [''],
      photo: null,
    };
  });

  useEffect(() => {
    const savedTemplateId = localStorage.getItem('selectedTemplateId');
    if (savedTemplateId) {
      localStorage.removeItem('selectedTemplateId');
    }

    if (localStorage.getItem('theme') === 'dark') {
      setIsDark(true);
    }
  }, []);

  const handleChange = (e) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);
    localStorage.setItem('resumeFormData', JSON.stringify(newFormData));
  };

  const handleArrayChange = (section, index, e) => {
    const updated = [...formData[section]];
    updated[index][e.target.name] = e.target.value;
    const newFormData = { ...formData, [section]: updated };
    setFormData(newFormData);
    localStorage.setItem('resumeFormData', JSON.stringify(newFormData));
  };

  const handleTextArrayChange = (section, index, e) => {
    const updated = [...formData[section]];
    updated[index] = e.target.value;
    const newFormData = { ...formData, [section]: updated };
    setFormData(newFormData);
    localStorage.setItem('resumeFormData', JSON.stringify(newFormData));
  };

  const handleDescriptionChange = (section, index, descIndex, e) => {
    const updated = [...formData[section]];
    updated[index].description[descIndex] = e.target.value;
    const newFormData = { ...formData, [section]: updated };
    setFormData(newFormData);
    localStorage.setItem('resumeFormData', JSON.stringify(newFormData));
  };

  const addItem = (section) => {
    let newFormData;
    if (section === 'achievements' || section === 'activities') {
      newFormData = { ...formData, [section]: [...formData[section], ''] };
    } else if (section === 'experience') {
      newFormData = {
        ...formData,
        [section]: [...formData[section], {
          company: '',
          role: '',
          duration: '',
          description: ['']
        }]
      };
    } else {
      const newItem = Object.fromEntries(
        Object.keys(formData[section][0]).map((key) => [key, ''])
      );
      newFormData = { ...formData, [section]: [...formData[section], newItem] };
    }
    setFormData(newFormData);
    localStorage.setItem('resumeFormData', JSON.stringify(newFormData));
  };

  const addDescription = (section, index) => {
    const updated = [...formData[section]];
    updated[index].description.push('');
    const newFormData = { ...formData, [section]: updated };
    setFormData(newFormData);
    localStorage.setItem('resumeFormData', JSON.stringify(newFormData));
  };

  const removeItem = (section, index) => {
    const updated = formData[section].filter((_, idx) => idx !== index);
    const newFormData = { ...formData, [section]: updated };
    setFormData(newFormData);
    localStorage.setItem('resumeFormData', JSON.stringify(newFormData));
  };

  const removeDescription = (section, index, descIndex) => {
    const updated = [...formData[section]];
    updated[index].description = updated[index].description.filter(
      (_, idx) => idx !== descIndex
    );
    const newFormData = { ...formData, [section]: updated };
    setFormData(newFormData);
    localStorage.setItem('resumeFormData', JSON.stringify(newFormData));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newFormData = { ...formData, photo: reader.result };
        setFormData(newFormData);
        localStorage.setItem('resumeFormData', JSON.stringify(newFormData));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('resumeFormData', JSON.stringify(formData));
    navigate(`/resume-templates/${templateType}`);
  };

  const tabs = [
    { id: 'personal', icon: <FaUser />, label: 'Personal' },
    { id: 'summary', icon: <FaUser />, label: 'Summary' },
    { id: 'education', icon: <FaGraduationCap />, label: 'Education' },
    templateType !== 'fresher' && { id: 'experience', icon: <FaBriefcase />, label: 'Experience' },
    templateType === 'fresher' && { id: 'internships', icon: <FaBriefcase />, label: 'Internships' },
    { id: 'projects', icon: <FaProjectDiagram />, label: 'Projects' },
    { id: 'skills', icon: <FaCertificate />, label: 'Skills' },
    { id: 'certifications', icon: <FaCertificate />, label: 'Certifications' },
    { id: 'achievements', icon: <FaTrophy />, label: 'Achievements' },
    { id: 'activities', icon: <FaRunning />, label: 'Activities' },
  ].filter(Boolean);

  const goToNextTab = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  const goToPreviousTab = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  const renderFormSection = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-sm">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-sm">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-sm">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-sm">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-sm">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Profile Photo</label>
              <div className="flex items-center gap-6">
                <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, JPEG</p>
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
                {formData.photo && (
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 'summary':
        return (
          <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-sm">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Professional Summary</label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Describe your professional background, skills, and career objectives"
            />
          </div>
        );
      case 'education':
        return (
          <div className="space-y-6">
            {formData.education.map((edu, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-sm relative">
                {formData.education.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem('education', idx)}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Degree</label>
                    <input
                      type="text"
                      name="degree"
                      value={edu.degree}
                      onChange={(e) => handleArrayChange('education', idx, e)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">School/University</label>
                    <input
                      type="text"
                      name="school"
                      value={edu.school}
                      onChange={(e) => handleArrayChange('education', idx, e)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={edu.location}
                      onChange={(e) => handleArrayChange('education', idx, e)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Year</label>
                    <input
                      type="text"
                      name="year"
                      value={edu.year}
                      onChange={(e) => handleArrayChange('education', idx, e)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Grade/GPA</label>
                    <input
                      type="text"
                      name="grade"
                      value={edu.grade}
                      onChange={(e) => handleArrayChange('education', idx, e)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addItem('education')}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
            >
              Add Education
            </button>
          </div>
        );
      case 'experience':
        return (
          <div className="space-y-6">
            {formData.experience.map((exp, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-sm relative">
                {formData.experience.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem('experience', idx)}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={exp.company}
                      onChange={(e) => handleArrayChange('experience', idx, e)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Job Title</label>
                    <input
                      type="text"
                      name="role"
                      value={exp.role}
                      onChange={(e) => handleArrayChange('experience', idx, e)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Duration</label>
                    <input
                      type="text"
                      name="duration"
                      value={exp.duration}
                      onChange={(e) => handleArrayChange('experience', idx, e)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="e.g., Jan 2020 - Present"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Responsibilities</label>
                  {exp.description.map((desc, descIdx) => (
                    <div key={descIdx} className="flex items-center gap-3 mb-3">
                      <input
                        type="text"
                        value={desc}
                        onChange={(e) => handleDescriptionChange('experience', idx, descIdx, e)}
                        className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Describe your responsibilities"
                      />
                      {exp.description.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeDescription('experience', idx, descIdx)}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addDescription('experience', idx)}
                    className="mt-2 px-4 py-2 bg-blue-100 dark:bg-gray-700 text-blue-700 dark:text-blue-400 rounded-lg text-sm hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    + Add Responsibility
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addItem('experience')}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
            >
              Add Experience
            </button>
          </div>
        );
      case 'internships':
        return (
          <div className="space-y-6">
            {formData.internships.map((intern, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-sm relative">
                {formData.internships.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem('internships', idx)}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={intern.company}
                      onChange={(e) => handleArrayChange('internships', idx, e)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role</label>
                    <input
                      type="text"
                      name="role"
                      value={intern.role}
                      onChange={(e) => handleArrayChange('internships', idx, e)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Duration</label>
                    <input
                      type="text"
                      name="duration"
                      value={intern.duration}
                      onChange={(e) => handleArrayChange('internships', idx, e)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addItem('internships')}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
            >
              Add Internship
            </button>
          </div>
        );
      case 'projects':
        return (
          <div className="space-y-6">
            {formData.projects.map((project, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-sm relative">
                {formData.projects.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem('projects', idx)}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project Name</label>
                    <input
                      type="text"
                      name="name"
                      value={project.name}
                      onChange={(e) => handleArrayChange('projects', idx, e)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                    <textarea
                      name="description"
                      value={project.description}
                      onChange={(e) => handleArrayChange('projects', idx, e)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addItem('projects')}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
            >
              Add Project
            </button>
          </div>
        );
      case 'skills':
        return (
          <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-sm">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skills</label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="List your skills separated by commas (e.g., JavaScript, React, Node.js)"
            />
          </div>
        );
      case 'certifications':
        return (
          <div className="space-y-6">
            {formData.certifications.map((cert, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-sm relative">
                {formData.certifications.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem('certifications', idx)}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={cert.name}
                      onChange={(e) => handleArrayChange('certifications', idx, e)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Issuer</label>
                    <input
                      type="text"
                      name="issuer"
                      value={cert.issuer}
                      onChange={(e) => handleArrayChange('certifications', idx, e)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Year</label>
                    <input
                      type="text"
                      name="year"
                      value={cert.year}
                      onChange={(e) => handleArrayChange('certifications', idx, e)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addItem('certifications')}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
            >
              Add Certification
            </button>
          </div>
        );
      case 'achievements':
        return (
          <div className="space-y-6">
            {formData.achievements.map((achievement, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <input
                  type="text"
                  value={achievement}
                  onChange={(e) => handleTextArrayChange('achievements', idx, e)}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your achievement"
                />
                {formData.achievements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem('achievements', idx)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addItem('achievements')}
              className="mt-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
            >
              Add Achievement
            </button>
          </div>
        );
      case 'activities':
        return (
          <div className="space-y-6">
            {formData.activities.map((activity, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <input
                  type="text"
                  value={activity}
                  onChange={(e) => handleTextArrayChange('activities', idx, e)}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your activity"
                />
                {formData.activities.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem('activities', idx)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addItem('activities')}
              className="mt-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
            >
              Add Activity
            </button>
          </div>
        );
      default:
        return <div>Select a tab to edit</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <AppHeader
              title={
                templateType === 'fresher' ? 'Fresher Resume' :
                  templateType === 'experienced' ? 'Experienced Professional Resume' :
                    'Non-IT Professional Resume'
              }
              showBackButton={true}
              isDark={isDark}
              setIsDark={setIsDark}
            />
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Tabs */}
            <div className="w-full md:w-64 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
              <div className="p-4 space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-md'
                        : 'bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span className="text-sm font-semibold">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-2 border-gray-200 dark:border-gray-600">
                    {tabs.find(tab => tab.id === activeTab)?.label}
                  </h2>
                  {renderFormSection()}
                </div>

                <div className="flex justify-between pt-6">
  <button
    type="button"
    onClick={goToPreviousTab}
    disabled={activeTab === tabs[0].id}
    className={`flex items-center gap-2 px-6 py-3 rounded-lg shadow-md transition-all ${
      activeTab === tabs[0].id
        ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
        : 'bg-blue-600 hover:bg-blue-700 text-white'
    }`}
  >
    <FiArrowLeft className="text-lg" /> Previous
  </button>

  {activeTab === 'activities' ? ( // Changed from checking last tab to specifically checking 'activities'
    <button
      type="submit"
      className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
    >
      Continue to Templates <FiArrowRight className="text-lg" />
    </button>
  ) : (
    <button
      type="button"
      onClick={goToNextTab}
      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
    >
      Next <FiArrowRight className="text-lg" />
    </button>
  )}
</div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResumeFormEditor;