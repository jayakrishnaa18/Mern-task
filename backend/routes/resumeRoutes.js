const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const { verifyToken } = require('../middleware/authMiddleware'); // Protect route

// Save Resume
router.post('/save', verifyToken, async (req, res) => {
  try {
    const { templateType, formData } = req.body;

    const newResume = new Resume({
      userId: req.user.id,
      templateType,
      formData,
    });

    await newResume.save();
    res.status(201).json({ message: 'Resume saved successfully!', resume: newResume });
  } catch (error) {
    console.error('Error saving resume:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get All Saved Resumes for a User
router.get('/my-resumes', verifyToken, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a Resume
router.delete('/delete/:id', verifyToken, async (req, res) => {
  try {
    const resumeId = req.params.id;
    await Resume.deleteOne({ _id: resumeId, userId: req.user.id });
    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Error deleting resume:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
