import "./Products.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const products = [
  {
    id: "education",
    title: "Revolutionize Learning with Education Agent",
    category: "Edu Agent",
    image: "/images/eduagent.jfif",
    description:
      "AI-powered learning platform with personalized learning, automated grading, adaptive assessments and student analytics.",
    button: "Explore Agent →",
    path: "/educagent",
  },
 
  {
    id: "agriculture",
    title: "Optimize Fields with Agriculture Agent",
    category: "Agriculture Agent",
    image: "/images/agri-agent.jfif",
    description:
      "Smart farming solution for crop monitoring, disease detection, irrigation optimization and yield prediction.",
    button: "Explore Agent →",
    path: "/agriagent",
  },
  {
    id: "bankingagent",
    title: "Secure Finance with Banking Agent",
    category: "Banking Agent",
    image: "/images/bank-agent.jfif",
    description:
      "Intelligent banking assistant for fraud detection, customer support, risk management and financial insights.",
    button: "Explore Agent →",
    path: "/bankingagent",
  },
  {
    id: "ai-accelerator",
    title: "Accelerate Innovation with Enterprise AI",
    category: "AI Accelerator",
    image: "/images/generativeAi.jfif",
    description:
      "Fast-track AI adoption with intelligent automation, custom AI agents, generative AI solutions and workflow optimization.",
    button: "Explore AI Accelerator →",
    path: "/rag-cards",
  },
  {
    id: "software-services",
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
  const location = useLocation();

  // युजर आधीच लॉगिन असेल तर स्टेट पुढे पाठवण्यासाठी
  const loggedInUser = location.state?.loggedInUser || null;

  // मेन कार्ड क्लिक: थेट सब-कार्ड पेजवर रिडायरेक्ट (लॉगिन नको)
  const handleRedirect = (item) => {
    const path = item?.path || "/products";
    navigate(path, {
      state: {
        loggedInUser: loggedInUser,
        parentAgent: item,
      },
    });
  };

  return (
    <>
      <section className="service-section">
        <h1 className="products-heading">Products</h1>

        <div className="container">
          <div className="products-grid">
            {products.map((item, index) => (
              <div
                className="service-card"
                key={index}
                onClick={() => handleRedirect(item)}
                style={{ cursor: "pointer" }}
              >
                {/* Card Image */}
                <div className="card-image">
                  <img src={item.image} alt={item.title} />
                </div>

                {/* Card Content */}
                <div className="card-content">
                  <span className="card-category">{item.category}</span>
                  <h3>{item.title}</h3>

                  <div className="card-footer">
                    <button
                      className="discover-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRedirect(item);
                      }}
                    >
                      Discover more
                    </button>
                    <span className="arrow">→</span>
                  </div>
                </div>

                {/* Tooltip */}
                <div className="card-tooltip">
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    <button
                      className="tooltip-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRedirect(item);
                      }}
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