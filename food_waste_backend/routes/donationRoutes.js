const express = require('express');
const router = express.Router();
const {
  createDonation,
  getAvailableDonations,
  getMyDonations,
  getNearbyDonations
} = require('../controllers/donationController');

const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// @route POST /api/donations
router.post('/', protect, upload.single('image'), createDonation);

// @route GET /api/donations
router.get('/', getAvailableDonations);

// @route GET /api/donations/mine
router.get('/mine', protect, getMyDonations);

// @route GET /api/donations/nearby?lat=...&lng=...
router.get('/nearby', getNearbyDonations);

module.exports = router;
