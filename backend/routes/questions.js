const express = require('express');
const { body, validationResult } = require('express-validator');
const Question = require('../models/Question');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/questions
// @desc    Get questions with filters
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const {
      module,
      topic,
      difficulty,
      technology,
      questionLength,
      limit = 10,
      page = 1
    } = req.query;

    const query = {};

    if (module) query.module = module;
    if (topic) query.topic = topic;
    if (difficulty && difficulty !== 'all') query.difficulty = difficulty;
    if (technology && technology !== 'All' && technology !== 'Both') {
      query.technology = technology;
    }
    if (questionLength && questionLength !== 'all') query.questionLength = questionLength;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const questions = await Question.find(query)
      .populate('module', 'title moduleNumber')
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await Question.countDocuments(query);

    res.json({
      success: true,
      count: questions.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: questions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/questions/:id
// @desc    Get single question
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate('module', 'title moduleNumber');

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    res.json({
      success: true,
      data: question
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/questions
// @desc    Create a new question (Admin only)
// @access  Private
router.post('/', protect, [
  body('module').notEmpty().withMessage('Module is required'),
  body('topic').notEmpty().withMessage('Topic is required'),
  body('question').notEmpty().withMessage('Question text is required'),
  body('options').isArray({ min: 2 }).withMessage('Options must have at least 2 items'),
  body('correctAnswer').custom((value, { req }) => {
    if (!req.body.options || value < 0 || value >= req.body.options.length) {
      throw new Error('Correct answer index must be valid for the number of options');
    }
    return true;
  }),
  body('explanation').notEmpty().withMessage('Explanation is required'),
  body('difficulty').isIn(['easy', 'medium', 'hard']),
  body('technology').isIn(['JavaScript', 'React', 'Both'])
], async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin only.'
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const question = await Question.create(req.body);

    res.status(201).json({
      success: true,
      data: question
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

