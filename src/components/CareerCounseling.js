// File: src/components/CareerCounseling/CareerCounseling.jsx

import React, { useState } from "react";
import "./CareerCounseling.css";

function CareerCounseling({ onClose }) {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      text: "Hi! How can I help you? Provide your query or question here.",
      sender: "bot",
    },
  ]);

  const sendMessage = async () => {
    if (message.trim() === "") return;

    const userQuery = message;

    const userMessage = {
      text: userQuery,
      sender: "user",
    };

    // Show user message immediately
    setMessages((prev) => [...prev, userMessage]);

    setMessage("");

    // Convert chat history into API format
    const history = messages.map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text,
    }));

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userQuery,
          history: history,
        }),
      });

      if (!response.ok) {
        throw new Error("API Error");
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          text: data.response,
          sender: "bot",
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          text: "Unable to connect to the AI server.",
          sender: "bot",
        },
      ]);
    }
  };

  return (
    <div className="career-popup1">
      <div className="popup-header1">
        <div>
          <h4>CAREER COUNSELING</h4>
          <h2>Ask A Question</h2>
        </div>

        <button className="close-button3" onClick={onClose}>
          ✕
        </button>
      </div>

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
      </div>

      <div className="input-area1">
  <input
    type="text"
    placeholder="Ask about careers, skills..."
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    }}
  />

  <button
    onClick={sendMessage}
    className="send-btn3"
  >
    ↑
  </button>
</div>

      <p className="contact-text">
    Try Call:
    <span> +91 7506064193</span>
</p>

      <button className="enquiry">
        Enquire
      </button>
    </div>
  );
}

export default CareerCounseling;