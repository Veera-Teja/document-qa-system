function ChatInput({ value, onChange, onSubmit, onClear, isLoading, hasMessages }) {
  return (
    <div className="border-t border-slate-200 bg-white p-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Ask a question about the uploaded document..."
          className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
        />
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onSubmit}
            disabled={isLoading}
            className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Thinking..." : "Send"}
          </button>
          <button
            type="button"
            onClick={onClear}
            disabled={!hasMessages}
            className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Clear Chat
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInput;
