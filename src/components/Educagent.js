import { useNavigate } from "react-router-dom";
import "./Educaagent.css";

const agentproducts = [
  {
    title: "Empower Teaching with Teacher Agent",
    category: "Teacher Agent",
    image: "/images/teacher-agent.jfif",
    description:
      "AI-powered assistant for lesson planning, question paper generation, assignment evaluation, classroom management, and personalized teaching support.",
    button: "Explore Teacher Agent →",
    route: "/agent",
  },
  {
  title: "Get Admission Guidance with CAP Round Counsellor",
    category: "Cap Round Counselor",
    image: "/images/student-counselor1.jfif",
    description:
    "AI-powered counselling solution for CAP round admission guidance, college preferences, cutoff analysis, and personalized college recommendations.",
    button: "Explore Cap Round Counselor →",
    route: "/layout",
  },
  {
    title: "Autonomous AI Counsellor",
    category: "Counsellor Agent",
    image: "/images/counsellor-agent.jfif",
    description:
      "AI-powered counselling solution that provides personalized guidance, recommendations, and intelligent answers based on user requirements.",
    button: "Explore Counselor Agent →",
    route: "/aicounsellor",
  },
];


function Educagent() {
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
        <h1>Education Products</h1>

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
                      onClick={() => goToLogin(item.route)}
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

export default Educagent;