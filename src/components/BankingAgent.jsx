import { useNavigate } from "react-router-dom";
import "./Educaagent.css";

const agentproducts = [
  {
    title: "Manage Billing with Billing Application",
    category: "Billing Application",
    image: "/images/billing-application.jfif",
    description:
      "A smart billing application for creating invoices, managing payments, tracking transactions, generating reports, and simplifying business billing operations.",
    button: "Explore Billing Application →",
  },
];

function BankingAgent() {
  const navigate = useNavigate();
  const goToAgent = () => {
   window.open(
    "https://dnyanaihelpme-medical-billing-system.hf.space/login.html",
    "_blank",
    "noopener,noreferrer"
  );
  };

   const handleBackToHomeProducts = () => {
    navigate("/");

    setTimeout(() => {
      const productsSection = document.getElementById("products");

      if (productsSection) {
        productsSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  return (
    <>
      <nav className="terms-navbar">
        <div className="terms-nav-left">
          <button
            className="nav-back-btn"
            onClick={handleBackToHomeProducts}
          >
            ← Back
          </button>
        </div>

        <div className="terms-nav-right">
          <button
            className="nav-contact-btn"
            onClick={() => (window.location.href = "/contact")}
          >
            Contact Us
          </button>
        </div>
      </nav>

      <section className="service-section1">
        <h1>Banking Application</h1>

        <div className="container1">
          <div className="products-grid1">
            {agentproducts.map((item, index) => (
              <div className="service-card1" key={index}>
                <div className="card-image1">
                  <img src={item.image} alt={item.title} />
                </div>

                <div className="card-content1">
                  <span className="card-category1">
                    {item.category}
                  </span>

                  <h3>{item.title}</h3>

                  <div className="card-footer1">
                    <button
                      className="discover-btn1"
                      onClick={goToAgent}
                    >
                      Discover more
                    </button>

                    <span className="arrow1">→</span>
                  </div>
                </div>

                <div className="card-tooltip1">
                  <div>
                    <h4>{item.title}</h4>

                    <p>{item.description}</p>

                    <button
                      className="tooltip-btn1"
                      onClick={goToAgent}
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
    </>
  );
}

export default BankingAgent;
