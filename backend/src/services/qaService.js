const { normalizeWhitespace } = require("./documentService");

const STOP_WORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "for", "from",
  "has", "he", "in", "is", "it", "its", "of", "on", "that", "the",
  "to", "was", "were", "will", "with", "what", "when", "where", "which",
  "who", "why", "how", "do", "does", "did", "can", "could", "should",
  "would", "tell", "me", "about"
]);

const splitIntoSentences = (content) =>
  normalizeWhitespace(content)
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

const extractKeywords = (question) =>
  question
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word && !STOP_WORDS.has(word));

const scoreSentence = (sentence, keywords) => {
  const normalized = sentence.toLowerCase();
  const sentenceWords = normalized.split(/\W+/).filter(Boolean);
  const uniqueWords = new Set(sentenceWords);
  let score = 0;

  for (const keyword of keywords) {
    if (uniqueWords.has(keyword)) {
      score += 3;
    } else if (normalized.includes(keyword)) {
      score += 1;
    }
  }

  return score;
};

const isGenericQuestion = (question) => {
  const lower = question.toLowerCase();
  return /\b(summary|summarize|what is this|what is the|describe|overview|main idea|purpose|about this|document about|resume|cv|course|highlight|cover)\b/.test(lower);
};

const answerQuestionFromDocument = (documentContent, question) => {
  const keywords = extractKeywords(question);
  const sentences = splitIntoSentences(documentContent);

  // For no keywords but generic question, return opening sentences
  if (keywords.length === 0) {
    if (isGenericQuestion(question) && sentences.length > 0) {
      return sentences.slice(0, 2).join(" ");
    }
    return "Please ask a more specific question related to the uploaded document.";
  }

  // Score and rank sentences
  const scoredSentences = sentences
    .map((sentence) => ({
      sentence,
      score: scoreSentence(sentence, keywords)
    }))
    .sort((a, b) => b.score - a.score);

  // Return relevant matches if found
  const relevant = scoredSentences.filter((item) => item.score > 0);
  if (relevant.length > 0) {
    return relevant.slice(0, 2).map((item) => item.sentence).join(" ");
  }

  // Fallback: for generic questions, return opening sentences
  if (isGenericQuestion(question) && sentences.length > 0) {
    return sentences.slice(0, 2).join(" ");
  }

  // Last resort: return highest-scoring sentence even if score is 0
  if (scoredSentences.length > 0) {
    return scoredSentences[0].sentence;
  }

  return "I could not find a confident answer in the uploaded document.";
};

module.exports = {
  answerQuestionFromDocument
};
