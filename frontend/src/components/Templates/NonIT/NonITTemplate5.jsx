import React from 'react';

const CreativeCardLayoutResume = ({ formData, fontColor, fontFamily }) => {
  const accentColor = 'emerald'; // Configurable: e.g., 'teal', 'sky', 'rose'
  const cardBgColorClass = `bg-white`; // Or `bg-${accentColor}-50` for colored cards
  const headingColorClass = `text-${accentColor}-700`;
  const bodyTextColorClass = `text-slate-700`;
  const sectionTitleColorClass = `text-${accentColor}-600`;
  const skillTagClasses = `bg-${accentColor}-100 text-${accentColor}-800 border border-${accentColor}-200`;

  const contactItems = [
    { icon: '📧', value: formData.email, type: 'email' },
    { icon: '📞', value: formData.phone, type: 'phone' },
    { icon: '🌍', value: formData.address, type: 'address' },
    // Example for a portfolio or LinkedIn, if you add it to formData
    // { icon: '🔗', value: formData.linkedin, type: 'linkedin' }, 
  ];

  const SectionCard = ({ title, children, className = "" }) => (
    <div className={`${cardBgColorClass} rounded-xl shadow-lg p-6 mb-6 ${className}`}>
      <h2 className={`text-xl font-bold ${sectionTitleColorClass} mb-4 pb-2 border-b-2 border-${accentColor}-200`}>{title}</h2>
      {children}
    </div>
  );

  return (
    <div className={`w-full max-w-4xl mx-auto bg-slate-100 p-4 md:p-8 my-8`} style={{ fontFamily, color: fontColor }}>
      {/* Header Card */}
      <header className={`${cardBgColorClass} rounded-xl shadow-xl p-6 md:p-8 mb-8 flex flex-col md:flex-row items-center gap-6`}>
        {formData.photo && (
          <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden flex-shrink-0 shadow-md border-4 border-${accentColor}-200">
            <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="text-center md:text-left flex-grow">
          <h1 className={`text-3xl md:text-4xl font-extrabold text-slate-800`}>{formData.fullName}</h1>
          <p className={`text-lg md:text-xl ${headingColorClass} mt-1`}>{formData.jobTitle || ''}</p>
          <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm">
             {contactItems.map(item => item.value && (
                <div key={item.type} className={`flex items-center ${bodyTextColorClass}`}>
                    <span className="mr-2 text-lg">{item.icon}</span>
                    <span>{item.value}</span>
                </div>
             ))}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column / Main Column for wider content */}
        <div className="md:col-span-2 space-y-6">
          {formData.summary && (
            <SectionCard title="ABOUT ME">
              <p className={`${bodyTextColorClass} leading-relaxed text-justify`}>{formData.summary}</p>
            </SectionCard>
          )}

          {formData.experience?.length > 0 && (
            <SectionCard title="WORK EXPERIENCE">
              {formData.experience.map((exp, i) => (
                <div key={i} className="mb-5 last:mb-0">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-1">
                    <h3 className="text-lg font-semibold text-slate-800">{exp.role}</h3>
                    <p className="text-xs sm:text-sm text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{exp.duration}</p>
                  </div>
                  <h4 className={`font-medium text-md ${headingColorClass} mb-2`}>{exp.company}</h4>
                  <ul className={`list-disc list-outside pl-5 space-y-1 ${bodyTextColorClass} text-sm marker:${accentColor}-400`}>
                    {exp.description.map((desc, j) => (
                      <li key={j}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </SectionCard>
          )}

          {formData.projects?.length > 0 && (
            <SectionCard title="PROJECT SHOWCASE">
              {formData.projects.map((project, i) => (
                <div key={i} className="mb-4 last:mb-0 p-3 bg-slate-50 rounded-md">
                  <h3 className="font-semibold text-md text-slate-800">{project.name}</h3>
                  <ul className={`list-disc list-outside pl-4 mt-1 space-y-0.5 ${bodyTextColorClass} text-sm marker:${accentColor}-300`}>
                    {project.description.split('\n').map((point, idx) => (
                      <li key={idx}>{point.trim()}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </SectionCard>
          )}
        </div>

        {/* Right Column / Sidebar for shorter content */}
        <div className="md:col-span-1 space-y-6">
          {formData.skills && (
            <SectionCard title="SKILLS & EXPERTISE">
              <div className="flex flex-wrap gap-2">
                {formData.skills.split(',').map((skill, i) => (
                  <span key={i} className={`px-3 py-1.5 text-xs font-medium rounded-full shadow-sm ${skillTagClasses}`}>
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </SectionCard>
          )}

          {formData.education?.length > 0 && (
            <SectionCard title="EDUCATION">
              {formData.education.map((edu, i) => (
                <div key={i} className="mb-3 last:mb-0 text-sm">
                  <h3 className="font-semibold text-slate-800">{edu.degree}</h3>
                  <p className={`${bodyTextColorClass}`}>{edu.school}, {edu.location}</p>
                  <p className="text-xs text-slate-500">{edu.year} {edu.grade && `| ${edu.grade}`}</p>
                </div>
              ))}
            </SectionCard>
          )}

          {formData.certifications?.length > 0 && (
            <SectionCard title="CERTIFICATIONS">
              <ul className="space-y-2 text-sm">
                {formData.certifications.map((cert, i) => (
                  <li key={i} className={`${bodyTextColorClass}`}>
                    <p className="font-semibold text-slate-800">{cert.name}</p>
                    <p className="text-xs text-slate-500">{cert.issuer} • {cert.year}</p>
                  </li>
                ))}
              </ul>
            </SectionCard>
          )}

          {formData.achievements?.filter(a => a.trim()).length > 0 && (
            <SectionCard title="ACHIEVEMENTS">
              <ul className={`list-disc list-outside pl-5 space-y-1 ${bodyTextColorClass} text-sm marker:${accentColor}-400`}>
                {formData.achievements.map((a, i) => a.trim() && (
                  <li key={i}>{a.trim()}</li>
                ))}
              </ul>
            </SectionCard>
          )}

          {formData.activities?.filter(a => a.trim()).length > 0 && (
            <SectionCard title="ACTIVITIES">
              <ul className={`list-disc list-outside pl-5 space-y-1 ${bodyTextColorClass} text-sm marker:${accentColor}-400`}>
                {formData.activities.map((a, i) => a.trim() && (
                  <li key={i}>{a.trim()}</li>
                ))}
              </ul>
            </SectionCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreativeCardLayoutResume;