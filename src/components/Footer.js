import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer({ setActiveSection }) {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-left">
          <img
            src="/images/dnyai-logo.jpeg"
            alt="DnyanAI"
            className="footer-logo"
          />

          <p>
            AI/ML solutions, training, and software services
            designed for reliable impact.
          </p>
        </div>

      <div className="footer-links">
  <div className="footer-column">
    <ul>
      <li onClick={() => setActiveSection("offerings")}><a href="#offerings">Offerings</a></li>
      <li onClick={() => setActiveSection("capabilities")}><a href="#capabilities">Capabilities</a></li>
      <li onClick={() => setActiveSection("contact")}><a href="#contact">Contact</a></li>
    <Link to="/terms">Terms</Link>
    </ul>
  </div>

  <div className="footer-column">
    <ul>
      <li onClick={() => setActiveSection("products")}><a href="#products">Products</a></li>
      <li onClick={() => setActiveSection("case-studies")}><a href="#case-studies">Case Studies</a></li>
      <li>  <Link to="/privacy">Privacy</Link> </li>
    </ul>
  </div>
</div>

        <div className="footer-right">
          <p>Privacy | Terms | (c) 2024 DnyanAI.</p>
        </div>

      </div>
    </footer>
  );
}