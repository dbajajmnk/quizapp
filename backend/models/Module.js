const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  moduleNumber: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type: String,
    enum: ['JavaScript', 'React'],
    required: true
  },
  totalQuestions: {
    type: Number,
    default: 0
  },
  hotIndex: {
    type: String,
    default: '🔥🔥🔥'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Module', moduleSchema);

