📄 Document-Based Q&A System

A full-stack web application that allows users to upload PDF and TXT documents, extract and store their content, and ask questions based on the uploaded documents.

The system uses keyword-based sentence matching to retrieve relevant answers directly from the uploaded document, without relying on external information.

🚀 Features

- Document Upload: Upload PDF and TXT files through a simple interface.
- Text Extraction: Extract text from uploaded PDF and TXT documents.
- Document Storage: Store extracted document content in MongoDB.
- Interactive Q&A: Ask questions through a chat-style interface.
- Keyword-Based Matching: Retrieve relevant sentences from the uploaded document.
- Chat History: Save questions and answers with timestamps.
- Previous Conversations: View the chat history associated with a document.
- Clear Chat: Delete the saved chat history for a selected document.
- Responsive UI: Modern interface with responsive layouts and reusable components.

🛠️ Tech Stack

Category| Technologies
Frontend| React.js, Vite
Styling| Tailwind CSS
Routing| React Router
HTTP Requests| Axios
Backend| Node.js, Express.js
File Upload| Multer
PDF Processing| pdf-parse
Database| MongoDB
ODM| Mongoose

📂 Project Structure

document-qa-system/
│
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
│   │
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md

🔄 How It Works

1. The user uploads a PDF or TXT document.
2. The backend processes the uploaded file and extracts its text.
3. The extracted content is stored in MongoDB.
4. The user enters a question related to the uploaded document.
5. The backend splits the document content into sentences.
6. Common stop words are removed from the question.
7. The system calculates keyword overlap to identify relevant sentences.
8. The matching sentence or sentences are returned as the answer.
9. The question and answer are saved in MongoDB for future reference.

🔌 Backend API Endpoints

Method| Endpoint| Description
POST| "/api/upload-document"| Uploads a document and extracts its content
POST| "/api/ask-question"| Finds an answer based on the uploaded document
GET| "/api/get-response?documentId=<id>"| Retrieves chat history for a document
DELETE| "/api/clear-chat/:documentId"| Clears chat history for a document

⚙️ Installation and Setup

Prerequisites

Make sure the following tools are installed:

- Node.js and npm
- MongoDB (local installation or accessible MongoDB instance)
- Git

1. Clone the Repository

git clone https://github.com/Veera-Teja/document-qa-system.git
cd document-qa-system

2. Start MongoDB

Make sure your MongoDB service is running.

Example local MongoDB connection string:

MONGO_URI=mongodb://127.0.0.1:27017/document_qa_system

3. Configure and Start the Backend

cd backend
npm install

Create a ".env" file by copying the example file:

Windows Command Prompt:

copy .env.example .env

Configure the required environment variables in ".env" using the names specified in ".env.example".

Start the backend:

npm run dev

Backend URL:

"http://localhost:5000"

4. Configure and Start the Frontend

Open a new terminal:

cd frontend
npm install

Create the environment file:

copy .env.example .env

Configure the frontend environment variables according to ".env.example".

Start the frontend:

npm run dev

Frontend URL:

"http://localhost:5173"

🖥️ Application Screenshots

Add screenshots of your running application below.

Document Upload Interface

"Document Upload Interface" (./Image1)

Question and Answer Interface

"Question and Answer Interface" (./Image2)

Note: Update the image paths if your actual screenshot filenames or extensions are different.

💡 Technical Highlights

- Developed a full-stack application using React.js and Node.js.
- Implemented RESTful APIs using Express.js.
- Integrated MongoDB for document and conversation storage.
- Implemented file upload handling using Multer.
- Extracted PDF content using pdf-parse.
- Organized backend code using controllers, routes, models, middleware, and services.
- Implemented keyword-based sentence matching for document-specific question answering.

🔮 Future Enhancements

- Integrate semantic search for improved answer relevance.
- Implement AI-powered document summarization.
- Add user authentication and personalized document management.
- Support additional document formats.
- Improve information retrieval using text embeddings.

👩‍💻 Author

Komali Veerateja

- GitHub: "Veera-Teja" (https://github.com/Veera-Teja)
- LinkedIn: "Connect with me" (https://linkedin.com/in/teja-komali-98645729b)

---

⭐ If you find this project interesting, consider giving it a star!
