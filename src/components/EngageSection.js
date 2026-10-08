
import React from "react";
import "./EngageSection.css";

export default function EngageSection({ onOpenCareerCounselling }) {
  return (
    <section className="engage-wrapper">
      <div className="engage-card">
        <div className="engage-left">
          <p className="engage-tag">Engage</p>

          <h2>Ready to accelerate your AI journey?</h2>

          <p className="engage-desc">
            Let's explore how our full-stack expertise can unlock value across your data, models, and products.
          </p>
        </div>

        <div className="engage-right">
          <button
            type="button"
            className="engage-btn"
            onClick={(event) => {
              event.preventDefault();
              onOpenCareerCounselling?.();
            }}
          >
            Talk with us
          </button>
        </div>
      </div>
    </section>
  );
}