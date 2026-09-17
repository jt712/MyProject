import { useNavigate } from "react-router-dom";
import "./RagCards.css";


function RagCards() {

    const products=[
        {
            
  
  title: "Custom Agentic RAG Workflow Builder",
  category: "Agentic RAG Workflow Builder",
  image: "/images/rag-workflow.jfif",
  description:
    "Intelligent workflow builder for creating agentic RAG workflows with document retrieval, AI agents, and LLM-powered responses.",
  button: "Explore Agent →",
  path: "/ai-accelerator",

        },
       { 
  
  title: "Manage Documents with Smart Document Engine",
  category: "Smart Document Engine",
  image: "/images/smart-document.jfif",
  description:
    "Smart document solution for uploading, processing, searching, retrieving, and interacting with information from documents using AI.",
  button: "Explore Agent →",
  path: "/smartdocument",
       }

    ]

    
      const navigate = useNavigate();
    
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
    
      // Go to login page and send the actual page route
      const goToLogin = (route) => {
        navigate("/login", {
          state: {
            redirectTo: route,
          },
        });
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
                onClick={() => navigate("/contact")}
              >
                Contact Us
              </button>
            </div>
          </nav>
    
          <section className="service-section1">
            <h1>RAG Products</h1>
    
            <div className="container1">
              <div className="products-grid1">
                {products.map((item, index) => (
                  <div
                    className="service-card1"
                    key={index}
                    onClick={() => goToLogin(item.path)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card-image1">
                      <img src={item.image} alt={item.title} />
                    </div>
    
                    <div className="card-content1">
                      <span className="card-category1">
                        {item.category}
                      </span>
    
                      <h3>{item.title}</h3>
    
                      <div className="card-footer1">
                        <span>Discover more</span>
                        <span className="arrow1">→</span>
                      </div>
                    </div>
    
                    <div className="card-tooltip1">
                      <div>
                        <h4>{item.title}</h4>
    
                        <p>{item.description}</p>
    
                        <button
                          className="tooltip-btn1"
                          onClick={() => goToLogin(item.path)}
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

export default RagCards;

