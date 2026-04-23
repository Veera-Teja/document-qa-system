import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"
});

export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append("document", file);

  const response = await api.post("/upload-document", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return response.data;
};

export const askQuestion = async (payload) => {
  const response = await api.post("/ask-question", payload);
  return response.data;
};

export const getResponses = async (documentId) => {
  const response = await api.get("/get-response", {
    params: { documentId }
  });
  return response.data;
};

export const clearChat = async (documentId) => {
  const response = await api.delete(`/clear-chat/${documentId}`);
  return response.data;
};

export default api;
