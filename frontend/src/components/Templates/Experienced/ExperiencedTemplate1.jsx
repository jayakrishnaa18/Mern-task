import React from 'react';

const ExperiencedTemplate6 = ({ formData, fontColor = '#2d3748', fontFamily = 'Helvetica, sans-serif' }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-8" style={{ fontFamily, color: fontColor }}>
      {/* Header with Photo */}
      <div className="flex justify-between items-start mb-8 border-b-2 border-blue-500 pb-4">
        <div>
          <h1 className="text-3xl font-bold">{formData.fullName}</h1>
          <p className="text-gray-600">{formData.jobTitle || ''}</p>
        </div>
        {formData.photo && (
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100">
            <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Contact Info */}
      <div className="flex flex-wrap gap-4 mb-8 text-sm break-all">
        <p className="flex items-center">
          <span className="mr-2 text-blue-500">✉️</span> {formData.email}
        </p>
        <p className="flex items-center">
          <span className="mr-2 text-blue-500">📱</span> {formData.phone}
        </p>
        <p className="flex items-center">
          <span className="mr-2 text-blue-500">📍</span> {formData.address}
        </p>
      </div>

      {/* Summary */}
      {formData.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2 text-blue-600 border-b border-blue-200 pb-1">PROFILE</h2>
          <p className="text-gray-700">{formData.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="md:col-span-2">
          {/* Experience */}
          {formData.experience?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-blue-600 border-b border-blue-200 pb-1">EXPERIENCE</h2>
              {formData.experience.map((exp, i) => (
                <div key={i} className="mb-6">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-lg">{exp.role}</h3>
                    <p className="text-gray-500 text-sm">{exp.duration}</p>
                  </div>
                  <h4 className="font-semibold text-gray-700 mb-2">{exp.company}</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {exp.description.map((desc, j) => (
                      <li key={j} className="text-gray-700">{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Extracurricular Activities */}
          {formData.activities?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-blue-600 border-b border-blue-200 pb-1">EXTRACURRICULAR ACTIVITIES</h2>
              <ul className="space-y-2 list-disc pl-5">
                {formData.activities.map((activity, i) => (
                  <li key={i}>
                    <p className="font-medium text-gray-800">{activity.name || activity}</p>
                    {activity.duration && (
                      <p className="text-sm text-gray-600">{activity.duration}</p>
                    )}
                    {activity.description && (
                      <p className="text-gray-700 text-sm">{activity.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div>
          {/* Skills */}
          {formData.skills && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-blue-600 border-b border-blue-200 pb-1">SKILLS</h2>
              <div className="flex flex-wrap gap-2">
                {formData.skills.split(',').map((skill, i) => (
                  <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {formData.education?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-blue-600 border-b border-blue-200 pb-1">EDUCATION</h2>
              {formData.education.map((edu, i) => (
                <div key={i} className="mb-4">
                  <h3 className="font-bold">{edu.degree}</h3>
                  <p className="text-gray-700">{edu.school}</p>
                  <p className="text-sm text-gray-500">{edu.year} {edu.grade && `| ${edu.grade}`}</p>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {formData.certifications?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-blue-600 border-b border-blue-200 pb-1">CERTIFICATIONS</h2>
              <ul className="space-y-2">
                {formData.certifications.map((cert, i) => (
                  <li key={i}>
                    <p className="font-semibold">{cert.name}</p>
                    <p className="text-sm text-gray-600">{cert.issuer} • {cert.year}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Achievements */}
          {formData.achievements?.filter(a => a.trim()).length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-blue-600 border-b border-blue-200 pb-1">ACHIEVEMENTS</h2>
              <ul className="space-y-2 list-disc pl-5">
                {formData.achievements.map((a, i) => a.trim() && (
                  <li key={i} className="text-gray-700">{a.trim()}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperiencedTemplate6;
