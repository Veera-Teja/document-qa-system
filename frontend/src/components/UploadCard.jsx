function UploadCard({
  selectedFile,
  isDragging,
  isUploading,
  error,
  onFileSelect,
  onDrop,
  onDragOver,
  onDragLeave,
  onUpload
}) {
  return (
    <div className="mx-auto max-w-3xl rounded-[28px] border border-white/10 bg-white/10 p-6 shadow-soft backdrop-blur-xl sm:p-8">
      <div className="mb-8 text-center">
        <span className="inline-flex rounded-full bg-cyan-400/20 px-4 py-1 text-sm font-medium text-cyan-200">
          Interview-ready full-stack demo
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          Document-Based Q&A System
        </h1>
        <p className="mt-3 text-sm text-slate-200 sm:text-base">
          Upload a PDF or text file, extract its content, and ask questions that
          are answered only from that document.
        </p>
      </div>

      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={`rounded-[24px] border border-dashed p-8 text-center transition ${
          isDragging
            ? "border-cyan-300 bg-cyan-400/10"
            : "border-white/20 bg-slate-900/40"
        }`}
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-sky-600 text-2xl font-bold shadow-lg">
          D
        </div>
        <p className="mt-5 text-lg font-semibold">Drag and drop your file here</p>
        <p className="mt-2 text-sm text-slate-300">
          Supported formats: PDF and TXT, up to 5 MB
        </p>

        <label className="mt-6 inline-flex cursor-pointer rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-cyan-100">
          Choose File
          <input
            type="file"
            accept=".pdf,.txt"
            className="hidden"
            onChange={onFileSelect}
          />
        </label>

        {selectedFile && (
          <div className="mt-6 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4 text-left">
            <p className="text-sm font-medium text-emerald-200">Selected file</p>
            <p className="mt-1 truncate text-sm text-white">{selectedFile.name}</p>
            <p className="mt-1 text-xs text-emerald-100/80">
              {(selectedFile.size / 1024).toFixed(1)} KB
            </p>
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-2xl border border-rose-300/20 bg-rose-400/10 p-4 text-sm text-rose-100">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={onUpload}
          disabled={!selectedFile || isUploading}
          className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-sky-500 px-5 py-3 font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUploading ? "Uploading document..." : "Upload and Start Chat"}
        </button>
      </div>
    </div>
  );
}

export default UploadCard;
