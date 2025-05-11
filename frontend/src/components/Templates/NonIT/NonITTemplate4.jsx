import React from 'react';

const MinimalistFocusResume = ({ formData, fontColor, fontFamily }) => {
  const accentColor = 'slate'; // Configurable: e.g., 'gray', 'blue-gray'
  // For this minimalist design, we'll use shades of the accent color or neutral grays.
  const headingColorClass = `text-${accentColor}-800`;
  const subtleTextColorClass = `text-${accentColor}-600`;
  const lightBorderColorClass = `border-${accentColor}-200`;
  const bodyTextColorClass = `text-${accentColor}-700`;

  const contactInfo = [
    { icon: '✉️', value: formData.email, href: `mailto:${formData.email}` },
    { icon: '📞', value: formData.phone, href: `tel:${formData.phone}` },
    { icon: '🏠', value: formData.address },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-xl rounded-lg my-8" style={{ fontFamily, color: fontColor }}>
      {/* Header Section */}
      <header className={`bg-${accentColor}-50 p-6 md:p-10 border-b ${lightBorderColorClass}`}>
        <div className="flex flex-col md:flex-row items-start">
          {formData.photo && (
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden mr-0 md:mr-8 mb-4 md:mb-0 flex-shrink-0 border-2 border-white shadow-md">
              <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex-grow">
            <h1 className={`text-3xl md:text-4xl font-bold ${headingColorClass}`}>{formData.fullName}</h1>
            <p className={`text-lg md:text-xl ${subtleTextColorClass} mt-1`}>{formData.jobTitle || ''}</p>
            
            {/* Contact Info in Header */}
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {contactInfo.map((item, index) => item.value && (
                <div key={index} className={`flex items-center ${bodyTextColorClass}`}>
                  <span className="mr-2 text-lg">{item.icon}</span>
                  {item.href ? <a href={item.href} className={`hover:text-${accentColor}-900 hover:underline`}>{item.value}</a> : <span>{item.value}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Single Column */}
      <main className="p-6 md:p-10">
        {/* Summary */}
        {formData.summary && (
          <section className="mb-8">
            <h2 className={`text-xl font-semibold ${headingColorClass} mb-3 pb-1 border-b-2 ${lightBorderColorClass}`}>PROFILE SUMMARY</h2>
            <p className={`${bodyTextColorClass} leading-relaxed text-justify`}>{formData.summary}</p>
          </section>
        )}

        {/* Skills */}
        {formData.skills && (
          <section className="mb-8">
            <h2 className={`text-xl font-semibold ${headingColorClass} mb-3 pb-1 border-b-2 ${lightBorderColorClass}`}>CORE COMPETENCIES</h2>
            <div className={`${bodyTextColorClass} flex flex-wrap`}>
              {formData.skills.split(',').map((skill, i, arr) => (
                <span key={i} className="text-sm">
                  {skill.trim()}
                  {i < arr.length - 1 && <span className={`mx-2 ${subtleTextColorClass}`}>•</span>}
                </span>
              ))}
            </div>
          </section>
        )}
        
        {/* Experience */}
        {formData.experience?.length > 0 && (
          <section className="mb-8">
            <h2 className={`text-xl font-semibold ${headingColorClass} mb-4 pb-1 border-b-2 ${lightBorderColorClass}`}>PROFESSIONAL EXPERIENCE</h2>
            {formData.experience.map((exp, i) => (
              <div key={i} className="mb-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-1">
                  <h3 className={`text-lg font-medium ${headingColorClass}`}>{exp.role}</h3>
                  <p className={`${subtleTextColorClass} text-xs sm:text-sm`}>{exp.duration}</p>
                </div>
                <h4 className={`${subtleTextColorClass} font-normal text-md mb-2`}>{exp.company}</h4>
                <ul className={`list-disc list-outside pl-5 space-y-1 ${bodyTextColorClass} text-sm marker:${accentColor}-400`}>
                  {exp.description.map((desc, j) => (
                    <li key={j}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {formData.projects?.length > 0 && (
          <section className="mb-8">
            <h2 className={`text-xl font-semibold ${headingColorClass} mb-4 pb-1 border-b-2 ${lightBorderColorClass}`}>KEY PROJECTS</h2>
            {formData.projects.map((project, i) => (
              <div key={i} className={`mb-4 p-4 bg-${accentColor}-50 rounded-md`}>
                <h3 className={`font-medium text-md ${headingColorClass}`}>{project.name}</h3>
                <ul className={`list-disc list-outside pl-5 mt-1 space-y-1 ${bodyTextColorClass} text-sm marker:${accentColor}-300`}>
                  {project.description.split('\n').map((point, idx) => (
                    <li key={idx}>{point.trim()}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          {/* Education */}
          {formData.education?.length > 0 && (
            <section className="mb-8 md:mb-0">
              <h2 className={`text-xl font-semibold ${headingColorClass} mb-3 pb-1 border-b-2 ${lightBorderColorClass}`}>EDUCATION</h2>
              {formData.education.map((edu, i) => (
                <div key={i} className="mb-3 text-sm">
                  <h3 className={`font-medium ${headingColorClass}`}>{edu.degree}</h3>
                  <p className={`${bodyTextColorClass}`}>{edu.school}, {edu.location}</p>
                  <p className={`${subtleTextColorClass} text-xs`}>{edu.year} {edu.grade && `| ${edu.grade}`}</p>
                </div>
              ))}
            </section>
          )}

          {/* Certifications */}
          {formData.certifications?.length > 0 && (
            <section className="mb-8 md:mb-0">
              <h2 className={`text-xl font-semibold ${headingColorClass} mb-3 pb-1 border-b-2 ${lightBorderColorClass}`}>CERTIFICATIONS</h2>
              <ul className="space-y-2 text-sm">
                {formData.certifications.map((cert, i) => (
                  <li key={i} className={`${bodyTextColorClass}`}>
                    <p className={`font-medium ${headingColorClass}`}>{cert.name}</p>
                    <p className={`${subtleTextColorClass} text-xs`}>{cert.issuer} • {cert.year}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
        
        {(formData.achievements?.filter(a => a.trim()).length > 0 || formData.activities?.filter(a => a.trim()).length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mt-8">
            {/* Achievements */}
            {formData.achievements?.filter(a => a.trim()).length > 0 && (
              <section>
                <h2 className={`text-xl font-semibold ${headingColorClass} mb-3 pb-1 border-b-2 ${lightBorderColorClass}`}>ACHIEVEMENTS</h2>
                <ul className={`list-disc list-outside pl-5 space-y-1 ${bodyTextColorClass} text-sm marker:${accentColor}-400`}>
                  {formData.achievements.map((a, i) => a.trim() && (
                    <li key={i}>{a.trim()}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Activities */}
            {formData.activities?.filter(a => a.trim()).length > 0 && (
              <section>
                <h2 className={`text-xl font-semibold ${headingColorClass} mb-3 pb-1 border-b-2 ${lightBorderColorClass}`}>ACTIVITIES</h2>
                <ul className={`list-disc list-outside pl-5 space-y-1 ${bodyTextColorClass} text-sm marker:${accentColor}-400`}>
                  {formData.activities.map((a, i) => a.trim() && (
                    <li key={i}>{a.trim()}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default MinimalistFocusResume;