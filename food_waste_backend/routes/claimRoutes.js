const express = require('express');
const router = express.Router();
const {
  claimDonation,
  getMyClaims
} = require('../controllers/claimController');

const { protect } = require('../middleware/authMiddleware');

// @route POST /api/claims/:donationId
router.post('/:donationId', protect, claimDonation);

// @route GET /api/claims/mine
router.get('/mine', protect, getMyClaims);

module.exports = router;
