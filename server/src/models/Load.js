const mongoose = require('mongoose');

const loadSchema = new mongoose.Schema({
  shipper: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  carrier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  pickupLocation: {
    type: String,
    required: true
  },
  deliveryLocation: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  status: {
    type: String,
    enum: ['available', 'booked', 'in-transit', 'delivered'],
    default: 'available'
  },
  price: {
    type: Number,
    required: true
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  pickupDate: {
    type: Date,
    required: true
  },
  deliveryDate: {
    type: Date,
    required: true
  },
  blockchainTxHash: {
    type: String,
    default: null
  },
  blockchainData: {
    type: Object,
    default: null
  },
  blockchainError: {
    type: String,
    default: null
  }
});

const Load = mongoose.model('Load', loadSchema);

module.exports = Load; 