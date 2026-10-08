import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "./CareerCounseling.css";

const API_URL = "https://dnyanaihelpme-ai-backend-api.hf.space";

function CareerCounseling({ onClose, onEnquire }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hi! How can I help you? Provide your query or question here.",
      sender: "bot",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  // Auto-scroll to bottom on new messages
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userQuery = message.trim();
    const userMessage = { text: userQuery, sender: "user" };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    const history = messages
      .filter((msg) => msg.text && msg.text.trim() !== "")
      .map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      }));

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ message: userQuery, history }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const responseText = await response.text();

      let data = null;
      try {
        data = responseText ? JSON.parse(responseText) : null;
      } catch (parseError) {
        throw new Error(`Invalid server response: ${responseText || "Empty response"}`);
      }

      if (!response.ok) {
        throw new Error(data?.detail || data?.error || `API Error: ${response.status}`);
      }

      if (!data || !data.response) {
        throw new Error("Backend returned an empty AI response.");
      }

      setMessages((prev) => [...prev, { text: data.response, sender: "bot" }]);
    } catch (error) {
      clearTimeout(timeoutId);
      let errorText =
        error.name === "AbortError"
          ? "The AI server is taking too long to respond. Please try again."
          : error.message || "Unable to connect to the AI server.";

      setMessages((prev) => [...prev, { text: errorText, sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="career-modal-backdrop" onClick={onClose}>
      <div 
        className="career-popup1" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="popup-header1">
          <div>
            <h4>CAREER COUNSELING</h4>
            <h2>Ask A Question</h2>
          </div>
          <button
            type="button"
            className="close-button3"
            onClick={onClose}
            aria-label="Close career counseling"
          >
            ✕
          </button>
        </div>

        {/* Chat Messages Container */}
        <div className="chat-box1">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.sender === "bot" ? "bot-message markdown-content" : "user-message"
              }
            >
              {msg.sender === "bot" ? (
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              ) : (
                msg.text
              )}
            </div>
          ))}

          {loading && (
            <div className="bot-message loading-indicator">
              <span>Thinking...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="input-area1">
          <input
            type="text"
            placeholder="Ask about careers, skills..."
            value={message}
            disabled={loading}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button
            type="button"
            onClick={sendMessage}
            className="send-btn3"
            disabled={loading || !message.trim()}
            aria-label="Send message"
          >
            {loading ? "..." : "↑"}
          </button>
        </div>

        {/* Footer */}
        <div className="chat-footer">
          <p className="contact-text">
            Try Call: <span>+91 7506064193</span>
          </p>
          <button type="button" className="enquiry" onClick={onEnquire}>
            Enquire
          </button>
        </div>
      </div>
    </div>
  );
}

export default CareerCounseling;
