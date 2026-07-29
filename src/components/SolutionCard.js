import React from "react";

function SolutionCard({
  tag,
  title,
  subtitle,
  points,
  linkText,
  icon,
}) {
  return (
    <div className="solution-card">
      <div className="card-top">
        <span className="card-tag">{tag}</span>
        <span>{icon}</span>
      </div>

      <h3>{title}</h3>

      <p className="card-subtitle">
        {subtitle}
      </p>

      <ul>
        {points.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <a href="/">{linkText} →</a>
    </div>
  );
}



export default SolutionCard;