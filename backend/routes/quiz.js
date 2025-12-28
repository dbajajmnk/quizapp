const express = require('express');
const Question = require('../models/Question');
const Quiz = require('../models/Quiz');
const Progress = require('../models/Progress');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/quiz/create
// @desc    Create a new quiz with filters
// @access  Private
router.post('/create', protect, async (req, res) => {
  try {
    const {
      timeLimit,
      technology,
      difficulty,
      questionLength,
      modules,
      topics,
      numberOfQuestions = 10
    } = req.body.settings || {};

    // Build query
    const query = {};

    if (technology && technology !== 'All') {
      if (technology === 'Both') {
        // For "Both", we want JavaScript OR React OR Both
        query.technology = { $in: ['JavaScript', 'React', 'Both'] };
      } else {
        query.technology = technology;
      }
    }
    if (difficulty && difficulty !== 'all') {
      query.difficulty = difficulty;
    }
    if (questionLength && questionLength !== 'all') {
      query.questionLength = questionLength;
    }
    if (modules && modules.length > 0) {
      query.module = { $in: modules };
    }
    if (topics && topics.length > 0) {
      query.topic = { $in: topics };
    }

    // Get questions
    let questions = await Question.find(query)
      .populate('module', 'title moduleNumber');

    // Shuffle questions
    questions = questions.sort(() => Math.random() - 0.5);

    // If modules are specified, use all questions from those modules
    // Otherwise, limit by numberOfQuestions
    const selectedQuestions = modules && modules.length > 0
      ? questions  // Use all questions from selected modules
      : questions.slice(0, parseInt(numberOfQuestions));  // Limit by count if no modules specified

    if (selectedQuestions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No questions found with the specified filters'
      });
    }

    // Create quiz
    const quiz = await Quiz.create({
      user: req.user._id,
      questions: selectedQuestions.map(q => ({
        question: q._id
      })),
      settings: {
        timeLimit: timeLimit || { min: 10, max: 60, total: 30 },
        technology: technology || 'All',
        difficulty: difficulty || 'all',
        questionLength: questionLength || 'all',
        modules: modules || [],
        topics: topics || [],
        numberOfQuestions: selectedQuestions.length
      },
      score: {
        total: selectedQuestions.length
      }
    });

    res.status(201).json({
      success: true,
      data: await Quiz.findById(quiz._id)
        .populate('questions.question')
        .populate('questions.question.module')
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/quiz/:id
// @desc    Get quiz by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate('questions.question')
      .populate('questions.question.module')
      .populate('user', 'name email');

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // Check if user owns the quiz
    if (quiz.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: quiz
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/quiz/:id/submit
// @desc    Submit quiz answers
// @access  Private
router.post('/:id/submit', protect, async (req, res) => {
  try {
    const { answers, timeSpent } = req.body;

    const quiz = await Quiz.findById(req.params.id)
      .populate('questions.question');

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    if (quiz.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    if (quiz.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Quiz already submitted'
      });
    }

    // Evaluate answers
    let correctCount = 0;
    quiz.questions.forEach((qItem, index) => {
      const selectedAnswer = answers[index] !== undefined ? answers[index] : null;
      qItem.selectedAnswer = selectedAnswer;
      
      const correctAnswer = qItem.question.correctAnswer;
      qItem.isCorrect = selectedAnswer === correctAnswer;
      
      if (qItem.isCorrect) {
        correctCount++;
      }
    });

    quiz.score.correct = correctCount;
    quiz.score.percentage = Math.round((correctCount / quiz.score.total) * 100);
    quiz.status = 'completed';
    quiz.completedAt = new Date();
    quiz.timeSpent = timeSpent || 0;

    await quiz.save();

    // Update progress
    const moduleIds = [...new Set(quiz.questions.map(q => q.question.module._id.toString()))];
    
    for (const moduleId of moduleIds) {
      let progress = await Progress.findOne({
        user: req.user._id,
        module: moduleId
      });

      if (!progress) {
        progress = await Progress.create({
          user: req.user._id,
          module: moduleId,
          quizzes: [quiz._id]
        });
      } else {
        if (!progress.quizzes.includes(quiz._id)) {
          progress.quizzes.push(quiz._id);
        }
      }

      progress.totalAttempts += 1;
      progress.correctAnswers += correctCount;
      progress.totalQuestions += quiz.score.total;
      progress.averageScore = Math.round((progress.correctAnswers / progress.totalQuestions) * 100);
      progress.lastAttemptDate = new Date();

      await progress.save();
    }

    res.json({
      success: true,
      data: await Quiz.findById(quiz._id)
        .populate('questions.question')
        .populate('questions.question.module')
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/quiz
// @desc    Get user's quizzes
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { status, limit = 10, page = 1 } = req.query;
    const query = { user: req.user._id };
    
    if (status) {
      query.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const quizzes = await Quiz.find(query)
      .populate('questions.question')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Quiz.countDocuments(query);

    res.json({
      success: true,
      count: quizzes.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: quizzes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/quiz/:id/retake
// @desc    Retake quiz with shuffled questions
// @access  Private
router.post('/:id/retake', protect, async (req, res) => {
  try {
    const originalQuiz = await Quiz.findById(req.params.id)
      .populate('questions.question');

    if (!originalQuiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    if (originalQuiz.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Get original question IDs
    const questionIds = originalQuiz.questions.map(q => q.question._id);

    // Get questions and shuffle
    let questions = await Question.find({ _id: { $in: questionIds } })
      .populate('module', 'title moduleNumber');

    questions = questions.sort(() => Math.random() - 0.5);

    // Create new quiz
    const newQuiz = await Quiz.create({
      user: req.user._id,
      questions: questions.map(q => ({
        question: q._id
      })),
      settings: originalQuiz.settings,
      score: {
        total: questions.length
      }
    });

    res.status(201).json({
      success: true,
      data: await Quiz.findById(newQuiz._id)
        .populate('questions.question')
        .populate('questions.question.module')
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

