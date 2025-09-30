const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/loadmate')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Load Mate Finder API' });
});

// Import routes
const userRoutes = require('./routes/userRoutes');
const loadRoutes = require('./routes/loadRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const vehicleContactRoutes = require('./routes/vehicleContactRoutes');
const postRoutes = require('./routes/postRoutes');
const vehicleRegistrationRoutes = require('./routes/vehicleRegistrationRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/loads', loadRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/vehicle-contacts', vehicleContactRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/vehicle-registrations', vehicleRegistrationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 