const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['donor', 'receiver'], required: true },
  phone: { type: String },
  address: {
    street: String,
    apt: String,
    city: String,
    state: String,
    zip: String
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    }
  }
}, { timestamps: true });

userSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('User', userSchema);

