import "./Products.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useRef } from "react";

const products = [
  {
    title: "Revolutionize Learning with Education Agent",
    category: "Edu Agent",
    image: "/images/eduagent.jfif",
    description:
      "AI-powered learning platform with personalized learning, automated grading, adaptive assessments and student analytics.",
    button: "Explore Agent →",
  },
  {
    title: "Optimize Fields with Agriculture Agent",
    category: "Agriculture Agent",
    image: "/images/agri-agent.jfif",
    description:
      "Smart farming solution for crop monitoring, disease detection, irrigation optimization and yield prediction.",
    button: "Explore Agent →",
  },
  {
    title: "Secure Finance with Banking Agent",
    category: "Banking Agent",
    image: "/images/bank-agent.jfif",
    description:
      "Intelligent banking assistant for fraud detection, customer support, risk management and financial insights.",
    button: "Explore Agent →",
  },
  {
    title: "Accelerate Innovation with Enterprise AI",
    category: "AI Accelerator",
    image: "/images/generativeAi.jfif",
    description:
      "Fast-track AI adoption with intelligent automation, custom AI agents, generative AI solutions and workflow optimization.",
    button: "Explore AI Accelerator →",
  },
  {
    title: "Modern software built with quality",
    category: "Software Services",
    image: "/images/software-agent.jfif",
    description:
      "End-to-end software development including web apps, APIs, cloud platforms, maintenance and support services.",
    button: "Explore Services →",
  },

];

export default function Products() {
  const navigate = useNavigate();

  const goToAgent = (product) => {
    navigate("/educagent");
  };

  return (
    <>
      {/* <nav className="custom-navbar">
        <img
          src="/images/dnyai-logo.jpeg"
          alt="logo"
          className="logo"
        />

        <h3>Products</h3>

        <button className="talk-btn">
          Talk to us
        </button>
      </nav> */}

      <section className="service-section">
          
                <h1>Products</h1>

        <div className="container">
          <div className="products-grid">
            {products.map((item, index) => (
              <div className="service-card" key={index}>
              <div className="card-image">
                <img src={item.image} alt={item.title} />
              </div>

              <div className="card-content">
                <span className="card-category">
                  {item.category}
                </span>

                <h3>{item.title}</h3>

                <div className="card-footer">
                  <a href="/">Discover more</a>
                  <span className="arrow">→</span>
                </div>
              </div>

              <div className="card-tooltip">
                <div>
                  <h4>{item.title}</h4>

                  <p>{item.description}</p>

                  <button
                    className="tooltip-btn"
                    onClick={() => goToAgent(item)}
                  >
                    {item.button}
                  </button>
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>
      </section>

      <Outlet />
    </>
  );
}
