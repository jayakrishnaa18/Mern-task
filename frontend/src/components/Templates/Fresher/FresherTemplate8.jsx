import React from 'react';

const FresherTemplate8 = ({ formData, fontColor, fontFamily }) => (
  <div className="flex w-full shadow-md" style={{ fontFamily, color: fontColor }}>
    <aside className="w-1/3 bg-gray-100 p-4">
      {formData.photo && <img src={formData.photo} alt="" className="w-24 h-24 rounded-full mx-auto" />}
      <h2 className="text-xl font-bold mt-4 text-center">{formData.fullName}</h2>
      <p className="text-sm text-center">{formData.email}</p>
      <p className="text-sm text-center">{formData.phone}</p>
      <p className="text-sm text-center">{formData.address}</p>

      {formData.skills && (
        <div className="mt-6">
          <h3 className="font-semibold">Skills</h3>
          <ul className="list-disc ml-4 text-sm">
            {formData.skills.split(',').map((skill, i) => (
              <li key={i}>{skill.trim()}</li>
            ))}
          </ul>
        </div>
      )}

      {formData.certifications?.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold">Certifications</h3>
          <ul className="list-disc ml-4 text-sm">
            {formData.certifications.map((cert, i) => (
              <li key={i}>{cert.name} - {cert.issuer} ({cert.year})</li>
            ))}
          </ul>
        </div>
      )}
    </aside>

    <main className="w-2/3 p-6 space-y-4">
      {formData.summary && (
        <section>
          <h3 className="font-semibold text-lg">Objective</h3>
          <p className="text-sm">{formData.summary}</p>
        </section>
      )}

      <section>
        <h3 className="font-semibold text-lg">Education</h3>
        {formData.education.map((edu, i) => (
          <div key={i} className="mb-4">
            <p className="font-bold">{edu.degree}</p>
            <p className="text-sm">{edu.school}, {edu.location}</p>
            <p className="text-sm">{edu.year} {edu.grade && `| Grade: ${edu.grade}`}</p>
          </div>
        ))}
      </section>

      {formData.internships?.length > 0 && (
        <section>
          <h3 className="font-semibold text-lg">Internships</h3>
          {formData.internships.map((intern, i) => (
            <div key={i} className="mb-4">
              <p className="font-bold">{intern.role}</p>
              <p className="text-sm">{intern.company} | {intern.duration}</p>
            </div>
          ))}
        </section>
      )}

      <section>
        <h3 className="font-semibold text-lg">Projects</h3>
        {formData.projects.map((proj, i) => (
          <div key={i} className="mb-4">
            <p className="font-bold">{proj.name}</p>
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
      </section>

      {formData.achievements?.length > 0 && (
        <section>
          <h3 className="font-semibold text-lg">Achievements</h3>
          <ul className="list-disc ml-4 text-sm">
            {formData.achievements
              .filter(a => a.trim())
              .map((achievement, i) => (
                <li key={i}>{achievement.trim()}</li>
              ))}
          </ul>
        </section>
      )}

      {formData.activities?.length > 0 && (
        <section>
          <h3 className="font-semibold text-lg">Extracurricular Activities</h3>
          <ul className="list-disc ml-4 text-sm">
            {formData.activities
              .filter(activity => activity.trim())
              .map((activity, i) => (
                <li key={i}>{activity.trim()}</li>
              ))}
          </ul>
        </section>
      )}
    </main>
  </div>
);

export default FresherTemplate8;
