const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Add event listeners for better debugging
mongoose.connection.on('connecting', () => console.log('Connecting to MongoDB...'));
mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));
mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err));
mongoose.connection.on('disconnected', () => console.log('Disconnected from MongoDB'));

module.exports = connectDB;