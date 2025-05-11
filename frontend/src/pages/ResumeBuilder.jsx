import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Import all templates
import FresherTemplate1 from '../components/Templates/Fresher/FresherTemplate1';
import FresherTemplate2 from '../components/Templates/Fresher/FresherTemplate2';
import FresherTemplate3 from '../components/Templates/Fresher/FresherTemplate3';
import FresherTemplate4 from '../components/Templates/Fresher/FresherTemplate4';
import FresherTemplate5 from '../components/Templates/Fresher/FresherTemplate5';
import FresherTemplate6 from '../components/Templates/Fresher/FresherTemplate6';
import FresherTemplate7 from '../components/Templates/Fresher/FresherTemplate7';
import FresherTemplate8 from '../components/Templates/Fresher/FresherTemplate8';
import FresherTemplate9 from '../components/Templates/Fresher/FresherTemplate9';

import ExperiencedTemplate1 from '../components/Templates/Experienced/ExperiencedTemplate1';
import ExperiencedTemplate2 from '../components/Templates/Experienced/ExperiencedTemplate2';
import ExperiencedTemplate3 from '../components/Templates/Experienced/ExperiencedTemplate3';
import ExperiencedTemplate4 from '../components/Templates/Experienced/ExperiencedTemplate4';
import ExperiencedTemplate5 from '../components/Templates/Experienced/ExperiencedTemplate5';
// import ExperiencedTemplate6 from '../components/Templates/Experienced/ExperiencedTemplate6';
// import ExperiencedTemplate7 from '../components/Templates/Experienced/ExperiencedTemplate7';
// import ExperiencedTemplate8 from '../components/Templates/Experienced/ExperiencedTemplate8';
import NonITTemplate1 from '../components/Templates/NonIT/NonITTemplate1';
import NonITTemplate2 from '../components/Templates/NonIT/NonITTemplate2';
import NonITTemplate3 from '../components/Templates/NonIT/NonITTemplate3';

const ResumeBuilder = () => {
  const { templateType } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const templateId = new URLSearchParams(location.search).get('template');

  const [formData, setFormData] = useState({
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
  });

  const [fontColor, setFontColor] = useState('#000000');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleArrayChange = (section, index, e) => {
    const updated = [...formData[section]];
    updated[index][e.target.name] = e.target.value;
    setFormData((prev) => ({ ...prev, [section]: updated }));
  };

  const handleTextArrayChange = (section, index, e) => {
    const updated = [...formData[section]];
    updated[index] = e.target.value;
    setFormData((prev) => ({ ...prev, [section]: updated }));
  };

  const handleDescriptionChange = (section, index, descIndex, e) => {
    const updated = [...formData[section]];
    updated[index].description[descIndex] = e.target.value;
    setFormData((prev) => ({ ...prev, [section]: updated }));
  };

  const addItem = (section) => {
    if (section === 'achievements' || section === 'activities') {
      setFormData((prev) => ({ ...prev, [section]: [...prev[section], ''] }));
    } else if (section === 'experience') {
      setFormData((prev) => ({ 
        ...prev, 
        [section]: [...prev[section], { 
          company: '', 
          role: '', 
          duration: '', 
          description: [''] 
        }] 
      }));
    } else {
      const newItem = Object.fromEntries(Object.keys(formData[section][0]).map((key) => [key, '']));
      setFormData((prev) => ({ ...prev, [section]: [...prev[section], newItem] }));
    }
  };

  const addDescription = (section, index) => {
    const updated = [...formData[section]];
    updated[index].description.push('');
    setFormData((prev) => ({ ...prev, [section]: updated }));
  };

  const removeItem = (section, index) => {
    const updated = formData[section].filter((_, idx) => idx !== index);
    setFormData((prev) => ({ ...prev, [section]: updated }));
  };

  const removeDescription = (section, index, descIndex) => {
    const updated = [...formData[section]];
    updated[index].description = updated[index].description.filter((_, idx) => idx !== descIndex);
    setFormData((prev) => ({ ...prev, [section]: updated }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setFormData((prev) => ({ ...prev, photo: reader.result }));
    if (file) reader.readAsDataURL(file);
  };

  const downloadResume = async () => {
  setIsGeneratingPDF(true);
  const resume = document.getElementById('resume-preview');
  
  // Store original styles
  const originalOverflow = resume.style.overflow;
  const originalHeight = resume.style.height;
  const originalPosition = resume.style.position;
  
  // Create a container for the cloned resume
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-10000px';
  container.style.top = '0';
  container.style.width = `${resume.offsetWidth}px`;
  container.style.height = 'auto';
  container.style.overflow = 'visible';
  
  // Clone the resume node
  const clone = resume.cloneNode(true);
  clone.id = 'resume-clone';
  clone.style.height = 'auto';
  clone.style.overflow = 'visible';
  
  // Add to DOM
  container.appendChild(clone);
  document.body.appendChild(container);
  
  try {
    // Calculate dimensions after clone is in DOM
    const totalHeight = clone.scrollHeight;
    const totalWidth = clone.scrollWidth;
    
    const canvas = await html2canvas(clone, {
      scale: 2,
      scrollY: 0,
      useCORS: true,
      windowHeight: totalHeight,
      height: totalHeight,
      width: totalWidth,
      logging: false,
      backgroundColor: '#ffffff',
      onclone: (document) => {
        // Ensure cloned element has correct styles
        const clonedResume = document.getElementById('resume-clone');
        clonedResume.style.overflow = 'visible';
        clonedResume.style.height = 'auto';
      }
    });

    // Create PDF with proper dimensions (in mm)
    const imgWidth = canvas.width * 0.264583;
    const imgHeight = canvas.height * 0.264583;
    
    // Determine PDF orientation
    const pdf = new jsPDF({
      orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
      unit: 'mm',
      format: [imgWidth, imgHeight]
    });

    // Add image to PDF
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
    
    // Generate filename
    let filename = 'my_resume.pdf';
    if (formData.fullName && formData.fullName.trim() !== '') {
      const sanitizedName = formData.fullName
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, '');
      filename = `${sanitizedName}_resume.pdf`;
    }
    
    pdf.save(filename);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
  } finally {
    // Clean up
    const container = document.querySelector('div[style*="-10000px"]');
    if (container) {
      document.body.removeChild(container);
    }
    setIsGeneratingPDF(false);
  }
};

  const templateComponents = {
    fresher1: <FresherTemplate1 formData={{...formData, summary: formData.summary}} fontColor={fontColor} fontFamily={fontFamily} />,
    fresher2: <FresherTemplate2 formData={{...formData, summary: formData.summary}} fontColor={fontColor} fontFamily={fontFamily} />,
    fresher3: <FresherTemplate3 formData={{...formData, summary: formData.summary}} fontColor={fontColor} fontFamily={fontFamily} />,
    fresher4: <FresherTemplate4 formData={{...formData, summary: formData.summary}} fontColor={fontColor} fontFamily={fontFamily} />,
    fresher5: <FresherTemplate5 formData={{...formData, summary: formData.summary}} fontColor={fontColor} fontFamily={fontFamily} />,
    fresher6: <FresherTemplate6 formData={{...formData, summary: formData.summary}} fontColor={fontColor} fontFamily={fontFamily} />,
    fresher7: <FresherTemplate7 formData={{...formData, summary: formData.summary}} fontColor={fontColor} fontFamily={fontFamily} />,
    fresher8: <FresherTemplate8 formData={{...formData, summary: formData.summary}} fontColor={fontColor} fontFamily={fontFamily} />,
    fresher9: <FresherTemplate9 formData={{...formData, summary: formData.summary}} fontColor={fontColor} fontFamily={fontFamily} />,

    experienced1: <ExperiencedTemplate1 formData={formData} fontColor={fontColor} fontFamily={fontFamily} />,
    experienced2: <ExperiencedTemplate2 formData={formData} fontColor={fontColor} fontFamily={fontFamily} />,
    experienced3: <ExperiencedTemplate3 formData={formData} fontColor={fontColor} fontFamily={fontFamily} />,
    experienced4: <ExperiencedTemplate4 formData={formData} fontColor={fontColor} fontFamily={fontFamily} />,
    experienced5: <ExperiencedTemplate5 formData={formData} fontColor={fontColor} fontFamily={fontFamily} />,
    // experienced6: <ExperiencedTemplate6 formData={formData} fontColor={fontColor} fontFamily={fontFamily} />,
    // experienced7: <ExperiencedTemplate7 formData={formData} fontColor={fontColor} fontFamily={fontFamily} />,
    // experienced8: <ExperiencedTemplate8 formData={formData} fontColor={fontColor} fontFamily={fontFamily} />,
    nonit1: <NonITTemplate1 formData={{...formData, summary: formData.summary}} fontColor={fontColor} fontFamily={fontFamily} />,
    nonit2: <NonITTemplate2 formData={{...formData, summary: formData.summary}} fontColor={fontColor} fontFamily={fontFamily} />,
    nonit3: <NonITTemplate3 formData={{...formData, summary: formData.summary}} fontColor={fontColor} fontFamily={fontFamily} />,
  };

  const showExperience = templateType === 'experienced' || templateType === 'nonit';
  const showInternships = templateType === 'fresher';
  const showCareerObjective = templateType === 'fresher' || templateType === 'nonit' || templateType === 'experienced';
  const showProjects = templateType !== 'experienced';

  const SelectedTemplate = templateComponents[templateId] || <div className="text-red-500 text-center">Invalid template or no template selected.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Build {templateType} Resume
            </h1>
            <p className="text-gray-500 text-sm">Fill in your details and see the live preview</p>
          </div>
          <button 
            onClick={downloadResume} 
            disabled={isGeneratingPDF}
            className={`flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all shadow hover:shadow-md text-sm ${isGeneratingPDF ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isGeneratingPDF ? (
              'Generating...'
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download PDF
              </>
            )}
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Form Section */}
          <div className="w-full lg:w-[38%] bg-white p-5 rounded-lg shadow border border-gray-200 space-y-6 overflow-y-auto max-h-[85vh]">
            <form className="space-y-5">
              {/* Photo Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
                <div className="flex items-center gap-3">
                  <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-4 pb-5">
                      <svg className="w-7 h-7 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <p className="text-xs text-gray-500">PNG, JPG or JPEG</p>
                    </div>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                  {formData.photo && (
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm">
                      <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Personal Details */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-gray-800 border-b pb-1 border-gray-200">Personal Details</h3>
                {['fullName', 'email', 'phone', 'address'].map((field) => (
                  <div key={field} className="space-y-1">
                    <label className="block text-xs font-medium text-gray-700 capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</label>
                    <input 
                      type={field === 'email' ? 'email' : 'text'} 
                      name={field} 
                      placeholder={`Enter your ${field.replace(/([A-Z])/g, ' $1').toLowerCase().trim()}`} 
                      value={formData[field]} 
                      onChange={handleChange} 
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                    />
                  </div>
                ))}
              </div>

              {/* Career Objective */}
              {showCareerObjective && (
                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-gray-800 border-b pb-1 border-gray-200">Career Objective</h3>
                  <textarea 
                    name="summary" 
                    placeholder="Enter your career objective or summary" 
                    value={formData.summary} 
                    onChange={handleChange} 
                    rows={3}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              )}

              {/* Design Options */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-gray-800 border-b pb-1 border-gray-200">Design Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-gray-700">Font Color</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="color" 
                        value={fontColor} 
                        onChange={(e) => setFontColor(e.target.value)} 
                        className="w-9 h-9 p-1 border rounded-md cursor-pointer" 
                      />
                      <span className="text-xs text-gray-500">{fontColor}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-gray-700">Font Style</label>
                    <select 
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                      value={fontFamily} 
                      onChange={(e) => setFontFamily(e.target.value)}
                    >
                      <option value="Arial">Arial</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Times New Roman">Times New Roman</option>
                      <option value="Courier New">Courier New</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-semibold text-gray-800">Education</h3>
                  <button 
                    type="button" 
                    onClick={() => addItem('education')} 
                    className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add
                  </button>
                </div>
                {formData.education.map((edu, idx) => (
                  <div key={idx} className="space-y-2 p-3 text-sm bg-gray-50 rounded-md border border-gray-200 relative">
                    {formData.education.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeItem('education', idx)} 
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                    {['degree', 'school', 'location', 'year', 'grade'].map((field) => (
                      <div key={field} className="space-y-1">
                        <label className="block text-xs font-medium text-gray-700 capitalize">{field}</label>
                        <input 
                          type="text" 
                          name={field} 
                          placeholder={`Enter ${field}`} 
                          value={edu[field]} 
                          onChange={(e) => handleArrayChange('education', idx, e)} 
                          className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Experience */}
              {showExperience && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-semibold text-gray-800">Experience</h3>
                    <button 
                      type="button" 
                      onClick={() => addItem('experience')} 
                      className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add
                    </button>
                  </div>
                  {formData.experience.map((item, idx) => (
                    <div key={idx} className="space-y-2 p-3 text-sm bg-gray-50 rounded-md border border-gray-200 relative">
                      {formData.experience.length > 1 && (
                        <button 
                          type="button" 
                          onClick={() => removeItem('experience', idx)} 
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="block text-xs font-medium text-gray-700">Company</label>
                          <input 
                            type="text" 
                            name="company" 
                            placeholder="Enter company name" 
                            value={item.company} 
                            onChange={(e) => handleArrayChange('experience', idx, e)} 
                            className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-xs font-medium text-gray-700">Role</label>
                          <input 
                            type="text" 
                            name="role" 
                            placeholder="Enter your role" 
                            value={item.role} 
                            onChange={(e) => handleArrayChange('experience', idx, e)} 
                            className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-medium text-gray-700">Duration</label>
                        <input 
                          type="text" 
                          name="duration" 
                          placeholder="Enter duration (e.g., Jan 2020 - Present)" 
                          value={item.duration} 
                          onChange={(e) => handleArrayChange('experience', idx, e)} 
                          className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="block text-xs font-medium text-gray-700">Description Bullet Points</label>
                          <button 
                            type="button" 
                            onClick={() => addDescription('experience', idx)} 
                            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Point
                          </button>
                        </div>
                        {item.description.map((desc, descIdx) => (
                          <div key={descIdx} className="flex items-start gap-2">
                            <div className="flex-1">
                              <input
                                type="text"
                                value={desc}
                                onChange={(e) => handleDescriptionChange('experience', idx, descIdx, e)}
                                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Enter achievement or responsibility"
                              />
                            </div>
                            {item.description.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeDescription('experience', idx, descIdx)}
                                className="mt-1.5 text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Internships - Only shown for fresher templates */}
              {showInternships && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-semibold text-gray-800">Internships</h3>
                    <button 
                      type="button" 
                      onClick={() => addItem('internships')} 
                      className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add
                    </button>
                  </div>
                  {formData.internships.map((item, idx) => (
                    <div key={idx} className="space-y-2 p-3 text-sm bg-gray-50 rounded-md border border-gray-200 relative">
                      {formData.internships.length > 1 && (
                        <button 
                          type="button" 
                          onClick={() => removeItem('internships', idx)} 
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}
                      {Object.keys(item).map((field) => (
                        <div key={field} className="space-y-1">
                          <label className="block text-xs font-medium text-gray-700 capitalize">{field}</label>
                          <input 
                            type="text" 
                            name={field} 
                            placeholder={`Enter ${field}`} 
                            value={item[field]} 
                            onChange={(e) => handleArrayChange('internships', idx, e)} 
                            className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {/* Projects - Shown for all except experienced templates */}
              {showProjects && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-semibold text-gray-800">Projects</h3>
                    <button 
                      type="button" 
                      onClick={() => addItem('projects')} 
                      className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add
                    </button>
                  </div>
                  {formData.projects.map((item, idx) => (
                    <div key={idx} className="space-y-2 p-3 text-sm bg-gray-50 rounded-md border border-gray-200 relative">
                      {formData.projects.length > 1 && (
                        <button 
                          type="button" 
                          onClick={() => removeItem('projects', idx)} 
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}
                      {Object.keys(item).map((field) => (
                        field === 'description' ? (
                          <div key={field} className="space-y-1">
                            <label className="block text-xs font-medium text-gray-700 capitalize">Description</label>
                            <textarea
                              name={field}
                              placeholder="Enter description (use new lines for bullet points)"
                              value={item[field]}
                              onChange={(e) => handleArrayChange('projects', idx, e)}
                              className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                              rows={2}
                            />
                          </div>
                        ) : (
                          <div key={field} className="space-y-1">
                            <label className="block text-xs font-medium text-gray-700 capitalize">{field}</label>
                            <input 
                              type="text" 
                              name={field} 
                              placeholder={`Enter ${field}`} 
                              value={item[field]} 
                              onChange={(e) => handleArrayChange('projects', idx, e)} 
                              className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                            />
                          </div>
                        )
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {/* Certifications */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-semibold text-gray-800">Certifications</h3>
                  <button 
                    type="button" 
                    onClick={() => addItem('certifications')} 
                    className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add
                  </button>
                </div>
                {formData.certifications.map((item, idx) => (
                  <div key={idx} className="space-y-2 p-3 text-sm bg-gray-50 rounded-md border border-gray-200 relative">
                    {formData.certifications.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeItem('certifications', idx)} 
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                    {Object.keys(item).map((field) => (
                      <div key={field} className="space-y-1">
                        <label className="block text-xs font-medium text-gray-700 capitalize">{field}</label>
                        <input 
                          type="text" 
                          name={field} 
                          placeholder={`Enter ${field}`} 
                          value={item[field]} 
                          onChange={(e) => handleArrayChange('certifications', idx, e)} 
                          className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-gray-800 border-b pb-1 border-gray-200">Skills</h3>
                <textarea 
                  name="skills" 
                  placeholder="Enter skills separated by commas (e.g., JavaScript, React, Node.js)" 
                  value={formData.skills} 
                  onChange={handleChange} 
                  rows={2}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              {/* Achievements */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-semibold text-gray-800">Achievements</h3>
                  <button 
                    type="button" 
                    onClick={() => addItem('achievements')} 
                    className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add
                  </button>
                </div>
                {formData.achievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="flex-1">
                      <textarea
                        value={achievement}
                        onChange={(e) => handleTextArrayChange('achievements', idx, e)}
                        className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Enter achievement"
                        rows={1}
                      />
                    </div>
                    {formData.achievements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem('achievements', idx)}
                        className="mt-1.5 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Activities */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-semibold text-gray-800">Activities</h3>
                  <button 
                    type="button" 
                    onClick={() => addItem('activities')} 
                    className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add
                  </button>
                </div>
                {formData.activities.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="flex-1">
                      <textarea
                        value={activity}
                        onChange={(e) => handleTextArrayChange('activities', idx, e)}
                        className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Enter activity"
                        rows={1}
                      />
                    </div>
                    {formData.activities.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem('activities', idx)}
                        className="mt-1.5 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </form>
          </div>

          {/* Preview Section */}
          <div className="w-full lg:w-[62%]">
            <div id="resume-preview" className="w-full bg-white p-4 rounded shadow overflow-auto max-h-[85vh]">
              {SelectedTemplate}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;