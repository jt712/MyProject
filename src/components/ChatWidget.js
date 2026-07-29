import React from "react";
import "./ChatWidget.css";

import { useState } from "react";
import CareerCounseling from "./CareerCounseling";

function ChatWidget() {

   const [showPopup, setShowPopup] = useState(false);
  

  return (
    <div className="chat-widget">
       <img src="/images/AI1.png" alt="Hero" className="AI-image"  onClick={() => setShowPopup(!showPopup)}/>
            {showPopup && (
        <div className="career-popup-wrapper">
          <CareerCounseling onClose={() => setShowPopup(false)} />
        </div>
      )}
    </div>
  );
}

export default ChatWidget;