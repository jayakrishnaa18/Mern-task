import React from 'react';

const ExperiencedTemplate5 = ({ formData, fontColor = '#454549', fontFamily = 'Arial, sans-serif' }) => {
  const sectionHeader = 'text-sm font-bold uppercase text-white bg-[#b0b0b0] px-4 py-2 rounded';
  const sectionBox = 'bg-[#fefefe] border border-[#d9d9d9] rounded px-6 py-4 space-y-3';

  return (
    <div
      className="w-full max-w-4xl mx-auto p-8 space-y-8 text-sm"
      style={{ fontFamily, color: fontColor, backgroundColor: '#ffffff' }}
    >
      {/* Header */}
      <header className="text-left space-y-2">
        {formData.photo && (
          <div className="mb-3">
            <img
              src={formData.photo}
              alt="Profile"
              className="w-20 h-20 object-cover rounded-full border border-gray-300"
            />
          </div>
        )}
        <h1 className="text-3xl font-bold text-[#454549]">{formData.fullName}</h1>
        {formData.jobTitle && <p className="text-base font-medium text-[#878687]">{formData.jobTitle}</p>}
        <p className="text-sm text-[#878687]">{formData.address} | {formData.email} | {formData.phone}</p>
      </header>

      {/* Summary */}
      {formData.summary && (
        <section>
          <div className={sectionHeader}>Career Objective</div>
          <div className={sectionBox}>{formData.summary}</div>
        </section>
      )}

      {/* Skills */}
      {formData.skills && (
        <section>
          <div className={sectionHeader}>Skills</div>
          <div className={sectionBox}>
            <div className="grid grid-cols-3 gap-x-4 gap-y-2">
              {formData.skills.split(',').map((skill, i) => (
                <span key={i}>• {skill.trim()}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience */}
      {formData.experience?.length > 0 && (
        <section>
          <div className={sectionHeader}>Professional Experience</div>
          <div className={sectionBox}>
            {formData.experience.map((exp, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>{exp.company} — {exp.role}</span>
                  <span className="text-[#878687]">{exp.duration}</span>
                </div>
                {Array.isArray(exp.description) && exp.description.length > 0 && (
                  <ul className="list-disc list-inside pl-2 space-y-1">
                    {exp.description.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {formData.education?.length > 0 && (
        <section>
          <div className={sectionHeader}>Education</div>
          <div className={sectionBox}>
            {formData.education.map((edu, i) => (
              <div key={i} className="space-y-1">
                <div className="font-semibold">{edu.degree}</div>
                <div className="text-[#878687]">
                  {edu.school}, {edu.location} — {edu.year}
                  {edu.grade && ` | Grade: ${edu.grade}`}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {formData.certifications?.length > 0 && (
        <section>
          <div className={sectionHeader}>Certifications</div>
          <div className={sectionBox}>
            {formData.certifications.map((c, i) => (
              <div key={i}>• {c.name} — {c.issuer}{c.year && ` (${c.year})`}</div>
            ))}
          </div>
        </section>
      )}

      {/* Achievements */}
      {formData.achievements?.filter(a => a.trim()).length > 0 && (
        <section>
          <div className={sectionHeader}>Achievements</div>
          <div className={sectionBox}>
            {formData.achievements.map((a, i) => a.trim() && (
              <div key={i}>• {a.trim()}</div>
            ))}
          </div>
        </section>
      )}

      {/* Activities */}
      {formData.activities?.filter(a => a.trim()).length > 0 && (
        <section>
          <div className={sectionHeader}>Activities</div>
          <div className={sectionBox}>
            {formData.activities.map((a, i) => a.trim() && (
              <div key={i}>• {a.trim()}</div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ExperiencedTemplate5;
