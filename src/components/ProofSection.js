import React from "react";
import "./ProofSection.css";

export default function ProofSection() {
  const cards = [
    {
      icon: "🧠",
      tag: "GenAI",
      title: "Knowledge assistant for distributed teams.",
      desc: "Deployed retrieval-augmented generation with guardrails and human-in-the-loop review to reduce search time and improve accuracy.",
      points: [
        "Stack: vector search, policy filters, observability",
        "Result: faster support resolution with traceability",
      ],
    },
    {
      icon: "🚀",
      tag: "MLOps",
      title: "CI/CD for models at enterprise scale.",
      desc: "Standardized model packaging, evaluation gates, and rollout strategies with automated drift detection for safer releases.",
      points: [
        "Stack: feature store, model registry, canary deploys",
        "Result: quicker, safer releases with rollback confidence",
      ],
    },
    {
      icon: "💻",
      tag: "Software",
      title: "Data platform for real-time insights.",
      desc: "Built cloud-native pipelines, APIs, and dashboards with SLA-backed reliability and security controls for decision-making at speed.",
      points: [
        "Stack: streaming ingestion, lakehouse, API gateway",
        "Result: teams shipped insights faster with stronger governance",
      ],
    },
  ];

  return (
    <section className="proof-section">
      <div className="proof-inner">
        <p className="proof-tag">Case Studies</p>

        <h1 className="proof-title">
          Selected outcomes and
          
          accelerators.
        </h1>

        <p className="proof-description">
          Real-world results demonstrating the impact of strategic AI integration, modern software delivery, and operationally excellent platforms.
        </p>

        <div className="proof-grid">
          {cards.map((card, index) => (
            <div className="proof-card" key={index}>
              <span className="proof-icon">{card.icon}</span>
              <span className="proof-badge">{card.tag}</span>

              <h3>{card.title}</h3>

              <p className="proof-desc">{card.desc}</p>

              <ul>
                {card.points.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}