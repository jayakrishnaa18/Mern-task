import React from 'react';

const FresherTemplate2 = ({ formData, fontColor, fontFamily }) => (
  <div
    className="mx-auto shadow-md p-6"
    style={{
      width: '210mm',
      minHeight: '297mm',
      fontFamily,
      color: fontColor,
      backgroundColor: 'white',
      boxSizing: 'border-box'
    }}
  >
    <header className="text-center space-y-1">
      {formData.photo && <img src={formData.photo} alt="Profile" className="w-16 h-16 rounded-full mx-auto" />}
      <h1 className="text-2xl font-bold">{formData.fullName}</h1>
      <p className="text-sm">{formData.email} | {formData.phone} | {formData.address}</p>
    </header>

    {formData.summary && (
      <>
        <hr className="border-t border-gray-300 my-2" />
        <section className="text-center space-y-1 break-inside-avoid">
          <h3 className="text-base font-semibold">Career Objective</h3>
          <p className="italic text-sm">
            {formData.summary.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </section>
      </>
    )}

    <hr className="border-t border-gray-300 my-2" />
    <section className="space-y-1 text-sm break-inside-avoid">
      <h3 className="text-base font-semibold">Education</h3>
      {formData.education.map((edu, i) => (
        <div key={i}>
          <p className="font-medium">{edu.degree}</p>
          <p>{edu.school} - {edu.year}</p>
          <p>{edu.location}</p>
          <p>{edu.grade}</p>
        </div>
      ))}
    </section>

    {formData.internships.length > 0 && (
      <>
        <hr className="border-t border-gray-300 my-2" />
        <section className="space-y-1 text-sm break-inside-avoid">
          <h3 className="text-base font-semibold">Internships</h3>
          {formData.internships.map((internship, i) => (
            <div key={i}>
              <p className="font-medium">{internship.role}</p>
              <p>{internship.company} - {internship.duration}</p>
            </div>
          ))}
        </section>
      </>
    )}

    <hr className="border-t border-gray-300 my-2" />
    <section className="space-y-1 text-sm break-inside-avoid">
      <h3 className="text-base font-semibold">Projects</h3>
      {formData.projects.map((project, i) => (
        <div key={i}>
          <p className="font-medium">{project.name}</p>
          {project.description && (
            <ul className="list-disc ml-4 text-sm">
              {project.description
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

    {formData.certifications.length > 0 && (
      <>
        <hr className="border-t border-gray-300 my-2" />
        <section className="space-y-1 text-sm break-inside-avoid">
          <h3 className="text-base font-semibold">Certifications</h3>
          {formData.certifications.map((certification, i) => (
            <div key={i}>
              <p className="font-medium">{certification.name}</p>
              <p>{certification.issuer} - {certification.year}</p>
            </div>
          ))}
        </section>
      </>
    )}

    {formData.skills && (
      <>
        <hr className="border-t border-gray-300 my-2" />
        <section className="space-y-1 text-sm break-inside-avoid">
          <h3 className="text-base font-semibold">Skills</h3>
          <div className="grid grid-cols-3 gap-2">
            {formData.skills.split(',').map((skill, i) => (
              <div key={i}>{skill.trim()}</div>
            ))}
          </div>
        </section>
      </>
    )}

    {formData.achievements.length > 0 && (
      <>
        <hr className="border-t border-gray-300 my-2" />
        <section className="space-y-1 text-sm break-inside-avoid">
          <h3 className="text-base font-semibold">Achievements</h3>
          <ul className="list-disc pl-5">
            {formData.achievements.map((achievement, i) => (
              <li key={i}>{achievement}</li>
            ))}
          </ul>
        </section>
      </>
    )}

    {formData.activities.length > 0 && (
      <>
        <hr className="border-t border-gray-300 my-2" />
        <section className="space-y-1 text-sm break-inside-avoid">
          <h3 className="text-base font-semibold">Activities</h3>
          <ul className="list-disc pl-5">
            {formData.activities.map((activity, i) => (
              <li key={i}>{activity}</li>
            ))}
          </ul>
        </section>
      </>
    )}
  </div>
);

export default FresherTemplate2;
