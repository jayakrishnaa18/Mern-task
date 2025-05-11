import React from 'react';

const ProfessionalResumeTemplate = ({ formData }) => {
  // Professional color palette
  const colors = {
    sidebarBg: 'bg-gray-800',
    sidebarText: 'text-gray-100',
    sidebarBorder: 'border-gray-600',
    mainBg: 'bg-white',
    headerText: 'text-gray-900',
    bodyText: 'text-gray-700',
    accent: 'text-blue-600',
    accentBorder: 'border-blue-500',
    accentBg: 'bg-blue-50'
  };

  return (
    <div className={`w-full max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden font-sans`}>
      <div className="grid grid-cols-1 md:grid-cols-4">
        {/* Sidebar - Fixed width with scroll for overflow */}
        <div className={`${colors.sidebarBg} ${colors.sidebarText} p-6 md:p-8 space-y-6 md:col-span-1 flex flex-col`}>
          {/* Profile Photo */}
          {formData.photo && (
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-600 mb-6">
              <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
            </div>
          )}

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-2 border-b pb-2 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Contact
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start">
                <svg className="w-4 h-4 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="break-all hyphens-auto">{formData.email}</span>
              </div>
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {formData.phone}
              </p>
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {formData.address}
              </p>
            </div>
          </div>

          {/* Skills */}
          {formData.skills && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-2 border-b pb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {formData.skills.split(',').map((skill, i) => (
                  <span key={i} className="bg-gray-700 px-3 py-1 rounded-full text-xs">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {formData.certifications?.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-2 border-b pb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Certifications
              </h3>
              <ul className="space-y-3">
                {formData.certifications.map((cert, i) => (
                  <li key={i} className="bg-gray-700/30 p-2 rounded">
                    <p className="font-medium text-sm">{cert.name}</p>
                    <p className="text-xs opacity-80 mt-1">{cert.issuer} • {cert.year}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Extracurricular Activities - Moved to sidebar */}
          {formData.activities?.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-2 border-b pb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                Extracurricular
              </h3>
              <ul className="space-y-3">
                {formData.activities.map((activity, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-blue-400 mr-2 mt-1">•</span>
                    <div>
                      <p className="font-medium text-sm">{activity.name || activity}</p>
                      {activity.duration && (
                        <p className="text-xs text-gray-400">{activity.duration}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="p-6 md:p-8 md:col-span-3 space-y-8">
          {/* Name & Title */}
          <div className="border-b border-gray-200 pb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{formData.fullName}</h1>
            <p className="text-lg md:text-xl text-gray-600 mt-2">{formData.jobTitle}</p>
          </div>

          {/* Summary */}
          {formData.summary && (
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                <svg className="w-5 h-5 md:w-6 md:h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">{formData.summary}</p>
            </div>
          )}

          {/* Experience */}
          {formData.experience?.length > 0 && (
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 md:w-6 md:h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Work Experience
              </h2>
              <div className="space-y-6">
                {formData.experience.map((exp, i) => (
                  <div key={i} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <h3 className="font-bold text-lg text-gray-800">{exp.role}</h3>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{exp.duration}</span>
                    </div>
                    <p className="italic text-gray-600 mb-2">{exp.company}</p>
                    <ul className="space-y-2 text-gray-700">
                      {exp.description.map((desc, j) => (
                        <li key={j} className="flex">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {formData.education?.length > 0 && (
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 md:w-6 md:h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
                Education
              </h2>
              <div className="space-y-4">
                {formData.education.map((edu, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                    <p className="text-gray-700">{edu.school}, {edu.location}</p>
                    <p className="text-sm text-gray-500 mt-1">{edu.year} {edu.grade && <span className="bg-gray-200 px-2 py-0.5 rounded ml-2">Grade: {edu.grade}</span>}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {formData.achievements?.filter(a => a.trim()).length > 0 && (
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 md:w-6 md:h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Achievements
              </h2>
              <ul className="space-y-2">
                {formData.achievements.map((a, i) => a.trim() && (
                  <li key={i} className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span className="text-gray-700">{a.trim()}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalResumeTemplate;