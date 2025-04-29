const Resume = require('../models/Resume');

const saveResume = async (req, res) => {
  const { templateType, resumeData } = req.body;

  try {
    const resume = await Resume.findOneAndUpdate(
      { userId: req.user.id },
      { templateType, resumeData },
      { new: true, upsert: true }
    );
    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loadResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.user.id });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { saveResume, loadResume };
