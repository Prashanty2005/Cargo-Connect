const mongoose = require('mongoose');

const shipmentRequestSchema = new mongoose.Schema({
  // Reference to the user who posted
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  
  // Shipment details
  goodsType: {
    type: String,
    required: [true, 'Goods type is required'],
    trim: true
  },
  origin: {
    type: String,
    required: [true, 'Origin is required'],
    trim: true
  },
  destination: {
    type: String,
    required: [true, 'Destination is required'],
    trim: true
  },
  shipmentDate: {
    type: Date,
    required: [true, 'Shipment date is required']
  },
  packageSize: {
    type: String,
    required: [true, 'Package size is required'],
    trim: true
  },
  packageWeight: {
    type: Number,
    required: [true, 'Package weight is required']
  },
  description: {
    type: String,
    trim: true
  },
  
  // Contact information
  contactName: {
    type: String,
    required: [true, 'Contact name is required'],
    trim: true
  },
  contactPhone: {
    type: String,
    required: [true, 'Contact phone is required'],
    trim: true
  },
  contactEmail: {
    type: String,
    required: [true, 'Contact email is required'],
    trim: true,
    lowercase: true
  },
  
  // Status of the request
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending'
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
shipmentRequestSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const ShipmentRequest = mongoose.model('ShipmentRequest', shipmentRequestSchema);

module.exports = ShipmentRequest; 