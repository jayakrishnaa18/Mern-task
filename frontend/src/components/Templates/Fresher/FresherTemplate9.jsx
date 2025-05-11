import React from 'react';

const FresherTemplate9 = ({ formData, fontColor, fontFamily }) => (

  <div className="w-full flex flex-col shadow-lg text-gray-800" style={{ fontFamily, color: fontColor }}>
    <div className="flex bg-gradient-to-r from-green-100 to-green-50 p-6 rounded-t-lg">
      <div className="w-1/3 flex flex-col items-center justify-center text-center">
        {formData.photo && (
          <img
            src={formData.photo}
            alt="profile"
            className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
          />
        )}
        <h1 className="text-3xl font-bold mt-4">{formData.fullName?.split(' ')[0]}</h1>
        <h2 className="text-xl">{formData.fullName?.split(' ').slice(1).join(' ')}</h2>
      </div>
      <div className="w-2/3 pl-6">
        <div className="bg-green-200 p-4 rounded-lg shadow-inner">
          <h3 className="font-semibold text-lg mb-1">About Me</h3>
          <p className="text-sm">{formData.summary}</p>
        </div>
        <div className="mt-4 flex gap-4 text-sm text-gray-600">
          <span>📞 {formData.phone}</span>
          <span>📧 {formData.email}</span>
          <span>📍 {formData.address}</span>
        </div>
      </div>
    </div>

    <div className="flex">
      {/* Left Sidebar */}
      <aside className="w-1/3 bg-green-50 p-6 space-y-6">
        {/* Skills */}
        <div>
          <h3 className="text-green-900 font-bold mb-2">Skills</h3>
          <ul className="text-sm space-y-1">
            {formData.skills?.split(',').map((skill, i) => (
              <li key={i} className="flex justify-between">
                <span>{skill.trim()}</span>
                {/* You can customize skill levels using a skill map if needed */}
              </li>
            ))}
          </ul>
        </div>

        {/* Education */}
        <div>
          <h3 className="text-green-900 font-bold mb-2">Education</h3>
          {formData.education.map((edu, i) => (
            <div key={i} className="text-sm mb-2">
              <p className="font-semibold">{edu.degree}</p>
              <p>{edu.school}</p>
              <p className="text-xs">{edu.year} | Grade: {edu.grade}</p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        {formData.certifications?.length > 0 && (
          <div>
            <h3 className="text-green-900 font-bold mb-2">Certifications</h3>
            <ul className="text-sm space-y-2">
              {formData.certifications.map((cert, i) => (
                <li key={i}>
                  <p className="font-semibold">{cert.name}</p>
                  <p className="text-xs">{cert.issuer} | {cert.year}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      {/* Right Main Content */}
      <main className="w-2/3 p-6 space-y-6">
        {/* Internships */}
        {formData.internships?.length > 0 && (
          <section>
            <h3 className="text-green-800 font-bold text-lg mb-2">Internships</h3>
            {formData.internships.map((internship, i) => (
              <div key={i} className="mb-4">
                <p className="font-semibold">{internship.role}</p>
                <p className="text-sm">{internship.company} | {internship.duration}</p>
                <ul className="list-disc ml-5 text-sm text-gray-700">
                  {internship.description?.split('\n').map((line, j) => (
                    <li key={j}>{line.trim()}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {formData.projects?.length > 0 && (
          <section>
            <h3 className="text-green-800 font-bold text-lg mb-2">Projects</h3>
            {formData.projects.map((proj, i) => (
              <div key={i}>
                <p className="font-semibold">{proj.name}</p>
                <p className="text-sm">{proj.company} </p>
                <ul className="list-disc ml-5 text-sm text-gray-700">
                  {proj.description?.split('\n').map((desc, j) => (
                    <li key={j}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* Achievements */}
        {formData.achievements?.length > 0 && formData.achievements.some(a => a.trim()) && (
          <section>
            <h3 className="text-green-800 font-bold text-lg mb-2">Achievements</h3>
            <ul className="list-disc ml-5 text-sm">
              {formData.achievements.filter(a => a.trim()).map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Activities */}
        {formData.activities?.length > 0 && formData.activities.some(a => a.trim()) && (
          <section>
            <h3 className="text-green-800 font-bold text-lg mb-2">Extracurricular Activities</h3>
            <ul className="list-disc ml-5 text-sm">
              {formData.activities.filter(a => a.trim()).map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  </div>
);

export default FresherTemplate9;