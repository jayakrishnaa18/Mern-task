import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SavedResumeView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResume = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get(`http://localhost:5000/api/resume/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.resume) {
        setResume(response.data.resume);
      } else {
        setError('Resume data not found');
      }
    } catch (error) {
      console.error('Error fetching resume:', error);
      setError('Failed to load resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResume();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-xl">
        Loading resume...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-500 text-xl">
        <p>{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-500 text-xl">
        <p>Resume not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  const { resumeData = {}, templateType } = resume;

  return (
    <div className="min-h-screen p-10 bg-white text-gray-800 max-w-4xl mx-auto shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-center mb-6">
        {resumeData.fullName || 'Unnamed'}'s Resume
      </h1>

      <div className="text-center text-sm text-gray-500 mb-10">
        Template Type: <span className="capitalize">{templateType}</span>
      </div>

      {/* Basic Info */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Contact Info</h2>
        <p>Email: {resumeData.email || 'N/A'}</p>
        <p>Phone: {resumeData.phone || 'N/A'}</p>
        <p>Address: {resumeData.address || 'N/A'}</p>
      </div>

      {/* Education */}
      {resumeData.education && resumeData.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Education</h2>
          {resumeData.education.map((edu, idx) => (
            <div key={idx} className="mb-2">
              <p className="font-medium">{edu.degree || 'N/A'} - {edu.school || 'N/A'}</p>
              <p className="text-sm text-gray-600">{edu.year || 'N/A'} {edu.grade ? `| Grade: ${edu.grade}` : ''}</p>
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Experience</h2>
          {resumeData.experience.map((exp, idx) => (
            <div key={idx} className="mb-2">
              <p className="font-medium">{exp.role || 'N/A'} - {exp.company || 'N/A'}</p>
              <p className="text-sm text-gray-600">{exp.duration || 'N/A'}</p>
              {exp.description && <p className="text-sm mt-1">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {resumeData.projects && resumeData.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Projects</h2>
          {resumeData.projects.map((proj, idx) => (
            <div key={idx} className="mb-2">
              <p className="font-medium">{proj.name || 'N/A'}</p>
              {proj.description && <p className="text-sm text-gray-600">- {proj.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {resumeData.certifications && resumeData.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Certifications</h2>
          {resumeData.certifications.map((cert, idx) => (
            <div key={idx} className="mb-2">
              <p className="font-medium">{cert.name || 'N/A'}</p>
              <p className="text-sm text-gray-600">
                {cert.issuer ? `Issued by ${cert.issuer}` : ''}
                {cert.year ? `, ${cert.year}` : ''}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {resumeData.skills && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Skills</h2>
          {typeof resumeData.skills === 'string' ? (
            <ul className="list-disc list-inside">
              {resumeData.skills.split(',').map((skill, idx) => (
                <li key={idx}>{skill.trim()}</li>
              ))}
            </ul>
          ) : Array.isArray(resumeData.skills) ? (
            <ul className="list-disc list-inside">
              {resumeData.skills.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          ) : (
            <p>No skills listed</p>
          )}
        </div>
      )}

      {/* Achievements */}
      {resumeData.achievements && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Achievements</h2>
          <p>{resumeData.achievements}</p>
        </div>
      )}

      {/* Activities */}
      {resumeData.activities && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Activities</h2>
          <p>{resumeData.activities}</p>
        </div>
      )}

      <div className="mt-10 text-center">
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default SavedResumeView;