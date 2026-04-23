import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";
import { askQuestion, clearChat, getResponses } from "../services/api";

const formatTime = (value) =>
  new Date(value).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

function ChatPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const bottomRef = useRef(null);

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const documentId = location.state?.documentId;
  const fileName = location.state?.fileName || "Uploaded document";
  const preview = location.state?.preview || "";

  useEffect(() => {
    if (!documentId) {
      navigate("/");
      return;
    }

    const loadMessages = async () => {
      try {
        const response = await getResponses(documentId);
        const savedMessages = response.data.flatMap((entry) => [
          {
            id: `${entry._id}-question`,
            type: "user",
            message: entry.question,
            timestamp: formatTime(entry.createdAt)
          },
          {
            id: `${entry._id}-answer`,
            type: "system",
            message: entry.answer,
            timestamp: formatTime(entry.createdAt)
          }
        ]);

        setMessages(savedMessages);
      } catch (loadError) {
        setError(
          loadError.response?.data?.message ||
            "Unable to load previous chat history."
        );
      }
    };

    loadMessages();
  }, [documentId, navigate]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!question.trim()) {
      setError("Question cannot be empty.");
      return;
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      type: "user",
      message: question.trim(),
      timestamp: formatTime(new Date())
    };

    setMessages((prev) => [...prev, userMessage]);
    setError("");
    setIsLoading(true);
    const currentQuestion = question.trim();
    setQuestion("");

    try {
      const response = await askQuestion({
        documentId,
        question: currentQuestion
      });

      const systemMessage = {
        id: response.data.responseId,
        type: "system",
        message: response.data.answer,
        timestamp: formatTime(response.data.createdAt)
      };

      setMessages((prev) => [...prev, systemMessage]);
    } catch (askError) {
      setError(
        askError.response?.data?.message ||
          "Unable to answer the question right now."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = async () => {
    try {
      await clearChat(documentId);
      setMessages([]);
      setError("");
    } catch (clearError) {
      setError(
        clearError.response?.data?.message || "Unable to clear the chat history."
      );
    }
  };

  return (
    <PageShell>
      <div className="grid gap-6 lg:grid-cols-[320px,1fr]">
        <aside className="rounded-[28px] border border-white/10 bg-white/10 p-6 text-white shadow-soft backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-cyan-200">Current document</p>
              <h2 className="mt-1 text-xl font-semibold">{fileName}</h2>
            </div>
            <Link
              to="/"
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              New Upload
            </Link>
          </div>

          <div className="mt-6 rounded-3xl bg-slate-900/50 p-5">
            <p className="text-sm font-medium text-slate-200">Document preview</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {preview || "Preview is unavailable for this file."}
            </p>
          </div>

          <div className="mt-6 rounded-3xl bg-gradient-to-br from-cyan-400/15 to-sky-500/10 p-5">
            <p className="text-sm font-medium text-cyan-100">How it answers</p>
            <p className="mt-2 text-sm leading-7 text-slate-200">
              The backend extracts text, stores it in MongoDB, and returns the most relevant matching sentence from your uploaded document.
            </p>
          </div>
        </aside>

        <section className="overflow-hidden rounded-[28px] bg-slate-100 shadow-soft">
          <div className="border-b border-slate-200 bg-white px-5 py-4">
            <h1 className="text-lg font-semibold text-slate-900">Document Chat</h1>
            <p className="text-sm text-slate-500">
              Ask questions based only on the uploaded file.
            </p>
          </div>

          <div className="h-[60vh] space-y-4 overflow-y-auto bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_45%,#f1f5f9_100%)] px-4 py-5 sm:px-6">
            {messages.length === 0 && !isLoading && (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-6 text-center text-slate-500">
                Start the conversation by asking a question about the uploaded document.
              </div>
            )}

            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                type={message.type}
                message={message.message}
                timestamp={message.timestamp}
              />
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-[22px] rounded-bl-md bg-white px-4 py-3 text-sm text-slate-500 shadow-md">
                  Searching the document for the best answer...
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {error && (
            <div className="border-t border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
              {error}
            </div>
          )}

          <ChatInput
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            onSubmit={handleSend}
            onClear={handleClearChat}
            isLoading={isLoading}
            hasMessages={messages.length > 0}
          />
        </section>
      </div>
    </PageShell>
  );
}

export default ChatPage;
