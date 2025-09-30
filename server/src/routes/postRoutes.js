const express = require('express');
const router = express.Router();
const VehiclePost = require('../models/VehiclePost');
const ShipmentRequest = require('../models/ShipmentRequest');
const auth = require('../middleware/auth');

// Create a new vehicle post
router.post('/vehicle', auth, async (req, res) => {
  try {
    const { vehicleType, origin, destination, departureDate, availableSpace, description, contactName, contactPhone, contactEmail } = req.body;

    // Create new vehicle post
    const vehiclePost = new VehiclePost({
      user: req.user.userId,
      vehicleType,
      origin,
      destination,
      departureDate,
      availableSpace,
      description,
      contactName,
      contactPhone,
      contactEmail
    });

    // Save to database
    await vehiclePost.save();

    res.status(201).json({
      message: 'Vehicle post created successfully',
      post: vehiclePost
    });
  } catch (error) {
    console.error('Error creating vehicle post:', error);
    res.status(500).json({ message: 'Error creating vehicle post', error: error.message });
  }
});

// Create a new shipment request
router.post('/shipment', auth, async (req, res) => {
  try {
    const { goodsType, origin, destination, shipmentDate, packageSize, packageWeight, description, contactName, contactPhone, contactEmail } = req.body;

    // Create new shipment request
    const shipmentRequest = new ShipmentRequest({
      user: req.user.userId,
      goodsType,
      origin,
      destination,
      shipmentDate,
      packageSize,
      packageWeight,
      description,
      contactName,
      contactPhone,
      contactEmail
    });

    // Save to database
    await shipmentRequest.save();

    res.status(201).json({
      message: 'Shipment request created successfully',
      request: shipmentRequest
    });
  } catch (error) {
    console.error('Error creating shipment request:', error);
    res.status(500).json({ message: 'Error creating shipment request', error: error.message });
  }
});

// Get all vehicle posts
router.get('/vehicles', async (req, res) => {
  try {
    const vehiclePosts = await VehiclePost.find({ status: 'active' })
      .populate('user', 'username email')
      .sort({ createdAt: -1 });
    res.json(vehiclePosts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicle posts', error: error.message });
  }
});

// Get all shipment requests
router.get('/shipments', async (req, res) => {
  try {
    const shipmentRequests = await ShipmentRequest.find({ status: 'pending' })
      .populate('user', 'username email')
      .sort({ createdAt: -1 });
    res.json(shipmentRequests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shipment requests', error: error.message });
  }
});

module.exports = router; 