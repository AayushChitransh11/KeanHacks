const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  quantity: { type: Number, required: true },
  expiryTime: { type: Date, required: true },
  location: {
    address: { type: String },
    lat: { type: Number },
    lng: { type: Number }
  },
  photoUrl: { type: String },
  status: { type: String, enum: ['available', 'claimed', 'expired'], default: 'available' }
}, { timestamps: true });

module.exports = mongoose.model('Donation', donationSchema);
