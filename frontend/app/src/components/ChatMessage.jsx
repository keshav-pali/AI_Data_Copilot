function ChatMessage({ type, children, time }) {
  const isAI = type === "ai";

  return (
    <div className={`chat-row ${isAI ? "ai-row" : "user-row"}`}>
      
      {isAI && (
        <div className="chat-avatar ai-avatar">
          ✦
        </div>
      )}

      <div className="chat-message-wrapper">

        <div className="chat-message-name">
          {isAI ? "AI Copilot" : "You"}
        </div>

        <div
          className={`chat-bubble ${
            isAI ? "ai-bubble" : "user-bubble"
          }`}
        >
          {children}
        </div>

        {time && (
          <span className="chat-time">
            {time}
          </span>
        )}

      </div>

      {!isAI && (
        <div className="chat-avatar user-avatar">
          K
        </div>
      )}

    </div>
  );
}

export default ChatMessage;