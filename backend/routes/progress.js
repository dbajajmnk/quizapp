const express = require('express');
const Progress = require('../models/Progress');
const Quiz = require('../models/Quiz');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/progress
// @desc    Get user progress
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.user._id })
      .populate('module', 'title moduleNumber category')
      .populate('quizzes', 'score completedAt');

    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/progress/:moduleId
// @desc    Get progress for specific module
// @access  Private
router.get('/:moduleId', protect, async (req, res) => {
  try {
    let progress = await Progress.findOne({
      user: req.user._id,
      module: req.params.moduleId
    })
      .populate('module', 'title moduleNumber category')
      .populate('quizzes', 'score completedAt timeSpent');

    if (!progress) {
      progress = {
        user: req.user._id,
        module: req.params.moduleId,
        totalAttempts: 0,
        correctAnswers: 0,
        totalQuestions: 0,
        averageScore: 0
      };
    }

    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/progress/stats/overview
// @desc    Get overall progress statistics
// @access  Private
router.get('/stats/overview', protect, async (req, res) => {
  try {
    const allProgress = await Progress.find({ user: req.user._id })
      .populate('module', 'title moduleNumber');

    const totalQuizzes = await Quiz.countDocuments({
      user: req.user._id,
      status: 'completed'
    });

    const totalQuestions = allProgress.reduce((sum, p) => sum + p.totalQuestions, 0);
    const totalCorrect = allProgress.reduce((sum, p) => sum + p.correctAnswers, 0);
    const overallAverage = totalQuestions > 0 
      ? Math.round((totalCorrect / totalQuestions) * 100) 
      : 0;

    res.json({
      success: true,
      data: {
        totalModules: allProgress.length,
        totalQuizzes,
        totalQuestions,
        totalCorrect,
        overallAverage,
        moduleProgress: allProgress
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

