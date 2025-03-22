const express = require('express');
const router = express.Router();
const {
  createDonation,
  getAvailableDonations,
  getMyDonations
} = require('../controllers/donationController');

const { protect } = require('../middleware/authMiddleware');

// @route POST /api/donations
router.post('/', protect, createDonation);

// @route GET /api/donations
router.get('/', getAvailableDonations);

// @route GET /api/donations/mine
router.get('/mine', protect, getMyDonations);

module.exports = router;
