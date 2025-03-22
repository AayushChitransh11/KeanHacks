const Donation = require('../models/Donation');

// @desc    Donor creates a donation
exports.createDonation = async (req, res) => {
  const { title, description, quantity, expiryTime, location, photoUrl } = req.body;

  try {
    const donation = await Donation.create({
      donorId: req.user._id,
      title,
      description,
      quantity,
      expiryTime,
      location,
      photoUrl,
      status: 'available'
    });

    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create donation', error });
  }
};

// @desc    Get all available donations
exports.getAvailableDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ status: 'available' }).populate('donorId', 'name location');
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donations' });
  }
};

// @desc    Get donations posted by current donor
exports.getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donorId: req.user._id });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching your donations' });
  }
};
