const Document = require("../models/Document");
const ChatEntry = require("../models/ChatEntry");
const { extractTextFromFile } = require("../services/documentService");
const { answerQuestionFromDocument } = require("../services/qaService");

const uploadDocument = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF or TXT file."
      });
    }

    const content = await extractTextFromFile(req.file);

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "The uploaded file does not contain readable text."
      });
    }

    const document = await Document.create({
      fileName: req.file.originalname,
      mimeType: req.file.mimetype,
      content
    });

    return res.status(201).json({
      success: true,
      message: "Document uploaded successfully.",
      data: {
        documentId: document._id,
        fileName: document.fileName,
        preview: content.slice(0, 250)
      }
    });
  } catch (error) {
    return next(error);
  }
};

const askQuestion = async (req, res, next) => {
  try {
    const { documentId, question } = req.body;

    if (!documentId) {
      return res.status(400).json({
        success: false,
        message: "documentId is required."
      });
    }

    if (!question || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question cannot be empty."
      });
    }

    const document = await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Uploaded document not found."
      });
    }

    const answer = answerQuestionFromDocument(document.content, question);

    const chatEntry = await ChatEntry.create({
      documentId,
      question: question.trim(),
      answer
    });

    return res.status(200).json({
      success: true,
      message: "Question answered successfully.",
      data: {
        responseId: chatEntry._id,
        question: chatEntry.question,
        answer: chatEntry.answer,
        createdAt: chatEntry.createdAt
      }
    });
  } catch (error) {
    return next(error);
  }
};

const getResponses = async (req, res, next) => {
  try {
    const { documentId } = req.query;

    if (!documentId) {
      return res.status(400).json({
        success: false,
        message: "documentId query parameter is required."
      });
    }

    const responses = await ChatEntry.find({ documentId }).sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      data: responses
    });
  } catch (error) {
    return next(error);
  }
};

const clearResponses = async (req, res, next) => {
  try {
    const { documentId } = req.params;

    if (!documentId) {
      return res.status(400).json({
        success: false,
        message: "documentId is required."
      });
    }

    await ChatEntry.deleteMany({ documentId });

    return res.status(200).json({
      success: true,
      message: "Chat history cleared successfully."
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  uploadDocument,
  askQuestion,
  getResponses,
  clearResponses
};
