
import { useCallback, useEffect, useState } from "react";
import ChatMessage from "../components/ChatMessage";
import apiRequest from "../services/api";
import { getDatasets } from "../services/datasetService";

function Copilot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      time: "Just now",
      content: (
        <>
          <p>Hi! 👋</p>
          <p>
            I'm your AI Data Copilot. Ask a question about
            your uploaded dataset and I'll query the actual data.
          </p>
          <p>What would you like to know?</p>
        </>
      ),
    },
  ]);

  const [datasets, setDatasets] = useState([]);
  const [selectedDatasetId, setSelectedDatasetId] = useState("");
  const [datasetsLoading, setDatasetsLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [datasetError, setDatasetError] = useState("");

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

  const loadDatasets = useCallback(async () => {
    setDatasetsLoading(true);
    setDatasetError("");

    try {
      const response = await getDatasets();
      const list = response.datasets || response.data?.datasets || [];

      setDatasets(list);

      setSelectedDatasetId((currentId) => {
        if (list.some((item) => item._id === currentId)) {
          return currentId;
        }

        const readyDataset = list.find(
          (item) => item.status === "ready"
        );

        return readyDataset?._id || "";
      });
    } catch (error) {
      setDatasetError(error.message || "Failed to load datasets.");
    } finally {
      setDatasetsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDatasets();
  }, [loadDatasets]);

  const sendMessage = async (text = message) => {
    const question = text.trim();

    if (!question || sending) return;

    if (!selectedDatasetId) {
      setMessages((previous) => [
        ...previous,
        {
          id: Date.now(),
          type: "ai",
          time: "Just now",
          content: (
            <p>
              Please upload a dataset first, then select it
              from the dataset dropdown.
            </p>
          ),
        },
      ]);
      return;
    }

    const userMessageId = Date.now();

    setMessages((previous) => [
      ...previous,
      {
        id: userMessageId,
        type: "user",
        time: "Just now",
        content: <p>{question}</p>,
      },
    ]);

    setMessage("");
    setSending(true);

    try {
      const response = await apiRequest("/copilot/query", {
        method: "POST",
        body: JSON.stringify({
          datasetId: selectedDatasetId,
          question,
        }),
      });

      const result = response.queryResult;
      const sql = response.sqlQuery;

      setMessages((previous) => [
        ...previous,
        {
          id: Date.now() + 1,
          type: "ai",
          time: "Just now",
          content: (
            <>
              <p>{response.answer || "No answer was returned."}</p>

              {sql && (
                <details className="mock-ai-result">
                  <summary className="mock-result-header">
                    ✦ Generated SQL
                  </summary>
                  <pre style={{ whiteSpace: "pre-wrap", overflowX: "auto" }}>
                    {sql}
                  </pre>
                </details>
              )}

              {result && (
                <details className="mock-ai-result">
                  <summary className="mock-result-header">
                    ▤ Actual query result ({result.rowCountReturned ?? 0} rows)
                  </summary>

                  {result.columns?.length > 0 && (
                    <div style={{ overflowX: "auto" }}>
                      <table>
                        <thead>
                          <tr>
                            {result.columns.map((column) => (
                              <th key={column}>{column}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {(result.rows || []).map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {row.map((value, columnIndex) => (
                                <td key={columnIndex}>
                                  {value == null ? "—" : String(value)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {result.truncated && (
                    <p>Showing the first 100 returned rows.</p>
                  )}
                </details>
              )}
            </>
          ),
        },
      ]);
    } catch (error) {
      setMessages((previous) => [
        ...previous,
        {
          id: Date.now() + 1,
          type: "ai",
          time: "Just now",
          content: (
            <p>
              I couldn't process that question: {error.message}
            </p>
          ),
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const selectedDataset = datasets.find(
    (dataset) => dataset._id === selectedDatasetId
  );

  return (
    <div className="copilot-page">
      <div className="copilot-topbar">
        <div className="copilot-title">
          <div className="copilot-main-icon">✦</div>
          <div>
            <h2>AI Data Copilot</h2>
            <p>Ask questions and explore your data</p>
          </div>
        </div>

        <div className="dataset-selector">
          <span className="dataset-small-icon">▤</span>
          <div>
            <small>DATASET</small>
            <select
              aria-label="Select dataset"
              value={selectedDatasetId}
              onChange={(event) =>
                setSelectedDatasetId(event.target.value)
              }
              disabled={datasetsLoading || datasets.length === 0 || sending}
              style={{
                display: "block",
                maxWidth: "190px",
                background: "transparent",
                border: "none",
                fontWeight: 600,
              }}
            >
              <option value="">
                {datasetsLoading ? "Loading datasets..." : "Select dataset"}
              </option>
              {datasets
                .filter((dataset) => dataset.status === "ready")
                .map((dataset) => (
                  <option key={dataset._id} value={dataset._id}>
                    {dataset.name}
                  </option>
                ))}
            </select>
          </div>
          <button
            type="button"
            onClick={loadDatasets}
            title="Refresh datasets"
            disabled={datasetsLoading || sending}
          >
            ↻
          </button>
        </div>
      </div>

      <div className="copilot-chat">
        <div className="chat-content">
          {datasetError && (
            <p role="alert">Dataset loading failed: {datasetError}</p>
          )}

          {!datasetsLoading && datasets.length === 0 && !datasetError && (
            <p>
              No datasets found. Upload a CSV dataset first from the Upload Data page.
            </p>
          )}

          {messages.map((item) => (
            <ChatMessage
              key={item.id}
              type={item.type}
              time={item.time}
            >
              {item.content}
            </ChatMessage>
          ))}

          {sending && (
            <ChatMessage type="ai" time="Now">
              <p>Analyzing your question and querying the dataset...</p>
            </ChatMessage>
          )}
        </div>

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
                  onClick={() => sendMessage(item.text)}
                  disabled={sending || !selectedDatasetId}
                >
                  <div className="suggestion-icon">{item.icon}</div>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.text}</span>
                  </div>
                  <b>→</b>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="copilot-input-container">
          <div className="copilot-input-box">
            <button
              className="input-action"
              type="button"
              onClick={loadDatasets}
              title="Refresh datasets"
              disabled={sending}
            >
              +
            </button>

            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                selectedDataset
                  ? `Ask about ${selectedDataset.name}...`
                  : "Select a dataset to get started..."
              }
              rows="1"
              disabled={sending || !selectedDatasetId}
            />

            <button
              className={`send-button ${
                message.trim() ? "send-active" : ""
              }`}
              onClick={() => sendMessage()}
              disabled={sending || !message.trim() || !selectedDatasetId}
              title="Send question"
            >
              {sending ? "…" : "↑"}
            </button>
          </div>

          <div className="input-footer">
            <span>
              <kbd>Enter</kbd> to send · <kbd>Shift + Enter</kbd> for a new line
            </span>
            <span>AI can make mistakes. Verify important information.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Copilot;
