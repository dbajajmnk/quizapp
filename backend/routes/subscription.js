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
    }
    if (startDate) {
      user.subscription.startDate = startDate;
    }
    if (endDate) {
      user.subscription.endDate = endDate;
    }

    user.subscription.isActive = user.subscription.endDate 
      ? new Date(user.subscription.endDate) > new Date()
      : true;

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

