import React from "react";
import OfferingCard from "./OfferingCard";
import "./Offerings.css";

  const Offerings = ({ onOpenSolutions,   onOpenSoftwareServices, onOpenTraining }) => {

  const cards = [
    {
      category: "AI/ML & GenAI Solutions",
      image: "/images/generativeAi.jfif",
      title: "Design and ship production-grade AI.",
      linkText: "Plan a build",
      description: "Use-case discovery, value modeling, prioritization, architecture across data, model, and MLOps stacks, GenAI apps with retrieval, safety, and observability, model evaluation, red-teaming, and risk controls.",
      button: "Plan a build",
    },
    {
      category: "Training & Consulting",
      image: "/images/eduagent.jfif",
      title: "Equip your teams to deliver responsibly.",
      linkText: "Explore training planner",
      description: "Executive briefings and AI literacy pathways, engineer bootcamps for MLOps, GenAI, data products, playbooks for governance, procurement, and vendors, embedded advisors to steer key initiatives.",
      button: "Explore training planner",
    },
    {
      category: "Software Services",
      image: "/images/software-agent.jfif",
      title: "Modern software built with quality at the core.",
      linkText: "Let's collaborate",
      description: "Product discovery, UX, and service design, website design and digital experience refresh, cloud-native builds with SRE-grade reliability, APIs and data platforms at scale.",
      button: "Let's collaborate",
    },
  ];

  return (
    <section className="offerings-section" aria-labelledby="offerings-heading">
      <p className="sub-title">offering</p>

      <h2 id="offerings-heading" className="section-title">
        Three ways to engage — aligned to your stage.
      </h2>

      <p className="description">
        From strategy and pilots to scaled delivery and upskilling, we plug in where you need momentum.
      </p>

      <div className="cards-grid">
        {cards.map((card, index) => (
          <OfferingCard
            key={index}
            {...card}
            onClick={() => {
              if (card.category === "AI/ML & GenAI Solutions") {
                onOpenSolutions();
              }

                if (card.category === "Training & Consulting") {
                 onOpenTraining();
               }

              if (card.category === "Software Services") {
                onOpenSoftwareServices();
              }
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Offerings;