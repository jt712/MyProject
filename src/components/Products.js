
import "./Products.css";
import { Outlet, useNavigate } from "react-router-dom";

const products = [
  {
    title: "Revolutionize Learning with Education Agent",
    category: "Edu Agent",
    image: "/images/eduagent.jfif",
    description:
      "AI-powered learning platform with personalized learning, automated grading, adaptive assessments and student analytics.",
    button: "Explore Agent →",
    path: "/educagent",
  },

  {
    title: "Optimize Fields with Agriculture Agent",
    category: "Agriculture Agent",
    image: "/images/agri-agent.jfif",
    description:
      "Smart farming solution for crop monitoring, disease detection, irrigation optimization and yield prediction.",
    button: "Explore Agent →",
    path: "/agriagent",
  },

  {
    title: "Secure Finance with Banking Agent",
    category: "Banking Agent",
    image: "/images/bank-agent.jfif",
    description:
      "Intelligent banking assistant for fraud detection, customer support, risk management and financial insights.",
    button: "Explore Agent →",
    path: "/bankingagent",
  },

  {
    title: "Accelerate Innovation with Enterprise AI",
    category: "AI Accelerator",
    image: "/images/generativeAi.jfif",
    description:
      "Fast-track AI adoption with intelligent automation, custom AI agents, generative AI solutions and workflow optimization.",
    button: "Explore AI Accelerator →",
    path: "/ai-accelerator",
  },

  {
    title: "Modern software built with quality",
    category: "Software Services",
    image: "/images/software-agent.jfif",
    description:
      "End-to-end software development including web apps, APIs, cloud platforms, maintenance and support services.",
    button: "Explore Services →",
    path: "/software-services",
  },
];

export default function Products() {
  const navigate = useNavigate();

  // Navigate to selected product page
  const goToAgent = (path) => {
    navigate(path);
  };

  return (
    <>
      <section className="service-section">
        <h1>Products</h1>

        <div className="container">
          <div className="products-grid">

            {products.map((item, index) => (
              <div className="service-card" key={index}>

                {/* Card Image */}
                <div className="card-image">
                  <img
                    src={item.image}
                    alt={item.title}
                  />
                </div>

                {/* Card Content */}
                <div className="card-content">

                  <span className="card-category">
                    {item.category}
                  </span>

                  <h3>{item.title}</h3>

                  <div className="card-footer">
                    <button
                      className="discover-btn"
                      onClick={() => goToAgent(item.path)}
                    >
                      Discover more
                    </button>

                    <span className="arrow">
                      →
                    </span>
                  </div>

                </div>

                {/* Tooltip */}
                <div className="card-tooltip">

                  <div>
                    <h4>{item.title}</h4>

                    <p>{item.description}</p>

                    <button
                      className="tooltip-btn"
                      onClick={() => goToAgent(item.path)}
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

