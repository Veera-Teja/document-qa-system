const express = require("express");
const multer = require("multer");

const {
  uploadDocument,
  askQuestion,
  getResponses,
  clearResponses
} = require("../controllers/documentController");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (_req, file, cb) => {
    const allowedMimeTypes = ["application/pdf", "text/plain"];

    if (allowedMimeTypes.includes(file.mimetype)) {
      return cb(null, true);
    }

    return cb(new Error("Only PDF and TXT files are allowed."));
  }
});

router.post("/upload-document", upload.single("document"), uploadDocument);
router.post("/ask-question", askQuestion);
router.get("/get-response", getResponses);
router.delete("/clear-chat/:documentId", clearResponses);

module.exports = router;
