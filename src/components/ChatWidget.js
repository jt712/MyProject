import React, { useState } from "react";
import CareerCounseling from "./CareerCounseling";
import "./ChatWidget.css";

function ChatWidget({ onEnquire }) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="chat-widget-container">
      {/* Floating Trigger Button */}
      <div 
        className="chat-widget-button"
        onClick={() => setShowPopup(!showPopup)}
        role="button"
        tabIndex={0}
        aria-label="Open Chat"
      >
        <img src="/images/AI1.png" alt="AI Assistant" className="AI-image" />
      </div>

      {/* Render Popup inside Backdrop */}
      {showPopup && (
        <CareerCounseling
          onClose={() => setShowPopup(false)}
          onEnquire={onEnquire}
        />
      )}
    </div>
  );
}

export default ChatWidget;