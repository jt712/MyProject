import React from "react";
import "./SoftwareServices.css";

export default function SoftwareServices({ onClose, onOpenContact }) {
  const services = [
    {
      tag: "Web & SaaS Apps",
      icon: "🌐",
      title: "Responsive, accessible, secure",
      desc: "For B2B/B2C products and internal tools.",
      points: [
        "Product discovery, UX/UI, and design systems",
        "Frontend + backend with auth, roles, and payments",
        "Telemetry, error tracking and performance budgets"
      ],
      link: "Plan a web build"
    },
    {
      tag: "Mobile Apps",
      icon: "📱",
      title: "iOS/Android with quality baked in",
      desc: "Native or cross-platform builds.",
      points: [
        "Design, prototyping and usability testing",
        "APIs, push, analytics and release pipelines",
        "Beta/GA rollout, crash monitoring"
      ],
      link: "Start a mobile build"
    },
    // {
    //   tag: "Web Presence & Domains",
    //   icon: "🏠",
    //   title: "Sites that convert",
    //   desc: "For marketing, docs and launches.",
    //   points: [
    //     "Domain, DNS, SSL hosting",
    //     "SEO and accessibility",
    //     "Landing pages and docs hubs"
    //   ],
    //   link: "Refresh our site"
    // },
    {
      tag: "APIs & Integrations",
      icon: "🔧",
      title: "Reliable backends",
      desc: "For platforms and partners.",
      points: [
        "API design and observability",
        "ERP/CRM integrations",
        "Contracts, SLA and rollout"
      ],
      link: "Ship integrations"
    },
    {
      tag: "Cloud & SRE",
      icon: "☁️",
      title: "Reliability and cost control",
      desc: "Production-grade operations.",
      points: [
        "Infrastructure as code",
        "Monitoring and incident response",
        "Security baselines and DR"
      ],
      link: "Harden our platform"
    },
    {
      tag: "Analytics & Dashboards",
      icon: "📊",
      title: "Insights that guide action",
      desc: "For product and leadership.",
      points: [
        "Data modeling",
        "Dashboards and reporting",
        "Attribution and funnel analysis"
      ],
      link: "Build dashboards"
    }
  ];

  return (
    <section className="software-section">
      <div className="top-bar">
        <span className="badge">
          SOFTWARE SERVICES
        </span>

        <button
          className="close-btn2"
          onClick={onClose}
        >
          ✕ Close
        </button>
      </div>
<div className="header">
      <h1 style={{ fontSize:"30px"}}>End-to-end software delivery — from idea
         to launch.
      </h1>
</div>
      <p className="subtitle">
        Web, mobile, domains, integrations,
        and production reliability.
      </p>

      <div className="outcomes">
        <span>Outcomes</span>
        <p>
          Launch-ready UX  Secure &
          performant  Fast iterations
        </p>
      </div>

      <div className="services-grid">
        {services.map((item, index) => (
          <div
            key={index}
            className="service-card"
          >
            <div className="card-header">
              <span>{item.tag}</span>
              <span>{item.icon}</span>
            </div>

            <h3>{item.title}</h3>

            <p>{item.desc}</p>

            <ul>
              {item.points.map(
                (point, i) => (
                  <li key={i}>{point}</li>
                )
              )}
            </ul>

            <button type="button" className="service-link" onClick={onOpenContact}>
              {item.link} →
            </button>
          </div>
        ))}
      </div>

      <div className="how-it-works2">
        <h4 style={{ fontSize:"17px"}}>HOW IT WORKS</h4>

        <p>
          Define scope • Design &
          prototype • Build & harden •
          Launch & monitor
        </p>
      </div>

      <div className="wins">
        <h6>EXAMPLE WINS</h6>

        <div className="wins-grid">
          <div className="win-card">
            <h3>SaaS MVP</h3>
            <p>
              4-week MVP with auth and
              payments.
            </p>
          </div>

          <div className="win-card">
            <h3>Mobile rollout</h3>
            <p>
              Beta to GA with crash
              monitoring.
            </p>
          </div>

          <div className="win-card">
            <h3>API platform</h3>
            <p>
              Partner APIs with SLAs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}