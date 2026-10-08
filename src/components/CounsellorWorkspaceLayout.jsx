import React, { useState } from "react";
import "./CounsellorWorkspaceLayout.css";

export default function CounsellorWorkspaceLayout() {
  const [candidateId, setCandidateId] = useState("candidate-6ed3aeb4");
  const [docType, setDocType] = useState("candidate_document");
  const [inputPrompt, setInputPrompt] = useState("");
  const [messages, setMessages] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`File uploaded: ${file.name}`);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputPrompt.trim()) return;

    setMessages([...messages, { text: inputPrompt, sender: "user" }]);
    setInputPrompt("");
  };

  const handleNewSession = () => {
    setMessages([]);
    setInputPrompt("");
    alert("New counselling session started!");
  };

  return (
    <div className="cw-container">
      {/* LEFT SIDEBAR */}
      <aside className="cw-sidebar">
        {/* Header Branding */}
        <div className="cw-sidebar-brand">
          <div className="cw-brand-header">
            <span className="cw-brand-icon">💬</span>
            <h2>CounselAI</h2>
          </div>
          <p className="cw-brand-sub">
            Advanced multi-agent counselling workspace
          </p>
        </div>

        <hr className="cw-divider" />

        {/* Candidate Session Section */}
        <div className="cw-sidebar-section">
          <label className="cw-section-title">Candidate session</label>
          <div className="cw-field-group">
            <div className="cw-label-row">
              <label>Candidate ID</label>
              <span className="cw-info-icon" title="Unique candidate identifier">
                ?
              </span>
            </div>
            <input
              type="text"
              value={candidateId}
              onChange={(e) => setCandidateId(e.target.value)}
              className="cw-input"
            />
          </div>
        </div>

        {/* RAG Knowledge Upload Section */}
        <div className="cw-sidebar-section">
          <label className="cw-section-title">📚 RAG knowledge upload</label>

          <div className="cw-field-group">
            <div className="cw-label-row">
              <label>Upload candidate/context document</label>
              <span className="cw-info-icon" title="Upload PDF documents">
                ?
              </span>
            </div>

            <div className="cw-file-upload-box">
              <label htmlFor="cw-file-input" className="cw-upload-btn">
                <span className="cw-upload-icon">📤</span> Upload
              </label>
              <input
                id="cw-file-input"
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                hidden
              />
              <span className="cw-file-hint">200MB per file • PDF</span>
            </div>
          </div>

          <div className="cw-field-group">
            <label>Document type</label>
            <div className="cw-select-wrapper">
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="cw-select"
              >
                <option value="candidate_document">candidate_document</option>
                <option value="counselling_notes">counselling_notes</option>
                <option value="learning_notes">learning_notes</option>
                <option value="career_profile">career_profile</option>
                <option value="reference_material">reference_material</option>
                <option value="other">other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Button at bottom */}
        <div className="cw-sidebar-footer">
          <button className="cw-new-session-btn" onClick={handleNewSession}>
            <span>🗑️</span> New counselling session
          </button>
        </div>
      </aside>

      {/* RIGHT MAIN PANEL */}
      <main className="cw-main-content">
        {/* Top Description Banner */}
        <div className="cw-banner-card">
          <h1>Advanced AI Counsellor</h1>
          <p>
            A Head Counsellor works with a Supervisor, candidate-specific memory
            and a specialist agent panel. Specialists discuss relevant
            questions internally, resolve what they can from context, memory and
            RAG, and the Head Counsellor responds naturally or asks one focused
            clarification when needed.
          </p>
        </div>

        {/* Middle Two-Column Grid */}
        <div className="cw-panels-grid">
          {/* Left Column: Counselling Session */}
          <div className="cw-panel">
            <div className="cw-panel-title">
              <span>💬</span>
              <h3>Counselling session</h3>
            </div>

            <div className="cw-prompt-suggestion">
              Try: “I lost my job recently and I'm struggling to decide what I should focus on next.”
            </div>

            <div className="cw-messages-area">
              {messages.map((msg, index) => (
                <div key={index} className={`cw-msg-bubble ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Agent Group Chat */}
          <div className="cw-panel">
            <div className="cw-panel-title">
              <span>🧠</span>
              <h3>Agent group chat</h3>
            </div>
            <p className="cw-panel-subtitle">
              Developer trace of facts, unresolved questions, agent handoffs and
              sufficiency checks. Private chain-of-thought is not exposed.
            </p>

            <div className="cw-status-box">
              Internal agent communication will appear after you send a message.
            </div>
          </div>
        </div>

        {/* Bottom Input Field Bar */}
        <div className="cw-chat-input-wrapper">
          <form onSubmit={handleSendMessage} className="cw-chat-form">
            <input
              type="text"
              placeholder="What would you like help with?"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              className="cw-chat-input"
            />
            <button
              type="submit"
              className="cw-send-btn"
              disabled={!inputPrompt.trim()}
            >
              ↑
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}