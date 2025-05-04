const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // For JSON payloads
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // For form submissions

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// Error handling
process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection', err);
  server.close(() => process.exit(1));
});
