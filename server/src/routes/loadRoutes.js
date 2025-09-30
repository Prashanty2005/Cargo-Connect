const express = require('express');
const router = express.Router();
const Load = require('../models/Load');
const auth = require('../middleware/auth');
const blockchainService = require('../services/blockchainService');

// Create a new load
router.post('/', auth, async (req, res) => {
  try {
    const load = new Load({
      ...req.body,
      shipper: req.user.userId
    });

    // Save to blockchain first
    try {
      const blockchainResult = await blockchainService.createLoad(
        req.body.weight,
        req.body.capacity
      );
      load.blockchainTxHash = blockchainResult.transactionHash;
    } catch (blockchainError) {
      console.error('Blockchain error:', blockchainError);
    }

    await load.save();
    res.status(201).json(load);
  } catch (error) {
    res.status(400).json({ message: 'Error creating load', error: error.message });
  }
});

// Get all loads
router.get('/', async (req, res) => {
  try {
    const loads = await Load.find()
      .populate('shipper', 'username email')
      .populate('carrier', 'username email');
    res.json(loads);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loads', error: error.message });
  }
});

// Get a single load
router.get('/:id', async (req, res) => {
  try {
    const load = await Load.findById(req.params.id)
      .populate('shipper', 'username email')
      .populate('carrier', 'username email');
    
    if (!load) {
      return res.status(404).json({ message: 'Load not found' });
    }

    // Get blockchain data if available
    if (load.blockchainTxHash) {
      try {
        const blockchainData = await blockchainService.getLoad(load._id);
        load.blockchainData = blockchainData;
      } catch (blockchainError) {
        console.error('Error fetching blockchain data:', blockchainError);
      }
    }

    res.json(load);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching load', error: error.message });
  }
});

// Update a load
router.put('/:id', auth, async (req, res) => {
  try {
    const load = await Load.findById(req.params.id);
    if (!load) {
      return res.status(404).json({ message: 'Load not found' });
    }

    // Check if user is the shipper
    if (load.shipper.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this load' });
    }

    const updatedLoad = await Load.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // Update blockchain if weight or capacity changed
    if ((req.body.weight || req.body.capacity) && load.blockchainTxHash) {
      try {
        await blockchainService.updateLoad(
          load._id,
          req.body.weight || load.weight,
          req.body.capacity || load.capacity
        );
      } catch (blockchainError) {
        console.error('Error updating blockchain:', blockchainError);
      }
    }

    res.json(updatedLoad);
  } catch (error) {
    res.status(400).json({ message: 'Error updating load', error: error.message });
  }
});

// Book a load
router.post('/:id/book', auth, async (req, res) => {
  try {
    const load = await Load.findById(req.params.id);
    if (!load) {
      return res.status(404).json({ message: 'Load not found' });
    }

    // Update MongoDB
    load.carrier = req.user.userId;
    load.status = 'booked';
    await load.save();

    res.json(load);
  } catch (error) {
    res.status(400).json({ message: 'Error booking load', error: error.message });
  }
});

module.exports = router; 