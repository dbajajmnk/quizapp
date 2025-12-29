const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: [true, 'Question text is required']
  },
  options: [{
    type: String,
    required: true
  }],
  correctAnswer: {
    type: Number,
    required: [true, 'Correct answer index is required'],
    min: 0
  },
  explanation: {
    type: String,
    required: [true, 'Explanation is required']
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  technology: {
    type: String,
    enum: ['JavaScript', 'React', 'Both'],
    required: true
  },
  questionLength: {
    type: String,
    enum: ['short', 'medium', 'long'],
    default: 'medium'
  },
  codeExample: {
    type: String,
    default: ''
  },
  tags: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Question', questionSchema);

