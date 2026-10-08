import React from "react";
import "./Hero.css";

export default function Hero({
  onOpenContact,
  onOpenSolutions,
  onOpenSoftwareServices,
  onOpenTraining,
  setActiveSection,
}) {
  return (
    <section className="hero">
      <div className="hero-left">
        {/* Badge */}
        <p className="tag">
          AI / ML / GENAI / TRAINING / SOFTWARE SERVICES
        </p>

        {/* Main Heading */}
        <h1 className="hero-title">
          We turn data and ideas into reliable, human-centered products.
        </h1>

        {/* Description */}
        <p className="desc">
          Strategy, architecture, and delivery across the AI lifecycle—rapid
          pilots, production-grade platforms, and teams trained to sustain them.
        </p>

        {/* CTA Buttons - Scroll to the home contact section */}
        <div className="buttons">
          <button
            className="primary"
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Start a project
          </button>
          <button className="secondary" onClick={onOpenSolutions}>
            Explore offerings
          </button>
        </div>

        {/* Stats Cards */}
        <div className="stats">
          <div className="card">
            <h4>10+</h4>
            <p>AI Deployments</p>
          </div>
          <div className="card">
            <h4>10x</h4>
            <p>Faster Prototyping</p>
          </div>
          <div className="card">
            <h4>99.9%</h4>
            <p>Uptime Commitments</p>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="hero-right">
        {/* Blueprint Card */}
        <div className="blueprint-card">
          <span className="badge">GenAI Blueprint</span>
          <h2>Discovery → Design → Deploy</h2>
          <ul>
            <li>Use-case scoring & ROI modeling</li>
            <li>Model + data governance guardrails</li>
            <li>Human-in-the-loop quality controls</li>
          </ul>
        </div>

        {/* Service Boxes - Direct Instant Click */}
        <div className="service-box">
          <div
            className="service service1"
            onClick={onOpenSolutions}
            role="button"
            tabIndex={0}
          >
            AI/ML/GENAI Solutions
          </div>

          <div
            className="service service2"
            onClick={onOpenTraining}
            role="button"
            tabIndex={0}
          >
            Training & Consulting
          </div>

          <div
            className="service service3"
            onClick={onOpenSoftwareServices}
            role="button"
            tabIndex={0}
          >
            Software Solutions & Services
          </div>
        </div>
      </div>
    </section>
  );
}