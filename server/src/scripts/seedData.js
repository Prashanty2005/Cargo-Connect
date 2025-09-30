const mongoose = require('mongoose');
const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const VehicleContact = require('../models/VehicleContact');
const bcrypt = require('bcryptjs');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/loadmatefinder')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Sample data
const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Vehicle.deleteMany({});
    await VehicleContact.deleteMany({});

    // Create users
    const carrierUser = await User.create({
      username: 'carrier1',
      email: 'carrier1@example.com',
      password: await bcrypt.hash('password123', 10),
      role: 'carrier'
    });

    const shipperUser = await User.create({
      username: 'shipper1',
      email: 'shipper1@example.com',
      password: await bcrypt.hash('password123', 10),
      role: 'shipper'
    });

    // Create vehicles
    const vehicle1 = await Vehicle.create({
      owner: carrierUser._id,
      vehicleType: 'cargo_van',
      licensePlate: 'ABC123',
      model: 'Ford Transit',
      year: '2022',
      capacity: '10 cubic meters',
      description: 'Clean and well-maintained cargo van',
      available: true
    });

    const vehicle2 = await Vehicle.create({
      owner: carrierUser._id,
      vehicleType: 'box_truck',
      licensePlate: 'XYZ789',
      model: 'Isuzu NPR',
      year: '2021',
      capacity: '20 cubic meters',
      description: 'Large box truck with liftgate',
      available: true
    });

    // Create vehicle contacts
    await VehicleContact.create({
      vehicle: vehicle1._id,
      user: shipperUser._id,
      goodsType: 'Electronics',
      weight: '500 kg',
      dimensions: '2m x 1m x 1m',
      specialHandling: 'Fragile items',
      description: 'Computer equipment for office relocation',
      contactName: 'John Smith',
      contactPhone: '+1234567890',
      contactEmail: 'john.smith@example.com',
      status: 'pending'
    });

    await VehicleContact.create({
      vehicle: vehicle2._id,
      user: shipperUser._id,
      goodsType: 'Furniture',
      weight: '1000 kg',
      dimensions: '3m x 2m x 1.5m',
      specialHandling: 'Heavy items',
      description: 'Office furniture delivery',
      contactName: 'Jane Doe',
      contactPhone: '+1987654321',
      contactEmail: 'jane.doe@example.com',
      status: 'accepted'
    });

    console.log('Sample data created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating sample data:', error);
    process.exit(1);
  }
};

// Run the seed function
seedData(); 