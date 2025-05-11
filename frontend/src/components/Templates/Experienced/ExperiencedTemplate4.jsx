import React from 'react';

const ExperiencedTemplate9 = ({ formData, fontColor = '#2d3748', fontFamily = 'Arial, sans-serif' }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-10 bg-white" style={{ fontFamily, color: fontColor }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-10 border-b pb-6">
        <div>
          <h1 className="text-4xl font-bold text-[#2d3748]">{formData.fullName}</h1>
          <p className="text-lg text-gray-500">{formData.jobTitle || ''}</p>
        </div>
        {formData.photo && (
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100 shadow-md">
            <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-sm bg-blue-50 p-4 rounded-lg shadow">
        <div className="flex items-center"><span className="mr-2 text-blue-600">✉️</span>{formData.email}</div>
        <div className="flex items-center"><span className="mr-2 text-blue-600">📱</span>{formData.phone}</div>
        <div className="flex items-center"><span className="mr-2 text-blue-600">📍</span>{formData.address}</div>
      </div>

      {/* Summary */}
      {formData.summary && (
        <div className="mb-10 p-5 bg-gray-50 border-l-4 border-blue-600 rounded">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">PROFILE</h2>
          <p className="text-gray-700">{formData.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Column (Main Sections) */}
        <div className="md:col-span-2 space-y-10">
          {/* Experience */}
          {formData.experience?.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-blue-700 mb-4 border-b border-blue-200 pb-1">EXPERIENCE</h2>
              <div className="space-y-6">
                {formData.experience.map((exp, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg border shadow-sm">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-lg font-bold">{exp.role}</h3>
                      <span className="text-sm text-gray-500">{exp.duration}</span>
                    </div>
                    <p className="font-medium text-gray-700 mb-1">{exp.company}</p>
                    {Array.isArray(exp.description) && (
                      <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                        {exp.description.map((desc, j) => <li key={j}>{desc}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {formData.education?.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-blue-700 mb-4 border-b border-blue-200 pb-1">EDUCATION</h2>
              <div className="space-y-5">
                {formData.education.map((edu, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg border shadow-sm">
                    <h3 className="text-md font-bold">{edu.degree}</h3>
                    <p className="text-gray-700">{edu.school}, {edu.location}</p>
                    <p className="text-sm text-gray-500">{edu.year} {edu.grade && `| Grade: ${edu.grade}`}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Activities */}
          {formData.activities?.filter(a => a.trim()).length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-blue-700 mb-4 border-b border-blue-200 pb-1">ACTIVITIES</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                {formData.activities.map((a, i) => a.trim() && <li key={i}>{a.trim()}</li>)}
              </ul>
            </section>
          )}
        </div>

        {/* Right Column (Highlights) */}
        <div className="space-y-10">
          {/* Skills */}
          {formData.skills && (
            <section>
              <h2 className="text-xl font-semibold text-blue-700 mb-4 border-b border-blue-200 pb-1">SKILLS</h2>
              <div className="space-y-2 text-sm">
                {formData.skills.split(',').map((skill, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span>{skill.trim()}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {formData.certifications?.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-blue-700 mb-4 border-b border-blue-200 pb-1">CERTIFICATIONS</h2>
              <ul className="space-y-2 text-sm">
                {formData.certifications.map((cert, i) => (
                  <li key={i}>
                    <p className="font-semibold">{cert.name}</p>
                    <p className="text-gray-600">{cert.issuer} • {cert.year}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Achievements */}
          {formData.achievements?.filter(a => a.trim()).length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-blue-700 mb-4 border-b border-blue-200 pb-1">ACHIEVEMENTS</h2>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                {formData.achievements.map((a, i) => a.trim() && <li key={i}>{a.trim()}</li>)}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperiencedTemplate9;
