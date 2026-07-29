import React,{ useState } from "react";
import SolutionCard from "./SolutionCard";
import "./SolutionsSection.css";

function SolutionsSection({ onClose }) {
    const [showCards, setShowCards] = useState(false);

  const solutions = [
    {
      tag: "GenAI Chatbots & RAG",
      icon: "💬",
      title: "Domain-grounded assistants",
      subtitle:
        "For support, onboarding, HR, finance, IT.",
      linkText: "Discuss a chatbot build",
      points: [
        "Flows, intents, retrieval, grounding, guardrails, evals",
        "Multi-channel: web, Slack/Teams, widgets",
        "Everyday automations: new-hire FAQ, policy Q&A, IT helpdesk",
      ],
    },
    {
      tag: "Copilots & Agents",
      icon: "🟡",
      title: "Tool-using copilots",
      subtitle:
        "For knowledge workers and ops teams.",
      linkText: "Scope a copilot",
      points: [
        "Planner + executor agents with role-based permissions",
        "Research, drafting, QA, approvals; telemetry and safety baked in",
        "Automations: RFP/SOW drafts, meeting notes, SOP codification",
      ],
    },
    {
      tag: "Predictive & ML",
      icon: "📈",
      title:
        "Forecasts, scoring, and personalization",
      subtitle:
        "For growth, risk, and product teams.",
      linkText: "Plan an ML rollout",
      points: [
        "Churn/propensity models with feature stores",
        "Recommendation engRecommendation and ranking systemsines",
        "A/B, monitoring, and rollback readiness and rollback",
        "Automations: lead scoring, demand forecasts, next-best-action"
      ],
    },
    {
      tag: "MLOps & Platforms",
      icon: "🚀",
      title: "Ship safely and repeatedly",
      subtitle:
        "For platform and data science leaders.",
      linkText: "Design the platform",
      points: [
        "CI/CD for models, registries, and promotion flows",
        "Data contracts, quality gates, drift detection",
        "Cost, observability, and governance playbooks",
        "Automations: eval pipelines, canary/rollback, cost guardrails"
      ],
    },
    {
      tag: "Safety & Compliance",
      icon: "🛡️",
      title: "Guardrails and evaluations",
      subtitle:
        "For risk, compliance, and security teams.",
      linkText: "Add guardrails",
      points: [
        "Policy desPolicy design, red-teaming, and abuse preventionign",
        "PII/privacy controls and vendor risk checks",
        "Eval harness for quality, safety, bias",
        "Automations: PII scrubbing, prompt/response policy checks"
      ],
    },
    {
      tag: "Data & Integration",
      icon: "🔗",
      title: "Strong data foundations",
      subtitle:
        "For data platform owners.",
      linkText: "Strengthen data",
      points: [
        "Data ingestion, enrichment, and observability",
        "APIs, connectors, and production integration",
        "Performance, security, and SLAs by design",
        "Automations: data quality alerts, connector health, freshness checks"
      ],
    },
  ];

  

  return (
    <>
    <section className="solutions-section" style={{ marginTop: "30px" }}>
      <div className="solutions-header">
        <a href="#solutions" className="small-title" onClick={() => setShowCards(!showCards)} style={{ cursor: "pointer" }}>
          AI / ML & GENAI SOLUTIONS
        </a>

        <button className="close-btn1" onClick={onClose}>
          ✕ Close
        </button>
      </div>

      <h2 >
        Choose the solution you need; we frame  scope in 48 hours.
      </h2>

      <p className="desc">
        From chatbots and copilots to agentic
        workflows and predictive ML.
      </p>

      <div className="filter-tags">
        <span>Outcome</span>
        <p>Faster support resolution 
        Safer copilots
  Quicker releases</p>
      </div>

      <div className="solutions-grid">
        {solutions.map((item, index) => (
          <SolutionCard
            key={index}
            {...item}
          />
        ))}
      </div>

      {/* HOW IT WORKS */}
      <div className="how-it-works1">
        <h4 style={{ marginLeft: "120px", color:"#0ea5e9" }} className="how-it-works-title">HOW IT WORKS</h4>

        <div className="steps1">
          <span>Pick a track</span>
          <span>Scope in 48 hours</span>
          <span>Pilot in weeks</span>
          <span>Scale with guardrails</span>
        </div>
      </div>

      {/* EXAMPLE WINS */}
<div className="example-wins1">
  <h4>EXAMPLE WINS</h4>

  <div className="wins-grid1">
    <div className="win-card1">
      <h3>Support bot</h3>
      <p>
        25% faster resolution; grounded answers
        with citations.
      </p>
    </div>

    <div className="win-card1">
      <h3>Copilot for sales</h3>
      <p>
        Discovery notes + proposals auto-drafted
        with approvals.
      </p>
    </div>

    <div className="win-card1">
      <h3>ML rollout</h3>
      <p>
        Lead scoring + A/B + rollback plan;
        monitored SLAs.
      </p>
    </div>
  </div>
</div>
    </section>

   
</>
  );
}

export default SolutionsSection;