import React from "react";
import "./TermsPage.css";
import { useNavigate } from "react-router-dom";

export default function TermsPage({ setActiveSection }) {
  const navigate = useNavigate();

  const terms = [
    {
      title: "Informational Use",
      text: "This site is provided 'as is' for informational purposes only. Accessing it does not create a commercial agreement or advisory relationship."
    },
    {
      title: "Appropriate Submissions",
      text: "Do not submit confidential, proprietary, or sensitive personal information through the contact form. Keep inquiries high level until an engagement is in place."
    },
    {
      title: "Ownership",
      text: "All content, branding, and assets on this site are owned by DnyanAI. Reuse or redistribution requires prior written permission."
    },
    {
      title: "Availability & Changes",
      text: "We reserve the right to modify, suspend, or discontinue any content, feature, or service on this website at any time without prior notice. DnyanAI does not guarantee that the website will be available uninterrupted, secure, or error-free."
    }
  ];

  // थेट Gmail कंपोजर वेबपेज उघडण्यासाठी हँडलर
  const handleEmailClick = (e) => {
    e.preventDefault();
    const email = "helpme@dnyanai.co.in";
    const subject = encodeURIComponent("Inquiry regarding Terms of Use");
    
    // थेट Gmail कंपोजर उघडेल
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}`,
      "_blank"
    );
  };

  return (
    <>
      <nav className="terms-navbar">
        <div className="terms-nav-left">
          <button
            className="nav-back-btn"
            onClick={() => navigate("/")}
          >
            ← Back
          </button>
        </div>

        <div className="terms-nav-right">
          <button
            className="nav-contact-btn"
            onClick={() => navigate("/contact")}
          >
            Contact Us
          </button>
        </div>
      </nav>

      <div className="terms-page">
        <section className="terms-hero">
          <div className="overlay"></div>

          <div className="hero-content">
            <span className="hero-tag">LEGAL</span>

            <h1>Terms of Use</h1>

            <p>
              Understand how to use our website,
              content, and services responsibly.
            </p>
          </div>
        </section>

        <section className="terms-content">
          <div className="intro-card">
            <h2>Our Commitment</h2>

            <p>
              We believe in transparency, responsible
              technology, and clear expectations.
              These terms outline how visitors may use
              the DnyanAI website and content.
            </p>
          </div>

          <div className="terms-grid">
            {terms.map((item, index) => (
              <div className="term-card" key={index}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="contact-section-terms">
          <div className="contact-card-terms">
            <h2>Questions About These Terms?</h2>

            <p>
              For any questions regarding these terms,
              please contact our team.
            </p>

            <a
              href="#"
              className="contact-btn"
              onClick={handleEmailClick}
            >
              helpme@dnyanai.co.in
            </a>
          </div>
        </section>
      </div>
    </>
  );
}