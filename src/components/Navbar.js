import React from 'react';

export default function Navbar({ setActiveSection }) {
  return (
    <nav className="navbar" aria-label="Primary navigation">
      <div className="logo">
        <img src="/images/dnyai-logo.jpeg" alt="DnyanAI logo" />
      </div>

      <ul className="menu">
        <li>
          <a href="#offerings" onClick={() => setActiveSection('offerings')}>
            Offerings
          </a>
        </li>
        <li>
          <a href="#products" onClick={() => setActiveSection('products')}>
            Products
          </a>
        </li>
        <li>
          <a href="#capabilities" onClick={() => setActiveSection('capabilities')}>
            Capabilities
          </a>
        </li>
        <li>
          <a href="#case-studies" onClick={() => setActiveSection('case-studies')}>
            Case Studies
          </a>
        </li>
        <li>
          <a href="#contact" onClick={() => setActiveSection('contact')}>
            Contact
          </a>
        </li>
      </ul>

      <button className="talk-btn"  onClick={() =>
    document
      .getElementById("contact")
      ?.scrollIntoView({ behavior: "smooth" })
  }>
        Talk to us
      </button>
    </nav>
  );
}
