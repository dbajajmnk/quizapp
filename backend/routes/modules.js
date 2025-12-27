const express = require('express');
const Module = require('../models/Module');
const Question = require('../models/Question');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/modules
// @desc    Get all modules
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const modules = await Module.find().sort({ moduleNumber: 1 });

    // Get question counts for each module
    const modulesWithCounts = await Promise.all(
      modules.map(async (module) => {
        const count = await Question.countDocuments({ module: module._id });
        return {
          ...module.toObject(),
          totalQuestions: count
        };
      })
    );

    res.json({
      success: true,
      data: modulesWithCounts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/modules/:id
// @desc    Get single module
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    
    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Module not found'
      });
    }

    const questionCount = await Question.countDocuments({ module: module._id });

    res.json({
      success: true,
      data: {
        ...module.toObject(),
        totalQuestions: questionCount
      }
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

