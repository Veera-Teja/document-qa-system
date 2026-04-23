const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const DocumentSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    text: { type: String, required: true },
    questions: [QuestionSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Document', DocumentSchema);
