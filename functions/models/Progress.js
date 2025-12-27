const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
    required: true
  },
  totalAttempts: {
    type: Number,
    default: 0
  },
  correctAnswers: {
    type: Number,
    default: 0
  },
  totalQuestions: {
    type: Number,
    default: 0
  },
  averageScore: {
    type: Number,
    default: 0
  },
  lastAttemptDate: {
    type: Date
  },
  topicsProgress: [{
    topic: String,
    correct: Number,
    total: Number,
    percentage: Number
  }],
  difficultyProgress: {
    easy: { correct: Number, total: Number },
    medium: { correct: Number, total: Number },
    hard: { correct: Number, total: Number }
  },
  quizzes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz'
  }]
});

module.exports = mongoose.model('Progress', progressSchema);

