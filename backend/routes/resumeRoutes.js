const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const { protect } = require('../middleware/authMiddleware');
const asyncHandler = require('express-async-handler');

// Save resume
router.post('/save', protect, asyncHandler(async (req, res) => {
  const { templateType, resumeData } = req.body;

  const newResume = new Resume({
    user: req.user.id,  // ✅ Matches what's decoded from JWT
    templateType,
    resumeData,
  });
  

  const saved = await newResume.save();
  res.status(201).json({ message: 'Resume saved successfully.', resume: saved });
}));

// Load all resumes of user
router.get('/load', protect, asyncHandler(async (req, res) => {
  const resumes = await Resume.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ resumes });
}));

// View specific resume
router.get('/:id', protect, asyncHandler(async (req, res) => {
  const resume = await Resume.findById(req.params.id);
  if (!resume || resume.user.toString() !== req.user._id.toString()) {
    res.status(404).json({ message: 'Resume not found' });
  } else {
    res.json({ resume });
  }
}));

module.exports = router;
