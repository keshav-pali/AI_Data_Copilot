import { useState } from "react";
import ChatMessage from "../components/ChatMessage";

function Copilot() {

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      time: "12:02 PM",
      content: (
        <>
          <p>
            Hi Keshav! 👋
          </p>

          <p>
            I'm your AI Data Copilot. I can help you
            understand your datasets, find patterns,
            generate insights and create visualizations.
          </p>

          <p>
            What would you like to know?
          </p>
        </>
      ),
    },
  ]);

  const suggestions = [
    {
      icon: "▥",
      title: "Analyze my sales",
      text: "Show me the key trends in my sales data",
    },
    {
      icon: "◈",
      title: "Find patterns",
      text: "Find unusual patterns in my dataset",
    },
    {
      icon: "↗",
      title: "Top performers",
      text: "Which products are performing the best?",
    },
    {
      icon: "✦",
      title: "Generate insights",
      text: "Give me 5 important insights from this data",
    },
  ];

  const sendMessage = (text = message) => {

    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      time: "Just now",
      content: <p>{text}</p>,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setMessage("");

    setTimeout(() => {

      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        time: "Just now",
        content: (
          <>
            <p>
              I'm analyzing your request...
            </p>

            <div className="mock-ai-result">

              <div className="mock-result-header">
                <span>✦</span>
                Analysis Preview
              </div>

              <div className="mock-result-grid">

                <div>
                  <span>Revenue</span>
                  <strong>$124.8K</strong>
                </div>

                <div>
                  <span>Growth</span>
                  <strong>18.4%</strong>
                </div>

                <div>
                  <span>Orders</span>
                  <strong>2,840</strong>
                </div>

              </div>

              <p className="mock-result-note">
                Connect your dataset to generate
                real-time insights and visualizations.
              </p>

            </div>
          </>
        ),
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

    }, 700);
  };

  const handleKeyDown = (e) => {

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }

  };

  return (
    <div className="copilot-page">

      {/* ================= TOP BAR ================= */}

      <div className="copilot-topbar">

        <div className="copilot-title">

          <div className="copilot-main-icon">
            ✦
          </div>

          <div>
            <h2>
              AI Data Copilot
            </h2>

            <p>
              Ask questions and explore your data
            </p>
          </div>

        </div>


        <div className="dataset-selector">

          <span className="dataset-small-icon">
            ▤
          </span>

          <div>
            <small>
              DATASET
            </small>

            <strong>
              Sales Data
            </strong>
          </div>

          <span>
            ▾
          </span>

        </div>

      </div>


      {/* ================= CHAT ================= */}

      <div className="copilot-chat">

        <div className="chat-content">

          {messages.map((item) => (

            <ChatMessage
              key={item.id}
              type={item.type}
              time={item.time}
            >
              {item.content}
            </ChatMessage>

          ))}

        </div>


        {/* ================= SUGGESTIONS ================= */}

        {messages.length === 1 && (

          <div className="suggestions-section">

            <div className="suggestions-title">
              <span>✦</span>
              Try asking
            </div>

            <div className="suggestions-grid">

              {suggestions.map((item) => (

                <button
                  key={item.title}
                  className="suggestion-card"
                  onClick={() =>
                    sendMessage(item.text)
                  }
                >

                  <div className="suggestion-icon">
                    {item.icon}
                  </div>

                  <div>

                    <strong>
                      {item.title}
                    </strong>

                    <span>
                      {item.text}
                    </span>

                  </div>

                  <b>
                    →
                  </b>

                </button>

              ))}

            </div>

          </div>

        )}


        {/* ================= INPUT ================= */}

        <div className="copilot-input-container">

          <div className="copilot-input-box">

            <button className="input-action">
              +
            </button>

            <textarea
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about your data..."
              rows="1"
            />

            <button
              className={`send-button ${
                message.trim()
                  ? "send-active"
                  : ""
              }`}
              onClick={() => sendMessage()}
            >
              ↑
            </button>

          </div>

          <div className="input-footer">

            <span>
              <kbd>Enter</kbd> to send
            </span>

            <span>
              AI can make mistakes. Verify important information.
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Copilot;