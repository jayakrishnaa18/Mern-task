import React from 'react';

const FresherTemplate7 = ({ formData, fontColor, fontFamily }) => (
  <div className="w-full p-6 shadow-md" style={{ fontFamily, color: fontColor, backgroundColor: '#f9f9f9' }}>
    <div className="flex items-center border-b-2 pb-2 mb-3">
      {formData.photo && (
        <img src={formData.photo} alt="Profile" className="w-24 h-24 rounded-full mr-6 border-2 border-teal-500" />
      )}
      <div>
        <h1 className="text-3xl font-bold">{formData.fullName}</h1>
        <div className="text-sm flex flex-wrap gap-3 mt-1 text-gray-600">
          <span>📧 {formData.email}</span>
          <span>📞 {formData.phone}</span>
          <span>📍 {formData.address}</span>
        </div>
      </div>
    </div>

    <section className="mb-3">
      <h2 className="text-lg font-semibold border-b border-teal-500 mb-1 text-teal-700">Career Objective</h2>
      <p className="text-sm text-gray-800">{formData.summary}</p>
    </section>

    <div className="flex gap-8 mb-3">
      <section className="w-1/2">
        <h2 className="text-lg font-semibold border-b border-teal-500 mb-1 text-teal-700">Education</h2>
        {formData.education.map((edu, i) => (
          <div key={i} className="mb-2 text-sm">
            <p className="font-bold">{edu.degree}</p>
            <p>{edu.school}, {edu.location}</p>
            <p>{edu.year} | {edu.grade && `Grade: ${edu.grade}`}</p>
          </div>
        ))}
      </section>

      <section className="w-1/2">
        <h2 className="text-lg font-semibold border-b border-teal-500 mb-1 text-teal-700">Skills</h2>
        <ul className="grid grid-cols-2 gap-1 text-sm list-disc ml-4">
          {formData.skills?.split(',').map((skill, i) => (
            <li key={i}>{skill.trim()}</li>
          ))}
        </ul>
      </section>
    </div>

    <section className="mb-3">
      <h2 className="text-lg font-semibold border-b border-teal-500 mb-1 text-teal-700">Internship</h2>
      {formData.internships?.map((intern, i) => (
        <div key={i} className="mb-2 text-sm">
          <p className="font-bold">{intern.role}</p>
          <p>{intern.company} | {intern.duration}</p>
          {intern.description && (
            <ul className="list-disc ml-4 text-sm mt-1">
              {intern.description
                .split('\n')
                .filter(point => point.trim())
                .map((point, idx) => (
                  <li key={idx}>{point.trim()}</li>
                ))}
            </ul>
          )}
        </div>
      ))}
    </section>

    <section className="mb-3">
      <h2 className="text-lg font-semibold border-b border-teal-500 mb-1 text-teal-700">Projects</h2>
      {formData.projects?.map((proj, i) => (
        <div key={i} className="mb-2 text-sm">
          <p className="font-bold">{proj.name}</p>
          {proj.description && (
            <ul className="list-disc ml-4 text-sm mt-1">
              {proj.description
                .split('\n')
                .filter(desc => desc.trim())
                .map((point, idx) => (
                  <li key={idx}>{point.trim()}</li>
                ))}
            </ul>
          )}
        </div>
      ))}
    </section>

    {formData.certifications?.length > 0 && (
      <section className="mb-3">
        <h2 className="text-lg font-semibold border-b border-teal-500 mb-1 text-teal-700">Certifications</h2>
        {formData.certifications.map((cert, i) => (
          <p key={i} className="text-sm">{cert.name} - {cert.issuer} ({cert.year})</p>
        ))}
      </section>
    )}

    {formData.achievements?.length > 0 && formData.achievements.some(a => a.trim()) && (
      <section className="mb-3">
        <h2 className="text-lg font-semibold border-b border-teal-500 mb-1 text-teal-700">Achievements</h2>
        <ul className="list-disc ml-4 text-sm">
          {formData.achievements
            .filter(a => a.trim())
            .map((ach, i) => (
              <li key={i}>{ach}</li>
            ))}
        </ul>
      </section>
    )}

    {formData.activities?.length > 0 && formData.activities.some(a => a.trim()) && (
      <section>
        <h2 className="text-lg font-semibold border-b border-teal-500 mb-1 text-teal-700">Extracurricular Activities</h2>
        <ul className="list-disc ml-4 text-sm">
          {formData.activities
            .filter(a => a.trim())
            .map((activity, i) => (
              <li key={i}>{activity}</li>
            ))}
        </ul>
      </section>
    )}
  </div>
);

export default FresherTemplate7;
