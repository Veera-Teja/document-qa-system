import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import UploadCard from "../components/UploadCard";
import { uploadDocument } from "../services/api";

function UploadPage() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const validateFile = (file) => {
    if (!file) {
      return "Please select a file.";
    }

    const isSupportedType =
      file.type === "application/pdf" || file.type === "text/plain";

    if (!isSupportedType) {
      return "Only PDF and TXT files are allowed.";
    }

    if (file.size > 5 * 1024 * 1024) {
      return "File size should be less than 5 MB.";
    }

    return "";
  };

  const handleFileAssignment = (file) => {
    const validationError = validateFile(file);

    if (validationError) {
      setError(validationError);
      setSelectedFile(null);
      return;
    }

    setError("");
    setSelectedFile(file);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    handleFileAssignment(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    handleFileAssignment(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please choose a file first.");
      return;
    }

    try {
      setIsUploading(true);
      setError("");
      const response = await uploadDocument(selectedFile);
      const documentData = response.data;

      navigate("/chat", {
        state: {
          documentId: documentData.documentId,
          fileName: documentData.fileName,
          preview: documentData.preview
        }
      });
    } catch (uploadError) {
      setError(
        uploadError.response?.data?.message || "Upload failed. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <PageShell>
      <UploadCard
        selectedFile={selectedFile}
        isDragging={isDragging}
        isUploading={isUploading}
        error={error}
        onFileSelect={handleFileSelect}
        onDrop={handleDrop}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onUpload={handleUpload}
      />
    </PageShell>
  );
}

export default UploadPage;
