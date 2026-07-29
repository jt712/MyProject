
import React from "react";
import { useNavigate } from "react-router-dom";
import "./PrivacyPage.css";

export default function PrivacyPage() {
  const navigate = useNavigate();

  const privacyData = [
    {
      icon: "📋",
      title: "What We Collect",
      text: "When you submit the contact form, we collect your name, email, selected area of interest, and message. We also receive limited browser information required to process submissions."
    },
    {
      icon: "🔐",
      title: "How We Use It",
      text: "We use your information only to respond to inquiries and begin conversations. We do not sell or share your information for advertising purposes."
    },
    {
      icon: "⚙️",
      title: "Who Processes It",
      text: "Form submissions are processed through Formspree and business email systems. Access is restricted to authorized DnyanAI personnel."
    },
    {
      icon: "🗂️",
      title: "Retention",
      text: "We retain inquiry records only as long as necessary to maintain communication history and provide support."
    }
  ];

  return (
    <div className="privacy-page">

      <nav className="privacy-navbar">
        <button
          className="back-btn"
          onClick={() => navigate("/")}
        >
          ← Back
        </button>

        <h3>Privacy Notice</h3>

        <a
          href="mailto:hello@dnyanai.com"
          className="contact-btn-nav"
        >
          Contact Us
        </a>
      </nav>

      <section className="privacy-hero">
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200"
            alt="Privacy Security"
          />

          <div className="hero-content">
            <span className="privacy-tag">
              PRIVACY & TRUST
            </span>

            <h1 >Your Information, Protected Responsibly</h1>

            <p>
              Learn how DnyanAI collects,
              uses, and safeguards your data.
            </p>
          </div>
        </div>
      </section>

      <section className="trust-stats">
        <div className="stat-card">
          <h2>100%</h2>
          <p>No Data Selling</p>
        </div>

        <div className="stat-card">
          <h2>24/7</h2>
          <p>Data Protection</p>
        </div>

        <div className="stat-card">
          <h2>Secure</h2>
          <p>Information Handling</p>
        </div>
      </section>

      <section className="privacy-grid">
        {privacyData.map((item, index) => (
          <div className="privacy-card" key={index}>
            <div className="icon">
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <p>{item.text}</p>
          </div>
        ))}
      </section>

      <section className="rights-section">
        <h2>Your Rights</h2>

        <div className="timeline">

          <div className="step">
            <span>01</span>
            <h4>Request Access</h4>
          </div>

          <div className="step">
            <span>02</span>
            <h4>Review Request</h4>
          </div>

          <div className="step">
            <span>03</span>
            <h4>Process Action</h4>
          </div>

          <div className="step">
            <span>04</span>
            <h4>Confirmation</h4>
          </div>

        </div>
      </section>

      <section className="privacy-cta">
        <h2>
          Questions About Privacy?
        </h2>

        <p>
          To request access, correction,
          or deletion of your information,
          contact our privacy team.
        </p>

        <a
          href="mailto:hello@dnyanai.com"
          className="privacy-email-btn"
        >
          hello@dnyanai.com
        </a>
      </section>

    </div>
  );
}

