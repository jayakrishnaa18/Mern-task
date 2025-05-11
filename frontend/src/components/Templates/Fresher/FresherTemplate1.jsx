import React from 'react';

const FresherTemplate1 = ({ formData, fontColor, fontFamily }) => (
  <div className="flex w-full shadow-md" style={{ fontFamily, color: fontColor }}>
    <aside className="w-1/3 bg-gray-800 text-white p-4">
      {formData.photo && <img src={formData.photo} alt="" className="w-24 h-24 rounded-full mx-auto" />}
      <h2 className="text-xl font-bold mt-4 text-center">{formData.fullName}</h2>
      <p className="text-sm text-center">{formData.email}</p>
      <p className="text-sm text-center">{formData.phone}</p>
      <p className="text-sm text-center">{formData.address}</p>
      
      {formData.summary && (
        <div className="mt-6">
          <h3 className="font-semibold">Objective</h3>
          <p className="text-sm">{formData.summary}</p>
        </div>
      )}

      <h3 className="mt-6 font-semibold">Skills</h3>
      <ul className="list-disc ml-4 text-sm">
        {formData.skills?.split(',').map((skill, i) => (
          <li key={i}>{skill.trim()}</li>
        ))}
      </ul>

      {formData.achievements && formData.achievements.length > 0 && formData.achievements.some(a => a.trim()) && (
        <div className="mt-6">
          <h3 className="font-semibold">Achievements</h3>
          <ul className="list-disc ml-4 text-sm">
            {formData.achievements
              .filter(achievement => achievement.trim())
              .map((achievement, i) => (
                <li key={i}>{achievement.trim()}</li>
              ))}
          </ul>
        </div>
      )}
    </aside>

    <main className="w-2/3 p-6 space-y-4">
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

      <section>
        <h3 className="font-semibold text-lg">Certifications</h3>
        {formData.certifications.map((cert, i) => (
          <p key={i} className="text-sm">{cert.name} - {cert.issuer} ({cert.year})</p>
        ))}
      </section>

      {formData.activities && formData.activities.length > 0 && formData.activities.some(a => a.trim()) && (
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

export default FresherTemplate1;
