const mongoose = require('mongoose');

const vehiclePostSchema = new mongoose.Schema({
  // Reference to the user who posted
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  
  // Vehicle details
  vehicleType: {
    type: String,
    required: [true, 'Vehicle type is required'],
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
  departureDate: {
    type: Date,
    required: [true, 'Departure date is required']
  },
  availableSpace: {
    type: String,
    required: [true, 'Available space is required'],
    trim: true
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
  
  // Status of the post
  status: {
    type: String,
    enum: ['active', 'inactive', 'completed'],
    default: 'active'
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
vehiclePostSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const VehiclePost = mongoose.model('VehiclePost', vehiclePostSchema);

module.exports = VehiclePost; 