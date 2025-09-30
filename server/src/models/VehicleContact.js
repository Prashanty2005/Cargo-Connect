const mongoose = require('mongoose');

const vehicleContactSchema = new mongoose.Schema({
  // Reference to the vehicle being contacted about
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: [true, 'Vehicle ID is required'],
    validate: {
      validator: function(v) {
        return mongoose.Types.ObjectId.isValid(v);
      },
      message: props => `${props.value} is not a valid vehicle ID!`
    }
  },
  
  // Reference to the user making the contact
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  
  // Goods information
  goodsType: {
    type: String,
    required: [true, 'Goods type is required'],
    trim: true
  },
  weight: {
    type: String,
    required: [true, 'Weight is required'],
    trim: true
  },
  dimensions: {
    type: String,
    required: [true, 'Dimensions are required'],
    trim: true
  },
  specialHandling: {
    type: String,
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
  
  // Status of the contact request
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
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
vehicleContactSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const VehicleContact = mongoose.model('VehicleContact', vehicleContactSchema);

module.exports = VehicleContact; 