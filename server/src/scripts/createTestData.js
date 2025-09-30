const mongoose = require('mongoose');
const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
require('dotenv').config();

async function createTestData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/loadmatefinder');
    console.log('Connected to MongoDB');

    // Create a test user if not exists
    let user = await User.findOne({ email: 'test@example.com' });
    if (!user) {
      user = new User({
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword',
        role: 'carrier'
      });
      await user.save();
      console.log('Created test user');
    }

    // Create a test vehicle if not exists
    let vehicle = await Vehicle.findOne({ licensePlate: 'TEST123' });
    if (!vehicle) {
      vehicle = new Vehicle({
        owner: user._id,
        vehicleType: 'Truck',
        licensePlate: 'TEST123',
        model: 'Test Model',
        year: '2023',
        capacity: '1000 kg',
        description: 'Test vehicle for development',
        available: true
      });
      await vehicle.save();
      console.log('Created test vehicle');
    }

    console.log('Test data created successfully');
    console.log('User ID:', user._id);
    console.log('Vehicle ID:', vehicle._id);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error creating test data:', error);
    process.exit(1);
  }
}

createTestData(); 