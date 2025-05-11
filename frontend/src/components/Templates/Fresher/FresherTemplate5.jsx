import React from 'react';

const FresherTemplate5 = ({ formData, fontColor, fontFamily }) => (
  <div
    className="w-[210mm] h-[297mm] overflow-hidden bg-white border text-sm p-4"
    style={{ fontFamily, color: fontColor }}
  >
    <header className="text-center mb-3">
      {formData.photo && (
        <img
          src={formData.photo}
          alt="Profile"
          className="w-14 h-14 rounded-full mx-auto"
        />
      )}
      <h1 className="text-xl font-bold mt-1">{formData.fullName}</h1>
      <p className="text-sm">
        {formData.email} | {formData.phone} | {formData.address}
      </p>
    </header>

    {formData.summary && (
      <section className="mb-2">
        <h2 className="font-bold text-base border-b pb-0.5">Career Objective</h2>
        <p className="mt-1">{formData.summary}</p>
      </section>
    )}

    {formData.education?.length > 0 && (
      <section className="mb-2">
        <h2 className="font-bold text-base border-b pb-0.5">Education</h2>
        <ul className="mt-1 space-y-1">
          {formData.education.map((edu, i) => (
            <li key={i} className="pl-3 border-l-4 border-blue-500 relative">
              <span className="absolute -left-1 top-0 w-2 h-2 bg-blue-500 rounded-full"></span>
              <p className="font-semibold">
                {edu.degree} - {edu.school}
              </p>
              <p className="text-sm">
                {edu.location} | {edu.year} | Grade: {edu.grade}
              </p>
            </li>
          ))}
        </ul>
      </section>
    )}

    {formData.internships?.length > 0 && (
      <section className="mb-2">
        <h2 className="font-bold text-base border-b pb-0.5">Internships</h2>
        {formData.internships.map((intern, i) => (
          <div
            key={i}
            className="pl-3 border-l-4 border-green-500 relative mb-1"
          >
            <span className="absolute -left-1 top-0 w-2 h-2 bg-green-500 rounded-full"></span>
            <p className="font-semibold">
              {intern.role} - {intern.company}
            </p>
            <p className="text-sm">{intern.duration}</p>
          </div>
        ))}
      </section>
    )}

    {formData.projects?.length > 0 && (
      <section className="mb-2">
        <h2 className="font-bold text-base border-b pb-0.5">Projects</h2>
        {formData.projects.map((proj, i) => (
          <div key={i} className="mb-1">
            <p className="font-semibold">{proj.name}</p>
            <ul className="list-disc ml-4 text-sm">
              {proj.description?.split('\n').map((line, idx) => (
                <li key={idx}>{line.trim()}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    )}

    {formData.certifications?.length > 0 && (
      <section className="mb-2">
        <h2 className="font-bold text-base border-b pb-0.5">Certifications</h2>
        <ul className="list-disc ml-4 text-sm">
          {formData.certifications.map((cert, i) => (
            <li key={i}>
              {cert.name} - {cert.issuer} ({cert.year})
            </li>
          ))}
        </ul>
      </section>
    )}

    {formData.skills && (
      <section className="mb-2">
        <h2 className="font-bold text-base border-b pb-0.5">Skills</h2>
        <div className="mt-1 flex flex-wrap gap-1 text-sm">
          {formData.skills.split(',').map((skill, i) => (
            <span key={i} className="bg-gray-200 px-2 py-1 rounded">
              {skill.trim()}
            </span>
          ))}
        </div>
      </section>
    )}

    {formData.activities?.filter(a => a.trim()).length > 0 && (
      <section className="mb-2">
        <h2 className="font-bold text-base border-b pb-0.5">Activities</h2>
        <ul className="list-disc ml-4 text-sm">
          {formData.activities
            .filter(a => a.trim())
            .map((a, i) => (
              <li key={i}>{a.trim()}</li>
            ))}
        </ul>
      </section>
    )}

    {formData.achievements?.filter(a => a.trim()).length > 0 && (
      <section className="mb-0">
        <h2 className="font-bold text-base border-b pb-0.5">Achievements</h2>
        <ul className="list-disc ml-4 text-sm">
          {formData.achievements
            .filter(a => a.trim())
            .map((ach, i) => (
              <li key={i}>{ach}</li>
            ))}
        </ul>
      </section>
    )}
  </div>
);

export default FresherTemplate5;
