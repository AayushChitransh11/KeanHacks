const Donation = require('../models/Donation');
const geocodeAddress = require('../utils/geocode');
//const sendEmail = require('../utils/sendEmail'); // make sure this path matches your file name

// @desc    Donor creates a donation
exports.createDonation = async (req, res) => {
  const { title, description, quantity, expiryTime, location } = req.body;

  try {
    if (!location?.address) {
      return res.status(400).json({ message: 'Address is required for location' });
    }

    const geo = await geocodeAddress(location.address);
    const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const donation = await Donation.create({
      donorId: req.user._id,
      title,
      description,
      quantity,
      expiryTime,
      location: {
        address: location.address,
        lat: geo.coordinates[1],
        lng: geo.coordinates[0]
      },
      photoUrl,
      status: 'available'
    });

    // ✅ Send email alert using Resend
    // await sendEmail({
    //   to: req.user.email,
    //   subject: 'Thank you for your donation!',
    //   html: `
    //     <p>Hi ${req.user.name},</p>
    //     <p>Your donation <strong>${title}</strong> has been successfully posted.</p>
    //     <p>Thank you for helping reduce food waste!</p>
    //   `
    // });

    res.status(201).json(donation);
  } catch (error) {
    console.error('Donation creation error:', error);
    res.status(500).json({ message: 'Failed to create donation', error });
  }
};

// @desc    Get all available donations
exports.getAvailableDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ status: 'available' }).populate('donorId', 'name location');
    res.status(200).json(donations);
  } catch (error) {
    console.error('Error fetching available donations:', error);
    res.status(500).json({ message: 'Failed to fetch available donations' });
  }
};

// @desc    Get donations posted by current donor
exports.getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donorId: req.user._id });
    res.json(donations);
  } catch (error) {
    console.error('Error fetching user donations:', error);
    res.status(500).json({ message: 'Error fetching your donations' });
  }
};

// @desc    Get nearby available donations based on user coordinates
exports.getNearbyDonations = async (req, res) => {
  const { lat, lng, radius = 5000 } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ message: 'Latitude and longitude are required' });
  }

  try {
    const donations = await Donation.find({
      status: 'available',
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(radius)
        }
      }
    }).populate('donorId', 'name location');

    res.json(donations);
  } catch (error) {
    console.error('Error fetching nearby donations:', error);
    res.status(500).json({ message: 'Failed to fetch nearby donations' });
  }
};
