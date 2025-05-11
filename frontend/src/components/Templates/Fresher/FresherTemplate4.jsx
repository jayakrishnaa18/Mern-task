import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Resume Template Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong while rendering the resume.</h2>;
    }
    return this.props.children;
  }
}

const FresherTemplate4 = ({ formData, fontColor, fontFamily }) => {
  const skills = (formData?.skills || '').split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="w-full p-4 bg-white" style={{ fontFamily, color: fontColor, fontSize: '13px', lineHeight: '1.3' }}>
      {/* Header */}
      <div className="text-center mb-3">
        <h1 className="text-xl font-bold uppercase">{formData.fullName || 'Full Name'}</h1>
        <p className="text-xs">
          {formData.address || 'Address'} | {formData.email || 'Email'} | {formData.phone || 'Phone'} | {formData.website || 'Website'}
        </p>
        <h2 className="text-sm font-semibold uppercase mt-1"></h2>
      </div>

      {/* Career Objective */}
      {formData.summary && (
        <section className="mb-3">
          <h3 className="font-semibold border-b border-gray-400 mb-1">Career Objective</h3>
          <p>{formData.summary}</p>
        </section>
      )}

      {/* Technical Skills */}
      <section className="mb-3">
        <h3 className="font-semibold border-b border-gray-400 mb-1">Technical Skills</h3>
        <ul className="grid grid-cols-2 list-disc ml-5">
          {skills.map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
      </section>

      {/* Projects */}
      {formData.projects?.length > 0 && (
        <section className="mb-3">
          <h3 className="font-semibold border-b border-gray-400 mb-1">Projects</h3>
          {formData.projects.map((proj, i) => (
            <div key={i} className="mb-1">
              <div className="flex justify-between font-bold text-sm">
                <span>{proj.name}</span>
                <span>{proj.duration}</span>
              </div>
              <ul className="list-disc ml-5">
                {(proj.description || '').split('\n').filter(Boolean).map((point, idx) => (
                  <li key={idx}>{point.trim()}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {formData.education?.length > 0 && (
        <section className="mb-3">
          <h3 className="font-semibold border-b border-gray-400 mb-1">Education</h3>
          {formData.education.map((edu, i) => (
            <div key={i} className="mb-1">
              <div className="flex justify-between font-bold text-sm">
                <span>{edu.degree}</span>
                <span>{edu.year}</span>
              </div>
              <p>{edu.school}, {edu.location}</p>
              {edu.grade && <p>GPA: {edu.grade}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Internship */}
      {formData.internships?.length > 0 && (
        <section className="mb-3">
          <h3 className="font-semibold border-b border-gray-400 mb-1">Internship</h3>
          {formData.internships.map((intern, i) => (
            <div key={i} className="mb-1">
              <div className="flex justify-between font-bold text-sm">
                <span>{intern.role} - {intern.company}</span>
                <span>{intern.duration}</span>
              </div>
              <ul className="list-disc ml-5">
                {(intern.description || '').split('\n').filter(Boolean).map((point, idx) => (
                  <li key={idx}>{point.trim()}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {formData.certifications?.length > 0 && (
        <section className="mb-3">
          <h3 className="font-semibold border-b border-gray-400 mb-1">Certifications</h3>
          {formData.certifications.map((cert, i) => (
            <div key={i} className="mb-1">
              <p className="font-bold">{cert.name}</p>
              <p className="text-sm">{cert.issuer}{cert.year ? ` - ${cert.year}` : ''}</p>
            </div>
          ))}
        </section>
      )}

      {/* Awards & Achievements */}
      {formData.achievements?.length > 0 && formData.achievements.some(a => a.trim()) && (
        <section className="mb-3">
          <h3 className="font-semibold border-b border-gray-400 mb-1">Awards & Achievements</h3>
          <ul className="list-disc ml-5">
            {formData.achievements.map((ach, i) => (
              <li key={i}>{ach.trim()}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Extracurricular Activities */}
      {formData.activities?.length > 0 && formData.activities.some(a => a.trim()) && (
        <section className="mb-1">
          <h3 className="font-semibold border-b border-gray-400 mb-1">Extracurricular Activities</h3>
          <ul className="list-disc ml-5">
            {formData.activities.map((activity, i) => (
              <li key={i}>{activity.trim()}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

// Wrap with error boundary
const WrappedFresherTemplate4 = (props) => (
  <ErrorBoundary>
    <FresherTemplate4 {...props} />
  </ErrorBoundary>
);

export default WrappedFresherTemplate4;
