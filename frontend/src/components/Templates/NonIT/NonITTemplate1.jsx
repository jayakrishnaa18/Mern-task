import React from 'react';

const NonITTemplate6 = ({ formData, fontColor, fontFamily }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6" style={{ fontFamily, color: fontColor }}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{formData.fullName}</h1>
        <p className="text-gray-600">{formData.jobTitle || ''}</p>
        <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
          <span className="flex items-center">
            <span className="mr-1">📧</span> {formData.email}
          </span>
          <span className="flex items-center">
            <span className="mr-1">📱</span> {formData.phone}
          </span>
          <span className="flex items-center">
            <span className="mr-1">📍</span> {formData.address}
          </span>
        </div>
      </div>

      {/* Summary */}
      {formData.summary && (
        <div className="mb-8 p-6 bg-gray-50 rounded-xl">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">SUMMARY</h2>
          <p className="text-gray-700">{formData.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          {/* Experience */}
          {formData.experience?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">EXPERIENCE</h2>
              {formData.experience.map((exp, i) => (
                <div key={i} className="mb-6 p-5 bg-white rounded-xl shadow-sm">
                  <div className="flex justify-between">
                    <h3 className="font-bold">{exp.role}</h3>
                    <span className="text-sm text-gray-500">{exp.duration}</span>
                  </div>
                  <p className="text-gray-600 mb-3">{exp.company}</p>
                  <ul className="space-y-2">
                    {exp.description.map((desc, j) => (
                      <li key={j} className="flex">
                        <span className="mr-2">•</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {formData.projects?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">PROJECTS</h2>
              {formData.projects.map((project, i) => (
                <div key={i} className="mb-4 p-5 bg-white rounded-xl shadow-sm">
                  <h3 className="font-bold">{project.name}</h3>
                  <ul className="mt-2 space-y-2">
                    {project.description.split('\n').map((point, idx) => (
                      <li key={idx} className="flex">
                        <span className="mr-2">•</span>
                        <span>{point.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div>
          {/* Education */}
          {formData.education?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">EDUCATION</h2>
              {formData.education.map((edu, i) => (
                <div key={i} className="mb-4 p-5 bg-white rounded-xl shadow-sm">
                  <h3 className="font-bold">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.school}, {edu.location}</p>
                  <p className="text-sm text-gray-500">{edu.year} {edu.grade && `| ${edu.grade}`}</p>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {formData.skills && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">SKILLS</h2>
              <div className="p-5 bg-white rounded-xl shadow-sm">
                <div className="flex flex-wrap gap-2">
                  {formData.skills.split(',').map((skill, i) => (
                    <span key={i} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Certifications */}
          {formData.certifications?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">CERTIFICATIONS</h2>
              <div className="p-5 bg-white rounded-xl shadow-sm">
                <ul className="space-y-3">
                  {formData.certifications.map((cert, i) => (
                    <li key={i}>
                      <p className="font-medium">{cert.name}</p>
                      <p className="text-sm text-gray-600">{cert.issuer} • {cert.year}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Achievements */}
          {formData.achievements?.filter(a => a.trim()).length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">ACHIEVEMENTS</h2>
              <div className="p-5 bg-white rounded-xl shadow-sm">
                <ul className="space-y-2">
                  {formData.achievements.map((a, i) => a.trim() && (
                    <li key={i} className="flex">
                      <span className="mr-2">•</span>
                      <span>{a.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Activities */}
          {formData.activities?.filter(a => a.trim()).length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">ACTIVITIES</h2>
              <div className="p-5 bg-white rounded-xl shadow-sm">
                <ul className="space-y-2">
                  {formData.activities.map((a, i) => a.trim() && (
                    <li key={i} className="flex">
                      <span className="mr-2">•</span>
                      <span>{a.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NonITTemplate6;