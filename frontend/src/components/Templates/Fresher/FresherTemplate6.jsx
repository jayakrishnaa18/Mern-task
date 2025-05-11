import React from 'react';

const SectionTitle = ({ title }) => (
  <h3 className="text-md font-semibold border-b-2 border-gray-300 pb-1 mb-2 uppercase">{title}</h3>
);

const FresherTemplate6 = ({ formData, fontColor, fontFamily }) => (
  <div className="w-full shadow-md p-8 bg-white" style={{ fontFamily, color: fontColor }}>
    <div className="text-center mb-6">
      {formData.photo && <img src={formData.photo} alt="" className="w-20 h-20 rounded-full mx-auto" />}
      <h1 className="text-2xl font-bold">{formData.fullName}</h1>
      <p className="text-sm">{formData.email} | {formData.phone}</p>
      <p className="text-sm">{formData.address}</p>
    </div>

    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-1">
        <SectionTitle title="Skills" />
        <ul className="list-disc ml-4 text-sm">
          {formData.skills?.split(',').map((skill, i) => (
            <li key={i}>{skill.trim()}</li>
          ))}
        </ul>

        {formData.certifications?.length > 0 && (
          <>
            <SectionTitle title="Certifications" />
            <ul className="list-disc ml-4 text-sm">
              {formData.certifications.map((cert, i) => (
                <li key={i}>{cert.name} - {cert.issuer}</li>
              ))}
            </ul>
          </>
        )}

        {formData.activities?.length > 0 && (
          <>
            <SectionTitle title="Activities" />
            <ul className="list-disc ml-4 text-sm">
              {formData.activities.filter(a => a.trim()).map((a, i) => (
                <li key={i}>{a.trim()}</li>
              ))}
            </ul>
          </>
        )}

        {formData.achievements?.length > 0 && (
          <>
            <SectionTitle title="Achievements" />
            <ul className="list-disc ml-4 text-sm">
              {formData.achievements.filter(a => a.trim()).map((a, i) => (
                <li key={i}>{a.trim()}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="col-span-2 space-y-4">
        <div>
          <SectionTitle title="Career Objective" />
          <p className="text-sm">{formData.summary}</p>
        </div>

        <div>
          <SectionTitle title="Education" />
          {formData.education.map((edu, i) => (
            <div key={i} className="mb-2">
              <p className="font-semibold">{edu.degree}</p>
              <p className="text-sm">{edu.school} - {edu.location} ({edu.year}) | Grade: {edu.grade}</p>
            </div>
          ))}
        </div>

        {formData.internships?.length > 0 && (
          <div>
            <SectionTitle title="Internships" />
            {formData.internships.map((intern, i) => (
              <div key={i} className="mb-2">
                <p className="font-semibold">{intern.role}</p>
                <p className="text-sm">{intern.company} | {intern.duration}</p>
              </div>
            ))}
          </div>
        )}

        <div>
          <SectionTitle title="Projects" />
          {formData.projects.map((proj, i) => (
            <div key={i} className="mb-2">
              <p className="font-semibold">{proj.name}</p>
              <ul className="list-disc ml-4 text-sm">
                {proj.description?.split('\n').map((line, idx) => (
                  <li key={idx}>{line.trim()}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default FresherTemplate6;
