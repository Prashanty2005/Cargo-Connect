const mongoose = require('mongoose');

const vehicleRegistrationSchema = new mongoose.Schema({
  // Reference to the user who registered the vehicle
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
  make: {
    type: String,
    required: [true, 'Vehicle make is required'],
    trim: true
  },
  model: {
    type: String,
    required: [true, 'Vehicle model is required'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Manufacturing year is required'],
    min: [1900, 'Invalid year'],
    max: [new Date().getFullYear() + 1, 'Year cannot be in the future']
  },
  registrationNumber: {
    type: String,
    required: [true, 'Registration number is required'],
    unique: true,
    trim: true
  },
  chassisNumber: {
    type: String,
    required: [true, 'Chassis number is required'],
    unique: true,
    trim: true
  },
  engineNumber: {
    type: String,
    required: [true, 'Engine number is required'],
    unique: true,
    trim: true
  },
  capacity: {
    type: Number,
    required: [true, 'Vehicle capacity is required'],
    min: [0, 'Capacity must be positive']
  },
  dimensions: {
    length: {
      type: Number,
      required: [true, 'Length is required'],
      min: [0, 'Length must be positive']
    },
    width: {
      type: Number,
      required: [true, 'Width is required'],
      min: [0, 'Width must be positive']
    },
    height: {
      type: Number,
      required: [true, 'Height is required'],
      min: [0, 'Height must be positive']
    }
  },
  
  // Insurance details
  insuranceProvider: {
    type: String,
    required: [true, 'Insurance provider is required'],
    trim: true
  },
  insurancePolicyNumber: {
    type: String,
    required: [true, 'Insurance policy number is required'],
    trim: true
  },
  insuranceExpiryDate: {
    type: Date,
    required: [true, 'Insurance expiry date is required']
  },
  
  // Documents
  registrationCertificate: {
    type: String, // URL to the document
    required: [true, 'Registration certificate is required']
  },
  insuranceDocument: {
    type: String, // URL to the document
    required: [true, 'Insurance document is required']
  },
  fitnessCertificate: {
    type: String, // URL to the document
    required: [true, 'Fitness certificate is required']
  },
  
  // Status
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'expired'],
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
vehicleRegistrationSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const VehicleRegistration = mongoose.model('VehicleRegistration', vehicleRegistrationSchema);

module.exports = VehicleRegistration; 