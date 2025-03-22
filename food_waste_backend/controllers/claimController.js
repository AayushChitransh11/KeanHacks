const Claim = require('../models/Claim');
const Donation = require('../models/Donation');

// @desc    Claim a donation
exports.claimDonation = async (req, res) => {
  const donationId = req.params.donationId;

  try {
    const donation = await Donation.findById(donationId);
    if (!donation || donation.status !== 'available') {
      return res.status(400).json({ message: 'Donation not available' });
    }

    // Create claim
    const claim = await Claim.create({
      donationId,
      receiverId: req.user._id,
      status: 'confirmed'
    });

    // Update donation status
    donation.status = 'claimed';
    await donation.save();

    res.status(201).json(claim);
  } catch (error) {
    res.status(500).json({ message: 'Failed to claim donation', error });
  }
};

// @desc    Get all donations claimed by current receiver
exports.getMyClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ receiverId: req.user._id })
      .populate('donationId')
      .populate('receiverId', 'name');

    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching your claims' });
  }
};
