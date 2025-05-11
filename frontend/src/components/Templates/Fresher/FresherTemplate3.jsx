import React from 'react';

const FresherTemplate3 = ({ formData, fontColor, fontFamily }) => (
  <div className="w-full shadow-md p-6" style={{ fontFamily, color: fontColor }}>
    <div className="grid grid-cols-2 gap-6">
      {/* Left Column */}
      <div>
        <h3 className="text-xl font-bold mb-2">{formData.fullName}</h3>
        <p className="text-sm">{formData.email}</p>
        <p className="text-sm">{formData.phone}</p>
        <p className="text-sm">{formData.address}</p>

        {formData.summary && (
          <>
            <hr className="my-4" />
            <div>
              <h4 className="font-semibold">Career Objective</h4>
              <p className="text-sm">
                {formData.summary.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          </>
        )}

        <hr className="my-4" />
        <div>
          <h4 className="font-semibold">Skills</h4>
          <div className="grid grid-cols-3 gap-2 text-sm mt-1">
            {formData.skills?.split(',').map((skill, i) => (
              <div key={i}>{skill.trim()}</div>
            ))}
          </div>
        </div>

        {formData.achievements?.length > 0 && formData.achievements.some(a => a.trim()) && (
          <>
            <hr className="my-4" />
            <div>
              <h4 className="font-semibold">Achievements</h4>
              <ul className="list-disc ml-4 text-sm">
                {formData.achievements
                  .filter(a => a.trim())
                  .map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
              </ul>
            </div>
          </>
        )}

        {formData.activities?.length > 0 && formData.activities.some(a => a.trim()) && (
          <>
            <hr className="my-4" />
            <div>
              <h4 className="font-semibold">Activities</h4>
              <ul className="list-disc ml-4 text-sm">
                {formData.activities
                  .filter(a => a.trim())
                  .map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
              </ul>
            </div>
          </>
        )}
      </div>

      {/* Right Column */}
      <div>
        <div className="mb-4">
          <h4 className="font-semibold">Education</h4>
          {formData.education.map((edu, i) => (
            <div key={i} className="mb-2">
              <p className="font-medium">{edu.degree}</p>
              <p className="text-sm">{edu.school}, {edu.location}</p>
              <p className="text-sm">{edu.year} {edu.grade && `| Grade: ${edu.grade}`}</p>
            </div>
          ))}
        </div>
        <hr className="my-4" />

        {formData.internships?.length > 0 && (
          <>
            <div className="mb-4">
              <h4 className="font-semibold">Internships</h4>
              {formData.internships.map((intern, i) => (
                <div key={i} className="mb-2">
                  <p className="font-medium">{intern.role}</p>
                  <p className="text-sm">{intern.company} | {intern.duration}</p>
                </div>
              ))}
            </div>
            <hr className="my-4" />
          </>
        )}

        <div className="mb-4">
          <h4 className="font-semibold">Projects</h4>
          {formData.projects.map((proj, i) => (
            <div key={i} className="mb-2">
              <p className="font-medium">{proj.name}</p>
              {proj.description && (
                <ul className="list-disc ml-4 text-sm">
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
        </div>
        <hr className="my-4" />

        <div className="mb-4">
          <h4 className="font-semibold">Certifications</h4>
          {formData.certifications.map((cert, i) => (
            <p key={i} className="text-sm">{cert.name} - {cert.issuer} ({cert.year})</p>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default FresherTemplate3;
