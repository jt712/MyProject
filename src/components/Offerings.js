import React, { useRef, useEffect } from "react";
import OfferingCard from "./OfferingCard";
import SolutionsSection from "./SolutionsSection";
import TrainingPlanner from "./TrainingPlanner/TrainingPlanner";
import SoftwareServices from "./SoftwareServices";
import "./Offerings.css";

const Offerings = ({ activeOffering, setActiveOffering }) => {
  const detailsRef = useRef(null);

  useEffect(() => {
    if (activeOffering && detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeOffering]);

  const cards = [
    {
      category: "AI/ML & GenAI Solutions",
      image: "/images/generativeAi.jfif",
      title: "Design and ship production-grade AI.",
      description: "Use-case discovery, value modeling, prioritization, architecture across data, model, and MLOps stacks, GenAI apps with retrieval, safety, and observability, model evaluation, red-teaming, and risk controls.",
      button: "Plan a build",
      onClick: () => setActiveOffering(activeOffering === "solutions" ? null : "solutions"),
    },
    {
      category: "Training & Consulting",
      image: "/images/eduagent.jfif",
      title: "Equip your teams with certified skills.",
      description: "Executive briefings, AI literacy pathways, engineer bootcamps for MLOps, GenAI, data products, playbooks for governance, procurement, and vendors, alongside specialized certification programs.",
      button: "Explore training planner",
      onClick: () => setActiveOffering(activeOffering === "planner" ? null : "planner"),
    },
    {
      category: "Software Services",
      image: "/images/software-agent.jfif",
      title: "Modern software built with quality at the core.",
      description: "Product discovery, UX, and service design, website design and digital experience refresh, cloud-native builds with SRE-grade reliability, APIs and data platforms at scale.",
      button: "Let's collaborate",
      onClick: () => setActiveOffering(activeOffering === "software" ? null : "software"),
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
          <OfferingCard key={index} {...card} />
        ))}
      </div>

      {/* Cards च्या खाली ओपन होणारा Detailed Section */}
      {activeOffering && (
        <div className="offering-details-container" ref={detailsRef}>
          {/* <button 
            className="close-details-btn" 
            onClick={() => setActiveOffering(null)}
          >
            ✕ Close
          </button> */}

          {activeOffering === "solutions" && (
            <SolutionsSection
              onClose={() => setActiveOffering(null)}
              onOpenContact={() => {
                setActiveOffering(null);
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          )}

          {activeOffering === "planner" && (
            <TrainingPlanner
              onClose={() => setActiveOffering(null)}
              onOpenContact={() => {
                setActiveOffering(null);
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          )}

          {activeOffering === "software" && (
            <SoftwareServices
              onClose={() => setActiveOffering(null)}
              onOpenContact={() => {
                setActiveOffering(null);
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          )}
        </div>
      )}
    </section>
  );
};

export default Offerings;