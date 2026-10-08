
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { saveUser } from "../auth";

// Keep signup card list unchanged as requested
const products = [
 {

    id:"teacheragent",
    title: "Empower Teaching with Teacher Agent",
    category: "Teacher Agent",
    image: "/images/teacher-agent.jfif",
    description:
      "AI-powered assistant for lesson planning, question paper generation, assignment evaluation, classroom management, and personalized teaching support.",
    button: "Explore Teacher Agent →",
    route: "/agent",
  },

  {
    id: "agriculture",
    title: "Optimize Fields with Agriculture Agent",
    category: "Agriculture Agent",
    image: "/images/agri-agent.jfif",
    description:
      "Smart farming solution for crop monitoring, disease detection, irrigation optimization and yield prediction.",
    path: "/agriagent",
  },

   {
    id: "counsellor",
    title: "Autonomous AI Counsellor",
    category: "Counsellor Agent",
    image: "/images/counsellor-agent.jfif",
    description:
      "AI-powered counselling solution that provides personalized guidance, recommendations, and intelligent answers based on user requirements.",
  button: "Explore Agent →",
  path: "/aicounsellor",
},

{
  id: "ai-accelerator",
  title: "Custom Agentic RAG Workflow Builder",
  category: "Agentic RAG Workflow Builder",
  image: "/images/rag-workflow.jfif",
  description:
    "Intelligent workflow builder for creating agentic RAG workflows with document retrieval, AI agents, and LLM-powered responses.",
  button: "Explore Agent →",
  path: "/ai-accelerator",
},

{
  id: "smart-document",
  title: "Manage Documents with Smart Document Engine",
  category: "Smart Document Engine",
  image: "/images/smart-document.jfif",
  description:
    "Smart document solution for uploading, processing, searching, retrieving, and interacting with information from documents using AI.",
  button: "Explore Agent →",
  path: "/smartdocument",
},

{
  id: "bankingagent",
  title: "Automate Intelligent Billing",
  category: "Intelligent Billing Application",
  image: "/images/bank-agent.jfif",
  description:
    "Intelligent billing solution for automating billing operations, processing billing information, and providing AI-powered billing assistance.",
  button: "Explore Agent →",
  path: "/bankingagent",
},

{
  id: "capcounsellor",
  title: "Get Admission Guidance with CAP Round Counsellor",
  category: "CAP Round Counsellor",
  image: "/images/cap-counsellor.jfif",
  description:
    "AI-powered counselling solution for CAP round admission guidance, college preferences, cutoff analysis, and personalized college recommendations.",
  button: "Explore Agent →",
  path: "/capcounsellor",
}
  

];

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const [selectedAgents, setSelectedAgents] = useState([]);

  const [error, setError] = useState("");

  // ==========================================
  // CHECKBOX SELECT / UNSELECT
  // ==========================================

  const handleAgentChange = (agentId) => {
    setSelectedAgents((previous) => {
      if (previous.includes(agentId)) {
        return previous.filter((id) => id !== agentId);
      }

      return [...previous, agentId];
    });

    setError("");
  };

  // ==========================================
  // SELECT ALL
  // ==========================================

  const handleSelectAll = () => {
    if (selectedAgents.length === products.length) {
      setSelectedAgents([]);
    } else {
      setSelectedAgents(
        products.map((product) => product.id)
      );
    }
  };

  // ==========================================
  // SIGNUP
  // ==========================================

  
 const handleSignup = async (e) => {

  e.preventDefault();

  setError("");

  if (!name || !email || !password || !username || !mobileNumber) {

    setError("Please fill all required fields.");
    return;

  }

  if (selectedAgents.length === 0) {

    setError("Please select at least one agent.");
    return;

  }

  const userData = {

    fullName: name,
    username: username,
    email: email,
    mobileNumber: mobileNumber,
    password: password,

    allowedAgents: selectedAgents

  };

  console.log("Signup User Data:", userData);

  try {
  //  const response = await fetch("http://localhost:8080/api/auth/signup", {
   const response = await fetch("https://dnyanaihelpme-medical-billing-system.hf.space/api/auth/dnyanaisignup", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(userData),
});

    const data = await response.json();

    console.log("Signup API Response:", data);

    if (!response.ok) {

      setError(
        data.message || "Signup failed."
      );

      return;

    }

    const storedUser = {
      fullName: name,
      username: username,
      email: email,
      mobileNumber: mobileNumber,
      password: password,
      allowedAgents: selectedAgents,
      role: "user",
    };

    saveUser(storedUser);

    alert("Account created successfully!");

    navigate("/login");

  } catch (error) {

    console.error("Signup API Error:", error);

    // Keep signup usable for local/demo deployments when the API is offline.
    saveUser(userData);
    alert("Account created successfully!");
    navigate("/login");

  }

};


  return (
    <div className="signup-page">

      <div className="signup-container">

        {/* ==================================
            HEADER
        ================================== */}

        <div className="signup-header">

          <div className="signup-logo">
            <img
              src="/images/dnyai-logo.jpeg"
              alt="DnyanAI logo"
            />
          </div>

          <h1>Create Account</h1>

          <p>
            Create your account and select the
            agents you want to access.
          </p>

        </div>


        {/* ==================================
            FORM
        ================================== */}

        <form onSubmit={handleSignup}>

          {/* NAME */}

          <div className="signup-input-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
            />

          </div>

          <div className="signup-input-group">

            <label>
              UserName 
            </label>

            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
            />

          </div>


          {/* EMAIL */}

          <div className="signup-input-group">

            <label>
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />

          </div>

          <div className="signup-input-group">

            <label>
              Mobile Number
            </label>

            <input
              type="text"
              placeholder="Enter your mobile number"
              value={mobileNumber}
              onChange={(e) => {
                setMobileNumber(e.target.value);
                setError("");
              }}
            />

          </div>


          {/* PASSWORD */}

          <div className="signup-input-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />

          </div>


          {/* ==================================
              AGENT SELECTION HEADER
          ================================== */}

          <div className="agents-header">

            <div>
              <h2>
                Select Agents
              </h2>

              <p>
                Choose the agents this user can access.
              </p>
            </div>

            <button
              type="button"
              className="select-all-btn"
              onClick={handleSelectAll}
            >
              {selectedAgents.length === products.length
                ? "Unselect All"
                : "Select All"}
            </button>

          </div>


          {/* ==================================
              AGENT CARDS
          ================================== */}

          <div className="signup-agents-grid">

            {products.map((product) => {

              const isSelected =
                selectedAgents.includes(product.id);

              return (

                <div
                  key={product.id}
                  className={`signup-agent-card ${
                    isSelected ? "selected" : ""
                  }`}
                  onClick={() =>
                    handleAgentChange(product.id)
                  }
                >

                  {/* CHECKBOX */}

                  <div className="agent-checkbox">

                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() =>
                        handleAgentChange(product.id)
                      }
                      onClick={(e) =>
                        e.stopPropagation()
                      }
                    />

                  </div>


                  {/* IMAGE */}

                  <div className="signup-agent-image">

                    <img
                      src={product.image}
                      alt={product.title}
                    />

                  </div>


                  {/* CONTENT */}

                  <div className="signup-agent-content">

                    <span className="signup-agent-category">
                      {product.category}
                    </span>

                    <h3>
                      {product.title}
                    </h3>

                    <p>
                      {product.description}
                    </p>

                  </div>

                </div>

              );
            })}

          </div>


          {/* ==================================
              SELECTED COUNT
          ================================== */}

          <div className="selected-info">

            {selectedAgents.length} of{" "}
            {products.length} selected

          </div>


          {/* ==================================
              ERROR
          ================================== */}

          {error && (
            <div className="signup-error">
              {error}
            </div>
          )}


          {/* ==================================
              SIGNUP BUTTON
          ================================== */}

          <button
            type="submit"
            className="signup-btn"
          >
            Create Account
          </button>

        </form>


        {/* ==================================
            LOGIN
        ================================== */}

        <div className="already-account">

          Already have an account?

          <button
            type="button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

        </div>

      </div>

    </div>
  );
}

export default Signup;