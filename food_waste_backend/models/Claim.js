const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  donationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
  claimedAt: { type: Date, default: Date.now },
  pickupInstructions: { type: String }
});

module.exports = mongoose.model('Claim', claimSchema);
