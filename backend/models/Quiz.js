const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    default: 'Custom Quiz'
  },
  questions: [{
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true
    },
    selectedAnswer: {
      type: Number,
      default: null
    },
    isCorrect: {
      type: Boolean,
      default: false
    },
    timeSpent: {
      type: Number,
      default: 0
    }
  }],
  settings: {
    timeLimit: {
      min: {
        type: Number,
        default: 10
      },
      max: {
        type: Number,
        default: 60
      },
      total: {
        type: Number,
        default: 30
      }
    },
    technology: {
      type: String,
      enum: ['JavaScript', 'React', 'Both', 'All'],
      default: 'All'
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard', 'all'],
      default: 'all'
    },
    questionLength: {
      type: String,
      enum: ['short', 'medium', 'long', 'all'],
      default: 'all'
    },
    modules: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Module'
    }],
    topics: [{
      type: String
    }],
    numberOfQuestions: {
      type: Number,
      default: 10
    }
  },
  status: {
    type: String,
    enum: ['in-progress', 'completed', 'abandoned'],
    default: 'in-progress'
  },
  score: {
    correct: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    },
    percentage: {
      type: Number,
      default: 0
    }
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  },
  timeSpent: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Quiz', quizSchema);

