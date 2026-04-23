const pdfParse = require("pdf-parse");

const normalizeWhitespace = (text) => text.replace(/\s+/g, " ").trim();

const extractTextFromFile = async (file) => {
  if (!file) {
    throw new Error("No file uploaded");
  }

  if (file.mimetype === "application/pdf") {
    const pdfData = await pdfParse(file.buffer);
    return normalizeWhitespace(pdfData.text || "");
  }

  if (file.mimetype === "text/plain") {
    return normalizeWhitespace(file.buffer.toString("utf-8"));
  }

  throw new Error("Unsupported file type. Please upload a PDF or TXT file.");
};

module.exports = {
  extractTextFromFile,
  normalizeWhitespace
};
