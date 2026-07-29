import React from "react";
import "./Capabilities.css";

export default function Capabilities() {
  const cards = [
    {
      icon: "🧠",
      title: "GenAI Product Labs",
      desc: "Rapid prototyping, evaluation harnesses, safety layers, and RAG orchestration tuned to your domain."
    },
    {
      icon: "⚙️",
      title: "MLOps & Platforms",
      desc: "Feature stores, CI/CD for models, observability, drift detection, and compliance-ready pipelines."
    },
    {
      icon: "🗄️",
      title: "Data Foundations",
      desc: "Data modeling, quality frameworks, lineage, and access control enabling trustworthy AI."
    },
    {
      icon: "🚀",
      title: "Engineering Excellence",
      desc: "Cloud-native delivery, API-first architectures, performance tuning, and SRE practices."
    },
    {
      icon: "📘",
      title: "Change & Enablement",
      desc: "Training paths, playbooks, and embedded coaches to upskill teams and accelerate adoption."
    },
    {
      icon: "🛡️",
      title: "Security & Governance",
      desc: "Threat modeling, privacy reviews, vendor assessments, and responsible AI controls."
    }
  ];

  return (
    <section className="capabilities-section">
      <div className="capabilities-inner">
        <p className="section-tag">Capabilities</p>

        <h1 className="main-heading">
          Full-stack expertise across data,
          
          models, and products.
        </h1>

        <p className="section-description">
          Purpose-built capabilities for enterprise AI, modern software delivery, and secure operations — all designed to turn strategy into value.
        </p>

        <div className="capabilities-grid">
          {cards.map((card, index) => (
            <div className="capability-card" key={index}>
              <span className="capability-icon">{card.icon}</span>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}