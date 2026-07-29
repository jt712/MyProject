import React from "react";

const OfferingCard = ({
  category,
  title,
  linkText,
  description,
  button,
  onClick,
  image,
}) => {
  return (
    <div className="offering-card">
      <div className="card-image">
        <img src={image} alt={title} />
      </div>

      <div className="card-content">
        <span className="card-category">
          {category}
        </span>

        <h3>{title}</h3>

        <div className="card-footer">
          <a href="/">Discover more</a>
          <span className="arrow">→</span>
        </div>
      </div>

      <div className="card-tooltip">
        <div>
          <h4>{title}</h4>
          <p>{description}</p>
          <button
            className="tooltip-btn"
            onClick={() => onClick()}
          >
            {button}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferingCard;