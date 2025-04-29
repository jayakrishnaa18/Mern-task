import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SavedResumeView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchResume = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No auth token found');
        navigate('/login');
        return;
      }

      const response = await axios.get(`http://localhost:5000/api/resume/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResume(response.data?.resume);
    } catch (error) {
      console.error('Error fetching resume:', error);
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

  if (!resume) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        Resume not found.
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
              <p className="font-medium">{edu.degree} - {edu.institution}</p>
              <p className="text-sm text-gray-600">{edu.year}</p>
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
              <p className="font-medium">{exp.jobTitle} - {exp.company}</p>
              <p className="text-sm text-gray-600">{exp.duration}</p>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Skills</h2>
          <ul className="list-disc list-inside">
            {resumeData.skills.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
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
