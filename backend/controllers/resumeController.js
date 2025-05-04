const Resume = require('../models/Resume');

const saveResume = async (req, res) => {
  try {
    const { templateType, resumeData } = req.body;

    const resume = new Resume({
      user: req.user.id, // Changed from userId → user
      templateType,
      resumeData, // Changed from formData → resumeData
    });

    await resume.save();
    res.status(201).json({ message: 'Resume saved successfully', resume });
  } catch (error) {
    console.error('Save resume error:', error);
    res.status(500).json({ message: 'Failed to save resume', error });
  }
};


const loadResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user.id });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { saveResume, loadResume };
