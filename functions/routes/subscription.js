const express = require('express');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/subscription
// @desc    Get user subscription
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      success: true,
      data: user.subscription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/subscription
// @desc    Update user subscription
// @access  Private
router.put('/', protect, async (req, res) => {
  try {
    const { type, startDate, endDate } = req.body;

    const user = await User.findById(req.user._id);

    if (type) {
      user.subscription.type = type;
      // If changing subscription type, update dates
      if (!startDate) {
        user.subscription.startDate = new Date();
      }
    }
    if (startDate) {
      user.subscription.startDate = new Date(startDate);
    }
    if (endDate !== undefined) {
      user.subscription.endDate = endDate ? new Date(endDate) : null;
    }

    // Determine if subscription is active
    if (user.subscription.type === 'free') {
      user.subscription.isActive = true; // Free is always active
      user.subscription.endDate = null; // Free has no end date
    } else if (user.subscription.endDate) {
      user.subscription.isActive = new Date(user.subscription.endDate) > new Date();
    } else {
      user.subscription.isActive = true;
    }

    await user.save();

    res.json({
      success: true,
      data: user.subscription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;

