import React from 'react';

const RearrangedModernResume = ({ formData, fontColor, fontFamily }) => {
  const accentColor = 'blue'; // You can change this: e.g., 'indigo', 'teal', 'rose'
  const iconColorClass = `text-${accentColor}-600`;
  const borderColorClass = `border-${accentColor}-500`;
  const sectionTitleColorClass = `text-${accentColor}-700`;
  const skillPillColorClasses = `bg-${accentColor}-100 text-${accentColor}-800`;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden my-8" style={{ fontFamily, color: fontColor }}>
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className={`md:w-1/3 bg-slate-50 p-6 md:p-8 border-r border-slate-200`}>
          {/* Name, Title & Photo */}
          <div className="text-center md:text-left mb-8">
            {formData.photo && (
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto md:mx-0 mb-4 border-4 border-white shadow-lg" style={{ borderColor: accentColor === 'white' ? '#eee' : 'white' /* fallback for white accent */}}>
                <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
              </div>
            )}
            <h1 className="text-3xl font-bold text-slate-800">{formData.fullName}</h1>
            <p className={`text-lg ${sectionTitleColorClass} mt-1`}>{formData.jobTitle || ''}</p>
          </div>

          {/* Contact Info */}
          <div className="mb-8">
            <h2 className={`text-xl font-semibold ${sectionTitleColorClass} mb-3 border-b-2 ${borderColorClass} pb-2`}>CONTACT</h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-center">
                <span className={`mr-3 w-5 text-center ${iconColorClass}`}>📩</span> {formData.email}
              </li>
              <li className="flex items-center">
                <span className={`mr-3 w-5 text-center ${iconColorClass}`}>☎️</span> {formData.phone}
              </li>
              <li className="flex items-center">
                <span className={`mr-3 w-5 text-center ${iconColorClass}`}>🗺️</span> {formData.address}
              </li>
            </ul>
          </div>

          {/* Skills */}
          {formData.skills && (
            <div className="mb-8">
              <h2 className={`text-xl font-semibold ${sectionTitleColorClass} mb-4 border-b-2 ${borderColorClass} pb-2`}>SKILLS</h2>
              <ul className="space-y-2">
                {formData.skills.split(',').map((skill, i) => (
                  <li key={i} className={`flex items-center p-2 rounded-md ${skillPillColorClasses} shadow-sm`}>
                    <span className={`w-2 h-2 bg-${accentColor}-500 rounded-full mr-3`}></span>
                    <span className="text-sm font-medium">{skill.trim()}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Education */}
          {formData.education?.length > 0 && (
            <div className="mb-8">
              <h2 className={`text-xl font-semibold ${sectionTitleColorClass} mb-3 border-b-2 ${borderColorClass} pb-2`}>EDUCATION</h2>
              {formData.education.map((edu, i) => (
                <div key={i} className="mb-3 text-sm">
                  <h3 className="font-bold text-slate-800">{edu.degree}</h3>
                  <p className="text-slate-700">{edu.school}, {edu.location}</p>
                  <p className="text-xs text-slate-500">{edu.year} {edu.grade && `| ${edu.grade}`}</p>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {formData.certifications?.length > 0 && (
            <div>
              <h2 className={`text-xl font-semibold ${sectionTitleColorClass} mb-3 border-b-2 ${borderColorClass} pb-2`}>CERTIFICATIONS</h2>
              <ul className="space-y-2 text-sm">
                {formData.certifications.map((cert, i) => (
                  <li key={i} className="text-slate-700">
                    <p className="font-semibold text-slate-800">{cert.name}</p>
                    <p className="text-xs text-slate-500">{cert.issuer} • {cert.year}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="md:w-2/3 p-6 md:p-8">
          {/* Summary */}
          {formData.summary && (
            <div className="mb-8">
              <h2 className={`text-2xl font-bold ${sectionTitleColorClass} mb-3 border-l-4 ${borderColorClass} pl-3`}>SUMMARY</h2>
              <p className="text-slate-700 leading-relaxed text-justify">{formData.summary}</p>
            </div>
          )}

          {/* Experience */}
          {formData.experience?.length > 0 && (
            <div className="mb-8">
              <h2 className={`text-2xl font-bold ${sectionTitleColorClass} mb-5 border-l-4 ${borderColorClass} pl-3`}>WORK EXPERIENCE</h2>
              {formData.experience.map((exp, i) => (
                <div key={i} className="mb-6 relative pl-6 group">
                  <div className={`absolute left-0 top-1 w-3 h-3 bg-${accentColor}-500 rounded-full border-2 border-white group-hover:scale-125 transition-transform`}></div>
                  <div className={`absolute left-[5px] top-4 bottom-0 w-0.5 bg-${accentColor}-200 group-last:hidden`}></div>
                  
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-semibold text-xl text-slate-800">{exp.role}</h3>
                    <p className="text-slate-500 text-xs md:text-sm bg-slate-100 px-2 py-0.5 rounded">{exp.duration}</p>
                  </div>
                  <h4 className={`font-medium text-md ${sectionTitleColorClass} mb-2`}>{exp.company}</h4>
                  <ul className="list-disc list-outside pl-5 space-y-1 text-slate-700 text-sm marker:text-${accentColor}-400">
                    {exp.description.map((desc, j) => (
                      <li key={j}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {formData.projects?.length > 0 && (
            <div className="mb-8">
              <h2 className={`text-2xl font-bold ${sectionTitleColorClass} mb-5 border-l-4 ${borderColorClass} pl-3`}>KEY PROJECTS</h2>
              {formData.projects.map((project, i) => (
                <div key={i} className="mb-4 bg-slate-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg text-slate-800">{project.name}</h3>
                  <ul className="list-disc list-outside pl-5 mt-2 space-y-1 text-slate-700 text-sm marker:text-${accentColor}-400">
                    {project.description.split('\n').map((point, idx) => (
                      <li key={idx}>{point.trim()}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Achievements */}
            {formData.achievements?.filter(a => a.trim()).length > 0 && (
              <div className="mb-8 sm:mb-0">
                <h2 className={`text-xl font-bold ${sectionTitleColorClass} mb-3 border-l-4 ${borderColorClass} pl-3`}>ACHIEVEMENTS</h2>
                <ul className="list-none space-y-2 text-sm">
                  {formData.achievements.map((a, i) => a.trim() && (
                    <li key={i} className="flex items-start text-slate-700">
                        <span className={`mr-2 mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-${accentColor}-500`}></span>
                        <span>{a.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Activities */}
            {formData.activities?.filter(a => a.trim()).length > 0 && (
              <div>
                <h2 className={`text-xl font-bold ${sectionTitleColorClass} mb-3 border-l-4 ${borderColorClass} pl-3`}>ACTIVITIES</h2>
                <ul className="list-none space-y-2 text-sm">
                  {formData.activities.map((a, i) => a.trim() && (
                     <li key={i} className="flex items-start text-slate-700">
                        <span className={`mr-2 mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-${accentColor}-500`}></span>
                        <span>{a.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
};

export default RearrangedModernResume;