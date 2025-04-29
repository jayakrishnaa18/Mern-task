// utils/securityQuestions.js

const validateSecurityAnswer = (savedAnswer, providedAnswer) => {
    return savedAnswer.trim().toLowerCase() === providedAnswer.trim().toLowerCase();
  };
  
  module.exports = { validateSecurityAnswer };
  