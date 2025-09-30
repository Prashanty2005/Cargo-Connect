const express = require('express');
const router = express.Router();
const VehicleRegistration = require('../models/VehicleRegistration');
const auth = require('../middleware/auth');

// Create a new vehicle registration
router.post('/', auth, async (req, res) => {
  try {
    console.log('Received vehicle registration request:', req.body);
    
    const {
      vehicleType,
      make,
      model,
      year,
      registrationNumber,
      chassisNumber,
      engineNumber,
      capacity,
      dimensions,
      insuranceProvider,
      insurancePolicyNumber,
      insuranceExpiryDate,
      registrationCertificate,
      insuranceDocument,
      fitnessCertificate
    } = req.body;

    // Create new vehicle registration
    const vehicleRegistration = new VehicleRegistration({
      user: req.user.userId,
      vehicleType,
      make,
      model,
      year,
      registrationNumber,
      chassisNumber,
      engineNumber,
      capacity,
      dimensions,
      insuranceProvider,
      insurancePolicyNumber,
      insuranceExpiryDate,
      registrationCertificate,
      insuranceDocument,
      fitnessCertificate
    });

    console.log('Attempting to save vehicle registration:', vehicleRegistration);

    // Save to database
    await vehicleRegistration.save();
    console.log('Vehicle registration saved successfully');

    res.status(201).json({
      message: 'Vehicle registration submitted successfully',
      registration: vehicleRegistration
    });
  } catch (error) {
    console.error('Error creating vehicle registration:', error);
    res.status(500).json({ message: 'Error creating vehicle registration', error: error.message });
  }
});

// Get all vehicle registrations for a user
router.get('/my-vehicles', auth, async (req, res) => {
  try {
    const vehicles = await VehicleRegistration.find({ user: req.user.userId })
      .sort({ createdAt: -1 });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicle registrations', error: error.message });
  }
});

// Get a single vehicle registration
router.get('/:id', auth, async (req, res) => {
  try {
    const vehicle = await VehicleRegistration.findOne({
      _id: req.params.id,
      user: req.user.userId
    });
    
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle registration not found' });
    }
    
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicle registration', error: error.message });
  }
});

// Update vehicle registration status (admin only)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can update registration status' });
    }
    
    const vehicle = await VehicleRegistration.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle registration not found' });
    }
    
    res.json({
      message: 'Vehicle registration status updated successfully',
      vehicle
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating vehicle registration status', error: error.message });
  }
});

module.exports = router; 