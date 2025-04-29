const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to User
  templateType: { type: String, required: true }, // Fresher / Experienced / Non-IT
  formData: { type: Object, required: true }, // Form fields like name, email, skills etc
  createdAt: { type: Date, default: Date.now }, // When created
});

module.exports = mongoose.model('Resume', ResumeSchema);
