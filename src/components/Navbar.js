import React, { useState } from 'react';

export default function Navbar({ setActiveSection, onOpenCareerCounselling }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (section) => {
    setActiveSection?.(section);
    setIsMenuOpen(false);
  };

  const handleCareerClick = () => {
    onOpenCareerCounselling?.();
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar" aria-label="Primary navigation">
      <div className="nav-shell">
        <div className="logo">
          <img src="/images/dnyai-logo.jpeg" alt="DnyanAI logo" />
        </div>

        <button
          type="button"
          className="menu-toggle"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-actions ${isMenuOpen ? 'is-open' : ''}`}>
          <ul className="menu">
            <li>
              <a href="#offerings" onClick={() => handleNavClick('offerings')}>
                Offerings
              </a>
            </li>
            <li>
              <a href="#products" onClick={() => handleNavClick('products')}>
                Products
              </a>
            </li>
            <li>
              <a href="#capabilities" onClick={() => handleNavClick('capabilities')}>
                Capabilities
              </a>
            </li>
            <li>
              <a href="#case-studies" onClick={() => handleNavClick('case-studies')}>
                Case Studies
              </a>
            </li>
            <li>
              <a href="#contact" onClick={() => handleNavClick('contact')}>
                Contact
              </a>
            </li>
          </ul>

          <button className="talk-btn" onClick={handleCareerClick}>
            Talk to us
          </button>
        </div>
      </div>
    </nav>
  );
}
