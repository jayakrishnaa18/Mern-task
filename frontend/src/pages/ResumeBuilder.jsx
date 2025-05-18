// // ResumeBuilder.jsx
// import React, { useState } from 'react';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// // Import all templates
// import FresherTemplate1 from '../components/Templates/Fresher/FresherTemplate1';
// import FresherTemplate2 from '../components/Templates/Fresher/FresherTemplate2';
// import FresherTemplate3 from '../components/Templates/Fresher/FresherTemplate3';
// import FresherTemplate4 from '../components/Templates/Fresher/FresherTemplate4';
// import FresherTemplate5 from '../components/Templates/Fresher/FresherTemplate5';
// import FresherTemplate6 from '../components/Templates/Fresher/FresherTemplate6';
// import FresherTemplate7 from '../components/Templates/Fresher/FresherTemplate7';
// import FresherTemplate8 from '../components/Templates/Fresher/FresherTemplate8';
// import FresherTemplate9 from '../components/Templates/Fresher/FresherTemplate9';

// import ExperiencedTemplate1 from '../components/Templates/Experienced/ExperiencedTemplate1';
// import ExperiencedTemplate2 from '../components/Templates/Experienced/ExperiencedTemplate2';
// import ExperiencedTemplate3 from '../components/Templates/Experienced/ExperiencedTemplate3';
// import ExperiencedTemplate4 from '../components/Templates/Experienced/ExperiencedTemplate4';
// import ExperiencedTemplate5 from '../components/Templates/Experienced/ExperiencedTemplate5';

// import NonITTemplate1 from '../components/Templates/NonIT/NonITTemplate1';
// import NonITTemplate2 from '../components/Templates/NonIT/NonITTemplate2';
// import NonITTemplate3 from '../components/Templates/NonIT/NonITTemplate3';

// const allTemplates = {
//   fresher: [
//     { id: "fresher1", name: "Executive" },
//     { id: "fresher2", name: "Modern Pro" },
//     { id: "fresher3", name: "Minimalist" },
//     { id: "fresher4", name: "Creative" },
//     { id: "fresher5", name: "Corporate" },
//     { id: "fresher6", name: "Classic" },
//     { id: "fresher7", name: "Elite" },
//     { id: "fresher8", name: "Innovator" },
//     { id: "fresher9", name: "Visionary" },
//   ],
//   experienced: [
//     { id: "experienced1", name: "Senior Pro" },
//     { id: "experienced2", name: "Leadership" },
//     { id: "experienced3", name: "Director" },
//     { id: "experienced4", name: "Director" },
//     { id: "experienced5", name: "Extro" },
//   ],
//   nonit: [
//     { id: "nonit1", name: "Portfolio" },
//     { id: "nonit2", name: "Creative Pro" },
//     { id: "nonit3", name: "Artistic" },
//   ],
// };

// const ResumeBuilder = () => {
//   const { templateType } = useParams();
//   const navigate = useNavigate();
//   const [selectedTemplateId, setSelectedTemplateId] = useState(allTemplates[templateType][0].id);
//   const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

//   // Get form data from localStorage
//   const formData = JSON.parse(localStorage.getItem('resumeFormData')) || {
//     fullName: '',
//     email: '',
//     phone: '',
//     address: '',
//     summary: '',
//     education: [{ degree: '', school: '', location: '', year: '', grade: '' }],
//     experience: [{ company: '', role: '', duration: '', description: [''] }],
//     internships: [{ company: '', role: '', duration: '' }],
//     skills: '',
//     projects: [{ name: '', description: '' }],
//     certifications: [{ name: '', issuer: '', year: '' }],
//     achievements: [''],
//     activities: [''],
//     photo: null,
//   };

//   const downloadResume = async () => {
//     setIsGeneratingPDF(true);
//     const resume = document.getElementById('resume-preview');

//     // Store original styles
//     const originalOverflow = resume.style.overflow;
//     const originalHeight = resume.style.height;
//     const originalPosition = resume.style.position;

//     // Create a container for the cloned resume
//     const container = document.createElement('div');
//     container.style.position = 'fixed';
//     container.style.left = '-10000px';
//     container.style.top = '0';
//     container.style.width = `${resume.offsetWidth}px`;
//     container.style.height = 'auto';
//     container.style.overflow = 'visible';

//     // Clone the resume node
//     const clone = resume.cloneNode(true);
//     clone.id = 'resume-clone';
//     clone.style.height = 'auto';
//     clone.style.overflow = 'visible';

//     // Add to DOM
//     container.appendChild(clone);
//     document.body.appendChild(container);

//     try {
//       // Calculate dimensions after clone is in DOM
//       const totalHeight = clone.scrollHeight;
//       const totalWidth = clone.scrollWidth;

//       const canvas = await html2canvas(clone, {
//         scale: 2,
//         scrollY: 0,
//         useCORS: true,
//         windowHeight: totalHeight,
//         height: totalHeight,
//         width: totalWidth,
//         logging: false,
//         backgroundColor: '#ffffff',
//         onclone: (document) => {
//           // Ensure cloned element has correct styles
//           const clonedResume = document.getElementById('resume-clone');
//           clonedResume.style.overflow = 'visible';
//           clonedResume.style.height = 'auto';
//         }
//       });

//       // Create PDF with proper dimensions (in mm)
//       const imgWidth = canvas.width * 0.264583;
//       const imgHeight = canvas.height * 0.264583;

//       // Determine PDF orientation
//       const pdf = new jsPDF({
//         orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
//         unit: 'mm',
//         format: [imgWidth, imgHeight]
//       });

//       // Add image to PDF
//       pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);

//       // Generate filename
//       let filename = 'my_resume.pdf';
//       if (formData.fullName && formData.fullName.trim() !== '') {
//         const sanitizedName = formData.fullName
//           .trim()
//           .toLowerCase()
//           .replace(/\s+/g, '_')
//           .replace(/[^a-z0-9_]/g, '');
//         filename = `${sanitizedName}_resume.pdf`;
//       }

//       pdf.save(filename);

//     } catch (error) {
//       console.error('Error generating PDF:', error);
//     } finally {
//       // Clean up
//       const container = document.querySelector('div[style*="-10000px"]');
//       if (container) {
//         document.body.removeChild(container);
//       }
//       setIsGeneratingPDF(false);
//     }
//   };

//   const handleTemplateChange = (templateId) => {
//     setSelectedTemplateId(templateId);
//   };

//   const templateComponents = {
//     fresher1: <FresherTemplate1 formData={{ ...formData, summary: formData.summary }} />,
//     fresher2: <FresherTemplate2 formData={{ ...formData, summary: formData.summary }} />,
//     fresher3: <FresherTemplate3 formData={{ ...formData, summary: formData.summary }} />,
//     fresher4: <FresherTemplate4 formData={{ ...formData, summary: formData.summary }} />,
//     fresher5: <FresherTemplate5 formData={{ ...formData, summary: formData.summary }} />,
//     fresher6: <FresherTemplate6 formData={{ ...formData, summary: formData.summary }} />,
//     fresher7: <FresherTemplate7 formData={{ ...formData, summary: formData.summary }} />,
//     fresher8: <FresherTemplate8 formData={{ ...formData, summary: formData.summary }} />,
//     fresher9: <FresherTemplate9 formData={{ ...formData, summary: formData.summary }} />,

//     experienced1: <ExperiencedTemplate1 formData={formData} />,
//     experienced2: <ExperiencedTemplate2 formData={formData} />,
//     experienced3: <ExperiencedTemplate3 formData={formData} />,
//     experienced4: <ExperiencedTemplate4 formData={formData} />,
//     experienced5: <ExperiencedTemplate5 formData={formData} />,

//     nonit1: <NonITTemplate1 formData={{ ...formData, summary: formData.summary }} />,
//     nonit2: <NonITTemplate2 formData={{ ...formData, summary: formData.summary }} />,
//     nonit3: <NonITTemplate3 formData={{ ...formData, summary: formData.summary }} />,
//   };

//   const SelectedTemplate = templateComponents[selectedTemplateId] || <div className="text-red-500 text-center">Invalid template or no template selected.</div>;

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="max-w-[1800px] mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">
//               Select Your {templateType} Resume Template
//             </h1>
//             <p className="text-gray-500 text-sm">Choose from our professional templates</p>
//           </div>
//           <div className="flex items-center gap-4">
//             {/* Template Selector Dropdown */}
//             <div className="relative min-w-[180px]">
//               <select
//                 value={selectedTemplateId}
//                 onChange={(e) => handleTemplateChange(e.target.value)}
//                 className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full cursor-pointer transition-all hover:border-blue-400 shadow-sm text-gray-800 font-medium"
//               >
//                 {allTemplates[templateType].map((template) => (
//                   <option key={template.id} value={template.id} className="text-gray-800">
//                     {template.name}
//                   </option>
//                 ))}
//               </select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
//                 <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//                 </svg>
//               </div>
//             </div>

//             <button
//               onClick={downloadResume}
//               disabled={isGeneratingPDF}
//               className={`flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all shadow hover:shadow-md text-sm ${isGeneratingPDF ? 'opacity-75 cursor-not-allowed' : ''}`}
//             >
//               {isGeneratingPDF ? (
//                 'Generating...'
//               ) : (
//                 <>
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
//                   </svg>
//                   Download PDF
//                 </>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Preview Section */}
//         <div className="w-full">
//           <div 
//   id="resume-preview" 
//   className="w-full bg-white shadow-md" 
//   style={{ 
//     minHeight: '297mm', 
//     maxWidth: '210mm',
//     margin: '0 auto',
//     color: '#333333' // Ensures dark text by default
//   }}
// >
//   {SelectedTemplate}
// </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResumeBuilder;

import React from 'react';
import { useParams } from 'react-router-dom';
import ResumeTemplates from './ResumeTemplates';

const ResumeBuilder = () => {
  const { templateType } = useParams();
  
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <ResumeTemplates />
      </div>
    </div>
  );
};

export default ResumeBuilder;