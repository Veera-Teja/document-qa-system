function ChatBubble({ type, message, timestamp }) {
  const isUser = type === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-[22px] px-4 py-3 shadow-md sm:max-w-[70%] ${
          isUser
            ? "rounded-br-md bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-950"
            : "rounded-bl-md bg-white text-slate-800"
        }`}
      >
        <p className="whitespace-pre-wrap text-sm leading-6">{message}</p>
        <p className={`mt-2 text-[11px] ${isUser ? "text-slate-800/70" : "text-slate-500"}`}>
          {timestamp}
        </p>
      </div>
    </div>
  );
}

export default ChatBubble;
