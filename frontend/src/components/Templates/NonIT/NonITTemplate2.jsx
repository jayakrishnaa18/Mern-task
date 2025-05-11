import React from 'react';

const NonITTemplate5 = ({ formData, fontColor, fontFamily }) => {
  return (
    <div className="w-full max-w-3xl mx-auto p-8 bg-white" style={{ fontFamily, color: fontColor }}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{formData.fullName}</h1>
        <p className="text-gray-600">{formData.jobTitle || ''}</p>
        <div className="flex justify-center gap-4 mt-2 text-sm">
          <span>{formData.email}</span>
          <span>•</span>
          <span>{formData.phone}</span>
          <span>•</span>
          <span>{formData.address}</span>
        </div>
      </div>

      {/* Summary */}
      {formData.summary && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2 border-b border-gray-200 pb-1">SUMMARY</h2>
          <p className="text-gray-700">{formData.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div>
          {/* Experience */}
          {formData.experience?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3 border-b border-gray-200 pb-1">EXPERIENCE</h2>
              {formData.experience.map((exp, i) => (
                <div key={i} className="mb-4">
                  <h3 className="font-bold">{exp.role}</h3>
                  <p className="text-gray-600 text-sm">{exp.company} | {exp.duration}</p>
                  <ul className="mt-2 space-y-1">
                    {exp.description.map((desc, j) => (
                      <li key={j} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {formData.education?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3 border-b border-gray-200 pb-1">EDUCATION</h2>
              {formData.education.map((edu, i) => (
                <div key={i} className="mb-3">
                  <h3 className="font-bold">{edu.degree}</h3>
                  <p className="text-gray-600 text-sm">{edu.school}, {edu.location}</p>
                  <p className="text-gray-500 text-xs">{edu.year} {edu.grade && `| ${edu.grade}`}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div>
          {/* Skills */}
          {formData.skills && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3 border-b border-gray-200 pb-1">SKILLS</h2>
              <div className="flex flex-wrap gap-2">
                {formData.skills.split(',').map((skill, i) => (
                  <span key={i} className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {formData.certifications?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3 border-b border-gray-200 pb-1">CERTIFICATIONS</h2>
              <ul className="space-y-2">
                {formData.certifications.map((cert, i) => (
                  <li key={i}>
                    <p className="font-medium">{cert.name}</p>
                    <p className="text-gray-600 text-sm">{cert.issuer} • {cert.year}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Achievements */}
          {formData.achievements?.filter(a => a.trim()).length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3 border-b border-gray-200 pb-1">ACHIEVEMENTS</h2>
              <ul className="space-y-2">
                {formData.achievements.map((a, i) => a.trim() && (
                  <li key={i} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{a.trim()}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Activities */}
          {formData.activities?.filter(a => a.trim()).length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3 border-b border-gray-200 pb-1">ACTIVITIES</h2>
              <ul className="space-y-2">
                {formData.activities.map((a, i) => a.trim() && (
                  <li key={i} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{a.trim()}</span>
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

export default NonITTemplate5;