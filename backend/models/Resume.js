const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Changed from userId → user
  templateType: { type: String, required: true },
  resumeData: { type: Object, required: true }, // Changed from formData → resumeData
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Resume', ResumeSchema);
