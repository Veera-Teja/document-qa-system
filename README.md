# Document-Based Q&A System

A production-style full-stack web application where users upload a PDF or TXT document, store its extracted content in MongoDB, and ask questions that are answered strictly from that uploaded document.

## Tech Stack

- Frontend: React.js, Vite, Tailwind CSS, Axios, React Router
- Backend: Node.js, Express.js, Multer, pdf-parse
- Database: MongoDB with Mongoose

## Project Structure

```text
document-based-qa-system/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

## Features

- Upload PDF or TXT documents using drag and drop
- Extract text from the uploaded document
- Save document content in MongoDB
- Ask questions in a chat-style UI
- Answer only from the uploaded document using keyword-based sentence matching
- Save all questions and answers with timestamps
- Load previous chat history for the current document
- Clear chat history for a document
- Modern interview-ready UI with gradients, rounded cards, and responsive layout

## Backend APIs

### `POST /api/upload-document`

Uploads a file using Multer, extracts text, stores the document in MongoDB, and returns the document ID.

### `POST /api/ask-question`

Accepts `documentId` and `question`, finds the best matching sentence from the uploaded document, stores the Q&A, and returns the answer.

### `GET /api/get-response?documentId=<id>`

Returns all saved chat responses for the selected document.

### `DELETE /api/clear-chat/:documentId`

Clears the saved chat history for the selected document.

## How the Q&A Logic Works

1. Extract the full text from the uploaded document.
2. Split the document into sentences.
3. Remove common stop words from the question.
4. Score each sentence based on keyword overlap.
5. Return the top one or two matching sentences from the uploaded content.

## Setup Instructions

### 1. Open the project

```bash
cd "Flyhii - task"
```

### 2. Start MongoDB

Make sure MongoDB is running locally on:

```bash
mongodb://127.0.0.1:27017/document_qa_system
```

### 3. Backend setup

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Backend runs on `http://localhost:5000`

### 4. Frontend setup

Open a new terminal:

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Frontend runs on `http://localhost:5173`

## Interview-Friendly Explanation

- The frontend is built in React with reusable components and Tailwind CSS for a polished UI.
- The backend follows MVC with controllers, routes, services, and models.
- Multer handles uploads, and `pdf-parse` extracts content from PDF files.
- MongoDB stores both uploaded documents and the question-answer history.
- The Q&A engine uses keyword matching, so answers always come from the uploaded document instead of external knowledge.
