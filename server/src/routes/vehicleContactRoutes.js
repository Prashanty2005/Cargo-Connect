const express = require('express');
const router = express.Router();
const VehicleContact = require('../models/VehicleContact');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');

// Create a new vehicle contact request
router.post('/', auth, async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    console.log('User ID from token:', req.user.userId);

    const { vehicle, ...contactData } = req.body;

    // Validate required fields
    if (!vehicle) {
      return res.status(400).json({ message: 'Vehicle ID is required' });
    }

    // Validate vehicle ID format
    if (!mongoose.Types.ObjectId.isValid(vehicle)) {
      return res.status(400).json({ message: 'Invalid vehicle ID format' });
    }

    // Create new contact request
    const vehicleContact = new VehicleContact({
      ...contactData,
      vehicle: new mongoose.Types.ObjectId(vehicle),
      user: new mongoose.Types.ObjectId(req.user.userId)
    });

    // Validate the document before saving
    const validationError = vehicleContact.validateSync();
    if (validationError) {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: Object.values(validationError.errors).map(err => err.message)
      });
    }

    // Save to database
    await vehicleContact.save();
    console.log('Contact request saved successfully:', vehicleContact);

    res.status(201).json(vehicleContact);
  } catch (error) {
    console.error('Error creating contact request:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    
    if (error.name === 'MongoError') {
      return res.status(400).json({ 
        message: 'Database error', 
        error: error.message 
      });
    }
    
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
});

// Get all contact requests for a vehicle (for vehicle owner)
router.get('/vehicle/:vehicleId', auth, async (req, res) => {
  try {
    const contacts = await VehicleContact.find({ vehicle: req.params.vehicleId })
      .populate('user', 'username email')
      .sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact requests', error: error.message });
  }
});

// Get all contact requests made by a user
router.get('/user', auth, async (req, res) => {
  try {
    const contacts = await VehicleContact.find({ user: req.user.userId })
      .populate('vehicle')
      .sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact requests', error: error.message });
  }
});

// Update contact request status (for vehicle owner)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await VehicleContact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact request not found' });
    }

    contact.status = status;
    await contact.save();
    
    res.json(contact);
  } catch (error) {
    res.status(400).json({ message: 'Error updating contact request', error: error.message });
  }
});

// Delete a contact request
router.delete('/:id', auth, async (req, res) => {
  try {
    const contact = await VehicleContact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact request not found' });
    }

    // Only allow the user who created the request to delete it
    if (contact.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this request' });
    }

    await contact.remove();
    res.json({ message: 'Contact request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact request', error: error.message });
  }
});

module.exports = router; 