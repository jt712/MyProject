// File: src/components/CareerCounseling/CareerCounseling.jsx

import React, { useState } from "react";
import "./CareerCounseling.css";

// Hugging Face FastAPI backend
const API_URL =
  "https://dnyanaihelpme-ai-backend-api.hf.space";

function CareerCounseling({ onClose }) {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      text: "Hi! How can I help you? Provide your query or question here.",
      sender: "bot",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    // Prevent empty message / duplicate requests
    if (!message.trim() || loading) {
      return;
    }

    const userQuery = message.trim();

    // ----------------------------------------------------
    // Show user message immediately
    // ----------------------------------------------------

    const userMessage = {
      text: userQuery,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);

    setMessage("");
    setLoading(true);

    // ----------------------------------------------------
    // Convert existing chat history
    // ----------------------------------------------------

    const history = messages
      .filter((msg) => msg.text && msg.text.trim() !== "")
      .map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      }));

    // ----------------------------------------------------
    // AbortController
    // Prevent request from hanging forever
    // ----------------------------------------------------

    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 60000); // 60 seconds

    try {
      const endpoint = `${API_URL}/chat`;

      console.log("=================================");
      console.log("Career Counseling API");
      console.log("Endpoint:", endpoint);
      console.log("Question:", userQuery);
      console.log("History:", history);
      console.log("=================================");

      // ----------------------------------------------------
      // API Request
      // ----------------------------------------------------

      const response = await fetch(endpoint, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          message: userQuery,
          history: history,
        }),

        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // ----------------------------------------------------
      // Read response as TEXT first
      // This avoids response.json() errors when
      // backend returns non-JSON/error response.
      // ----------------------------------------------------

      const responseText = await response.text();

      console.log("API Status:", response.status);
      console.log("API Raw Response:", responseText);

      // ----------------------------------------------------
      // Try parsing JSON
      // ----------------------------------------------------

      let data = null;

      try {
        data = responseText ? JSON.parse(responseText) : null;
      } catch (parseError) {
        console.error(
          "Response JSON Parse Error:",
          parseError
        );

        throw new Error(
          `Invalid server response: ${responseText || "Empty response"}`
        );
      }

      // ----------------------------------------------------
      // HTTP Error Handling
      // ----------------------------------------------------

      if (!response.ok) {
        const errorMessage =
          data?.detail ||
          data?.error ||
          `API Error: ${response.status}`;

        throw new Error(errorMessage);
      }

      // ----------------------------------------------------
      // Validate AI response
      // ----------------------------------------------------

      if (!data || !data.response) {
        throw new Error(
          "Backend returned an empty AI response."
        );
      }

      console.log("AI Response:", data.response);

      // ----------------------------------------------------
      // Add bot response
      // ----------------------------------------------------

      setMessages((prev) => [
        ...prev,
        {
          text: data.response,
          sender: "bot",
        },
      ]);
    } catch (error) {
      clearTimeout(timeoutId);

      console.error(
        "Career Counseling API Error:",
        error
      );

      // ----------------------------------------------------
      // Handle Abort / Timeout
      // ----------------------------------------------------

      if (error.name === "AbortError") {
        setMessages((prev) => [
          ...prev,
          {
            text:
              "The AI server is taking too long to respond. Please try again.",
            sender: "bot",
          },
        ]);

        return;
      }

      // ----------------------------------------------------
      // Handle other errors
      // ----------------------------------------------------

      let errorText =
        "Unable to connect to the AI server. Please try again later.";

      if (error.message) {
        errorText = error.message;
      }

      setMessages((prev) => [
        ...prev,
        {
          text: errorText,
          sender: "bot",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------------
  // Render
  // --------------------------------------------------------

  return (
    <div className="career-popup1">

      {/* ==================================================
          Header
      ================================================== */}

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

      {/* ==================================================
          Chat Messages
      ================================================== */}

      <div className="chat-box1">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.sender === "bot"
                ? "bot-message"
                : "user-message"
            }
          >
            {msg.text}
          </div>
        ))}

        {/* Loading indicator */}

        {loading && (
          <div className="bot-message">
            Thinking...
          </div>
        )}
      </div>

      {/* ==================================================
          Input Area
      ================================================== */}

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

      <div className="chat-footer">
        <p className="contact-text">
          Try Call:
          <span> +91 7506064193</span>
        </p>

        <button
          type="button"
          className="enquiry"
        >
          Enquire
        </button>
      </div>

    </div>
  );
}

export default CareerCounseling;