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
// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // ⬅️ Updated to allow large payloads
app.use(express.urlencoded({ limit: '10mb', extended: true })); // ⬅️ also handle URL-encoded data


// Increase body size limit to fix "Payload Too Large" error 👇
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// Handle errors gracefully
process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err);
  process.exit(1); // Mandatory (as per Node docs)
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection', err);
  server.close(() => process.exit(1)); // Close server & exit
});
