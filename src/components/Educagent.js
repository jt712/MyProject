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
    title: "Guide Students with Student Counselor Agent",
    category: "Student Counselor",
    image: "/images/student-counselor.jfif",
    description:
      "Intelligent career counseling platform providing personalized career guidance, stream selection, college recommendations, skill assessment, and academic planning.",
    button: "Explore Student Counselor →",
    route: "/layout",
  },
  {
    title: "Counselor Agent",
    category: "Counselor",
    image: "/images/student-counselor.jfif",
    description:
      "Intelligent counseling platform providing personalized guidance, assessment, recommendations, and planning support.",
    button: "Explore Counselor Agent →",
    route: "/counselor",
  },
];

function Educagent() {
  const navigate = useNavigate();

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
            onClick={() => navigate("/products")}
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