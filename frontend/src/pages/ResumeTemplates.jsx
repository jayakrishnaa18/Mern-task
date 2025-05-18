import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FiDownload, FiCheck, FiEdit, FiGrid } from 'react-icons/fi';
import AppHeader from '../components/AppHeader';

// Import all templates...
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

import NonITTemplate1 from '../components/Templates/NonIT/NonITTemplate1';
import NonITTemplate2 from '../components/Templates/NonIT/NonITTemplate2';
import NonITTemplate3 from '../components/Templates/NonIT/NonITTemplate3';

const allTemplates = {
  fresher: [
    { id: "fresher1", name: "Executive", image: "../assets/fresher1.jpg", color: "from-blue-100 to-blue-50" },
    { id: "fresher2", name: "Modern Pro", image: "../assets/fresher2.jpg", color: "from-purple-100 to-purple-50" },
    { id: "fresher3", name: "Minimalist", image: "../assets/fresher3.jpg", color: "from-green-100 to-green-50" },
    { id: "fresher4", name: "Creative", image: "../assets/fresher4.jpg", color: "from-yellow-100 to-yellow-50" },
    { id: "fresher5", name: "Corporate", image: "../assets/fresher5.jpg", color: "from-red-100 to-red-50" },
    { id: "fresher6", name: "Classic", image: "../assets/fresher6.jpg", color: "from-indigo-100 to-indigo-50" },
    { id: "fresher7", name: "Elite", image: "../assets/fresher7.jpg", color: "from-pink-100 to-pink-50" },
    { id: "fresher8", name: "Innovator", image: "../assets/fresher8.jpg", color: "from-teal-100 to-teal-50" },
    { id: "fresher9", name: "Visionary", image: "../assets/fresher9.jpg", color: "from-orange-100 to-orange-50" },
  ],
  experienced: [
    { id: "experienced1", name: "Senior Pro", image: "../assets/experienced1.jpg", color: "from-blue-100 to-blue-50" },
    { id: "experienced2", name: "Leadership", image: "../assets/experienced2.jpg", color: "from-purple-100 to-purple-50" },
    { id: "experienced3", name: "Director", image: "../assets/experienced3.jpg", color: "from-green-100 to-green-50" },
    { id: "experienced4", name: "Executive", image: "../assets/experienced4.jpg", color: "from-yellow-100 to-yellow-50" },
    { id: "experienced5", name: "Extro", image: "../assets/experienced5.jpg", color: "from-red-100 to-red-50" },
  ],
  nonit: [
    { id: "nonit1", name: "Portfolio", image: "../assets/nonit1.jpg", color: "from-indigo-100 to-indigo-50" },
    { id: "nonit2", name: "Creative Pro", image: "../assets/nonit2.jpg", color: "from-pink-100 to-pink-50" },
    { id: "nonit3", name: "Artistic", image: "../assets/nonit3.jpg", color: "from-teal-100 to-teal-50" },
  ],
};

const ResumeTemplates = () => {
  const { templateType } = useParams();
  const navigate = useNavigate();
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [isDark, setIsDark] = useState(false);

  const formData = JSON.parse(localStorage.getItem('resumeFormData')) || {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    education: [],
    experience: [],
    internships: [],
    skills: '',
    projects: [],
    certifications: [],
    achievements: [],
    activities: [],
    photo: null,
  };

  const downloadResume = async () => {
    setIsGeneratingPDF(true);
    const resume = document.getElementById('resume-preview');

    try {
      const canvas = await html2canvas(resume, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);

      let filename = 'my_resume.pdf';
      if (formData.fullName && formData.fullName.trim() !== '') {
        const sanitizedName = formData.fullName.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
        filename = `${sanitizedName}_resume.pdf`;
      }

      pdf.save(filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplateId(templateId);
    setViewMode('preview');
  };

  const handleBackToEditing = () => {
    localStorage.setItem('selectedTemplateId', selectedTemplateId);
    navigate(`/resume-form/${templateType}`);
  };

  const templateComponents = {
    fresher1: <FresherTemplate1 formData={formData} />,
    fresher2: <FresherTemplate2 formData={formData} />,
    fresher3: <FresherTemplate3 formData={formData} />,
    fresher4: <FresherTemplate4 formData={formData} />,
    fresher5: <FresherTemplate5 formData={formData} />,
    fresher6: <FresherTemplate6 formData={formData} />,
    fresher7: <FresherTemplate7 formData={formData} />,
    fresher8: <FresherTemplate8 formData={formData} />,
    fresher9: <FresherTemplate9 formData={formData} />,

    experienced1: <ExperiencedTemplate1 formData={formData} />,
    experienced2: <ExperiencedTemplate2 formData={formData} />,
    experienced3: <ExperiencedTemplate3 formData={formData} />,
    experienced4: <ExperiencedTemplate4 formData={formData} />,
    experienced5: <ExperiencedTemplate5 formData={formData} />,

    nonit1: <NonITTemplate1 formData={formData} />,
    nonit2: <NonITTemplate2 formData={formData} />,
    nonit3: <NonITTemplate3 formData={formData} />,
  };

  const SelectedTemplate = selectedTemplateId
    ? templateComponents[selectedTemplateId]
    : <div className="text-center py-20 text-gray-500">Select a template to preview</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <AppHeader
          title={viewMode === 'preview' ? 'Resume Preview' : 'Choose Your Template'}
          showBackButton={true}
          isDark={isDark}
          setIsDark={setIsDark}
        />

        {viewMode === 'grid' ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Available Templates</h2>
              <button
                onClick={handleBackToEditing}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiEdit /> Back to Editing
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {allTemplates[templateType].map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.id)}
                  className={`group relative rounded-2xl bg-gradient-to-br from-white via-gray-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-md hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-105 cursor-pointer ${selectedTemplateId === template.id ? 'ring-4 ring-blue-500' : ''}`}
                >
                  <div className="relative h-[420px] flex items-center justify-center overflow-hidden rounded-t-2xl bg-white dark:bg-gray-800 p-4">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                    {selectedTemplateId === template.id && (
                      <div className="absolute top-4 right-4 bg-blue-600 text-white p-2 rounded-full shadow-md">
                        <FiCheck className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center px-5 py-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-b-2xl">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white truncate">{template.name}</h3>
                    <span className="text-xs text-blue-600 bg-blue-100 dark:bg-blue-700 dark:text-white px-3 py-1 rounded-full shadow-sm">
                      Preview
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setViewMode('grid')}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  <FiGrid /> Change Template
                </button>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Resume Preview</h2>
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <button
                  onClick={handleBackToEditing}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  <FiEdit /> Back to Editing
                </button>

                <div className="relative min-w-[200px]">
                  <select
                    value={selectedTemplateId}
                    onChange={(e) => setSelectedTemplateId(e.target.value)}
                    className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 pr-8 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full cursor-pointer"
                  >
                    {allTemplates[templateType].map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600 dark:text-gray-400">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <button
                  onClick={downloadResume}
                  disabled={isGeneratingPDF}
                  className={`flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors ${isGeneratingPDF ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  <FiDownload /> Download PDF
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <div
                id="resume-preview"
                className="w-full bg-white shadow-md"
                style={{
                  minHeight: '297mm',
                  maxWidth: '210mm',
                  margin: '0 auto',
                  color: '#333333'
                }}
              >
                {SelectedTemplate}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeTemplates;
